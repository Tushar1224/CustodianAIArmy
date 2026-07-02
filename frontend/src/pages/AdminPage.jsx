import { useState, useEffect, useCallback } from 'react'
import MainLayout from '../components/layout/MainLayout'

const API = '/api/v1'

const FEATURE_ICONS = {
  chat: 'fa-comments',
  resume_optimize: 'fa-file-pen',
  resume_chat: 'fa-message',
  build_chat: 'fa-hammer',
  learn: 'fa-graduation-cap',
  jobs: 'fa-briefcase',
  custom_agents: 'fa-robot',
}

const FEATURE_OPTIONS = [
  { value: '', label: 'All Features' },
  { value: 'chat', label: 'Chat' },
  { value: 'resume_optimize', label: 'Resume Optimize' },
  { value: 'resume_chat', label: 'Resume Chat' },
  { value: 'build_chat', label: 'Build Chat' },
  { value: 'learn', label: 'Learn' },
  { value: 'jobs', label: 'Jobs' },
  { value: 'custom_agents', label: 'Custom Agents' },
]

async function adminGet(path) {
  const token = localStorage.getItem('admin_token')
  const res = await fetch(`${API}${path}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  if (res.status === 401) {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_expires_at')
    return null
  }
  if (!res.ok) return null
  return res.json()
}

function formatCost(dollars) {
  if (dollars == null) return '$0.00'
  if (dollars < 0.01) return '$' + dollars.toFixed(6)
  return '$' + Number(dollars).toFixed(4)
}

function formatNumber(n) {
  if (n == null) return '0'
  return Number(n).toLocaleString()
}

function featureIcon(feature) {
  const icon = FEATURE_ICONS[feature] || 'fa-cog'
  return <i className={`fas ${icon} me-1`} style={{ color: 'var(--primary)' }}></i>
}

function featureLabel(feature) {
  const opt = FEATURE_OPTIONS.find(o => o.value === feature)
  return opt ? opt.label : feature
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="col-md-3 col-6 mb-3">
      <div className="p-3 rounded-3 h-100" style={{ background: 'var(--card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow)' }}>
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center justify-content-center rounded-2"
            style={{ width: 44, height: 44, background: `rgba(var(--${color}-rgb, 77, 171, 247), 0.12)`, color: `var(--${color}, var(--primary))`, fontSize: '1.2rem' }}>
            <i className={`fas ${icon}`}></i>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)' }}>{value}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TabsRow({ tabs, active, onChange, onLogout }) {
  return (
    <div className="d-flex align-items-center gap-1 flex-wrap mb-3 pb-1" style={{ borderBottom: '1px solid var(--border-color)' }}>
      {tabs.map(tab => (
        <button key={tab.key} onClick={() => onChange(tab.key)}
          className={`btn btn-sm px-3 py-2 rounded-0`}
          style={{
            background: active === tab.key ? 'var(--primary)' : 'transparent',
            color: active === tab.key ? '#fff' : 'var(--text-secondary)',
            border: 'none',
            borderBottom: active === tab.key ? '2px solid var(--primary)' : '2px solid transparent',
            fontWeight: active === tab.key ? 600 : 400,
            fontSize: '0.85rem',
            transition: 'all 0.15s',
          }}>
          {tab.icon && <i className={`fas ${tab.icon} me-1`}></i>}
          {tab.label}
        </button>
      ))}
      <div className="ms-auto">
        <button onClick={onLogout} className="btn btn-sm px-3 py-2 rounded-0"
          style={{
            background: 'transparent',
            color: 'var(--danger)',
            border: 'none',
            fontSize: '0.85rem',
            fontWeight: 500,
          }}>
          <i className="fas fa-sign-out-alt me-1"></i>Logout
        </button>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'))
  const [activeTab, setActiveTab] = useState('dashboard')
  const [days, setDays] = useState(30)

  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const [stats, setStats] = useState(null)
  const [perFeature, setPerFeature] = useState([])
  const [perUser, setPerUser] = useState([])

  const [logs, setLogs] = useState([])
  const [logsPage, setLogsPage] = useState(0)
  const [logsTotal, setLogsTotal] = useState(0)
  const [logsUser, setLogsUser] = useState('')
  const [logsFeature, setLogsFeature] = useState('')
  const [users, setUsers] = useState([])

  const [dataLoading, setDataLoading] = useState(false)

  const handleLogout = useCallback(() => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_expires_at')
    setToken(null)
    setStats(null)
    setPerFeature([])
    setPerUser([])
    setLogs([])
  }, [])

  const fetchStats = useCallback(async () => {
    const d = await adminGet(`/admin/stats?days=${days}`)
    if (d) setStats(d)
  }, [days])

  const fetchPerFeature = useCallback(async () => {
    const d = await adminGet(`/admin/per-feature?days=${days}`)
    if (d) setPerFeature(d.features || d)
  }, [days])

  const fetchPerUser = useCallback(async () => {
    const d = await adminGet(`/admin/per-user?days=${days}`)
    if (d) setPerUser(d.users || d)
  }, [days])

  const fetchLogs = useCallback(async () => {
    const params = new URLSearchParams({ limit: 50, offset: logsPage * 50 })
    if (logsUser) params.set('user', logsUser)
    if (logsFeature) params.set('feature', logsFeature)
    const d = await adminGet(`/admin/logs?${params}`)
    if (d) {
      setLogs(d.logs || [])
      setLogsTotal(d.total || 0)
    }
  }, [logsPage, logsUser, logsFeature])

  const fetchUsers = useCallback(async () => {
    const d = await adminGet('/admin/users')
    if (d) setUsers(d)
  }, [])

  useEffect(() => {
    if (!token) return
    setDataLoading(true)
    if (activeTab === 'dashboard') {
      fetchStats().finally(() => setDataLoading(false))
    } else if (activeTab === 'per-feature') {
      fetchPerFeature().finally(() => setDataLoading(false))
    } else if (activeTab === 'per-user') {
      fetchPerUser().finally(() => setDataLoading(false))
    } else if (activeTab === 'logs') {
      Promise.all([fetchLogs(), fetchUsers()]).finally(() => setDataLoading(false))
    }
  }, [token, activeTab, fetchStats, fetchPerFeature, fetchPerUser, fetchLogs, fetchUsers])

  useEffect(() => {
    if (!token || activeTab !== 'dashboard') return
    fetchStats()
  }, [days, token, activeTab, fetchStats])

  async function handleLogin(e) {
    e.preventDefault()
    setLoginError('')
    setLoginLoading(true)
    try {
      const res = await fetch(`${API}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      })
      const data = await res.json()
      if (!res.ok) {
        setLoginError(data.detail || data.error || 'Invalid credentials')
        setLoginLoading(false)
        return
      }
      localStorage.setItem('admin_token', data.access_token || data.token)
      localStorage.setItem('admin_expires_at', data.expires_at || '')
      setToken(data.access_token || data.token)
    } catch {
      setLoginError('Network error. Please try again.')
    }
    setLoginLoading(false)
  }

  if (!token) {
    return (
      <MainLayout showAd={false}>
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
          <div className="p-4 rounded-3" style={{ background: 'var(--card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow)', width: '100%', maxWidth: 400 }}>
            <div className="text-center mb-4">
              <div style={{ fontSize: '2rem', color: 'var(--primary)' }}><i className="fas fa-shield-alt"></i></div>
              <h4 style={{ color: 'var(--text)', fontWeight: 700, marginTop: 8 }}>Admin Login</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Enter your credentials to access the dashboard.</p>
            </div>
            <form onSubmit={handleLogin}>
              {loginError && (
                <div className="alert alert-danger py-2 small" role="alert" style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}>
                  <i className="fas fa-exclamation-circle me-1"></i>{loginError}
                </div>
              )}
              <div className="mb-3">
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 4 }}>Username</label>
                <input type="text" className="form-control form-control-sm" value={loginUsername}
                  onChange={e => setLoginUsername(e.target.value)} placeholder="admin"
                  style={{ background: 'var(--bg2)', border: '1px solid var(--border-color)', color: 'var(--text)' }} required />
              </div>
              <div className="mb-3">
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 4 }}>Password</label>
                <input type="password" className="form-control form-control-sm" value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)} placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  style={{ background: 'var(--bg2)', border: '1px solid var(--border-color)', color: 'var(--text)' }} required />
              </div>
              <button type="submit" className="btn w-100" disabled={loginLoading}
                style={{
                  background: 'var(--primary)', color: '#fff', border: 'none', fontWeight: 600, padding: '0.5rem',
                  opacity: loginLoading ? 0.7 : 1,
                }}>
                {loginLoading ? <><span className="spinner-border spinner-border-sm me-1" role="status"></span> Signing In...</> : <><i className="fas fa-sign-in-alt me-1"></i> Sign In</>}
              </button>
            </form>
          </div>
        </div>
      </MainLayout>
    )
  }

  const logPageCount = Math.max(1, Math.ceil(logsTotal / 50))

  const tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: 'fa-chart-pie' },
    { key: 'per-feature', label: 'Per-Feature', icon: 'fa-cubes' },
    { key: 'per-user', label: 'Per-User', icon: 'fa-users' },
    { key: 'logs', label: 'Logs', icon: 'fa-list' },
  ]

  function renderDashboard() {
    return (
      <>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 style={{ color: 'var(--text)', fontWeight: 600, margin: 0 }}><i className="fas fa-chart-pie me-2" style={{ color: 'var(--primary)' }}></i>Overview</h5>
          <div className="d-flex gap-1">
            {[7, 30, 90].map(d => (
              <button key={d} onClick={() => setDays(d)} className="btn btn-sm px-2"
                style={{
                  background: days === d ? 'var(--primary)' : 'var(--bg3)',
                  color: days === d ? '#fff' : 'var(--text-secondary)',
                  border: '1px solid var(--border-color)',
                  fontWeight: days === d ? 600 : 400,
                  fontSize: '0.8rem',
                }}>
                {d} days
              </button>
            ))}
          </div>
        </div>
        <div className="row">
          <StatCard icon="fa-rocket" label="Total Requests" value={formatNumber(stats?.total_requests)} color="primary" />
          <StatCard icon="fa-microchip" label="Total Tokens" value={formatNumber(stats?.total_tokens)} color="success" />
          <StatCard icon="fa-dollar-sign" label="Total Cost" value={formatCost(stats?.total_cost)} color="warning" />
          <StatCard icon="fa-user" label="Active Users" value={formatNumber(stats?.unique_users)} color="primary" />
        </div>
        {dataLoading && (
          <div className="text-center py-4">
            <span className="spinner-border spinner-border-sm me-1" role="status" style={{ color: 'var(--primary)' }}></span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Loading...</span>
          </div>
        )}
      </>
    )
  }

  function renderPerFeature() {
    if (dataLoading && perFeature.length === 0) {
      return <div className="text-center py-5"><span className="spinner-border" role="status" style={{ color: 'var(--primary)' }}></span></div>
    }
    if (perFeature.length === 0) {
      return <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No data available for this period.</p>
    }
    return (
      <div className="table-responsive">
        <table className="table table-sm mb-0" style={{ color: 'var(--text)', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600 }}>Feature</th>
              <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600, textAlign: 'right' }}>Requests</th>
              <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600, textAlign: 'right' }}>Prompt Tokens</th>
              <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600, textAlign: 'right' }}>Completion Tokens</th>
              <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600, textAlign: 'right' }}>Total Tokens</th>
              <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600, textAlign: 'right' }}>Cost</th>
            </tr>
          </thead>
          <tbody>
            {perFeature.map((row, i) => (
              <tr key={row.feature || i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.5rem' }}>
                  {featureIcon(row.feature)}
                  {featureLabel(row.feature)}
                </td>
                <td style={{ padding: '0.5rem', textAlign: 'right' }}>{formatNumber(row.total_requests || row.requests)}</td>
                <td style={{ padding: '0.5rem', textAlign: 'right' }}>{formatNumber(row.prompt_tokens || '-')}</td>
                <td style={{ padding: '0.5rem', textAlign: 'right' }}>{formatNumber(row.completion_tokens || '-')}</td>
                <td style={{ padding: '0.5rem', textAlign: 'right' }}>{formatNumber(row.total_tokens)}</td>
                <td style={{ padding: '0.5rem', textAlign: 'right' }}>{formatCost(row.total_cost ?? row.cost)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  function renderPerUser() {
    if (dataLoading && perUser.length === 0) {
      return <div className="text-center py-5"><span className="spinner-border" role="status" style={{ color: 'var(--primary)' }}></span></div>
    }
    if (perUser.length === 0) {
      return <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No data available for this period.</p>
    }
    return (
      <div className="table-responsive">
        <table className="table table-sm mb-0" style={{ color: 'var(--text)', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600 }}>User</th>
              <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600, textAlign: 'right' }}>Requests</th>
              <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600, textAlign: 'right' }}>Total Tokens</th>
              <th style={{ padding: '0.6rem 0.5rem', fontWeight: 600, textAlign: 'right' }}>Cost</th>
            </tr>
          </thead>
          <tbody>
            {perUser.map((row, i) => (
              <tr key={row.user || i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.5rem' }}>
                  <i className="fas fa-user me-1" style={{ color: 'var(--text-muted)' }}></i>
                  {row.user_email || row.user}
                </td>
                <td style={{ padding: '0.5rem', textAlign: 'right' }}>{formatNumber(row.total_requests || row.requests)}</td>
                <td style={{ padding: '0.5rem', textAlign: 'right' }}>{formatNumber(row.total_tokens)}</td>
                <td style={{ padding: '0.5rem', textAlign: 'right' }}>{formatCost(row.total_cost ?? row.cost)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  function renderLogs() {
    if (dataLoading && logs.length === 0) {
      return <div className="text-center py-5"><span className="spinner-border" role="status" style={{ color: 'var(--primary)' }}></span></div>
    }
    return (
      <>
        <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
          <div style={{ width: 200 }}>
            <select className="form-select form-select-sm" value={logsUser} onChange={e => { setLogsUser(e.target.value); setLogsPage(0) }}
              style={{ background: 'var(--bg2)', border: '1px solid var(--border-color)', color: 'var(--text)', fontSize: '0.85rem' }}>
              <option value="">All Users</option>
              {users.map(u => (
                <option key={u.user_email || u} value={u.user_email || u}>{u.user_email || u}</option>
              ))}
            </select>
          </div>
          <div style={{ width: 180 }}>
            <select className="form-select form-select-sm" value={logsFeature} onChange={e => { setLogsFeature(e.target.value); setLogsPage(0) }}
              style={{ background: 'var(--bg2)', border: '1px solid var(--border-color)', color: 'var(--text)', fontSize: '0.85rem' }}>
              {FEATURE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="ms-auto d-flex align-items-center gap-2">
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Page {logsPage + 1} of {logPageCount}</span>
            <button className="btn btn-sm" disabled={logsPage === 0} onClick={() => setLogsPage(prev => Math.max(0, prev - 1))}
              style={{
                background: 'var(--bg3)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)',
                opacity: logsPage === 0 ? 0.4 : 1,
              }}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="btn btn-sm" disabled={logsPage >= logPageCount - 1} onClick={() => setLogsPage(prev => prev + 1)}
              style={{
                background: 'var(--bg3)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)',
                opacity: logsPage >= logPageCount - 1 ? 0.4 : 1,
              }}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
        {logs.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No log entries found.</p>
        ) : (
          <div className="table-responsive" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <table className="table table-sm mb-0" style={{ color: 'var(--text)', fontSize: '0.8rem' }}>
              <thead style={{ position: 'sticky', top: 0, background: 'var(--card)', zIndex: 1 }}>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.5rem', fontWeight: 600 }}>Time</th>
                  <th style={{ padding: '0.5rem', fontWeight: 600 }}>User</th>
                  <th style={{ padding: '0.5rem', fontWeight: 600 }}>Feature</th>
                  <th style={{ padding: '0.5rem', fontWeight: 600 }}>Page</th>
                  <th style={{ padding: '0.5rem', fontWeight: 600 }}>Model</th>
                  <th style={{ padding: '0.5rem', fontWeight: 600, textAlign: 'right' }}>Prompt Tokens</th>
                  <th style={{ padding: '0.5rem', fontWeight: 600, textAlign: 'right' }}>Completion Tokens</th>
                  <th style={{ padding: '0.5rem', fontWeight: 600, textAlign: 'right' }}>Cost</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((row, i) => (
                  <tr key={row.id || i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.4rem', whiteSpace: 'nowrap', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      {row.created_at ? new Date(row.created_at + 'Z').toLocaleString() : '-'}
                    </td>
                    <td style={{ padding: '0.4rem', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.user_email || row.user || '-'}</td>
                    <td style={{ padding: '0.4rem' }}>
                      {featureIcon(row.feature)}
                      {featureLabel(row.feature)}
                    </td>
                    <td style={{ padding: '0.4rem', color: 'var(--text-muted)' }}>{row.page || '-'}</td>
                    <td style={{ padding: '0.4rem', color: 'var(--text-secondary)' }}>{row.model || '-'}</td>
                    <td style={{ padding: '0.4rem', textAlign: 'right' }}>{formatNumber(row.prompt_tokens)}</td>
                    <td style={{ padding: '0.4rem', textAlign: 'right' }}>{formatNumber(row.completion_tokens)}</td>
                    <td style={{ padding: '0.4rem', textAlign: 'right' }}>{formatCost(row.cost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    )
  }

  return (
    <MainLayout showAd={false}>
      <div className="page-header-box mb-3">
        <div className="section-header mb-2">
          <h2><i className="fas fa-shield-alt me-2" style={{ color: 'var(--primary)' }}></i>Admin Dashboard</h2>
          <p>Monitor AI token usage, feature distribution, and cost across all users.</p>
        </div>
      </div>

      <div className="p-3 rounded-3" style={{ background: 'var(--card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow)' }}>
        <TabsRow tabs={tabs} active={activeTab} onChange={setActiveTab} onLogout={handleLogout} />

        <div style={{ minHeight: 200 }}>
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'per-feature' && renderPerFeature()}
          {activeTab === 'per-user' && renderPerUser()}
          {activeTab === 'logs' && renderLogs()}
        </div>
      </div>
    </MainLayout>
  )
}
