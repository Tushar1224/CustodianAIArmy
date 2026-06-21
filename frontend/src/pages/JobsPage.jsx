import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

const API_BASE = '/api/v1';
const REFRESH_INTERVAL = 300000;
const PAGE_SIZE = 9;

const JOB_TYPE_OPTIONS = [
  { id: 'remote', label: 'Remote', icon: 'fas fa-house-laptop' },
  { id: 'hybrid', label: 'Hybrid', icon: 'fas fa-building-columns' },
  { id: 'on_site', label: 'On-Site', icon: 'fas fa-building' },
];

const PLATFORM_OPTIONS = [
  // ═══════════════════════════════════════════════════
  // PRIMARY APIs (free JSON, no key needed)
  // ═══════════════════════════════════════════════════
  { id: 'remoteok', label: 'RemoteOK', icon: 'fas fa-check', color: '#2dd4bf', cat: 'primary_api' },
  { id: 'remotive', label: 'Remotive', icon: 'fas fa-heart', color: '#e11d48', cat: 'primary_api' },
  { id: 'arbeitnow', label: 'Arbeitnow', icon: 'fas fa-bolt', color: '#f59e0b', cat: 'primary_api' },
  { id: 'adzuna', label: 'Adzuna', icon: 'fas fa-chart-bar', color: '#0ea5e9', cat: 'primary_api' },
  { id: 'jooble', label: 'Jooble', icon: 'fas fa-globe', color: '#22c55e', cat: 'primary_api' },
  { id: 'jsearch', label: 'JSearch', icon: 'fas fa-server', color: '#8b5cf6', cat: 'primary_api' },

  // ═══════════════════════════════════════════════════
  // AGGREGATORS (JobSpy-scraped)
  // ═══════════════════════════════════════════════════
  { id: 'linkedin', label: 'LinkedIn', icon: 'fab fa-linkedin', color: '#0a66c2', cat: 'aggregator' },
  { id: 'indeed', label: 'Indeed', icon: 'fas fa-file-pen', color: '#2164f3', cat: 'aggregator' },
  { id: 'glassdoor', label: 'Glassdoor', icon: 'fas fa-door-open', color: '#0caa41', cat: 'aggregator' },
  { id: 'zip_recruiter', label: 'ZipRecruiter', icon: 'fas fa-bolt', color: '#5fba3d', cat: 'aggregator' },
  { id: 'google', label: 'Google Jobs', icon: 'fab fa-google', color: '#4285f4', cat: 'aggregator' },
  { id: 'careerbuilder', label: 'CareerBuilder', icon: 'fas fa-hard-hat', color: '#f97316', cat: 'aggregator' },
  { id: 'monster', label: 'Monster', icon: 'fas fa-skull', color: '#dc2626', cat: 'aggregator' },

  // ═══════════════════════════════════════════════════
  // FREELANCE PROJECT MARKETPLACES (General)
  // ═══════════════════════════════════════════════════
  { id: 'upwork', label: 'Upwork', icon: 'fas fa-briefcase', color: '#6ee4b0', cat: 'freelance' },
  { id: 'freelancer', label: 'Freelancer', icon: 'fas fa-laptop-code', color: '#29b2fe', cat: 'freelance' },
  { id: 'contra', label: 'Contra', icon: 'fas fa-exchange-alt', color: '#6366f1', cat: 'freelance' },
  { id: 'braintrust', label: 'Braintrust', icon: 'fas fa-brain', color: '#7c3aed', cat: 'freelance' },
  { id: 'truelancer', label: 'Truelancer', icon: 'fas fa-check-circle', color: '#0891b2', cat: 'freelance' },
  { id: 'workana', label: 'Workana', icon: 'fas fa-globe-americas', color: '#ea580c', cat: 'freelance' },
  { id: 'guru', label: 'Guru', icon: 'fas fa-chalkboard-user', color: '#0d9488', cat: 'freelance' },
  { id: 'peopleperhour', label: 'PeoplePerHour', icon: 'fas fa-clock', color: '#f97316', cat: 'freelance' },
  { id: 'servicescape', label: 'ServiceScape', icon: 'fas fa-paint-roller', color: '#0284c7', cat: 'freelance' },
  { id: 'hubstaff_talent', label: 'Hubstaff Talent', icon: 'fas fa-hourglass-start', color: '#16a34a', cat: 'freelance' },
  { id: 'yunojuno', label: 'YunoJuno', icon: 'fas fa-moon', color: '#6366f1', cat: 'freelance' },
  { id: 'freelancemyway', label: 'FreelanceMyWay', icon: 'fas fa-route', color: '#d946ef', cat: 'freelance' },
  { id: 'bark', label: 'Bark', icon: 'fas fa-paw', color: '#f59e0b', cat: 'freelance' },
  { id: 'zeerk', label: 'Zeerk', icon: 'fas fa-tasks', color: '#22c55e', cat: 'freelance' },
  { id: 'legiit', label: 'Legiit', icon: 'fas fa-gavel', color: '#9333ea', cat: 'freelance' },
  { id: 'twine', label: 'Twine', icon: 'fas fa-t', color: '#0891b2', cat: 'freelance' },

  // ═══════════════════════════════════════════════════
  // DEVELOPER-FOCUSED FREELANCE
  // ═══════════════════════════════════════════════════
  { id: 'gun_io', label: 'Gun.io', icon: 'fas fa-crosshairs', color: '#0d9488', cat: 'freelance_dev' },
  { id: 'lemon_io', label: 'Lemon.io', icon: 'fas fa-lemon', color: '#eab308', cat: 'freelance_dev' },
  { id: 'turing', label: 'Turing', icon: 'fas fa-robot', color: '#0d9488', cat: 'freelance_dev' },
  { id: 'flexiple', label: 'Flexiple', icon: 'fas fa-code', color: '#0891b2', cat: 'freelance_dev' },
  { id: 'arc', label: 'Arc.dev', icon: 'fas fa-code-branch', color: '#38bdf8', cat: 'freelance_dev' },
  { id: 'codementor', label: 'Codementor', icon: 'fas fa-hand-holding-hand', color: '#f48024', cat: 'freelance_dev' },
  { id: 'clouddevs', label: 'CloudDevs', icon: 'fas fa-cloud', color: '#2563eb', cat: 'freelance_dev' },
  { id: 'revelo', label: 'Revelo', icon: 'fas fa-star', color: '#22c55e', cat: 'freelance_dev' },
  { id: 'upstack', label: 'UpStack', icon: 'fas fa-layer-group', color: '#6366f1', cat: 'freelance_dev' },
  { id: 'topcoder', label: 'Topcoder', icon: 'fas fa-code', color: '#dc2626', cat: 'freelance_dev' },
  { id: 'crossover', label: 'Crossover', icon: 'fas fa-users-between-lines', color: '#7c3aed', cat: 'freelance_dev' },
  { id: 'x_team', label: 'X-Team', icon: 'fas fa-xmark', color: '#000000', cat: 'freelance_dev' },
  { id: 'gigster', label: 'Gigster', icon: 'fas fa-bolt', color: '#ea580c', cat: 'freelance_dev' },

  // ═══════════════════════════════════════════════════
  // AI / DATA SCIENCE FREELANCE
  // ═══════════════════════════════════════════════════
  { id: 'kolabtree', label: 'Kolabtree', icon: 'fas fa-tree', color: '#16a34a', cat: 'freelance_ai' },
  { id: 'zindi', label: 'Zindi', icon: 'fas fa-globe', color: '#e11d48', cat: 'freelance_ai' },
  { id: 'kaggle', label: 'Kaggle', icon: 'fab fa-kaggle', color: '#20beff', cat: 'freelance_ai' },
  { id: 'huggingface', label: 'Hugging Face', icon: 'fas fa-smile', color: '#f59e0b', cat: 'freelance_ai' },
  { id: 'dataannotation', label: 'DataAnnotation', icon: 'fas fa-database', color: '#6366f1', cat: 'freelance_ai' },
  { id: 'alignerr', label: 'Alignerr', icon: 'fas fa-ruler', color: '#8b5cf6', cat: 'freelance_ai' },
  { id: 'outlier', label: 'Outlier', icon: 'fas fa-chart-line', color: '#2563eb', cat: 'freelance_ai' },
  { id: 'toptal', label: 'Toptal', icon: 'fas fa-crown', color: '#22c55e', cat: 'freelance_ai' },

  // ═══════════════════════════════════════════════════
  // DESIGN FREELANCE
  // ═══════════════════════════════════════════════════
  { id: 'design_99', label: '99designs', icon: 'fas fa-pen-nib', color: '#f97316', cat: 'freelance_design' },
  { id: 'designcrowd', label: 'DesignCrowd', icon: 'fas fa-people-group', color: '#0ea5e9', cat: 'freelance_design' },
  { id: 'dribbble', label: 'Dribbble Jobs', icon: 'fab fa-dribbble', color: '#ea4c89', cat: 'freelance_design' },
  { id: 'behance', label: 'Behance Jobs', icon: 'fab fa-behance', color: '#1769ff', cat: 'freelance_design' },
  { id: 'crowdspring', label: 'Crowdspring', icon: 'fas fa-seedling', color: '#16a34a', cat: 'freelance_design' },
  { id: 'workingnotworking', label: 'WorkingNotWorking', icon: 'fas fa-briefcase', color: '#000000', cat: 'freelance_design' },

  // ═══════════════════════════════════════════════════
  // CONTENT / MARKETING FREELANCE
  // ═══════════════════════════════════════════════════
  { id: 'writeraccess', label: 'WriterAccess', icon: 'fas fa-pen', color: '#2563eb', cat: 'freelance_content' },
  { id: 'verblio', label: 'Verblio', icon: 'fas fa-pencil', color: '#7c3aed', cat: 'freelance_content' },
  { id: 'scripted', label: 'Scripted', icon: 'fas fa-scroll', color: '#0891b2', cat: 'freelance_content' },
  { id: 'textbroker', label: 'Textbroker', icon: 'fas fa-file-lines', color: '#0284c7', cat: 'freelance_content' },
  { id: 'constant_content', label: 'Constant Content', icon: 'fas fa-file', color: '#22c55e', cat: 'freelance_content' },
  { id: 'crowd_content', label: 'Crowd Content', icon: 'fas fa-users', color: '#f59e0b', cat: 'freelance_content' },
  { id: 'composely', label: 'Compose.ly', icon: 'fas fa-music', color: '#ec4899', cat: 'freelance_content' },

  // ═══════════════════════════════════════════════════
  // REMOTE CONTRACT & GIG BOARDS
  // ═══════════════════════════════════════════════════
  { id: 'weworkremotely', label: 'We Work Remotely', icon: 'fas fa-globe-americas', color: '#2563eb', cat: 'remote_contract' },
  { id: 'dynamitejobs', label: 'Dynamite Jobs', icon: 'fas fa-fire', color: '#dc2626', cat: 'remote_contract' },
  { id: 'workingnomads', label: 'Working Nomads', icon: 'fas fa-passport', color: '#8b5cf6', cat: 'remote_contract' },
  { id: 'jobspresso', label: 'Jobspresso', icon: 'fas fa-mug-hot', color: '#b45309', cat: 'remote_contract' },
  { id: 'nodesk', label: 'NoDesk', icon: 'fas fa-chair', color: '#0891b2', cat: 'remote_contract' },
  { id: 'remoteleaf', label: 'RemoteLeaf', icon: 'fas fa-leaf', color: '#16a34a', cat: 'remote_contract' },
  { id: 'pangian', label: 'Pangian', icon: 'fas fa-earth-asia', color: '#6366f1', cat: 'remote_contract' },

  // ═══════════════════════════════════════════════════
  // STARTUP / CONTRACT WORK
  // ═══════════════════════════════════════════════════
  { id: 'wellfound', label: 'Wellfound', icon: 'fas fa-rocket', color: '#ea580c', cat: 'startup' },
  { id: 'ycombinator', label: 'Y Combinator', icon: 'fas fa-seedling', color: '#fb8500', cat: 'startup' },
  { id: 'ventureloop', label: 'VentureLoop', icon: 'fas fa-chart-pie', color: '#0891b2', cat: 'startup' },
  { id: 'f6s', label: 'F6S', icon: 'fas fa-cogs', color: '#7c3aed', cat: 'startup' },
  { id: 'startupjobs', label: 'StartupJobs', icon: 'fas fa-lightbulb', color: '#eab308', cat: 'startup' },

  // ═══════════════════════════════════════════════════
  // OPEN SOURCE BOUNTIES
  // ═══════════════════════════════════════════════════
  { id: 'gitcoin', label: 'Gitcoin', icon: 'fab fa-git-alt', color: '#3b82f6', cat: 'bounty' },
  { id: 'dework', label: 'Dework', icon: 'fas fa-bolt', color: '#22c55e', cat: 'bounty' },
  { id: 'onlydust', label: 'OnlyDust', icon: 'fas fa-droplet', color: '#f97316', cat: 'bounty' },
  { id: 'bountysource', label: 'Bountysource', icon: 'fas fa-trophy', color: '#ef4444', cat: 'bounty' },
  { id: 'codetriage', label: 'CodeTriage', icon: 'fas fa-heart-pulse', color: '#ec4899', cat: 'bounty' },
  { id: 'algora', label: 'Algora', icon: 'fas fa-cubes', color: '#6366f1', cat: 'bounty' },
  { id: 'polar_sh', label: 'Polar.sh', icon: 'fas fa-snowflake', color: '#0ea5e9', cat: 'bounty' },
  { id: 'issuehunt', label: 'IssueHunt', icon: 'fas fa-bug', color: '#0891b2', cat: 'bounty' },

  // ═══════════════════════════════════════════════════
  // WEB3 FREELANCE
  // ═══════════════════════════════════════════════════
  { id: 'laborx', label: 'LaborX', icon: 'fas fa-coins', color: '#7c3aed', cat: 'web3' },
  { id: 'cryptojobs', label: 'CryptoJobs', icon: 'fab fa-bitcoin', color: '#f59e0b', cat: 'web3' },
  { id: 'web3career', label: 'Web3.career', icon: 'fas fa-link', color: '#2563eb', cat: 'web3' },
  { id: 'useweb3', label: 'UseWeb3', icon: 'fas fa-cube', color: '#8b5cf6', cat: 'web3' },
];

const TYPE_LABELS = { remote: 'Remote', hybrid: 'Hybrid', on_site: 'On-Site' };
const TYPE_COLORS = { remote: '#22c55e', hybrid: '#f59e0b', on_site: '#4dabf7' };
const PLATFORM_COLORS = Object.fromEntries(PLATFORM_OPTIONS.map(p => [p.id, p.color]));
const PLATFORM_ICONS = Object.fromEntries(PLATFORM_OPTIONS.map(p => [p.id, p.icon]));

const CATEGORIES = [
  { key: 'all', label: 'All', icon: 'fas fa-th-large' },
  { key: 'freelance', label: 'Freelance', icon: 'fas fa-briefcase' },
  { key: 'freelance_dev', label: 'Dev Freelance', icon: 'fas fa-code' },
  { key: 'freelance_ai', label: 'AI / Data', icon: 'fas fa-brain' },
  { key: 'freelance_design', label: 'Design', icon: 'fas fa-pen-nib' },
  { key: 'freelance_content', label: 'Content', icon: 'fas fa-pen' },
  { key: 'remote_contract', label: 'Remote', icon: 'fas fa-house-laptop' },
  { key: 'startup', label: 'Startup', icon: 'fas fa-rocket' },
  { key: 'bounty', label: 'Bounties', icon: 'fas fa-trophy' },
  { key: 'web3', label: 'Web3', icon: 'fas fa-cube' },
  { key: 'primary_api', label: 'Free APIs', icon: 'fas fa-server' },
  { key: 'aggregator', label: 'Aggregators', icon: 'fas fa-database' },
];

function JobCard({ job, onApply, hasResume, onOptimize }) {
  const typeColor = TYPE_COLORS[job.type] || TYPE_COLORS.on_site;
  const scoreColor = job.match_score >= 80 ? '#22c55e' : job.match_score >= 60 ? '#f59e0b' : '#ef4444';
  const sourceColor = PLATFORM_COLORS[job.source] || '#6b7280';
  const sourceIcon = PLATFORM_ICONS[job.source] || 'fas fa-globe';
  const [showScoreInfo, setShowScoreInfo] = useState(false);
  const hasValidUrl = job.apply_url && job.apply_url.startsWith('http');
  const searchUrl = hasValidUrl ? job.apply_url :
    `https://www.google.com/search?q=${encodeURIComponent(`${job.title} ${job.company} apply`)}`;
  const stripHtml = (s) => {
    if (!s) return '';
    return s
      .replace(/<[^>]*>/g, ' ')
      .replace(/&[^;]+;/g, ' ')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();
  };
  const cleanDesc = stripHtml(job.description).trim();
  const truncated = cleanDesc.length > 220 ? cleanDesc.slice(0, 220) + '…' : cleanDesc;

  const scoreText = job.match_score >= 80 ? 'Strong match — great fit based on your skills and experience'
    : job.match_score >= 60 ? 'Moderate match — some skills align, consider tailoring your resume'
    : 'Low match — limited skill overlap, but still worth exploring';

  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: '12px', padding: '1.25rem',
      display: 'flex', flexDirection: 'column', gap: '0.75rem',
      transition: 'all 0.2s', position: 'relative',
      boxShadow: 'var(--shadow)',
    }}>
      {/* Match Score */}
      {hasResume && (
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}
          onMouseEnter={() => setShowScoreInfo(true)}
          onMouseLeave={() => setShowScoreInfo(false)}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: `${scoreColor}15`, border: `2px solid ${scoreColor}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', fontWeight: 700, color: scoreColor, cursor: 'help',
          }}>
            {job.match_score}
          </div>
          {showScoreInfo && (
            <div style={{
              position: 'absolute', top: '44px', right: '0', zIndex: 10,
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: '8px', padding: '0.6rem 0.75rem', width: '200px',
              fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4,
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            }}>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text)' }}>Match Score</div>
              {scoreText}
            </div>
          )}
        </div>
      )}

      {/* Source badge */}
      {job.source && (
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          fontSize: '0.6rem', fontWeight: 600, textTransform: 'uppercase',
          padding: '0.1rem 0.4rem', borderRadius: '4px',
          background: `${sourceColor}15`, color: sourceColor,
          letterSpacing: '0.3px', display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
        }}>
          <i className={sourceIcon} style={{ fontSize: '0.55rem' }}></i>
          {job.source}
        </div>
      )}

      {/* Company + Title */}
      <div style={{ paddingRight: hasResume ? '50px' : 0, paddingTop: job.source ? '4px' : 0 }}>
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
            {(() => {
              const d = new Date(job.date_posted);
              const now = Date.now();
              const diff = Math.floor((now - d.getTime()) / 1000);
              if (diff < 60) return 'just now';
              if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
              if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
              if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
              return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            })()}
          </span>
        )}
      </div>

      {/* Description */}
      <p style={{ fontSize: '0.8rem', color: 'var(--text2)', lineHeight: 1.5, margin: 0, flex: 1 }}>
        {truncated}
      </p>

      {/* Actions: Salary, Optimize CTA, Apply */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem', gap: '0.5rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {job.salary_range ? (
            <span style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 600 }}>
              <i className="fas fa-indian-rupee-sign" style={{ fontSize: '0.7rem' }}></i> {job.salary_range}
            </span>
          ) : null}
          {hasResume && job.match_score > 0 && job.match_score < 80 && (
            <button onClick={(e) => { e.preventDefault(); onOptimize?.(job); }}
              style={{
                background: `${scoreColor}20`, border: `1px solid ${scoreColor}`,
                color: scoreColor, padding: '0.3rem 0.7rem', borderRadius: '8px',
                fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                whiteSpace: 'nowrap', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = scoreColor; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${scoreColor}20`; e.currentTarget.style.color = scoreColor; }}
              title={`Tailor your resume for this ${job.title} role`}>
              <i className="fas fa-magic" style={{ fontSize: '0.6rem' }}></i> Optimize Resume
            </button>
          )}
        </div>
        <a href={searchUrl} target="_blank" rel="noopener noreferrer"
          onClick={() => onApply?.(job)}
          style={{
          background: hasValidUrl ? 'var(--primary)' : 'var(--text-muted)',
          color: '#fff', padding: '0.4rem 1rem',
          borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600,
          textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = hasValidUrl ? '0 4px 12px var(--primary-glow)' : '0 4px 12px rgba(0,0,0,0.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
          {hasValidUrl ? 'Apply' : 'Search'}{' '}
          <i className={`fas fa-${hasValidUrl ? 'external-link-alt' : 'search'}`} style={{ fontSize: '0.65rem' }}></i>
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
  const navigate = useNavigate();
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
  const [expandedCats, setExpandedCats] = useState(new Set());
  const [selectedPlatformCat, setSelectedPlatformCat] = useState('all');
  const [quickSearch, setQuickSearch] = useState('');
  const [quickLocation, setQuickLocation] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lowMatchPage, setLowMatchPage] = useState(1);
  const accumulatedPollRef = useRef(null);
  const [accumulatedCount, setAccumulatedCount] = useState(0);
  const [appliedJobs, setAppliedJobs] = useState(() => {
    try { return JSON.parse(localStorage.getItem('custodian_applied_jobs') || '[]'); } catch { return []; }
  });
  const [showAppliedSection, setShowAppliedSection] = useState(false);
  const [pendingApplication, setPendingApplication] = useState(null);
  const [showApplyPrompt, setShowApplyPrompt] = useState(false);
  const [hiddenJobKeys, setHiddenJobKeys] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('custodian_hidden_jobs') || '[]');
      const applied = JSON.parse(localStorage.getItem('custodian_applied_jobs') || '[]');
      const keys = new Set(stored);
      applied.forEach(j => keys.add(`${j.title || ''}|||${j.company || ''}|||${j.source || ''}`));
      return keys;
    } catch { return new Set(); }
  });
  const [optimizedJob, setOptimizedJob] = useState(() => {
    try {
      const data = sessionStorage.getItem('custodian_optimize_result');
      if (data) { sessionStorage.removeItem('custodian_optimize_result'); return JSON.parse(data); }
    } catch {}
    return null;
  });

  // Persist hiddenJobKeys to localStorage
  useEffect(() => {
    localStorage.setItem('custodian_hidden_jobs', JSON.stringify([...hiddenJobKeys]));
  }, [hiddenJobKeys]);

  // Save to localStorage whenever appliedJobs changes
  useEffect(() => {
    localStorage.setItem('custodian_applied_jobs', JSON.stringify(appliedJobs));
  }, [appliedJobs]);

  // Fetch applied jobs from backend on mount + sync localStorage→backend
  useEffect(() => {
    fetch(`${API_BASE}/jobs/applied`, { credentials: 'include' })
      .then(r => { if (r.ok) return r.json(); throw new Error(); })
      .then(data => {
        const backend = (data.applied_jobs || []).map(j => ({
          title: j.title, company: j.company, location: j.location,
          source: j.source, apply_url: j.apply_url, salary_range: j.salary_range,
          match_score: j.match_score, date_posted: j.date_posted,
          _backendId: j.id, _local: false,
        }));
        // Merge backend into state (backend wins dedup, add localStorage-only ones)
        setAppliedJobs(prev => {
          const merged = [...backend];
          const keyed = new Set(backend.map(j => `${j.title}|||${j.company}`));
          const localOnly = prev.filter(j => !keyed.has(`${j.title}|||${j.company}`));
          merged.push(...localOnly);
          return merged;
        });
      })
      .catch(() => {});
  }, []);

  // Sync any localStorage-only jobs to backend (best-effort, once on mount)
  useEffect(() => {
    const localJobs = (() => { try { return JSON.parse(localStorage.getItem('custodian_applied_jobs') || '[]'); } catch { return []; } })();
    if (localJobs.length === 0) return;
    fetch(`${API_BASE}/jobs/applied/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(localJobs.map(j => ({
        title: j.title, company: j.company, location: j.location || '',
        source: j.source || '', apply_url: j.apply_url || '',
        salary_range: j.salary_range || '', match_score: j.match_score || 0,
        date_posted: j.date_posted || '',
      }))),
    }).catch(() => {});
  }, []);

  // Track tab return → prompt if they filled the application
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        const stored = localStorage.getItem('custodian_pending_apply');
        if (stored) {
          try {
            const data = JSON.parse(stored);
            const elapsed = Date.now() - data.timestamp;
            if (elapsed > 2000 && elapsed < 600000) {
              setPendingApplication(data.job);
              setShowApplyPrompt(true);
              localStorage.removeItem('custodian_pending_apply');
            } else if (elapsed > 600000) {
              localStorage.removeItem('custodian_pending_apply');
            }
          } catch { localStorage.removeItem('custodian_pending_apply'); }
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const handleApplyClick = (job) => {
    localStorage.setItem('custodian_pending_apply', JSON.stringify({
      job, timestamp: Date.now(),
    }));
  };

  const handleOptimizeForJob = (job) => {
    const params = new URLSearchParams();
    if (selectedResumeId) params.set('resume', selectedResumeId);
    const jdText = `${job.title} at ${job.company}\n${job.description || ''}`.trim();
    if (jdText) params.set('jd', jdText);
    sessionStorage.setItem('custodian_optimize_job', JSON.stringify({
      title: job.title, company: job.company, url: job.apply_url || '',
    }));
    navigate(`/resume?${params.toString()}&optimizeJob=1`);
  };

  const sortJobsByDate = (jobsList) => {
    return [...jobsList].sort((a, b) => {
      const da = a.date_posted ? new Date(a.date_posted).getTime() : 0;
      const db = b.date_posted ? new Date(b.date_posted).getTime() : 0;
      return db - da;
    });
  };

  const confirmApplied = () => {
    if (!pendingApplication) return;
    const j = pendingApplication;
    const jobKey = `${j.title}|||${j.company}|||${j.source || ''}`;
    // Save to backend API
    fetch(`${API_BASE}/jobs/applied`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        title: j.title, company: j.company, location: j.location || '',
        source: j.source || '', apply_url: j.apply_url || '',
        salary_range: j.salary_range || '', match_score: j.match_score || 0,
        date_posted: j.date_posted || '',
      }),
    }).then(r => r.ok ? r.json() : null).then(data => {
      if (data && data.id) {
        setAppliedJobs(prev => prev.map(x =>
          x === j ? { ...x, _backendId: data.id, _local: false } : x
        ));
      }
    }).catch(() => {});
    // Update state immediately + hide card from results
    setHiddenJobKeys(prev => new Set([...prev, jobKey]));
    setAppliedJobs(prev => {
      const exists = prev.some(x => x.title === j.title && x.company === j.company);
      return exists ? prev : [{ ...j, _local: true }, ...prev];
    });
    setShowApplyPrompt(false);
    setPendingApplication(null);
  };

  const removeAppliedJob = (index) => {
    const job = appliedJobs[index];
    if (!job) return;
    // If it has a backend ID, delete from API
    if (job._backendId) {
      fetch(`${API_BASE}/jobs/applied/${job._backendId}`, {
        method: 'DELETE', credentials: 'include',
      }).catch(() => {});
    }
    setAppliedJobs(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    fetch(`${API_BASE}/resumes`, { credentials: 'include' })
      .then(r => r.json())
      .then(d => setResumes(d.resumes || []))
      .catch(() => {});
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
      setJobs(sortJobsByDate(data.jobs || []).map(j => ({ ...j, match_score: 0 })));
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
    setJobs(prev => prev.map(j => ({ ...j, match_score: 0 })));
    searchJobs(null, null, quickSearch, quickLocation);
  };

  const handleResumeSelect = (e) => {
    const id = e.target.value;
    setSelectedResumeId(id);
    setUploadedResume(null);
    if (id && jobs.length > 0) {
      const resume = resumes.find(r => String(r.id) === String(id));
      if (resume?.data) computeResumeMatchScores(resume.data, jobs);
    } else if (!id) {
      setJobs(prev => prev.map(j => ({ ...j, match_score: 0 })));
    }
  };

  const COMMON_WORDS = new Set([
    'the','and','for','are','but','not','you','all','can','had','her','was',
    'one','our','out','has','have','been','some','them','than','what','when',
    'which','will','with','your','this','that','from','they','their',
    'about','into','over','also','its','more','very','just',
  ]);

  const normalizeWord = (w) => {
    const s = w.replace(/^[^a-z0-9#+.]+|[^a-z0-9#+.]+$/g, '').toLowerCase();
    if (/^c#?$/.test(s)) return 'csharp';
    if (/^c[ +]*[+]+$/.test(s)) return 'cpp';
    if (/^\.net$/.test(s)) return 'dotnet';
    if (/^node(?:\.js)?$/.test(s)) return 'nodejs';
    if (/^react(?:\.js)?$/.test(s)) return 'react';
    if (/^vue(?:\.js)?$/.test(s)) return 'vue';
    if (/^next(?:\.js)?$/.test(s)) return 'nextjs';
    return s;
  };

  const extractResumeKeywords = (data) => {
    const words = new Set();
    const addWords = (text) => {
      if (!text) return;
      String(text).toLowerCase().split(/[\s,;:/\\()]+/).forEach(w => {
        w = normalizeWord(w);
        if (w.length > 2 && !COMMON_WORDS.has(w)) words.add(w);
      });
    };
    if (data.personal_info?.title) addWords(data.personal_info.title);
    if (data.personal_info?.summary) addWords(data.personal_info.summary);
    if (data.skills) data.skills.forEach(s => addWords(s.value || s.name || s));
    if (data.education) data.education.forEach(e => {
      addWords(e.degree); addWords(e.institution); addWords(e.field);
    });
    if (data.experience) data.experience.forEach(e => {
      addWords(e.role); addWords(e.company); addWords(e.description);
    });
    return words;
  };

  const computeResumeMatchScores = (resumeData, jobsList) => {
    const keywords = extractResumeKeywords(resumeData);
    if (keywords.size === 0) return;
    const kwArray = [...keywords];
    const normalizeText = (str) => {
      if (!str) return '';
      return str.toLowerCase().split(/[\s,;:/\\()]+/).map(w => normalizeWord(w)).filter(Boolean).join(' ');
    };
    const scored = jobsList.map(job => {
      const text = normalizeText([job.title, job.company, job.description].filter(Boolean).join(' '));
      let matches = 0;
      for (const kw of kwArray) {
        if (text.includes(kw)) matches++;
      }
      const score = Math.min(100, Math.round((matches / Math.max(1, Math.min(kwArray.length, 8))) * 100));
      return { ...job, match_score: Math.max(1, score) };
    });
    scored.sort((a, b) => b.match_score - a.match_score);
    setJobs(scored);
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
      if (data.data && jobs.length > 0) computeResumeMatchScores(data.data, jobs);
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

  const fetchAccumulatedJobs = useCallback(async () => {
    try {
      const r = await fetch(`${API_BASE}/jobs/accumulated`, { credentials: 'include' });
      if (r.ok) {
        const data = await r.json();
        if (data.jobs) {
          setJobs(sortJobsByDate(data.jobs).map(j => ({ ...j, match_score: 0 })));
          setTotalCount(data.total_count);
          setAccumulatedCount(data.total_count);
          setLastUpdated(new Date());
        }
      }
    } catch {}
  }, []);

  // Initial fetch on mount
  useEffect(() => { fetchAccumulatedJobs(); }, [fetchAccumulatedJobs]);

  // Silent accumulated job poll — no loading state, always runs
  useEffect(() => {
    accumulatedPollRef.current = setInterval(fetchAccumulatedJobs, REFRESH_INTERVAL);
    return () => clearInterval(accumulatedPollRef.current);
  }, [fetchAccumulatedJobs]);

  // When tab regains focus, re-fetch accumulated jobs
  useEffect(() => {
    const handle = () => {
      if (document.visibilityState === 'visible') fetchAccumulatedJobs();
    };
    document.addEventListener('visibilitychange', handle);
    return () => document.removeEventListener('visibilitychange', handle);
  }, [fetchAccumulatedJobs]);

  const isEnglish = (text) => {
    if (!text) return true;
    // Block non-Latin scripts
    if (/[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\u0600-\u06ff\u0400-\u04ff\u0590-\u05ff\u0e00-\u0e7f\uac00-\ud7af\u3040-\u309f\u30a0-\u30ff\u0900-\u097f]/.test(text)) return false;
    // Block non-English European languages by checking accented Latin density
    // English rarely uses accented characters (only in loanwords like café, résumé)
    const accented = (text.match(/[\u00c0-\u024f]/g) || []).length;
    const letters = (text.match(/[a-zA-Z\u00c0-\u024f]/g) || []).length;
    if (letters > 0 && accented / letters > 0.1) return false;
    return true;
  };

  const filteredJobs = jobs.filter(j => {
    if (!isEnglish(j.title)) return false;
    if (!isEnglish(j.description)) return false;
    const jobKey = `${j.title || ''}|||${j.company || ''}|||${j.source || ''}`;
    if (hiddenJobKeys.has(jobKey)) return false;
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

  const getPageNumbers = (current, total, range = 5) => {
    const pages = [];
    const start = Math.max(1, current - range);
    const end = Math.min(total, current + range);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const hasResume = selectedResumeId || uploadedResume;
  const activePlatforms = PLATFORM_OPTIONS.filter(p => platformFilters[p.id]).length;

  const appliedKeySet = new Set(appliedJobs.map(j => `${j.title || ''}|||${j.company || ''}|||${j.source || ''}`));
  const appliedSeen = new Set();
  const appliedFromJobs = jobs.filter(j => {
    const key = `${j.title || ''}|||${j.company || ''}`;
    const fullKey = `${j.title || ''}|||${j.company || ''}|||${j.source || ''}`;
    if (!appliedKeySet.has(fullKey)) return false;
    if (appliedSeen.has(key)) return false;
    appliedSeen.add(key);
    return true;
  });

  const highMatchJobs = hasResume
    ? [...filteredJobs].filter(j => j.match_score > 0).sort((a, b) => b.match_score - a.match_score).slice(0, PAGE_SIZE)
    : [];
  const lowMatchJobs = hasResume
    ? [...filteredJobs].sort((a, b) => b.match_score - a.match_score).slice(highMatchJobs.length)
    : filteredJobs;
  const highPageCount = Math.max(1, Math.ceil(highMatchJobs.length / PAGE_SIZE));
  const lowPageCount = Math.max(1, Math.ceil(lowMatchJobs.length / PAGE_SIZE));
  const paginatedHigh = highMatchJobs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const paginatedLow = lowMatchJobs.slice((lowMatchPage - 1) * PAGE_SIZE, lowMatchPage * PAGE_SIZE);

  useEffect(() => {
    setCurrentPage(1);
    setLowMatchPage(1);
  }, [keywordFilter, typeFilters, platformFilters]);

  const formatTime = (d) => {
    if (!d) return '—';
    const diff = Math.floor((Date.now() - d.getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <MainLayout>
      <div className="page-header-box mb-3">
        <div className="section-header mb-0">
          <h2><i className="fas fa-briefcase me-2"></i>Apply for Jobs</h2>
          <p>Real job listings scraped from multiple platforms in real-time.</p>
        </div>
      </div>

      {/* Applied Jobs Section — always first */}
      {appliedJobs.length > 0 && (
        <div style={{
          background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px',
          padding: '0.75rem 1.25rem', marginBottom: '1rem',
        }}>
          <div
            onClick={() => setShowAppliedSection(!showAppliedSection)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="fas fa-check-circle" style={{ color: '#22c55e' }}></i>
              <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.85rem' }}>
                Applied ({appliedJobs.length})
              </span>
            </div>
            <i className={`fas fa-chevron-${showAppliedSection ? 'up' : 'down'}`} style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}></i>
          </div>
          {showAppliedSection && (
            <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {appliedJobs.map((job, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.5rem 0.75rem', background: 'var(--card)', borderRadius: '8px',
                  border: '1px solid var(--border)',
                }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text)' }}>{job.title}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span>{job.company}</span>
                      {job.source && <span style={{ background: `${PLATFORM_COLORS[job.source] || '#6b7280'}15`, color: PLATFORM_COLORS[job.source] || '#6b7280', padding: '0.05rem 0.35rem', borderRadius: '4px', fontWeight: 600 }}>{job.source}</span>}
                    </div>
                  </div>
                  <button onClick={() => removeAppliedJob(i)} title="Remove" style={{
                    background: 'none', border: 'none', color: 'var(--text-muted)',
                    cursor: 'pointer', padding: '0.25rem', fontSize: '0.8rem', flexShrink: 0,
                  }}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Controls Bar */}
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px',
        padding: '1.25rem', marginBottom: '1.5rem',
      }}>
        {/* Quick Search */}
        <form onSubmit={handleQuickSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <input type="text" className="form-control form-control-sm" placeholder="Search jobs..." value={quickSearch} onChange={e => setQuickSearch(e.target.value)} style={{ flex: 1, minWidth: 0, fontSize: '0.85rem' }} />
          <input type="text" className="form-control form-control-sm" placeholder="Location (e.g. remote, Mumbai)" value={quickLocation} onChange={e => setQuickLocation(e.target.value)} style={{ flex: '0 1 200px', fontSize: '0.85rem' }} />
          <button type="submit" className="btn btn-sm btn-primary" disabled={!quickSearch || searching}>
            <i className={`fas ${searching ? 'fa-spinner fa-spin' : 'fa-search'} me-1`}></i> Search
          </button>
        </form>

        {/* Resume selection — always visible */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: '0.75rem' }}>
          <div style={{ flex: '1 1 280px', minWidth: 0 }}>
            <label className="form-label small" style={{ fontWeight: 600 }}><i className="fas fa-file-alt me-1" style={{ color: 'var(--primary)' }}></i>Select Saved Resume</label>
            <select className="form-select form-select-sm" value={selectedResumeId} onChange={handleResumeSelect} style={{ fontSize: '0.85rem' }}>
              <option value="">— No resume selected (no match scores) —</option>
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
          {hasResume && (
            <div style={{ fontSize: '0.75rem', color: 'var(--success)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <i className="fas fa-check-circle"></i> Match scores active
            </div>
          )}
        </div>

        {/* Platform + Type filters */}
        <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <label className="form-label small" style={{ fontWeight: 600 }}>Platforms ({activePlatforms}/{PLATFORM_OPTIONS.length})</label>
            <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
              {CATEGORIES.map(cat => {
                const count = cat.key === 'all' ? PLATFORM_OPTIONS.length : PLATFORM_OPTIONS.filter(p => p.cat === cat.key).length;
                const activeCount = cat.key === 'all' ? activePlatforms : PLATFORM_OPTIONS.filter(p => p.cat === cat.key && platformFilters[p.id]).length;
                return (
                  <button key={cat.key} onClick={() => setSelectedPlatformCat(cat.key)}
                    style={{
                      padding: '0.25rem 0.6rem', borderRadius: '6px', border: '1px solid var(--border)',
                      background: selectedPlatformCat === cat.key ? 'var(--primary)' : 'transparent',
                      color: selectedPlatformCat === cat.key ? '#fff' : 'var(--text-muted)',
                      cursor: 'pointer', fontSize: '0.72rem', fontWeight: selectedPlatformCat === cat.key ? 600 : 400,
                      display: 'inline-flex', alignItems: 'center', gap: '0.25rem', transition: 'all 0.15s',
                      opacity: count === 0 ? 0.3 : 1,
                    }}
                    disabled={count === 0}>
                    <i className={cat.icon} style={{ fontSize: '0.6rem' }}></i>
                    {cat.label}
                    {activeCount > 0 && activeCount < count && (
                      <span style={{ fontSize: '0.6rem', opacity: 0.7 }}>({activeCount}/{count})</span>
                    )}
                    {activeCount === count && (
                      <span style={{ fontSize: '0.6rem', opacity: 0.7 }}>{count}</span>
                    )}
                  </button>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {(() => {
                const catPlatforms = PLATFORM_OPTIONS.filter(p => selectedPlatformCat === 'all' || p.cat === selectedPlatformCat);
                const isExpanded = expandedCats.has(selectedPlatformCat);
                const display = isExpanded ? catPlatforms : catPlatforms.slice(0, 8);
                return display.map(p => {
                  const active = platformFilters[p.id];
                  return (
                    <button key={p.id} onClick={() => togglePlatform(p.id)} title={p.label} style={{
                      padding: '0.25rem 0.5rem', borderRadius: '6px', border: '1px solid var(--border)',
                      background: active ? p.color : 'transparent',
                      color: active ? '#fff' : 'var(--text-muted)',
                      cursor: 'pointer', fontSize: '0.7rem', fontWeight: 500,
                      transition: 'all 0.15s', opacity: active ? 1 : 0.5,
                      display: 'inline-flex', alignItems: 'center', gap: '0.2rem',
                    }}>
                      <i className={p.icon} style={{ fontSize: '0.6rem' }}></i>
                      {p.label}
                    </button>
                  );
                });
              })()}
              {(() => {
                const catPlatforms = PLATFORM_OPTIONS.filter(p => selectedPlatformCat === 'all' || p.cat === selectedPlatformCat);
                if (catPlatforms.length > 8) {
                  const isExpanded = expandedCats.has(selectedPlatformCat);
                  return (
                    <button onClick={() => {
                      setExpandedCats(prev => {
                        const next = new Set(prev);
                        if (isExpanded) next.delete(selectedPlatformCat);
                        else next.add(selectedPlatformCat);
                        return next;
                      });
                    }} style={{
                      padding: '0.25rem 0.5rem', borderRadius: '6px', border: '1px dashed var(--border)',
                      background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer',
                      fontSize: '0.7rem', whiteSpace: 'nowrap',
                    }}>
                      {isExpanded ? `Show less` : `+${catPlatforms.length - 8} more`}
                    </button>
                  );
                }
                return null;
              })()}
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

      {/* Results Header — always visible */}
      <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <h5 style={{ margin: 0, color: 'var(--text)' }}>
              {searching ? 'Searching...' : (
                <>{filteredJobs.length} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>jobs found</span>
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

      {optimizedJob && (
        <div style={{
          background: 'rgba(var(--success-rgb, 34,197,94),0.1)', border: '1px solid #22c55e',
          borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '1rem',
          display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, color: '#22c55e', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
              <i className="fas fa-check-circle me-1"></i> Resume optimized for {optimizedJob.title} at {optimizedJob.company}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Your resume has been tailored to this job posting. Review and apply with your updated resume.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {optimizedJob.downloadUrl && (
              <a href={optimizedJob.downloadUrl} download
                style={{
                  background: '#22c55e', color: '#fff', padding: '0.4rem 1rem', borderRadius: '8px',
                  fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer',
                }}>
                <i className="fas fa-download"></i> Download Resume
              </a>
            )}
            {optimizedJob.url && (
              <a href={optimizedJob.url} target="_blank" rel="noopener noreferrer"
                style={{
                  background: 'var(--primary)', color: '#fff', padding: '0.4rem 1rem', borderRadius: '8px',
                  fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                }}>
                <i className="fas fa-external-link-alt"></i> Apply Now
              </a>
            )}
            <button onClick={() => setOptimizedJob(null)}
              style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text-muted)', padding: '0.4rem 0.7rem', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>
              Dismiss
            </button>
          </div>
        </div>
      )}

      {error && (
        <div style={{ background: 'rgba(var(--danger-rgb),0.1)', border: '1px solid var(--danger)', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem', color: 'var(--danger)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <i className="fas fa-exclamation-circle"></i> {error}
          <button onClick={() => setError(null)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}>&times;</button>
        </div>
      )}

      {!searching && filteredJobs.length === 0 && totalCount === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <i className="fas fa-search-minus" style={{ fontSize: '2.5rem', color: 'var(--text-muted)', marginBottom: '1rem', opacity: 0.5 }}></i>
          <p style={{ color: 'var(--text-muted)' }}>No jobs found on the selected platforms. Try different keywords, location, or job sites.</p>
        </div>
      )}

      {!searching && filteredJobs.length === 0 && totalCount > 0 && (
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <i className="fas fa-filter" style={{ fontSize: '2.5rem', color: 'var(--text-muted)', marginBottom: '1rem', opacity: 0.5 }}></i>
          <p style={{ color: 'var(--text-muted)' }}>No jobs match your current filters.</p>
        </div>
      )}

      {!searching && filteredJobs.length > 0 && (
        <>
          {/* Applied jobs section — compact rows, one per job */}
          {appliedFromJobs.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                background: 'rgba(var(--success-rgb,34,197,94),0.06)', border: '1px solid rgba(var(--success-rgb,34,197,94),0.2)',
                borderRadius: '10px', padding: '0 1rem', overflow: 'hidden',
              }}>
                <div onClick={() => setShowAppliedSection(!showAppliedSection)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', cursor: 'pointer', userSelect: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <i className="fas fa-check-circle" style={{ color: '#22c55e', fontSize: '0.85rem' }}></i>
                    <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.85rem' }}>
                      Applied ({appliedFromJobs.length})
                    </span>
                  </div>
                  <i className={`fas fa-chevron-${showAppliedSection ? 'up' : 'down'}`} style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}></i>
                </div>
                {showAppliedSection && (
                  <div style={{ paddingBottom: '0.6rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {appliedFromJobs.map((job, i) => (
                      <div key={i} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '0.4rem 0.6rem', background: 'var(--card)', borderRadius: '6px',
                        border: '1px solid var(--border)', fontSize: '0.8rem',
                      }}>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <span style={{ fontWeight: 600, color: 'var(--text)' }}>{job.title}</span>
                          <span style={{ color: 'var(--text-muted)' }}> @ {job.company}</span>
                        </div>
                        {job.apply_url && (
                          <a href={job.apply_url} target="_blank" rel="noopener noreferrer"
                            style={{ color: 'var(--primary)', fontSize: '0.75rem', textDecoration: 'none', whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>
                            <i className="fas fa-external-link-alt me-1"></i>Apply
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* High-match section */}
          {hasResume && highMatchJobs.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <i className="fas fa-star" style={{ color: '#22c55e', fontSize: '0.9rem' }}></i>
                <h6 style={{ margin: 0, color: 'var(--text)', fontWeight: 700, fontSize: '0.95rem' }}>
                  Top Matches
                </h6>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  — {highMatchJobs.length} job{highMatchJobs.length !== 1 ? 's' : ''} where your resume aligns well
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1rem' }}>
                {paginatedHigh.map((job, i) => <JobCard key={`high-${job.title}-${job.company}-${i}`} job={job} onApply={handleApplyClick} hasResume={hasResume} onOptimize={handleOptimizeForJob} />)}
              </div>
            </div>
          )}

          {/* Low-match / improvement section */}
          {lowMatchJobs.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                {hasResume ? (
                  <>
                    <i className="fas fa-lightbulb" style={{ color: '#f59e0b', fontSize: '0.9rem' }}></i>
                    <h6 style={{ margin: 0, color: 'var(--text)', fontWeight: 700, fontSize: '0.95rem' }}>
                      Improvement Required
                    </h6>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      — {lowMatchJobs.length} job{lowMatchJobs.length !== 1 ? 's' : ''} — optimize your resume to improve match
                    </span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-briefcase" style={{ color: 'var(--primary)', fontSize: '0.9rem' }}></i>
                    <h6 style={{ margin: 0, color: 'var(--text)', fontWeight: 700, fontSize: '0.95rem' }}>
                      All Jobs
                    </h6>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      — {lowMatchJobs.length} job{lowMatchJobs.length !== 1 ? 's' : ''} found
                    </span>
                  </>
                )}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1rem' }}>
                {paginatedLow.map((job, i) => <JobCard key={`low-${job.title}-${job.company}-${i}`} job={job} onApply={handleApplyClick} hasResume={hasResume} onOptimize={handleOptimizeForJob} />)}
              </div>
              {lowMatchJobs.length > PAGE_SIZE && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Showing {(lowMatchPage - 1) * PAGE_SIZE + 1}-{Math.min(lowMatchPage * PAGE_SIZE, lowMatchJobs.length)} of {lowMatchJobs.length}
                  </span>
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <button onClick={() => setLowMatchPage(p => Math.max(1, p - 1))} disabled={lowMatchPage === 1} style={{
                      padding: '0.35rem 0.7rem', borderRadius: '6px', border: '1px solid var(--border)',
                      background: 'var(--card)', color: lowMatchPage === 1 ? 'var(--text-muted)' : 'var(--text)',
                      cursor: lowMatchPage === 1 ? 'default' : 'pointer', fontSize: '0.75rem',
                      opacity: lowMatchPage === 1 ? 0.4 : 1,
                    }}>
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    {lowMatchPage > 6 && (
                      <button onClick={() => setLowMatchPage(1)} style={{
                        width: '30px', height: '30px', borderRadius: '6px', border: '1px solid var(--border)',
                        background: 'var(--card)', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.7rem',
                      }}>
                        <i className="fas fa-angle-double-left"></i>
                      </button>
                    )}
                    {getPageNumbers(lowMatchPage, lowPageCount, 5).map(p => (
                      <button key={p} onClick={() => setLowMatchPage(p)} style={{
                        width: '30px', height: '30px', borderRadius: '6px', border: p === lowMatchPage ? '2px solid var(--primary)' : '1px solid var(--border)',
                        background: p === lowMatchPage ? 'var(--primary)' : 'var(--card)',
                        color: p === lowMatchPage ? '#fff' : 'var(--text)',
                        cursor: 'pointer', fontSize: '0.75rem', fontWeight: p === lowMatchPage ? 700 : 400,
                      }}>
                        {p}
                      </button>
                    ))}
                    {lowMatchPage < lowPageCount - 5 && (
                      <button onClick={() => setLowMatchPage(lowPageCount)} style={{
                        width: '30px', height: '30px', borderRadius: '6px', border: '1px solid var(--border)',
                        background: 'var(--card)', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.7rem',
                      }}>
                        <i className="fas fa-angle-double-right"></i>
                      </button>
                    )}
                    <button onClick={() => setLowMatchPage(p => Math.min(lowPageCount, p + 1))} disabled={lowMatchPage === lowPageCount} style={{
                      padding: '0.35rem 0.7rem', borderRadius: '6px', border: '1px solid var(--border)',
                      background: 'var(--card)', color: lowMatchPage === lowPageCount ? 'var(--text-muted)' : 'var(--text)',
                      cursor: lowMatchPage === lowPageCount ? 'default' : 'pointer', fontSize: '0.75rem',
                      opacity: lowMatchPage === lowPageCount ? 0.4 : 1,
                    }}>
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {jobs.length > 0 && !searching && (
        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <i className="fas fa-sync-alt me-1"></i> New postings appear every ~15s
        </div>
      )}

      {/* Apply confirmation modal */}
      {showApplyPrompt && pendingApplication && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 1050,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }} onClick={() => { setShowApplyPrompt(false); setPendingApplication(null); }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'var(--card)', borderRadius: '12px', padding: '2rem',
            maxWidth: '420px', width: '90%', boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text)' }}>Did you apply?</h5>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Did you fill the application for <strong>{pendingApplication.title}</strong> at <strong>{pendingApplication.company}</strong>?
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button onClick={() => { setShowApplyPrompt(false); setPendingApplication(null); }}
                className="btn btn-sm btn-outline-secondary" style={{ fontSize: '0.85rem' }}>No</button>
              <button onClick={confirmApplied}
                className="btn btn-sm btn-success" style={{ fontSize: '0.85rem' }}>
                <i className="fas fa-check me-1"></i>Yes, I applied
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
