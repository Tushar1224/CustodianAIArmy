import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import AdSenseAd from '../components/layout/AdSenseAd';
import { useAuth } from '../hooks/useAuth';

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export default function PaymentPage() {
  const navigate = useNavigate();
  const { user, loading, plan: contextPlan, refetch } = useAuth();
  const [config, setConfig] = useState(null);
  const [country, setCountry] = useState('IN');
  const [geoLoading, setGeoLoading] = useState(true);
  const [step, setStep] = useState('form');
  const [errorMsg, setErrorMsg] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [upiRef, setUpiRef] = useState('');
  const [utr, setUtr] = useState('');
  const [realPlan, setRealPlan] = useState(null);

  // Use realPlan from backend if available, otherwise context plan
  const plan = realPlan || contextPlan;

  useEffect(() => { refetch(); }, []);

  const fetchConfig = useCallback(() => {
    const email = user?.email || '';
    fetch(`/api/v1/payment/config${email ? '?email=' + encodeURIComponent(email) : ''}`)
      .then(r => r.json())
      .then(data => {
        setConfig(data);
        if (data.plan) setRealPlan(data.plan);
      })
      .catch(() => setConfig({ upi_id: '9424740106@yescred', prices: { inr: 400, usd: 10 } }));
  }, [user]);

  useEffect(() => { fetchConfig(); }, [fetchConfig]);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => { if (data?.country_code) setCountry(data.country_code); })
      .catch(() => {})
      .finally(() => setGeoLoading(false));
  }, []);

  const priceInr = config?.prices?.inr || 400;
  const usdPrice = config?.prices?.usd || 10;
  const upiId = config?.upi_id || '9424740106@yescred';
  const payeeName = 'Custodian AI';

  const displayPrice = country === 'IN'
    ? `₹${priceInr}`
    : `$${usdPrice} USD`;

  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${priceInr}&cu=INR&tn=Pro%20Plan%20Upgrade`;

  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUrl)}`;

  const handlePayNow = () => {
    if (!upiRef.trim()) {
      setErrorMsg('Please enter your UPI ID before proceeding.');
      return;
    }
    setErrorMsg('');
    if (isMobile) {
      window.open(upiUrl, '_blank');
    }
    setStep('paid');
  };

  const handleVerify = async () => {
    const utrVal = utr.trim();
    if (!utrVal) {
      setErrorMsg('Please enter the 12-digit UTR from your UPI app to confirm payment.');
      return;
    }
    if (utrVal.length < 10 || utrVal.length > 20) {
      setErrorMsg('UTR should be 10–20 characters. Check your UPI app for the transaction reference.');
      return;
    }
    setVerifying(true);
    setErrorMsg('');
    const errEl = document.getElementById('payment-error');
    if (errEl) errEl.classList.add('d-none');

    try {
      const resp = await fetch('/api/v1/user/upgrade-plan', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: 'pro',
          email: user?.email || '',
          amount: priceInr,
          currency: 'inr',
          upi_ref: upiRef.trim() || null,
          transaction_ref: utrVal,
        }),
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.detail || 'Upgrade failed. Please try again.');
      }

      setStep('success');
      await refetch();
      setTimeout(() => { window.location.href = '/'; }, 2000);
    } catch (err) {
      setVerifying(false);
      setErrorMsg(err.message);
      if (errEl) { errEl.textContent = err.message; errEl.classList.remove('d-none'); }
    }
  };

  if (loading || (geoLoading && !config)) {
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
              You need to sign in with Google before upgrading to Pro.
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
            <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '0.5rem' }}>
              <i className="fas fa-shield-alt me-1"></i>UPI Secure Payment
            </div>
          </div>

          {step === 'form' && (
            <div id="payment-form-section">
              <div className="plan-summary" style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'rgb(var(--warning-rgb,245,158,11))' }}><i className="fas fa-crown me-2"></i>Pro Plan</div>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)' }}>{displayPrice} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/ month</span></div>
                  </div>
                  <span className="badge" style={{ background: 'var(--primary)', color: '#fff' }}>India Only</span>
                </div>
                <hr style={{ borderColor: 'var(--border)', margin: '1.25rem 0' }} />
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {['50 requests per day', 'Access to Gemini, Claude & Claude Code', 'Chat history saved', 'Course progress tracking', 'Priority support'].map((f, i) => (
                    <li key={i} style={{ color: 'var(--text2)', fontSize: '0.875rem', marginBottom: '0.3rem' }}>
                      <i className="fas fa-check-circle" style={{ color: 'var(--success)', marginRight: '0.5rem' }}></i>{f}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{
                background: 'rgba(124, 58, 237, 0.06)',
                border: '1px solid rgba(124, 58, 237, 0.15)',
                borderRadius: '10px',
                padding: '1rem 1.25rem',
                marginBottom: '1.25rem',
              }}>
                <label style={{ color: 'var(--text2)', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block', fontWeight: 600 }}>
                  <i className="fas fa-user me-1" style={{ color: '#7c3aed' }}></i>
                  Your UPI ID (for payment reference)
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. name@bank"
                  value={upiRef}
                  onChange={(e) => setUpiRef(e.target.value)}
                  style={{ fontSize: '0.95rem' }}
                />
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.35rem' }}>
                  <i className="fas fa-info-circle me-1"></i>
                  Helps us match your payment. Your UPI ID is stored securely as a reference.
                </div>
              </div>

              {errorMsg && step === 'form' && (
                <div className="alert alert-danger" style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}>{errorMsg}</div>
              )}

              <button
                onClick={handlePayNow}
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  padding: '0.85rem',
                  borderRadius: '10px',
                  width: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {isMobile ? (
                  <><i className="fas fa-mobile-alt me-2"></i>Pay {displayPrice} via UPI</>
                ) : (
                  <><i className="fas fa-qrcode me-2"></i>Pay {displayPrice} via UPI</>
                )}
              </button>

              <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.75rem' }}>
                <i className="fas fa-shield-alt me-1"></i>
                {isMobile ? 'You will be redirected to your UPI app' : 'Scan QR with any UPI app on your phone'}
              </div>
            </div>
          )}

          {step === 'paid' && (
            <div id="confirm-section" style={{ textAlign: 'center', padding: '1rem 0.5rem' }}>
              {isMobile ? (
                <>
                  <div style={{ fontSize: '3rem', color: '#7c3aed', marginBottom: '1rem' }}>
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <h3 style={{ color: 'var(--text)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>
                    <i className="fas fa-check-circle me-1" style={{ color: 'var(--success)' }}></i>
                    UPI App Opened
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                    Complete the payment of <strong style={{ color: 'var(--primary)' }}>₹{priceInr}</strong> in your UPI app.
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
                    Pay to: <strong style={{ fontFamily: 'monospace', color: 'var(--text)' }}>{upiId}</strong>
                  </p>
                  <div style={{
                    background: 'rgba(124, 58, 237, 0.08)',
                    border: '1px solid rgba(124, 58, 237, 0.2)',
                    borderRadius: '10px',
                    padding: '1rem',
                    marginBottom: '1.25rem',
                  }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      <i className="fas fa-info-circle me-1" style={{ color: '#7c3aed' }}></i>
                      Didn't open? Tap to retry:
                    </p>
                    <button
                      onClick={() => window.open(upiUrl, '_blank')}
                      style={{
                        background: '#7c3aed',
                        border: 'none',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        padding: '0.6rem 1.5rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                      }}
                    >
                      <i className="fas fa-external-link-alt me-1"></i>Open UPI App
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '2.5rem', color: '#7c3aed', marginBottom: '1rem' }}>
                    <i className="fas fa-qrcode"></i>
                  </div>
                  <h3 style={{ color: 'var(--text)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>Scan QR to Pay</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    Scan this QR with any UPI app on your phone to pay <strong style={{ color: 'var(--primary)' }}>₹{priceInr}</strong>
                  </p>

                  <div style={{
                    background: '#fff',
                    borderRadius: '12px',
                    padding: '12px',
                    display: 'inline-block',
                    marginBottom: '0.75rem',
                  }}>
                    <img
                      src={qrApiUrl}
                      alt="UPI QR Code"
                      style={{ width: 200, height: 200, borderRadius: '4px' }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>

                  <div style={{
                    background: 'var(--bg3)',
                    border: '1px dashed var(--primary)',
                    borderRadius: '10px',
                    padding: '0.6rem 1rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    fontFamily: 'monospace',
                    cursor: 'pointer',
                    userSelect: 'all',
                    marginBottom: '1.25rem',
                  }}
                    onClick={() => navigator.clipboard.writeText(upiId)}
                    title="Click to copy"
                  >
                    <i className="fas fa-copy" style={{ fontSize: '0.8rem', opacity: 0.6 }}></i>
                    {upiId}
                  </div>
                </>
              )}

              <div id="payment-error" className="alert alert-danger d-none" role="alert" style={{ display: 'none', fontSize: '0.85rem' }}></div>
              {errorMsg && step === 'paid' && (
                <div className="alert alert-danger" style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}>{errorMsg}</div>
              )}

              <div style={{
                background: 'rgba(var(--warning-rgb,245,158,11),0.08)',
                border: '1px solid rgba(var(--warning-rgb,245,158,11),0.2)',
                borderRadius: '8px',
                padding: '0.75rem',
                marginBottom: '1rem',
                textAlign: 'left',
              }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                  <i className="fas fa-receipt me-1"></i>Your UPI Reference:
                </div>
                <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.9rem', fontFamily: 'monospace' }}>
                  {upiRef || 'Not provided'}
                </div>
              </div>

              <div style={{
                background: 'rgba(var(--primary-rgb,77,171,247),0.06)',
                border: '1px solid rgba(var(--primary-rgb,77,171,247),0.15)',
                borderRadius: '8px',
                padding: '0.85rem',
                marginBottom: '1rem',
                textAlign: 'left',
              }}>
                <label style={{ color: 'var(--text2)', fontSize: '0.8rem', marginBottom: '0.4rem', display: 'block', fontWeight: 600 }}>
                  <i className="fas fa-receipt me-1" style={{ color: 'var(--primary)' }}></i>
                  UPI Transaction Ref (UTR/RRN) *
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="12-digit UTR from your UPI app"
                  value={utr}
                  onChange={(e) => setUtr(e.target.value.toUpperCase())}
                  style={{ fontSize: '0.85rem', fontFamily: 'monospace' }}
                />
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '0.3rem' }}>
                  Enter the 12-digit UTR/RRN shown in your UPI app after payment — this verifies your transaction.
                </div>
              </div>

              <button
                id="verify-btn"
                onClick={handleVerify}
                disabled={verifying}
                style={{
                  background: verifying
                    ? 'var(--text-muted)'
                    : 'linear-gradient(135deg, var(--success), #16a34a)',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  padding: '0.85rem',
                  borderRadius: '10px',
                  width: '100%',
                  cursor: verifying ? 'not-allowed' : 'pointer',
                  opacity: verifying ? 0.6 : 1,
                  transition: 'all 0.2s',
                }}
              >
                {verifying ? (
                  <><i className="fas fa-spinner fa-spin me-2"></i>Verifying...</>
                ) : (
                  <><i className="fas fa-check-circle me-2"></i>Yes, I've Paid — Upgrade Now</>
                )}
              </button>

              <div style={{ marginTop: '1rem' }}>
                <button
                  onClick={() => { setStep('form'); setErrorMsg(''); setUtr(''); }}
                  className="btn btn-link"
                  style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}
                >
                  <i className="fas fa-arrow-left me-1"></i>Cancel & Go Back
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="success-overlay" id="success-section" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ fontSize: '4rem', color: 'var(--success)', marginBottom: '1rem' }}><i className="fas fa-check-circle"></i></div>
              <h2 style={{ color: 'var(--success)', margin: '0 0 0.5rem 0' }}>Payment Successful!</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>You've been upgraded to <strong style={{ color: 'rgb(var(--warning-rgb,245,158,11))' }}>Pro</strong>.</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Redirecting to home page...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
