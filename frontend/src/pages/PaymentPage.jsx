import { useCallback } from 'react';
import AdSenseAd from '../components/layout/AdSenseAd';

export default function PaymentPage() {
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

      let count = 3;
      const timer = setInterval(() => {
        count--;
        const el = document.getElementById('countdown');
        if (el) el.textContent = count;
        if (count <= 0) { clearInterval(timer); window.close(); }
      }, 1000);
    } catch (err) {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i className="fas fa-lock me-2"></i>Pay $9.99 & Upgrade to Pro';
      }
      if (errEl) { errEl.textContent = err.message; errEl.classList.remove('d-none'); }
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%)', display: 'flex', flexDirection: 'column' }}>
      <AdSenseAd />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <div className="payment-card" style={{ background: 'rgba(26, 26, 46, 0.95)', border: '1px solid rgba(0, 229, 255, 0.3)', borderRadius: '16px', padding: '2rem', maxWidth: '460px', width: '100%', boxShadow: '0 0 40px rgba(0, 229, 255, 0.1)' }}>
          <div className="brand-header" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '2.5rem', color: '#00e5ff', marginBottom: '0.5rem' }}><i className="fas fa-robot"></i></div>
            <h1 style={{ fontSize: '1.4rem', color: '#00e5ff', margin: 0 }}>Custodian AI</h1>
            <div style={{ background: 'rgba(255, 193, 7, 0.15)', border: '1px solid rgba(255, 193, 7, 0.4)', color: '#ffc107', fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '20px', display: 'inline-block', marginTop: '0.5rem' }}>
              <i className="fas fa-flask me-1"></i>Demo / Sandbox Mode
            </div>
          </div>

          <div id="payment-form-section">
            <div className="plan-summary" style={{ background: 'rgba(0, 229, 255, 0.05)', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffc107' }}><i className="fas fa-crown me-2" style={{ color: '#ffc107' }}></i>Pro Plan</div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#00e5ff' }}>$9.99 <span style={{ fontSize: '1rem', color: '#aaa', fontWeight: 400 }}>/ month</span></div>
                </div>
                <span className="badge bg-warning text-dark">Most Popular</span>
              </div>
              <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '1.25rem 0' }} />
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['50 requests per day', 'Access to Gemini, Claude & Claude', 'Chat history saved', 'Course progress tracking', 'Priority support'].map((f, i) => (
                  <li key={i} style={{ color: '#b0b0b0', fontSize: '0.875rem', marginBottom: '0.3rem' }}>
                    <i className="fas fa-check-circle" style={{ color: '#28a745', marginRight: '0.5rem' }}></i>{f}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '0.25rem', display: 'block' }}>Card Number</label>
              <input type="text" className="form-control" id="card-number" placeholder="4242 4242 4242 4242" maxLength="19"
                onInput={(e) => formatCardNumber(e.target)}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0, 229, 255, 0.25)', color: '#e8e8e8', borderRadius: '8px', padding: '0.5rem 0.75rem', width: '100%' }} />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '0.25rem', display: 'block' }}>Expiry</label>
                <input type="text" className="form-control" id="card-expiry" placeholder="MM / YY" maxLength="7"
                  onInput={(e) => formatExpiry(e.target)}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0, 229, 255, 0.25)', color: '#e8e8e8', borderRadius: '8px', padding: '0.5rem 0.75rem', width: '100%' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '0.25rem', display: 'block' }}>CVC</label>
                <input type="text" className="form-control" id="card-cvc" placeholder="123" maxLength="3"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0, 229, 255, 0.25)', color: '#e8e8e8', borderRadius: '8px', padding: '0.5rem 0.75rem', width: '100%' }} />
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '0.25rem', display: 'block' }}>Name on Card</label>
              <input type="text" className="form-control" id="card-name" placeholder="John Doe"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0, 229, 255, 0.25)', color: '#e8e8e8', borderRadius: '8px', padding: '0.5rem 0.75rem', width: '100%' }} />
            </div>

            <div id="payment-error" className="alert alert-danger d-none" role="alert" style={{ display: 'none' }}></div>

            <button className="btn-pay" id="pay-btn" onClick={processPayment}
              style={{ background: 'linear-gradient(135deg, #00b4d8, #00e5ff)', border: 'none', color: '#0a0a1a', fontWeight: 700, fontSize: '1rem', padding: '0.75rem', borderRadius: '10px', width: '100%', cursor: 'pointer' }}>
              <i className="fas fa-lock me-2"></i>Pay $9.99 & Upgrade to Pro
            </button>
            <div style={{ textAlign: 'center', color: '#666', fontSize: '0.75rem', marginTop: '0.75rem' }}>
              <i className="fas fa-shield-alt me-1"></i>Secured by 256-bit SSL encryption
            </div>
          </div>

          <div className="success-overlay" id="success-section" style={{ display: 'none', textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ fontSize: '4rem', color: '#28a745', marginBottom: '1rem' }}><i className="fas fa-check-circle"></i></div>
            <h2 style={{ color: '#28a745', margin: '0 0 0.5rem 0' }}>Payment Successful!</h2>
            <p style={{ color: '#aaa', marginBottom: '0.25rem' }}>You've been upgraded to <strong className="text-warning">Pro</strong>.</p>
            <p style={{ color: '#666', fontSize: '0.875rem' }}>This window will close automatically in <span id="countdown">3</span> seconds...</p>
          </div>
        </div>
      </div>
    </div>
  );
}