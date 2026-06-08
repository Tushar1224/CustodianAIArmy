import MainLayout from '../components/layout/MainLayout';

export default function PortfolioPage() {
  return (
    <MainLayout>
      <div className="coming-soon-hero" style={{ textAlign: 'center', padding: '5rem 2rem', maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ fontSize: '5rem', color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
          <i className="fab fa-github"></i>
        </div>
        <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>Portfolio Builder</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          Build a stunning developer portfolio with AI assistance. Showcase your projects, skills, and achievements — automatically generated and hosted.
        </p>
        <span className="badge bg-warning text-dark px-3 py-2" style={{ fontSize: '1rem' }}>🚀 Coming Soon</span>

        <div className="feature-preview-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
          {[
            { icon: 'fas fa-magic', title: 'AI-Generated Bio', desc: 'Describe yourself and let AI craft a professional bio' },
            { icon: 'fab fa-github', title: 'GitHub Integration', desc: 'Auto-import your repos and highlight top projects' },
            { icon: 'fas fa-palette', title: 'Custom Themes', desc: 'Choose from futuristic, minimal, or classic designs' },
            { icon: 'fas fa-globe', title: 'One-Click Deploy', desc: 'Deploy to a custom subdomain instantly' },
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