import { useState, useEffect, useCallback } from 'react';
import { marked } from 'marked';
import MainLayout from '../components/layout/MainLayout';

const API_BASE = '/api/v1';

async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

const PATHWAYS = [
  {
    id: 'web-dev',
    name: 'Web Development',
    icon: 'fas fa-globe',
    color: '#0ea5e9',
    description: 'Build full-stack web apps — frontend to backend',
    courses: [
      'frontend-html', 'frontend-css', 'javascript-es-2015', 'javascript-async-and-network-requests',
      'typescript', 'react', 'react-advanced', 'react-redux', 'node-and-npm', 'http',
      'databases-datastore', 'git', 'terminal-basics',
    ],
    comingSoon: [],
  },
  {
    id: 'app-dev',
    name: 'App Development',
    icon: 'fas fa-mobile-alt',
    color: '#f97316',
    description: 'Cross-platform and native mobile applications',
    courses: [
      'javascript-es-2015', 'javascript-async-and-network-requests', 'react', 'react-advanced',
      'react-redux', 'typescript', 'git',
    ],
    comingSoon: [
      'React Native', 'Flutter & Dart', 'Swift & iOS', 'Kotlin & Android', 'Mobile UI/UX Design',
    ],
  },
  {
    id: 'data-engineering',
    name: 'Data Engineering',
    icon: 'fas fa-database',
    color: '#10b981',
    description: 'Build data pipelines, warehouses, and infrastructure',
    courses: [
      'python-beginner', 'python-intermediate', 'python-advanced', 'python-in-practice',
      'databases-datastore',
    ],
    comingSoon: [
      'SQL & NoSQL Deep Dive', 'ETL Pipelines', 'Apache Spark', 'Data Warehousing',
      'Apache Airflow', 'dbt & Data Modeling', 'Data Lakes & Streaming', 'Data Governance',
    ],
  },
  {
    id: 'cloud-engineering',
    name: 'Cloud Engineering',
    icon: 'fas fa-cloud',
    color: '#6366f1',
    description: 'Design and manage cloud infrastructure at scale',
    courses: [
      'terminal-basics', 'python-beginner', 'git',
    ],
    comingSoon: [
      'Docker & Containers', 'Kubernetes', 'AWS Solutions Architect',
      'Microsoft Azure', 'Google Cloud Platform', 'Terraform & IaC',
      'Cloud Security', 'Serverless Architecture',
    ],
  },
  {
    id: 'devops',
    name: 'DevOps & SRE',
    icon: 'fas fa-infinity',
    color: '#ef4444',
    description: 'Automate, deploy, monitor, and operate at scale',
    courses: [
      'terminal-basics', 'git', 'python-beginner',
    ],
    comingSoon: [
      'Docker & Containers', 'Kubernetes', 'CI/CD (GitHub Actions)',
      'Ansible & Configuration Management', 'Terraform & IaC',
      'Monitoring (Prometheus & Grafana)', 'DevSecOps', 'Site Reliability Engineering',
    ],
  },
  {
    id: 'data-science',
    name: 'Data Science',
    icon: 'fas fa-chart-bar',
    color: '#8b5cf6',
    description: 'Extract insights from data with statistical analysis',
    courses: [
      'python-beginner', 'python-intermediate', 'python-data-science-1-overview-and-numpy',
      'python-data-science-2-pyplot', 'python-data-science-3-pandas',
      'python-data-science-4-machine-learning',
    ],
    comingSoon: [
      'Statistics & Probability', 'Feature Engineering', 'A/B Testing & Experiment Design',
      'Data Visualization (Advanced)', 'BI Tools (Tableau, Power BI)', 'Data Storytelling',
    ],
  },
  {
    id: 'ai-engineering',
    name: 'AI Engineering',
    icon: 'fas fa-brain',
    color: '#06b6d4',
    description: 'Build production AI systems from prototype to deployment',
    courses: [
      'python-beginner', 'python-intermediate', 'python-advanced', 'python-in-practice',
      'python-data-science-1-overview-and-numpy', 'python-data-science-3-pandas',
      'python-data-science-4-machine-learning', 'python-data-science-5-neural-networks',
    ],
    comingSoon: [
      'Natural Language Processing', 'Computer Vision', 'Large Language Models',
      'Retrieval-Augmented Generation', 'AI Agents & Tool Use', 'Prompt Engineering',
      'Model Deployment (ONNX, TFLite)', 'AI Ethics & Safety',
    ],
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    icon: 'fas fa-robot',
    color: '#a855f7',
    description: 'Classic and modern ML algorithms and workflows',
    courses: [
      'python-beginner', 'python-data-science-1-overview-and-numpy',
      'python-data-science-3-pandas', 'python-data-science-4-machine-learning',
    ],
    comingSoon: [
      'Supervised Learning (Regression, Classification)',
      'Unsupervised Learning (Clustering, Dimensionality)',
      'Model Evaluation & Validation', 'Feature Engineering & Selection',
      'Model Deployment (MLflow, BentoML)', 'MLOps & Pipelines', 'AutoML',
    ],
  },
  {
    id: 'deep-learning',
    name: 'Deep Learning',
    icon: 'fas fa-project-diagram',
    color: '#ec4899',
    description: 'Neural networks and advanced deep learning architectures',
    courses: [
      'python-beginner', 'python-data-science-1-overview-and-numpy',
      'python-data-science-3-pandas', 'python-data-science-4-machine-learning',
      'python-data-science-5-neural-networks',
    ],
    comingSoon: [
      'Convolutional Neural Networks', 'RNN & LSTM', 'Transformers & Attention',
      'Generative Adversarial Networks', 'TensorFlow in Practice',
      'PyTorch in Practice', 'Model Optimization (Quantization, Pruning)',
      'Edge AI & Embedded ML',
    ],
  },
  {
    id: 'reinforcement-learning',
    name: 'Reinforcement Learning',
    icon: 'fas fa-sync-alt',
    color: '#14b8a6',
    description: 'Train agents through interaction and reward',
    courses: [
      'python-beginner', 'python-intermediate', 'python-data-science-1-overview-and-numpy',
      'python-data-science-3-pandas', 'python-data-science-4-machine-learning',
      'python-data-science-5-neural-networks',
    ],
    comingSoon: [
      'RL Fundamentals (Markov Decision Processes)',
      'Q-Learning & SARSA', 'Deep Q-Networks',
      'Policy Gradient Methods', 'Actor-Critic Architectures',
      'Multi-Agent Reinforcement Learning', 'Reward Design & Imitation Learning',
      'RL in Production',
    ],
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    icon: 'fas fa-shield-alt',
    color: '#dc2626',
    description: 'Protect systems, networks, and data from threats',
    courses: [
      'terminal-basics', 'python-beginner', 'http',
    ],
    comingSoon: [
      'Security Foundations (CIA Triad, Risk Mgmt)',
      'Network Security', 'Ethical Hacking & Penetration Testing',
      'Web Application Security (OWASP)', 'Cryptography & PKI',
      'SOC & Incident Response', 'Digital Forensics',
      'Cloud Security & Compliance', 'Certified InfoSec (CISSP, CEH)',
    ],
  },
  {
    id: 'backend-development',
    name: 'Backend Development',
    icon: 'fas fa-server',
    color: '#7c3aed',
    description: 'APIs, microservices, databases, and server logic',
    courses: [
      'python-beginner', 'python-intermediate', 'node-and-npm', 'http',
      'databases-datastore', 'git', 'terminal-basics',
    ],
    comingSoon: [
      'REST API Design & Best Practices', 'GraphQL APIs',
      'Authentication & Authorization (JWT, OAuth)',
      'Docker for Backend Devs', 'Background Jobs & Queues',
      'Caching (Redis, CDN)', 'gRPC & Protocol Buffers',
      'Microservices Architecture', 'API Gateways & Rate Limiting',
    ],
  },
  {
    id: 'frontend-development',
    name: 'Frontend Development',
    icon: 'fas fa-paint-brush',
    color: '#eab308',
    description: 'Modern UI frameworks, styling, and interactive experiences',
    courses: [
      'frontend-html', 'frontend-css', 'javascript-es-2015',
      'javascript-async-and-network-requests', 'typescript',
      'react', 'react-advanced', 'react-redux',
    ],
    comingSoon: [
      'Next.js & Server Components',
      'Tailwind CSS & Utility-First Styling',
      'State Management (Zustand, Jotai)',
      'Web Performance & Lighthouse',
      'Testing (Jest, React Testing Library, Cypress)',
      'Responsive & Mobile-First Design',
      'Animations (Framer Motion, GSAP)',
      'PWA & Offline-First Apps',
    ],
  },
  {
    id: 'system-design',
    name: 'System Design & Architecture',
    icon: 'fas fa-sitemap',
    color: '#f59e0b',
    description: 'Design scalable, reliable, and maintainable systems',
    courses: [
      'http', 'databases-datastore', 'git', 'terminal-basics',
    ],
    comingSoon: [
      'Load Balancing & Reverse Proxies',
      'Database Design (Normalization, Sharding, Replication)',
      'Caching Strategies (CDN, Redis, Memcached)',
      'Message Queues & Event-Driven Architecture',
      'Distributed Systems (CAP, Consensus)',
      'Design Patterns (SOLID, GoF)',
      'Scalability (Horizontal vs Vertical)',
      'System Design Interviews (Top Problems)',
    ],
  },
  {
    id: 'qa-testing',
    name: 'Software Testing & QA',
    icon: 'fas fa-vial',
    color: '#22c55e',
    description: 'Automated testing, CI pipelines, and quality engineering',
    courses: [
      'python-beginner', 'javascript-es-2015', 'javascript-testing', 'git',
    ],
    comingSoon: [
      'Manual Testing & Test Case Design',
      'Automation Testing (Selenium, Playwright)',
      'Unit & Integration Testing (Jest, PyTest)',
      'API Testing (Postman, REST Assured)',
      'Performance & Load Testing (k6, JMeter)',
      'CI/CD for Testing Pipelines',
      'Test-Driven Development (TDD)',
      'BDD & Cucumber Framework',
      'Accessibility Testing (aXe, WCAG)',
    ],
  },
  {
    id: 'mlops',
    name: 'MLOps',
    icon: 'fas fa-cogs',
    color: '#84cc16',
    description: 'Production ML pipelines — from experiment to deployment',
    courses: [
      'python-beginner', 'python-data-science-1-overview-and-numpy',
      'python-data-science-3-pandas', 'python-data-science-4-machine-learning',
      'git',
    ],
    comingSoon: [
      'ML Experiment Tracking (MLflow, Weights & Biases)',
      'Feature Stores & Data Versioning',
      'Model Serving (Triton, TorchServe, BentoML)',
      'CI/CD for Machine Learning Pipelines',
      'Model Monitoring & Drift Detection',
      'A/B Testing & Canary Deployments',
      'Kubernetes for ML Workloads (Kubeflow)',
      'Data Pipeline Orchestration (Airflow, Prefect)',
      'Model Governance & Compliance',
    ],
  },
];

export default function LearnPage() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentLang, setCurrentLang] = useState('en');
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [browseMode, setBrowseMode] = useState('pathways');
  const [expandedPaths, setExpandedPaths] = useState({});

  const togglePath = (id) => {
    setExpandedPaths(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState(null);
  const [sectionLoading, setSectionLoading] = useState(false);
  const [completedSections, setCompletedSections] = useState([]);
  const [view, setView] = useState('list');

  const [terminalOpen, setTerminalOpen] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [codeOutput, setCodeOutput] = useState('Ready.');
  const [codeRunning, setCodeRunning] = useState(false);

  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);

  const loadCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGet(`/courses?lang=${currentLang}`);
      setCourses(data.courses || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [currentLang]);

  useEffect(() => { loadCourses(); }, [loadCourses]);

  useEffect(() => {
    const cats = [...new Set(courses.map(c => c.category).filter(Boolean))];
    setCategories(cats);
    let filtered = courses;
    if (categoryFilter) filtered = filtered.filter(c => c.category === categoryFilter);
    setFilteredCourses(filtered);
  }, [courses, categoryFilter]);

  const openCourse = async (courseId, lang) => {
    try {
      const data = await apiGet(`/courses/${courseId}?lang=${lang || currentLang}`);
      setCurrentCourse(data);
      setCurrentSectionIndex(0);
      setCompletedSections([]);
      setView('detail');
      loadSection(data, 0);
    } catch (e) {
      setError(e.message);
    }
  };

  const loadSection = async (course, index) => {
    if (!course) return;
    const sections = course.sections || [];
    if (index < 0 || index >= sections.length) return;
    setCurrentSectionIndex(index);
    setSectionLoading(true);
    try {
      const data = await apiGet(`/courses/${course.id}/slides/${course.lang || currentLang}/${index}`);
      setCurrentSection(data);
    } catch (e) {
      setCurrentSection({ content: `<p class="text-danger">Failed to load section.</p>`, title: 'Error' });
    } finally {
      setSectionLoading(false);
    }
  };

  const handleNavigateSection = (delta) => {
    if (!currentCourse) return;
    loadSection(currentCourse, currentSectionIndex + delta);
  };

  const showCourseList = () => {
    setView('list');
    setCurrentCourse(null);
    setCurrentSection(null);
  };

  const markSectionComplete = () => {
    if (!completedSections.includes(currentSectionIndex)) {
      setCompletedSections(prev => [...prev, currentSectionIndex]);
    }
    const sections = currentCourse?.sections || [];
    if (currentSectionIndex < sections.length - 1) {
      setTimeout(() => handleNavigateSection(1), 600);
    }
  };

  const progressPct = currentCourse
    ? Math.round((completedSections.length / (currentCourse.sections || []).length) * 100)
    : 0;

  const runCode = async () => {
    if (!codeInput.trim()) return;
    setCodeRunning(true);
    setCodeOutput('Running...');
    try {
      const data = await apiPost('/execute-code', { code: codeInput, language: 'python' });
      setCodeOutput(data.output || data.error || '(no output)');
    } catch (e) {
      setCodeOutput('Error: ' + e.message);
    } finally {
      setCodeRunning(false);
    }
  };

  const sendAiMessage = async () => {
    const msg = aiInput.trim();
    if (!msg) return;
    setAiInput('');
    setAiMessages(prev => [...prev, { role: 'user', content: msg }]);
    setAiLoading(true);
    try {
      const data = await apiPost('/chat/course', {
        message: msg,
        course_id: currentCourse?.id,
        lang: currentCourse?.lang || 'en',
        section_index: currentSectionIndex,
      });
      setAiMessages(prev => [...prev, { role: 'agent', content: data.agent_response?.content || 'No response' }]);
    } catch (e) {
      setAiMessages(prev => [...prev, { role: 'agent', content: 'Error: ' + e.message }]);
    } finally {
      setAiLoading(false);
    }
  };

  const isPython = (currentCourse?.id || '').includes('python');

  const courseMap = {};
  courses.forEach(c => { courseMap[c.id] = c; });

  if (view === 'detail') {
    return (
      <MainLayout>
        <div id="view-course-detail">
          <div className="d-flex align-items-center gap-2 mb-3">
            <button className="btn btn-sm btn-outline-secondary" onClick={showCourseList}>
              <i className="fas fa-arrow-left me-1"></i> Back to Courses
            </button>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{currentCourse?.title}</span>
          </div>
          <div className="course-detail-layout">
            <aside className="course-sidebar">
              <div className="course-sidebar-header">
                <h5>Course Modules</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="small" style={{ color: 'var(--text-muted)' }}>
                    {completedSections.length}/{(currentCourse?.sections || []).length} done
                  </span>
                  <span className="small" style={{ color: 'var(--primary)' }}>{progressPct}%</span>
                </div>
                <div className="course-progress-bar-wrap mt-1">
                  <div className="course-progress-fill" style={{ width: progressPct + '%' }}></div>
                </div>
              </div>
              <nav className="course-module-list">
                {(currentCourse?.sections || []).map((s, i) => {
                  const done = completedSections.includes(i);
                  const active = i === currentSectionIndex;
                  return (
                    <div key={i} className={`course-module-item ${active ? 'active' : ''} ${done ? 'completed' : ''}`}
                      onClick={() => loadSection(currentCourse, i)}>
                      <span className="module-icon">
                        <i className={`fas ${done ? 'fa-check-circle' : active ? 'fa-play-circle' : 'fa-circle'}`}></i>
                      </span>
                      <span>{s.title}</span>
                    </div>
                  );
                })}
              </nav>
            </aside>
            <div className="course-content-area">
              <div className="course-content-header">
                <div className="d-flex align-items-center gap-2">
                  <h3>{currentSection?.title || 'Section Title'}</h3>
                  <span className="badge bg-secondary">{(currentCourse?.lang || 'EN').toUpperCase()}</span>
                  <span className="badge ms-1" style={{ background: 'var(--primary)', color: '#000' }}>
                    {currentSectionIndex + 1}/{(currentCourse?.sections || []).length}
                  </span>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-secondary" disabled={currentSectionIndex === 0}
                    onClick={() => handleNavigateSection(-1)}>
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-success" onClick={markSectionComplete}>
                    <i className="fas fa-check me-1"></i>Done
                  </button>
                  <button className="btn btn-sm btn-outline-info"
                    disabled={currentSectionIndex >= (currentCourse?.sections || []).length - 1}
                    onClick={() => handleNavigateSection(1)}>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
              <div className="course-slide-content">
                {sectionLoading ? (
                  <div className="text-center py-5" style={{ color: 'var(--text-muted)' }}>
                    <div className="spinner"></div>
                    <p className="mt-2">Loading section...</p>
                  </div>
                ) : currentSection ? (
                  <div className="course-slide-rendered" dangerouslySetInnerHTML={{ __html: marked.parse(currentSection.content) }} />
                ) : (
                  <div className="no-section-selected">
                    <i className="fas fa-book-open"></i>
                    <h4>Select a Module</h4>
                    <p>Choose a topic from the sidebar to start learning. Track your progress as you complete each section.</p>
                  </div>
                )}
              </div>
              {isPython && (
                <div className="course-terminal-section">
                  <div className="course-terminal-header" onClick={() => setTerminalOpen(!terminalOpen)}>
                    <span><i className="fas fa-terminal me-2"></i>Python Playground</span>
                    <i className={`fas fa-chevron-${terminalOpen ? 'up' : 'down'}`}></i>
                  </div>
                  {terminalOpen && (
                    <div>
                      <textarea className="course-code-editor" placeholder="# Write Python code here..."
                        value={codeInput} onChange={e => setCodeInput(e.target.value)}></textarea>
                      <div className="d-flex gap-2 p-2" style={{ background: 'var(--bg3)' }}>
                        <button className="btn btn-sm btn-success" onClick={runCode} disabled={codeRunning}>
                          <i className="fas fa-play me-1"></i>{codeRunning ? 'Running...' : 'Run'}
                        </button>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => { setCodeOutput('Ready.'); setCodeInput(''); }}>
                          <i className="fas fa-trash me-1"></i>Clear
                        </button>
                      </div>
                      <div className="course-terminal-output">{codeOutput}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="course-ai-panel" style={{ display: aiPanelOpen ? 'flex' : 'none' }}>
              <div className="course-ai-header"><i className="fas fa-robot me-2"></i>AI Tutor</div>
              <div className="course-ai-messages">
                {aiMessages.length === 0 && (
                  <div className="text-center p-3" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    Ask me anything about this topic!
                  </div>
                )}
                {aiMessages.map((m, i) => (
                  <div key={i} className={`message ${m.role}`}>
                    <div className="message-content">{m.content}</div>
                  </div>
                ))}
                {aiLoading && (
                  <div className="message agent">
                    <div className="typing-indicator"><span></span><span></span><span></span></div>
                  </div>
                )}
              </div>
              <div className="course-ai-input-area">
                <div className="d-flex gap-2">
                  <textarea className="form-control form-control-sm" rows="2" placeholder="Ask about this topic..."
                    value={aiInput} onChange={e => setAiInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAiMessage(); } }}
                    style={{ background: 'var(--bg3)', color: 'var(--text)', borderColor: 'var(--border)' }}></textarea>
                  <button className="btn btn-sm btn-info" onClick={sendAiMessage} disabled={aiLoading}>
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 d-flex justify-content-end">
            <button className="btn btn-sm btn-outline-info" onClick={() => setAiPanelOpen(!aiPanelOpen)}>
              <i className="fas fa-robot me-1"></i>AI Tutor
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="page-header-box mb-3">
        <div className="section-header mb-0">
          <h2><i className="fas fa-graduation-cap me-2"></i>Learn with AI</h2>
          <p>Interactive courses with AI-powered tutoring</p>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div></div>
        <div className="d-flex gap-1">
          <button className={`btn btn-sm ${browseMode === 'pathways' ? 'btn-info' : 'btn-outline-secondary'}`}
            onClick={() => setBrowseMode('pathways')}>
            <i className="fas fa-map-signs me-1"></i>Pathways
          </button>
          <button className={`btn btn-sm ${browseMode === 'all' ? 'btn-info' : 'btn-outline-secondary'}`}
            onClick={() => setBrowseMode('all')}>
            <i className="fas fa-th me-1"></i>All Courses
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5" style={{ color: 'var(--text-muted)' }}>
          <div className="spinner"></div>
          <p className="mt-2">Loading courses...</p>
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : browseMode === 'pathways' ? (
        <div className="pathways-grid">
          {PATHWAYS.map(pw => {
            const pwCourses = pw.courses.map(id => courseMap[id]).filter(Boolean);
            const isExpanded = expandedPaths[pw.id] === true;
            if (pwCourses.length === 0) return null;
            return (
              <div key={pw.id} className="pathway-card">
                <div className="pathway-header" style={{ borderLeftColor: pw.color }} onClick={() => togglePath(pw.id)}>
                  <div className="pathway-icon" style={{ color: pw.color }}>
                    <i className={pw.icon}></i>
                  </div>
                  <div className="pathway-header-text">
                    <h3 className="pathway-name">{pw.name}</h3>
                    <p className="pathway-desc">{pw.description}</p>
                  </div>
                  <div className="pathway-toggle">
                    <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`} style={{ color: pw.color }}></i>
                  </div>
                </div>
                {isExpanded && (
                <div className="pathway-steps">
                  {pwCourses.map((course, i) => (
                    <div key={course.id} className="pathway-step" onClick={() => openCourse(course.id, course.lang)}>
                      <div className="step-number" style={{ background: pw.color }}>{i + 1}</div>
                      <div className="step-content">
                        <div className="step-title">{course.title}</div>
                        <div className="step-meta">
                          <span>{course.section_count || 0} modules</span>
                          {course.category && <span className="badge bg-secondary ms-1">{course.category}</span>}
                        </div>
                      </div>
                      <i className="fas fa-chevron-right step-arrow" style={{ color: pw.color }}></i>
                    </div>
                  ))}
                  {pw.comingSoon.map((title, i) => (
                    <div key={`cs-${i}`} className="pathway-step coming-soon">
                      <div className="step-number" style={{ background: pw.color, opacity: 0.4 }}>{pwCourses.length + i + 1}</div>
                      <div className="step-content">
                        <div className="step-title">
                          {title}
                          <span className="badge bg-secondary ms-2 coming-soon-badge">Coming Soon</span>
                        </div>
                        <div className="step-meta">
                          <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Not yet available</span>
                        </div>
                      </div>
                      <i className="fas fa-clock step-arrow" style={{ color: 'var(--text-muted)' }}></i>
                    </div>
                  ))}
                </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div className="category-filter-bar">
            <button className={`btn btn-sm ${!categoryFilter ? 'btn-info' : 'btn-outline-info'}`}
              onClick={() => setCategoryFilter(null)}>All</button>
            {categories.map(cat => (
              <button key={cat} className={`btn btn-sm ${categoryFilter === cat ? 'btn-info' : 'btn-outline-secondary'}`}
                onClick={() => setCategoryFilter(cat)}>{cat}</button>
            ))}
          </div>
          <div className="learning-paths-grid">
            {filteredCourses.length === 0 ? (
              <p className="text-muted">No courses found.</p>
            ) : (
              filteredCourses.map(course => (
                <div key={course.id} className="learning-path-card" onClick={() => openCourse(course.id, course.lang)}>
                  <div className="path-icon"><i className={course.icon || 'fas fa-book'}></i></div>
                  <div className="path-title">{course.title}</div>
                  <div className="path-description">{course.description || ''}</div>
                  <div className="path-footer">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-secondary">{course.category || 'General'}</span>
                      <span className="text-muted small">{course.section_count || 0} modules</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </MainLayout>
  );
}
