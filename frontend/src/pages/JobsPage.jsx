import MainLayout from '../components/layout/MainLayout';

const JOB_FEATURES = [
  { icon: 'fas fa-search', title: 'Smart Job Matching', desc: 'AI matches your resume and skills to the best opportunities across multiple job boards.' },
  { icon: 'fas fa-file-signature', title: 'Auto-Tailored Applications', desc: 'Each application is custom-written by AI to highlight your fit for that specific role.' },
  { icon: 'fas fa-robot', title: 'AI Interview Prep', desc: 'Practice with an AI interviewer that adapts to the job description and your resume.' },
  { icon: 'fas fa-chart-line', title: 'Application Tracking', desc: 'Track your applications, responses, and follow-ups in one unified dashboard.' },
];

export default function JobsPage() {
  return (
    <MainLayout>
      <div className="coming-soon-hero" style={{ textAlign: 'center', padding: '5rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ fontSize: '5rem', color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
          <i className="fas fa-briefcase"></i>
        </div>
        <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>Apply for Jobs with AI</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          Your AI-powered job search assistant. Find relevant positions, auto-tailor applications, 
          and track everything — all powered by your profile and resume.
        </p>
        <span className="badge bg-warning text-dark px-3 py-2" style={{ fontSize: '1rem' }}>Coming Soon</span>

        <div className="feature-preview-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
          {JOB_FEATURES.map((f, i) => (
            <div key={i} className="feature-preview-card" style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.5rem', textAlign: 'center', opacity: 0.7 }}>
              <i className={f.icon} style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '0.75rem', display: 'block' }}></i>
              <strong>{f.title}</strong>
              <p className="text-muted small mt-1">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <a href="/resume" className="btn btn-outline-info me-2"><i className="fas fa-file-alt me-2"></i>Build Your Resume First</a>
          <a href="/" className="btn btn-outline-secondary"><i className="fas fa-home me-2"></i>Back to Home</a>
        </div>
      </div>
    </MainLayout>
  );
}
