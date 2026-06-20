import { useState, useEffect, useRef, useCallback } from 'react';
import MainLayout from '../components/layout/MainLayout';

const API_BASE = '/api/v1';
const REFRESH_INTERVAL = 300000;

const JOB_TYPE_OPTIONS = [
  { id: 'remote', label: 'Remote', icon: 'fas fa-house-laptop' },
  { id: 'hybrid', label: 'Hybrid', icon: 'fas fa-building-columns' },
  { id: 'on_site', label: 'On-Site', icon: 'fas fa-building' },
];

const PLATFORM_OPTIONS = [
  { id: 'linkedin', label: 'LinkedIn', icon: 'fab fa-linkedin', color: '#0a66c2' },
  { id: 'indeed', label: 'Indeed', icon: 'fas fa-briefcase', color: '#2164f3' },
  { id: 'glassdoor', label: 'Glassdoor', icon: 'fas fa-door-open', color: '#0caa41' },
  { id: 'zip_recruiter', label: 'ZipRecruiter', icon: 'fas fa-bolt', color: '#5fba3d' },
  { id: 'google', label: 'Google Jobs', icon: 'fab fa-google', color: '#4285f4' },
  { id: 'bayt', label: 'Bayt', icon: 'fas fa-globe', color: '#1b7f5a' },
  { id: 'naukri', label: 'Naukri', icon: 'fas fa-briefcase', color: '#ff6f00' },
];

const TYPE_LABELS = { remote: 'Remote', hybrid: 'Hybrid', on_site: 'On-Site' };
const TYPE_COLORS = { remote: '#22c55e', hybrid: '#f59e0b', on_site: '#4dabf7' };
const PLATFORM_COLORS = Object.fromEntries(PLATFORM_OPTIONS.map(p => [p.id, p.color]));

function JobCard({ job }) {
  const typeColor = TYPE_COLORS[job.type] || TYPE_COLORS.on_site;
  const scoreColor = job.match_score >= 80 ? '#22c55e' : job.match_score >= 60 ? '#f59e0b' : '#ef4444';
  const sourceColor = PLATFORM_COLORS[job.source] || '#6b7280';

  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: '12px', padding: '1.25rem',
      display: 'flex', flexDirection: 'column', gap: '0.75rem',
      transition: 'all 0.2s', position: 'relative',
      boxShadow: 'var(--shadow)',
    }}>
      {/* Match Score */}
      <div style={{
        position: 'absolute', top: '12px', right: '12px',
        width: '40px', height: '40px', borderRadius: '50%',
        background: `${scoreColor}15`, border: `2px solid ${scoreColor}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.75rem', fontWeight: 700, color: scoreColor,
      }}>
        {job.match_score}
      </div>

      {/* Source badge */}
      {job.source && (
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          fontSize: '0.6rem', fontWeight: 600, textTransform: 'uppercase',
          padding: '0.1rem 0.4rem', borderRadius: '4px',
          background: `${sourceColor}15`, color: sourceColor,
          letterSpacing: '0.3px',
        }}>
          {job.source}
        </div>
      )}

      {/* Company + Title */}
      <div style={{ paddingRight: '50px', paddingTop: job.source ? '4px' : 0 }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
          {job.company}
        </div>
        <h6 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text)', fontWeight: 600, lineHeight: 1.3 }}>
          {job.title}
        </h6>
      </div>

      {/* Location + Type */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          <i className="fas fa-location-dot" style={{ fontSize: '0.65rem' }}></i> {job.location}
        </span>
        <span style={{
          fontSize: '0.7rem', fontWeight: 600, padding: '0.15rem 0.5rem',
          borderRadius: '6px', background: `${typeColor}15`, color: typeColor,
        }}>
          <i className={JOB_TYPE_OPTIONS.find(o => o.id === job.type)?.icon || 'fas fa-building'} style={{ fontSize: '0.6rem', marginRight: '0.25rem' }}></i>
          {TYPE_LABELS[job.type] || job.type}
        </span>
        {job.date_posted && (
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <i className="far fa-calendar" style={{ fontSize: '0.6rem' }}></i>
            {new Date(job.date_posted).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* Description */}
      <p style={{ fontSize: '0.8rem', color: 'var(--text2)', lineHeight: 1.5, margin: 0, flex: 1 }}>
        {job.description}
      </p>

      {/* Salary + Apply */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
        {job.salary_range ? (
          <span style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 600 }}>
            <i className="fas fa-indian-rupee-sign" style={{ fontSize: '0.7rem' }}></i> {job.salary_range}
          </span>
        ) : <span />}
        <a href={job.apply_url} target="_blank" rel="noopener noreferrer" style={{
          background: 'var(--primary)', color: '#fff', padding: '0.4rem 1rem',
          borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600,
          textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px var(--primary-glow)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
          Apply <i className="fas fa-external-link-alt" style={{ fontSize: '0.65rem' }}></i>
        </a>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem',
    }}>
      <div style={{ height: '14px', width: '40%', background: 'var(--bg3)', borderRadius: '4px' }} />
      <div style={{ height: '18px', width: '70%', background: 'var(--bg3)', borderRadius: '4px' }} />
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <div style={{ height: '14px', width: '80px', background: 'var(--bg3)', borderRadius: '4px' }} />
        <div style={{ height: '14px', width: '60px', background: 'var(--bg3)', borderRadius: '4px' }} />
      </div>
      <div style={{ height: '14px', width: '100%', background: 'var(--bg3)', borderRadius: '4px' }} />
      <div style={{ height: '14px', width: '85%', background: 'var(--bg3)', borderRadius: '4px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ height: '14px', width: '100px', background: 'var(--bg3)', borderRadius: '4px' }} />
        <div style={{ height: '30px', width: '70px', background: 'var(--bg3)', borderRadius: '8px' }} />
      </div>
    </div>
  );
}

export default function JobsPage() {
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [jobs, setJobs] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);
  const [typeFilters, setTypeFilters] = useState({ remote: true, hybrid: true, on_site: true });
  const [platformFilters, setPlatformFilters] = useState(
    Object.fromEntries(PLATFORM_OPTIONS.map(p => [p.id, true]))
  );
  const [keywordFilter, setKeywordFilter] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedResume, setUploadedResume] = useState(null);
  const fileInputRef = useRef(null);
  const refreshTimerRef = useRef(null);
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');
  const [quickLocation, setQuickLocation] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/resumes`, { credentials: 'include' })
      .then(r => r.json())
      .then(d => setResumes(d.resumes || []))
      .catch(() => {});
    searchJobs(null, null, 'software engineer', 'remote');
  }, []);

  const getSiteNames = useCallback(() => {
    return PLATFORM_OPTIONS.filter(p => platformFilters[p.id]).map(p => p.id).join(',');
  }, [platformFilters]);

  const searchJobs = useCallback(async (resumeId, resumeData, searchTerm, location) => {
    setSearching(true);
    setError(null);
    try {
      const body = {
        resume_id: resumeId || undefined,
        resume_data: resumeData || undefined,
        filters: Object.fromEntries(Object.entries(typeFilters).filter(([, v]) => v)),
        site_names: getSiteNames(),
        search_term: searchTerm || undefined,
        location: location || undefined,
      };
      const r = await fetch(`${API_BASE}/jobs/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      if (!r.ok) throw new Error('Search failed');
      const data = await r.json();
      setJobs(data.jobs || []);
      setTotalCount(data.total_count || 0);
      setLastUpdated(new Date());
    } catch (e) {
      setError(e.message);
    } finally {
      setSearching(false);
    }
  }, [typeFilters, getSiteNames]);

  const handleQuickSearch = (e) => {
    e.preventDefault();
    setSelectedResumeId('');
    setUploadedResume(null);
    searchJobs(null, null, quickSearch, quickLocation);
  };

  const handleResumeSelect = (e) => {
    const id = e.target.value;
    setSelectedResumeId(id);
    setUploadedResume(null);
    if (id) searchJobs(id);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const r = await fetch(`${API_BASE}/resumes/upload`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      if (!r.ok) throw new Error('Upload failed');
      const data = await r.json();
      setUploadedResume(data);
      setSelectedResumeId('');
      searchJobs(null, data.data);
      fetch(`${API_BASE}/resumes`, { credentials: 'include' })
        .then(r2 => r2.json())
        .then(d2 => setResumes(d2.resumes || []));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const toggleTypeFilter = (type) => {
    setTypeFilters(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const togglePlatform = (id) => {
    setPlatformFilters(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    if (!selectedResumeId && !uploadedResume && !quickSearch) return;
    const timer = setTimeout(() => {
      if (selectedResumeId) searchJobs(selectedResumeId);
      else if (uploadedResume) searchJobs(null, uploadedResume.data);
      else if (quickSearch) searchJobs(null, null, quickSearch, quickLocation);
    }, 500);
    return () => clearTimeout(timer);
  }, [typeFilters, platformFilters, selectedResumeId, uploadedResume, quickSearch, quickLocation, searchJobs]);

  useEffect(() => {
    if (!selectedResumeId && !uploadedResume && !quickSearch) return;
    refreshTimerRef.current = setInterval(() => {
      if (selectedResumeId) searchJobs(selectedResumeId);
      else if (uploadedResume) searchJobs(null, uploadedResume.data);
      else if (quickSearch) searchJobs(null, null, quickSearch, quickLocation);
    }, REFRESH_INTERVAL);
    return () => clearInterval(refreshTimerRef.current);
  }, [selectedResumeId, uploadedResume, quickSearch, quickLocation, searchJobs]);

  const filteredJobs = jobs.filter(j => {
    if (keywordFilter) {
      const q = keywordFilter.toLowerCase();
      const matchesTitle = j.title?.toLowerCase().includes(q);
      const matchesCompany = j.company?.toLowerCase().includes(q);
      const matchesDesc = j.description?.toLowerCase().includes(q);
      const matchesLocation = j.location?.toLowerCase().includes(q);
      if (!matchesTitle && !matchesCompany && !matchesDesc && !matchesLocation) return false;
    }
    if (!typeFilters[j.type]) return false;
    return true;
  });

  const formatTime = (d) => {
    if (!d) return '—';
    const diff = Math.floor((Date.now() - d.getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  const hasResume = selectedResumeId || uploadedResume;
  const hasQuery = hasResume || quickSearch;
  const activePlatforms = PLATFORM_OPTIONS.filter(p => platformFilters[p.id]).length;

  const visiblePlatforms = showAllPlatforms ? PLATFORM_OPTIONS : PLATFORM_OPTIONS.slice(0, 4);

  return (
    <MainLayout>
      <div className="page-header-box mb-3">
        <div className="section-header mb-0">
          <h2><i className="fas fa-briefcase me-2"></i>Apply for Jobs</h2>
          <p>Real job listings scraped from multiple platforms in real-time.</p>
        </div>
      </div>

      {/* Controls Bar */}
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px',
        padding: '1.25rem', marginBottom: '1.5rem',
      }}>
        {/* Quick Search */}
        <form onSubmit={handleQuickSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: hasResume ? '1rem' : 0 }}>
          <input type="text" className="form-control form-control-sm" placeholder="Search jobs..." value={quickSearch} onChange={e => setQuickSearch(e.target.value)} style={{ flex: 1, minWidth: 0, fontSize: '0.85rem' }} />
          <input type="text" className="form-control form-control-sm" placeholder="Location (e.g. remote, Mumbai)" value={quickLocation} onChange={e => setQuickLocation(e.target.value)} style={{ flex: '0 1 200px', fontSize: '0.85rem' }} />
          <button type="submit" className="btn btn-sm btn-primary" disabled={!quickSearch || searching}>
            <i className={`fas ${searching ? 'fa-spinner fa-spin' : 'fa-search'} me-1`}></i> Search
          </button>
        </form>

        {hasResume && (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 280px', minWidth: 0 }}>
            <label className="form-label small" style={{ fontWeight: 600 }}>Select Resume</label>
            <select className="form-select form-select-sm" value={selectedResumeId} onChange={handleResumeSelect} style={{ fontSize: '0.85rem' }}>
              <option value="">— Quick Search —</option>
              {resumes.map(r => (
                <option key={r.id} value={r.id}>{r.title}</option>
              ))}
            </select>
          </div>

          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', paddingBottom: '0.5rem' }}>or</div>

          <div style={{ flex: '0 0 auto' }}>
            <label className="form-label small" style={{ fontWeight: 600 }}>&nbsp;</label>
            <button className="btn btn-sm btn-outline-primary" onClick={() => fileInputRef.current?.click()} disabled={isUploading} style={{ display: 'block', whiteSpace: 'nowrap' }}>
              <i className={`fas ${isUploading ? 'fa-spinner fa-spin' : 'fa-upload'} me-1`}></i>
              {isUploading ? 'Uploading...' : 'Upload Resume'}
            </button>
            <input ref={fileInputRef} type="file" accept=".pdf,.docx,.doc,.txt" onChange={handleFileUpload} style={{ display: 'none' }} />
          </div>
        </div>
        )}

        {/* Platform + Type filters */}
        <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'flex-start' }}>
          <div>
            <label className="form-label small" style={{ fontWeight: 600 }}>Platforms ({activePlatforms}/{PLATFORM_OPTIONS.length})</label>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {visiblePlatforms.map(p => {
                const active = platformFilters[p.id];
                return (
                  <button key={p.id} onClick={() => togglePlatform(p.id)} title={p.label} style={{
                    padding: '0.3rem 0.55rem', borderRadius: '8px', border: '1px solid var(--border)',
                    background: active ? p.color : 'transparent',
                    color: active ? '#fff' : 'var(--text-muted)',
                    cursor: 'pointer', fontSize: '0.75rem', fontWeight: 500,
                    transition: 'all 0.15s', opacity: active ? 1 : 0.5,
                  }}>
                    <i className={p.icon} style={{ marginRight: '0.25rem' }}></i>
                    {activePlatforms <= 4 && p.label}
                  </button>
                );
              })}
              {PLATFORM_OPTIONS.length > 4 && (
                <button onClick={() => setShowAllPlatforms(!showAllPlatforms)} style={{
                  padding: '0.3rem 0.55rem', borderRadius: '8px', border: '1px dashed var(--border)',
                  background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.75rem',
                }}>
                  {showAllPlatforms ? 'Less' : `+${PLATFORM_OPTIONS.length - 4} more`}
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="form-label small" style={{ fontWeight: 600 }}>Work Type</label>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {JOB_TYPE_OPTIONS.map(opt => (
                <button key={opt.id} onClick={() => toggleTypeFilter(opt.id)} style={{
                  padding: '0.3rem 0.7rem', borderRadius: '8px', border: '1px solid var(--border)',
                  background: typeFilters[opt.id] ? 'var(--primary)' : 'transparent',
                  color: typeFilters[opt.id] ? '#fff' : 'var(--text)',
                  cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500,
                  display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                  transition: 'all 0.2s',
                }}>
                  <i className={opt.icon} style={{ fontSize: '0.7rem' }}></i>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      {hasQuery && (
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <h5 style={{ margin: 0, color: 'var(--text)' }}>
              {searching ? 'Searching...' : (
                <>{filteredJobs.length} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>jobs found</span>
                  {totalCount > filteredJobs.length && (
                    <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.85rem' }}> (from {totalCount})</span>
                  )}
                </>
              )}
            </h5>
            {!searching && lastUpdated && (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                <i className="fas fa-clock"></i> Updated {formatTime(lastUpdated)}
                <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', marginLeft: '0.25rem', animation: 'pulse 2s infinite' }}></span>
              </span>
            )}
          </div>

          <div style={{ position: 'relative', width: '250px', maxWidth: '100%' }}>
            <i className="fas fa-search" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.8rem' }}></i>
            <input type="text" className="form-control form-control-sm" placeholder="Filter results..." value={keywordFilter} onChange={e => setKeywordFilter(e.target.value)}
              style={{ paddingLeft: '30px', fontSize: '0.85rem' }} />
            {keywordFilter && (
              <button onClick={() => setKeywordFilter('')} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, fontSize: '0.85rem' }}>
                &times;
              </button>
            )}
          </div>
        </div>
      )}

      {error && (
        <div style={{ background: 'rgba(var(--danger-rgb),0.1)', border: '1px solid var(--danger)', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem', color: 'var(--danger)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <i className="fas fa-exclamation-circle"></i> {error}
          <button onClick={() => setError(null)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}>&times;</button>
        </div>
      )}

      {!hasQuery && !searching && !error && (
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '4rem', color: 'var(--text-muted)', marginBottom: '1rem', opacity: 0.5 }}>
            <i className="fas fa-file-search"></i>
          </div>
          <h5 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Search jobs across {PLATFORM_OPTIONS.length} platforms</h5>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '450px', margin: '0 auto', opacity: 0.7 }}>
            Type a job title above and click Search, or select a saved resume to get AI-matched results instantly.
          </p>
        </div>
      )}

      {searching && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1rem' }}>
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {!searching && hasQuery && filteredJobs.length === 0 && totalCount === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <i className="fas fa-search-minus" style={{ fontSize: '2.5rem', color: 'var(--text-muted)', marginBottom: '1rem', opacity: 0.5 }}></i>
          <p style={{ color: 'var(--text-muted)' }}>No jobs found on the selected platforms. Try different keywords, location, or job sites.</p>
        </div>
      )}

      {!searching && hasQuery && filteredJobs.length === 0 && totalCount > 0 && (
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <i className="fas fa-filter" style={{ fontSize: '2.5rem', color: 'var(--text-muted)', marginBottom: '1rem', opacity: 0.5 }}></i>
          <p style={{ color: 'var(--text-muted)' }}>No jobs match your current filters.</p>
        </div>
      )}

      {!searching && filteredJobs.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1rem' }}>
          {filteredJobs.map((job, i) => <JobCard key={`${job.title}-${job.company}-${i}`} job={job} />)}
        </div>
      )}

      {hasQuery && !searching && (
        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <i className="fas fa-sync-alt me-1"></i> Auto-refreshes every 5 minutes
        </div>
      )}
    </MainLayout>
  );
}
