export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg2, #0f0f1a)', borderTop: '1px solid var(--border)', padding: '3rem 2rem 2rem' }}>
      <div className="footer-inner" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '3rem' }}>
        <div className="footer-brand" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--primary)', fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: '1rem' }}>
            <i className="fas fa-robot" style={{ fontSize: '1.4rem' }}></i> Custodian AI Army
          </div>
          <p className="footer-desc" style={{ color: 'var(--text2)', fontSize: '0.875rem', maxWidth: '280px' }}>
            A multi-agent AI platform for learning, building, and creating. Powered by the best AI models in the world.
          </p>
        </div>
        <div className="footer-col">
          <h4 style={{ color: 'var(--text)', fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Platform</h4>
          <a href="/dashboard" style={{ display: 'block', color: 'var(--text2)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '0.5rem' }}>AI Dashboard</a>
          <a href="/learn" style={{ display: 'block', color: 'var(--text2)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Learn with AI</a>
          <a href="/portfolio" style={{ display: 'block', color: 'var(--text2)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Portfolio Builder</a>
          <a href="/agents" style={{ display: 'block', color: 'var(--text2)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Custom Agents</a>
          <a href="/build" style={{ display: 'block', color: 'var(--text2)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Build Your Product</a>
        </div>
        <div className="footer-col">
          <h4 style={{ color: 'var(--text)', fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Account</h4>
          <a href="/api/v1/auth/google" style={{ display: 'block', color: 'var(--text2)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Sign In with Google</a>
          <a href="/payment.html" style={{ display: 'block', color: 'var(--text2)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Upgrade to Pro</a>
          <a href="/dashboard" style={{ display: 'block', color: 'var(--text2)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Try as Guest</a>
        </div>
      </div>
      <div className="footer-bottom" style={{ maxWidth: '1200px', margin: '2rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ color: 'var(--text2)', fontSize: '0.8rem' }}>© 2026 Custodian AI Army. Built with ❤️ and a lot of AI.</p>
        <p style={{ color: 'var(--text2)', fontSize: '0.8rem' }}>Powered by Gemini · Claude · Claude</p>
      </div>
    </footer>
  );
}