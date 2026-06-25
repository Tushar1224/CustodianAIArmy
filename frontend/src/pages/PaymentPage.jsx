import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AdSenseAd from '../components/layout/AdSenseAd';
import { useAuth } from '../hooks/useAuth';

export default function PaymentPage() {
  const navigate = useNavigate();
  const { user, loading, plan } = useAuth();

  const formatCardNumber = useCallback((input) => {
    let v = input.value.replace(/\D/g, '').substring(0, 16);
    input.value = v.replace(/(.{4})/g, '$1 ').trim();
  }, []);

  const formatExpiry = useCallback((input) => {
    let v = input.value.replace(/\D/g, '').substring(0, 4);
    if (v.length >= 2) v = v.substring(0, 2) + ' / ' + v.substring(2);
    input.value = v;
  }, []);

  const processPayment = useCallback(async () => {
    const btn = document.getElementById('pay-btn');
    const errEl = document.getElementById('payment-error');
    errEl?.classList.add('d-none');

    const num = document.getElementById('card-number')?.value.replace(/\s/g, '') || '';
    const exp = document.getElementById('card-expiry')?.value || '';
    const cvc = document.getElementById('card-cvc')?.value || '';
    const name = document.getElementById('card-name')?.value.trim() || '';

    if (num.length < 16 || !exp || cvc.length < 3 || !name) {
      if (errEl) { errEl.textContent = 'Please fill in all card details.'; errEl.classList.remove('d-none'); }
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i className="fas fa-spinner fa-spin me-2"></i>Processing...';
    }

    await new Promise(r => setTimeout(r, 1800));

    try {
      const resp = await fetch('/api/v1/user/upgrade-plan', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: 'pro' })
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.detail || 'Upgrade failed. Please try again.');
      }

      document.getElementById('payment-form-section').style.display = 'none';
      document.getElementById('success-section').style.display = 'block';

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i className="fas fa-lock me-2"></i>Pay $9.99 & Upgrade to Pro';
      }
      if (errEl) { errEl.textContent = err.message; errEl.classList.remove('d-none'); }
    }
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner-border" style={{ width: '3rem', height: '3rem', color: 'var(--primary)' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!user || plan === 'guest') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, var(--bg3) 0%, var(--bg2) 50%, var(--bg) 100%)', display: 'flex', flexDirection: 'column' }}>
        <AdSenseAd />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
          <div className="payment-card" style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2.5rem', maxWidth: '460px', width: '100%', textAlign: 'center', boxShadow: '0 2px 20px rgba(var(--primary-rgb),0.12)' }}>
            <div style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }}>
              <i className="fas fa-sign-in-alt"></i>
            </div>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text)', marginBottom: '0.75rem' }}>Sign In Required</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              You need to sign in with Google before upgrading to Pro. Guest accounts cannot process payments — signing in links your payment to your account.
            </p>
            <a href="/api/v1/auth/google"
               className="btn btn-success btn-lg"
               style={{ padding: '0.75rem 2.5rem', borderRadius: '10px', fontWeight: 700, fontSize: '1.05rem' }}>
              <i className="fab fa-google me-2"></i>Sign in with Google
            </a>
            <div style={{ marginTop: '1rem' }}>
              <button onClick={() => navigate('/')} className="btn btn-link" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>
                <i className="fas fa-arrow-left me-1"></i>Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, var(--bg3) 0%, var(--bg2) 50%, var(--bg) 100%)', display: 'flex', flexDirection: 'column' }}>
      <AdSenseAd />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <div className="payment-card" style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem', maxWidth: '460px', width: '100%', boxShadow: '0 2px 20px rgba(var(--primary-rgb),0.12)' }}>
          <div className="brand-header" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}><i className="fas fa-robot"></i></div>
            <h1 style={{ fontSize: '1.4rem', color: 'var(--text)', margin: 0 }}>Custodian AI</h1>
            <div style={{ background: 'rgba(var(--warning-rgb,245,158,11),0.1)', border: '1px solid rgba(var(--warning-rgb,245,158,11),0.3)', color: 'rgb(var(--warning-rgb,245,158,11))', fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '20px', display: 'inline-block', marginTop: '0.5rem' }}>
              <i className="fas fa-flask me-1"></i>Demo / Sandbox Mode
            </div>
          </div>

          <div id="payment-form-section">
            <div className="plan-summary" style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'rgb(var(--warning-rgb,245,158,11))' }}><i className="fas fa-crown me-2" style={{ color: 'rgb(var(--warning-rgb,245,158,11))' }}></i>Pro Plan</div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)' }}>$9.99 <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/ month</span></div>
                </div>
                <span className="badge" style={{ background: 'var(--primary)', color: '#fff' }}>Most Popular</span>
              </div>
              <hr style={{ borderColor: 'var(--border)', margin: '1.25rem 0' }} />
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['50 requests per day', 'Access to Gemini, Claude & Claude', 'Chat history saved', 'Course progress tracking', 'Priority support'].map((f, i) => (
                  <li key={i} style={{ color: 'var(--text2)', fontSize: '0.875rem', marginBottom: '0.3rem' }}>
                    <i className="fas fa-check-circle" style={{ color: 'var(--success)', marginRight: '0.5rem' }}></i>{f}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: 'var(--text2)', fontSize: '0.85rem', marginBottom: '0.25rem', display: 'block' }}>Card Number</label>
              <input type="text" className="form-control" id="card-number" placeholder="4242 4242 4242 4242" maxLength="19"
                onInput={(e) => formatCardNumber(e.target)} />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ color: 'var(--text2)', fontSize: '0.85rem', marginBottom: '0.25rem', display: 'block' }}>Expiry</label>
                <input type="text" className="form-control" id="card-expiry" placeholder="MM / YY" maxLength="7"
                  onInput={(e) => formatExpiry(e.target)} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ color: 'var(--text2)', fontSize: '0.85rem', marginBottom: '0.25rem', display: 'block' }}>CVC</label>
                <input type="text" className="form-control" id="card-cvc" placeholder="123" maxLength="3" />
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: 'var(--text2)', fontSize: '0.85rem', marginBottom: '0.25rem', display: 'block' }}>Name on Card</label>
              <input type="text" className="form-control" id="card-name" placeholder="John Doe" />
            </div>

            <div id="payment-error" className="alert alert-danger d-none" role="alert" style={{ display: 'none' }}></div>

            <button className="btn-pay" id="pay-btn" onClick={processPayment}
              style={{ background: 'linear-gradient(135deg, var(--primary), rgba(var(--primary-rgb),0.7))', border: 'none', color: '#fff', fontWeight: 700, fontSize: '1rem', padding: '0.75rem', borderRadius: '10px', width: '100%', cursor: 'pointer' }}>
              <i className="fas fa-lock me-2"></i>Pay $9.99 & Upgrade to Pro
            </button>
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.75rem' }}>
              <i className="fas fa-shield-alt me-1"></i>Secured by 256-bit SSL encryption
            </div>
          </div>

          <div className="success-overlay" id="success-section" style={{ display: 'none', textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ fontSize: '4rem', color: 'var(--success)', marginBottom: '1rem' }}><i className="fas fa-check-circle"></i></div>
            <h2 style={{ color: 'var(--success)', margin: '0 0 0.5rem 0' }}>Payment Successful!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>You've been upgraded to <strong style={{ color: 'rgb(var(--warning-rgb,245,158,11))' }}>Pro</strong>.</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Redirecting to home page...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
