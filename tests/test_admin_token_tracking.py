"""Tests for admin dashboard, token tracking, and usage analytics."""
import os, sys, json
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from dotenv import load_dotenv
load_dotenv()

import pytest
from datetime import datetime
from fastapi import FastAPI
from fastapi.testclient import TestClient

from src.api.routes import (
    _estimate_tokens, _compute_cost, MODEL_PRICING,
    _track_tokens
)
from src.core.database import (
    log_token_usage, get_token_usage_stats, get_token_usage_by_user,
    get_token_usage_by_feature, get_token_usage_logs, get_all_users_simple
)
from src.api.auth import get_current_user_from_cookies, User


# ── Fixtures ────────────────────────────────────────────────────────────────

@pytest.fixture
def mock_app():
    """FastAPI app with auth dependency overridden to bypass cookies."""
    from main import app as real_app
    app = real_app

    def mock_user():
        return User(
            id="admin-test-user",
            email="admin_test@example.com",
            name="Admin Test User",
            created_at=datetime.utcnow()
        )
    app.dependency_overrides[get_current_user_from_cookies] = mock_user
    yield app
    app.dependency_overrides.clear()


@pytest.fixture
def client(mock_app):
    return TestClient(mock_app)


# ── Unit: Token Estimation Helpers ──────────────────────────────────────────

class TestEstimateTokens:
    def test_empty_text(self):
        assert _estimate_tokens("") == 1  # max(1, 0//4)

    def test_short_text(self):
        assert _estimate_tokens("hello world") == 2  # 11//4

    def test_exact_division(self):
        assert _estimate_tokens("abcd") == 1
        assert _estimate_tokens("abcdefgh") == 2

    def test_single_char(self):
        assert _estimate_tokens("a") == 1
        assert _estimate_tokens("abc") == 1

    def test_long_text(self):
        text = "A" * 1000
        assert _estimate_tokens(text) == 250


class TestComputeCost:
    def test_claude_sonnet_prompt(self):
        cost = _compute_cost("claude-sonnet-4-5", 1000, 0)
        assert cost == pytest.approx(0.003, abs=1e-6)

    def test_claude_sonnet_completion(self):
        cost = _compute_cost("claude-sonnet-4-5", 0, 1000)
        assert cost == pytest.approx(0.015, abs=1e-6)

    def test_claude_sonnet_both(self):
        cost = _compute_cost("claude-sonnet-4-5", 2000, 500)
        assert cost == pytest.approx(0.0135, abs=1e-6)

    def test_gemini_flash(self):
        cost = _compute_cost("gemini-2.5-flash", 1000, 500)
        assert cost == pytest.approx(0.00045, abs=1e-6)

    def test_default_model(self):
        cost = _compute_cost("unknown-model", 1000, 1000)
        assert cost == pytest.approx(0.003, abs=1e-6)

    def test_unknown_model_uses_default(self):
        cost = _compute_cost("", 1000, 500)
        assert cost == pytest.approx(0.002, abs=1e-6)

    def test_zero_tokens(self):
        cost = _compute_cost("claude-sonnet-4-5", 0, 0)
        assert cost == 0.0

    def test_prompt_only(self):
        cost = _compute_cost("gemini-2.5-flash", 50000, 0)
        assert cost == pytest.approx(0.0075, abs=1e-6)

    def test_completion_only(self):
        cost = _compute_cost("gemini-2.5-pro", 0, 2000)
        assert cost == pytest.approx(0.01, abs=1e-6)


# ── DB: Token Usage CRUD ────────────────────────────────────────────────────

class TestTokenUsageDB:
    """Tests for token_usage_logs database functions."""

    def test_stats_shape(self):
        stats = get_token_usage_stats(days=30)
        assert "total_requests" in stats
        assert "total_tokens" in stats
        assert "total_cost" in stats
        assert "unique_users" in stats
        assert isinstance(stats["total_requests"], int)
        assert isinstance(stats["total_tokens"], int)
        assert isinstance(stats["total_cost"], float)
        assert isinstance(stats["unique_users"], int)

    def test_log_and_stats_increment(self):
        before = get_token_usage_stats(days=30)
        log_token_usage(
            user_email="utdb_inc@test.com",
            feature="chat", page="dashboard",
            prompt_tokens=100, completion_tokens=50,
            cost=0.001,
            model="claude-sonnet-4-5"
        )
        after = get_token_usage_stats(days=30)
        assert after["total_requests"] >= before["total_requests"]
        assert after["total_tokens"] >= before["total_tokens"] + 150

    def test_by_feature(self):
        log_token_usage(
            user_email="feat@test.com",
            feature="utdb_feature_x",
            page="test",
            prompt_tokens=10, completion_tokens=5,
            cost=0.0001,
            model="claude-sonnet-4-5"
        )
        by_feature = get_token_usage_by_feature(days=30)
        names = [f["feature"] for f in by_feature]
        assert "utdb_feature_x" in names

    def test_by_user(self):
        log_token_usage(
            user_email="utdb_user@test.com",
            feature="chat", page="test",
            prompt_tokens=10, completion_tokens=5,
            cost=0.0001,
            model="claude-sonnet-4-5"
        )
        by_user = get_token_usage_by_user(days=30)
        emails = [u["user_email"] for u in by_user]
        assert "utdb_user@test.com" in emails

    def test_logs_pagination(self):
        log_token_usage(
            user_email="pagin@test.com", feature="chat", page="test",
            prompt_tokens=5, completion_tokens=5,
            cost=0.0001, model="claude-sonnet-4-5"
        )
        first_page = get_token_usage_logs(limit=5, offset=0)
        assert len(first_page["logs"]) <= 5
        assert first_page["total"] >= 1

    def test_logs_user_filter(self):
        log_token_usage(
            user_email="filt_user@test.com",
            feature="chat", page="test",
            prompt_tokens=10, completion_tokens=5,
            cost=0.0001,
            model="claude-sonnet-4-5"
        )
        filtered = get_token_usage_logs(limit=50, offset=0, user_filter="filt_user@test.com")
        for log in filtered["logs"]:
            assert log["user_email"] == "filt_user@test.com"

    def test_logs_feature_filter(self):
        log_token_usage(
            user_email="ft_filt@test.com", feature="utdb_filter_feat",
            page="test", prompt_tokens=10, completion_tokens=5,
            cost=0.0001, model="claude-sonnet-4-5"
        )
        filtered = get_token_usage_logs(limit=50, offset=0, feature_filter="utdb_filter_feat")
        for log in filtered["logs"]:
            assert log["feature"] == "utdb_filter_feat"

    def test_all_users_simple(self):
        log_token_usage(
            user_email="allusers@test.com", feature="chat", page="test",
            prompt_tokens=10, completion_tokens=5,
            cost=0.0001, model="claude-sonnet-4-5"
        )
        users = get_all_users_simple()
        emails = [u["user_email"] for u in users]
        assert "allusers@test.com" in emails

    def test_days_filter_accepts_int(self):
        for d in [1, 7, 30, 365]:
            stats = get_token_usage_stats(days=d)
            assert "total_requests" in stats


# ── API: Admin Endpoints ────────────────────────────────────────────────────

class TestAdminAPI:
    """Tests for /api/v1/admin/* endpoints via TestClient."""

    ADMIN_LOGIN_URL = "/api/v1/admin/login"
    ADMIN_STATS_URL = "/api/v1/admin/stats"
    ADMIN_PER_USER_URL = "/api/v1/admin/per-user"
    ADMIN_PER_FEATURE_URL = "/api/v1/admin/per-feature"
    ADMIN_LOGS_URL = "/api/v1/admin/logs"
    ADMIN_USERS_URL = "/api/v1/admin/users"

    def _get_token(self, client):
        from src.core.config import settings
        resp = client.post(self.ADMIN_LOGIN_URL, json={
            "username": settings.ADMIN_USERNAME,
            "password": settings.ADMIN_PASSWORD,
        })
        return resp.json()["access_token"]

    def test_admin_login_success(self, client):
        from src.core.config import settings
        resp = client.post(self.ADMIN_LOGIN_URL, json={
            "username": settings.ADMIN_USERNAME,
            "password": settings.ADMIN_PASSWORD,
        })
        assert resp.status_code == 200
        data = resp.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"
        assert data["expires_in"] == 86400

    def test_admin_login_wrong_password(self, client):
        from src.core.config import settings
        resp = client.post(self.ADMIN_LOGIN_URL, json={
            "username": settings.ADMIN_USERNAME,
            "password": "wrong_password_12345",
        })
        assert resp.status_code == 401
        assert "Invalid" in resp.json()["detail"]

    def test_admin_login_wrong_username(self, client):
        from src.core.config import settings
        resp = client.post(self.ADMIN_LOGIN_URL, json={
            "username": "nonexistent_admin",
            "password": settings.ADMIN_PASSWORD,
        })
        assert resp.status_code == 401

    def test_admin_stats_requires_token(self, client):
        resp = client.get(self.ADMIN_STATS_URL)
        assert resp.status_code == 401

    def test_admin_stats_with_token(self, client):
        token = self._get_token(client)
        resp = client.get(
            self.ADMIN_STATS_URL + "?days=30",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert resp.status_code == 200
        data = resp.json()
        assert "total_requests" in data
        assert "total_tokens" in data
        assert "total_cost" in data
        assert "unique_users" in data

    def test_admin_per_user_with_token(self, client):
        token = self._get_token(client)
        resp = client.get(
            self.ADMIN_PER_USER_URL + "?days=30",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert resp.status_code == 200
        data = resp.json()
        assert "users" in data

    def test_admin_per_feature_with_token(self, client):
        token = self._get_token(client)
        resp = client.get(
            self.ADMIN_PER_FEATURE_URL + "?days=30",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert resp.status_code == 200
        data = resp.json()
        assert "features" in data

    def test_admin_logs_pagination(self, client):
        log_token_usage(
            user_email="adm_pagin@test.com", feature="chat", page="test",
            prompt_tokens=5, completion_tokens=5,
            cost=0.0001, model="claude-sonnet-4-5"
        )
        token = self._get_token(client)
        resp = client.get(
            self.ADMIN_LOGS_URL + "?limit=5&offset=0",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert resp.status_code == 200
        data = resp.json()
        assert len(data["logs"]) <= 5
        assert data["total"] >= 1

    def test_admin_logs_user_filter(self, client):
        token = self._get_token(client)
        resp = client.get(
            self.ADMIN_LOGS_URL + "?user=utdb_user@test.com",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert resp.status_code == 200

    def test_admin_users_endpoint(self, client):
        token = self._get_token(client)
        resp = client.get(
            self.ADMIN_USERS_URL,
            headers={"Authorization": f"Bearer {token}"}
        )
        assert resp.status_code == 200
        data = resp.json()
        assert "users" in data

    def test_admin_endpoints_reject_bad_token(self, client):
        resp = client.get(
            self.ADMIN_STATS_URL,
            headers={"Authorization": "Bearer invalid_token_here"}
        )
        assert resp.status_code in (401, 403)

    def test_admin_endpoints_reject_expired_token(self, client):
        import jwt as pyjwt
        from src.core.config import settings
        expired = pyjwt.encode(
            {"sub": "admin", "role": "admin", "exp": 0},
            settings.ADMIN_JWT_SECRET, algorithm="HS256"
        )
        resp = client.get(
            self.ADMIN_STATS_URL,
            headers={"Authorization": f"Bearer {expired}"}
        )
        assert resp.status_code == 401

    def test_admin_stats_honors_days_param(self, client):
        token = self._get_token(client)
        for days in [1, 7, 30]:
            resp = client.get(
                self.ADMIN_STATS_URL + f"?days={days}",
                headers={"Authorization": f"Bearer {token}"}
            )
            assert resp.status_code == 200


# ── Integration: _track_tokens end-to-end ───────────────────────────────────

class TestTrackTokens:
    """End-to-end test of the _track_tokens helper."""

    def test_track_tokens_basic(self):
        _track_tokens(
            user_email="ut_track@test.com",
            feature="chat", page="dashboard",
            prompt_text="Hello, can you help me write a resume?",
            response_text="Sure! I can help optimize your resume.",
            model="claude-sonnet-4-5"
        )
        stats = get_token_usage_stats(days=30)
        assert stats["total_requests"] >= 1

    def test_track_tokens_empty_response(self):
        _track_tokens(
            user_email="ut_empty@test.com",
            feature="chat", page="dashboard",
            prompt_text="Hello",
            response_text="",
            model="default"
        )
        stats = get_token_usage_stats(days=30)
        assert stats["total_tokens"] >= 1

    def test_track_tokens_long_text(self):
        _track_tokens(
            user_email="ut_long@test.com",
            feature="resume_optimize", page="resume",
            prompt_text="Optimize this: " + "x" * 10000,
            response_text="Response: " + "y" * 5000,
            model="gemini-2.5-flash"
        )
        stats = get_token_usage_stats(days=30)
        assert stats["total_tokens"] >= 3000

    def test_track_tokens_logs_visible_in_logs(self):
        _track_tokens(
            user_email="ut_logcheck@test.com",
            feature="custom_agents", page="custom-agents",
            prompt_text="Do something",
            response_text="Done",
            model="claude-sonnet-4-5"
        )
        logs = get_token_usage_logs(limit=10, offset=0, user_filter="ut_logcheck@test.com")
        assert len(logs["logs"]) >= 1
        assert logs["logs"][0]["feature"] == "custom_agents"

    def test_track_tokens_multiple_features(self):
        features = [
            ("chat", "dashboard"),
            ("resume_optimize", "resume"),
            ("learn", "learn"),
            ("jobs", "jobs"),
            ("custom_agents", "custom-agents"),
        ]
        for feature, page in features:
            _track_tokens(
                user_email="ut_multifeat@test.com",
                feature=feature, page=page,
                prompt_text=f"Prompt for {feature}",
                response_text=f"Response for {feature}",
                model="claude-sonnet-4-5"
            )
        by_feature = get_token_usage_by_feature(days=30)
        names = [f["feature"] for f in by_feature]
        for feature, _ in features:
            assert feature in names

    def test_track_tokens_model_pricing(self):
        models = ["claude-sonnet-4-5", "gemini-2.5-flash", "default"]
        for model in models:
            _track_tokens(
                user_email=f"ut_model_{model}@test.com",
                feature="chat", page="dashboard",
                prompt_text="Test " * 250,
                response_text="Resp " * 250,
                model=model
            )
        stats = get_token_usage_stats(days=30)
        assert stats["total_requests"] >= len(models)
