import { useState, useEffect } from 'react';

const API_BASE = '/api/v1';

const PROVIDER_META = {
  gemini: { label: 'Gemini', icon: 'fab fa-google' },
  anthropic: { label: 'Claude', icon: 'fas fa-brain' },
};

export default function ProviderSwitcher({ compact = false }) {
  const [provider, setProvider] = useState('anthropic');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/provider/active`, { credentials: 'include' })
      .then(r => r.json())
      .then(data => {
        if (data.active_provider) setProvider(data.active_provider);
      })
      .catch(() => {});
  }, []);

  const switchProvider = async (newProvider) => {
    if (loading || newProvider === provider) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/provider/switch`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: newProvider }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setProvider(data.active_provider);
        window.dispatchEvent(new CustomEvent('provider-changed', { detail: data.active_provider }));
      }
    } catch (e) {
      console.error('Failed to switch provider', e);
    }
    setLoading(false);
  };

  const meta = PROVIDER_META[provider] || PROVIDER_META.anthropic;
  const icon = meta.icon;
  const label = compact ? meta.label.charAt(0) : meta.label;

  return (
    <div className="dropdown provider-switcher" style={{ display: 'inline-block' }}>
      <button className="btn btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false"
        style={{
          background: provider === 'anthropic' ? 'rgba(245,158,11,0.12)' : 'rgba(77,171,247,0.12)',
          border: `1px solid ${provider === 'anthropic' ? 'rgba(245,158,11,0.4)' : 'rgba(77,171,247,0.4)'}`,
          color: provider === 'anthropic' ? '#f59e0b' : '#4dabf7',
          borderRadius: '4px',
          padding: compact ? '0.2rem 0.4rem' : '0.3rem 0.6rem',
          fontSize: compact ? '0.7rem' : '0.75rem',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          opacity: loading ? 0.6 : 1,
        }}
        disabled={loading}
        title={`Provider: ${meta.label}`}
      >
        <i className={icon}></i>
        {!compact && <span className="ms-1">{label}</span>}
      </button>
      <ul className="dropdown-menu" style={{
        background: 'var(--secondary-bg)',
        border: '1px solid var(--border-color)',
        minWidth: '140px',
        fontSize: '0.8rem',
      }}>
        <li>
          <button className={`dropdown-item ${provider === 'gemini' ? 'active' : ''}`}
            style={{ color: provider === 'gemini' ? '#4dabf7' : 'var(--text-primary)' }}
            onClick={() => switchProvider('gemini')} disabled={loading}>
            <i className="fab fa-google me-2"></i>Google (Gemini)
          </button>
        </li>
        <li>
          <button className={`dropdown-item ${provider === 'anthropic' ? 'active' : ''}`}
            style={{ color: provider === 'anthropic' ? '#f59e0b' : 'var(--text-primary)' }}
            onClick={() => switchProvider('anthropic')} disabled={loading}>
            <i className="fas fa-brain me-2"></i>Anthropic (Claude)
          </button>
        </li>
      </ul>
    </div>
  );
}
