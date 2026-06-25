import MainLayout from '../components/layout/MainLayout';

export default function PortfolioPage() {
  return (
    <MainLayout>
      <div className="coming-soon-hero" style={{ textAlign: 'center', padding: '5rem 2rem', maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ fontSize: '5rem', color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
          <i className="fab fa-github"></i>
        </div>
        <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>AI Portfolio Showcase</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          Showcase products you built with <strong>Build Your Product</strong> or any GitHub repo — all personalized with your resume and AI-powered storytelling.
        </p>
        <span className="badge bg-warning text-dark px-3 py-2" style={{ fontSize: '1rem' }}>🚀 Coming Soon</span>

        <div className="feature-preview-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
          {[
            { icon: 'fas fa-rocket', title: 'Product Showcase', desc: 'Highlight products built via the platform — from idea to deployed app' },
            { icon: 'fab fa-github', title: 'GitHub Portfolio', desc: 'Connect a repo and let AI generate a full portfolio page for it' },
            { icon: 'fas fa-file-alt', title: 'Resume-Powered', desc: 'Upload your resume to personalize content, tone, and skills emphasis' },
            { icon: 'fas fa-wand-magic-sparkles', title: 'AI Storytelling', desc: 'AI writes project narratives, tech descriptions, and impact summaries' },
          ].map((f, i) => (
            <div key={i} className="feature-preview-card" style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.5rem', textAlign: 'center', opacity: 0.7 }}>
              <i className={f.icon} style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '0.75rem', display: 'block' }}></i>
              <strong>{f.title}</strong>
              <p className="text-muted small mt-1">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <a href="/dashboard" className="btn btn-outline-info me-2"><i className="fas fa-brain me-2"></i>Try AI Dashboard</a>
          <a href="/" className="btn btn-outline-secondary"><i className="fas fa-home me-2"></i>Back to Home</a>
        </div>
      </div>
    </MainLayout>
  );
}