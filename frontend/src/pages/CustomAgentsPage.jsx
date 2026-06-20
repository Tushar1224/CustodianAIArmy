import { useState, useEffect, useRef } from 'react';
import MainLayout from '../components/layout/MainLayout';
import LoadingOverlay from '../components/shared/LoadingOverlay';

const AVAILABLE_SKILLS = [
  { id: 'code-review', name: 'Code Review', icon: 'fas fa-code-branch', category: 'technical' },
  { id: 'web-search', name: 'Web Search', icon: 'fas fa-search', category: 'research' },
  { id: 'web-scrape', name: 'Web Scrape', icon: 'fas fa-globe', category: 'research' },
  { id: 'file-system', name: 'File System', icon: 'fas fa-folder-open', category: 'utility' },
  { id: 'data-analysis', name: 'Data Analysis', icon: 'fas fa-chart-bar', category: 'analytical' },
  { id: 'image-gen', name: 'Image Generation', icon: 'fas fa-image', category: 'creative' },
  { id: 'document-parse', name: 'Document Parse', icon: 'fas fa-file-alt', category: 'utility' },
  { id: 'memory', name: 'Memory & Context', icon: 'fas fa-database', category: 'utility' },
  { id: 'code-gen', name: 'Code Generation', icon: 'fas fa-code', category: 'technical' },
  { id: 'debugging', name: 'Debugging', icon: 'fas fa-bug', category: 'technical' },
  { id: 'writing', name: 'Writing & Editing', icon: 'fas fa-pen-fancy', category: 'creative' },
  { id: 'research', name: 'Deep Research', icon: 'fas fa-flask', category: 'analytical' },
  { id: 'seo-audit', name: 'SEO Audit', icon: 'fas fa-chart-line', category: 'analytical' },
  { id: 'lead-gen', name: 'Lead Generation', icon: 'fas fa-users', category: 'business' },
  { id: 'competitive-intel', name: 'Competitive Intel', icon: 'fas fa-eye', category: 'business' },
  { id: 'qa-testing', name: 'QA Testing', icon: 'fas fa-vial', category: 'technical' },
];

const AVAILABLE_MCP_TOOLS = [
  { id: 'fetch', name: 'Web Fetch', url: 'uvx mcp-server-fetch' },
  { id: 'duckduckgo', name: 'DuckDuckGo Search', url: 'uvx duckduckgo-mcp-server' },
  { id: 'filesystem', name: 'File System Access', url: 'npx -y @modelcontextprotocol/server-filesystem' },
  { id: 'memory', name: 'Memory Graph', url: 'npx -y @modelcontextprotocol/server-memory' },
  { id: 'sequential-thinking', name: 'Sequential Thinking', url: 'npx -y @modelcontextprotocol/server-sequential-thinking' },
  { id: 'code-review-graph', name: 'Code Review Graph', url: 'uvx code-review-graph serve' },
  { id: 'firecrawl', name: 'Firecrawl Web Data', url: 'firecrawl-cli' },
];

const SKILL_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'technical', label: 'Technical' },
  { id: 'research', label: 'Research' },
  { id: 'creative', label: 'Creative' },
  { id: 'analytical', label: 'Analytical' },
  { id: 'utility', label: 'Utility' },
  { id: 'business', label: 'Business' },
];

export default function CustomAgentsPage() {
  const [mode, setMode] = useState('single');
  const [agentName, setAgentName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [description, setDescription] = useState('');
  const [baseIdea, setBaseIdea] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedMcpTools, setSelectedMcpTools] = useState([]);
  const [publishOption, setPublishOption] = useState('private');
  const [myAgents, setMyAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [skillCategoryFilter, setSkillCategoryFilter] = useState('all');
  const [mcpSearch, setMcpSearch] = useState('');
  const [skillSearch, setSkillSearch] = useState('');
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showMcpModal, setShowMcpModal] = useState(false);
  const [toast, setToast] = useState(null);
  const chatEndRef = useRef(null);

  const apiBase = '/api/v1';

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${apiBase}/agents/custom`, { credentials: 'include' })
      .then(r => r.json())
      .then(data => setMyAgents(data.custom_agents || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const filteredSkills = AVAILABLE_SKILLS.filter(s => {
    if (skillCategoryFilter !== 'all' && s.category !== skillCategoryFilter) return false;
    if (skillSearch && !s.name.toLowerCase().includes(skillSearch.toLowerCase())) return false;
    return true;
  });

  const filteredMcpTools = AVAILABLE_MCP_TOOLS.filter(t =>
    !mcpSearch || t.name.toLowerCase().includes(mcpSearch.toLowerCase())
  );

  const toggleSkill = (skillId) => {
    setSelectedSkills(prev =>
      prev.includes(skillId) ? prev.filter(s => s !== skillId) : [...prev, skillId]
    );
  };

  const toggleMcpTool = (toolId) => {
    setSelectedMcpTools(prev =>
      prev.includes(toolId) ? prev.filter(t => t !== toolId) : [...prev, toolId]
    );
  };

  const handleGenerate = async () => {
    if (!baseIdea.trim()) { showToast('Please enter a base idea first', 'warning'); return; }
    setIsGenerating(true);
    setGeneratedPrompt('');
    try {
      const r = await fetch(`${apiBase}/agents/generate-prompt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ base_idea: baseIdea, specialization }),
      });
      const data = await r.json();
      if (data.success) {
        setGeneratedPrompt(data.generated_prompt);
        showToast('Prompt generated successfully');
      } else {
        showToast('Failed to generate prompt', 'error');
      }
    } catch {
      showToast('Error connecting to server', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!agentName.trim()) { showToast('Please enter an agent name', 'warning'); return; }
    setIsSaving(true);
    try {
      const r = await fetch(`${apiBase}/agents/custom`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: agentName,
          description,
          specialization,
          skills: selectedSkills,
          mcp_tools: selectedMcpTools,
          system_prompt: generatedPrompt,
        }),
      });
      const data = await r.json();
      if (data.success) {
        showToast('Agent saved successfully');
        setAgentName(''); setSpecialization(''); setDescription('');
        setBaseIdea(''); setGeneratedPrompt('');
        setSelectedSkills([]); setSelectedMcpTools([]);
        const r2 = await fetch(`${apiBase}/agents/custom`, { credentials: 'include' });
        const data2 = await r2.json();
        setMyAgents(data2.custom_agents || []);
      } else {
        showToast('Failed to save agent', 'error');
      }
    } catch {
      showToast('Error connecting to server', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (agentId) => {
    try {
      const r = await fetch(`${apiBase}/agents/custom/${agentId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (r.ok) {
        showToast('Agent deleted');
        setMyAgents(prev => prev.filter(a => a.id !== agentId));
        if (selectedAgent?.id === agentId) setSelectedAgent(null);
      }
    } catch {
      showToast('Error deleting agent', 'error');
    }
  };

  const handleChatSend = async () => {
    if (!chatInput.trim() || !selectedAgent) return;
    const userMsg = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    try {
      const systemPrompt = selectedAgent.system_prompt || `You are a ${selectedAgent.name} agent specializing in ${selectedAgent.specialization || 'general tasks'}.`;
      const r = await fetch(`${apiBase}/chat/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          message: chatInput,
          system_prompt: systemPrompt,
          agent_name: 'CustodianAI',
        }),
      });
      const data = await r.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.response || data.text || 'No response' }]);
    } catch {
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Error connecting to server' }]);
    }
  };

  const subHeaderContent = (
    <>
      <div className="sub-header-stat">
        <span className="stat-label">My Custom Agents</span>
        <span className="stat-value">{myAgents.length}</span>
      </div>
      <div className="sub-header-divider"></div>
      <div className="sub-header-stat">
        <span className="stat-label">Skills Library</span>
        <span className="stat-value">{AVAILABLE_SKILLS.length}</span>
      </div>
      <div className="sub-header-divider"></div>
      <div className="sub-header-stat">
        <span className="stat-label">MCP Tools</span>
        <span className="stat-value">{AVAILABLE_MCP_TOOLS.length}</span>
      </div>
    </>
  );

  return (
    <MainLayout showSubHeader subHeaderContent={subHeaderContent}>
      <div className="page-header-box mb-3">
        <div className="section-header mb-0">
          <h2><i className="fas fa-users-cog me-2"></i>Custom Agents Studio</h2>
          <p>Create, customize, and publish your own AI agents with unique skills and MCP tools.</p>
        </div>
      </div>

      <div className="agents-studio-layout d-flex gap-3" style={{ flexWrap: 'wrap' }}>
        {/* LHS: Agent Creation */}
        <div className="agents-creation-panel" style={{ flex: '1 1 400px', minWidth: 0 }}>
          {/* Mode Toggle */}
          <div className="creation-mode-toggle mb-3" style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => setMode('single')} style={{
              padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem',
              border: mode === 'single' ? '1px solid var(--primary)' : '1px solid var(--border)',
              background: mode === 'single' ? 'var(--primary)' : 'transparent',
              color: mode === 'single' ? '#fff' : 'var(--text)',
            }}>
              <i className="fas fa-user me-1"></i> Single Agent
            </button>
            <button onClick={() => setMode('army')} style={{
              padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem',
              border: mode === 'army' ? '1px solid var(--primary)' : '1px solid var(--border)',
              background: mode === 'army' ? 'var(--primary)' : 'transparent',
              color: mode === 'army' ? '#fff' : 'var(--text)',
            }}>
              <i className="fas fa-users me-1"></i> Agent Army
            </button>
          </div>

          {/* Agent Config */}
          <div className="agent-config-card mb-3" style={{ background: 'var(--bg2)', borderRadius: '8px', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div className="card-header-custom" style={{ padding: '0.75rem 1rem', background: 'var(--bg3)', borderBottom: '1px solid var(--border)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--primary)' }}>
              <i className="fas fa-sliders-h me-2"></i>Agent Configuration
            </div>
            <div className="card-body-custom" style={{ padding: '1rem' }}>
              <div className="mb-3">
                <label className="form-label small">Agent Name</label>
                <input type="text" className="form-control form-control-sm" value={agentName} onChange={e => setAgentName(e.target.value)} placeholder="e.g., Code Reviewer Pro" />
              </div>
              <div className="mb-3">
                <label className="form-label small">Specialization</label>
                <input type="text" className="form-control form-control-sm" value={specialization} onChange={e => setSpecialization(e.target.value)} placeholder="e.g., Code Analysis & Review" />
              </div>
              <div className="mb-3">
                <label className="form-label small">Description</label>
                <textarea className="form-control form-control-sm" value={description} onChange={e => setDescription(e.target.value)} rows="3" placeholder="Describe what this agent does..." />
              </div>
            </div>
          </div>

          {/* AI Prompt Builder */}
          <div className="prompt-generator-card mb-3" style={{ background: 'var(--bg2)', borderRadius: '8px', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div className="card-header-custom" style={{ padding: '0.75rem 1rem', background: 'var(--bg3)', borderBottom: '1px solid var(--border)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--primary)' }}>
              <i className="fas fa-magic me-2"></i>AI Prompt Builder
            </div>
            <div className="card-body-custom" style={{ padding: '1rem' }}>
              <div className="mb-2">
                <label className="form-label small">Base Idea</label>
                <textarea className="form-control form-control-sm" value={baseIdea} onChange={e => setBaseIdea(e.target.value)} rows="2" placeholder="Describe what you want your agent to do..." />
              </div>
              <div className="d-flex gap-2 mb-2">
                <button className="btn btn-sm btn-outline-info" onClick={handleGenerate} disabled={isGenerating}>
                  <i className={`fas ${isGenerating ? 'fa-spinner fa-spin' : 'fa-sparkles'} me-1`}></i> {isGenerating ? 'Generating...' : 'Generate'}
                </button>
              </div>
              {generatedPrompt && (
                <div className="mt-2">
                  <label className="form-label small">Generated System Prompt</label>
                  <textarea className="form-control form-control-sm" value={generatedPrompt} onChange={e => setGeneratedPrompt(e.target.value)} rows="6" style={{ fontFamily: 'monospace', fontSize: '0.8rem' }} />
                </div>
              )}
            </div>
          </div>

          {/* Agent Skills */}
          <div className="skills-selection-card mb-3" style={{ background: 'var(--bg2)', borderRadius: '8px', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div className="card-header-custom d-flex justify-content-between align-items-center" style={{ padding: '0.75rem 1rem', background: 'var(--bg3)', borderBottom: '1px solid var(--border)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--primary)' }}>
              <span><i className="fas fa-star me-2"></i>Agent Skills</span>
              <button className="btn btn-sm btn-outline-info" onClick={() => setShowSkillModal(true)}>
                <i className="fas fa-plus me-1"></i> Add Skill
              </button>
            </div>
            <div className="card-body-custom" style={{ padding: '1rem' }}>
              {selectedSkills.length === 0 ? (
                <span className="text-muted small">No skills added yet. Click "Add Skill" to choose from the library.</span>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {selectedSkills.map(sid => {
                    const skill = AVAILABLE_SKILLS.find(s => s.id === sid);
                    if (!skill) return null;
                    return (
                      <span key={sid} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                        background: 'var(--primary-glow)', color: 'var(--primary)',
                        padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 500,
                      }}>
                        <i className={skill.icon} style={{ fontSize: '0.7rem' }}></i>
                        {skill.name}
                        <button onClick={() => setSelectedSkills(prev => prev.filter(s => s !== sid))} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: 0, fontSize: '0.8rem', lineHeight: 1 }}>
                          &times;
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* MCP Tools */}
          <div className="mcp-tools-card mb-3" style={{ background: 'var(--bg2)', borderRadius: '8px', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div className="card-header-custom d-flex justify-content-between align-items-center" style={{ padding: '0.75rem 1rem', background: 'var(--bg3)', borderBottom: '1px solid var(--border)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--primary)' }}>
              <span><i className="fas fa-plug me-2"></i>MCP Tools</span>
              <button className="btn btn-sm btn-outline-info" onClick={() => setShowMcpModal(true)}>
                <i className="fas fa-plus me-1"></i> Add MCP
              </button>
            </div>
            <div className="card-body-custom" style={{ padding: '1rem' }}>
              {selectedMcpTools.length === 0 ? (
                <span className="text-muted small">No MCP tools attached yet. Click "Add MCP" to choose from available tools.</span>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {selectedMcpTools.map(tid => {
                    const tool = AVAILABLE_MCP_TOOLS.find(t => t.id === tid);
                    if (!tool) return null;
                    return (
                      <span key={tid} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                        background: 'rgba(124,58,237,0.1)', color: 'var(--text)',
                        padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 500, border: '1px solid rgba(124,58,237,0.2)',
                      }}>
                        <i className="fas fa-plug" style={{ fontSize: '0.7rem', color: '#7c3aed' }}></i>
                        {tool.name}
                        <button onClick={() => setSelectedMcpTools(prev => prev.filter(t => t !== tid))} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, fontSize: '0.8rem', lineHeight: 1 }}>
                          &times;
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Publishing Options */}
          <div className="publishing-options-card mb-3" style={{ background: 'var(--bg2)', borderRadius: '8px', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div className="card-header-custom" style={{ padding: '0.75rem 1rem', background: 'var(--bg3)', borderBottom: '1px solid var(--border)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--primary)' }}>
              <i className="fas fa-globe me-2"></i>Publishing Options
            </div>
            <div className="card-body-custom" style={{ padding: '1rem' }}>
              <div className="form-check mb-2">
                <input className="form-check-input" type="radio" name="publish-option" id="publish-private" checked={publishOption === 'private'} onChange={() => setPublishOption('private')} />
                <label className="form-check-label" htmlFor="publish-private"><i className="fas fa-lock me-1"></i> Private (Only Me)</label>
              </div>
              <div className="form-check mb-3">
                <input className="form-check-input" type="radio" name="publish-option" id="publish-public" checked={publishOption === 'public'} onChange={() => setPublishOption('public')} />
                <label className="form-check-label" htmlFor="publish-public"><i className="fas fa-globe me-1"></i> Public (Shareable URL)</label>
              </div>
              <button className="btn btn-primary w-100" onClick={handleSave} disabled={isSaving}>
                <i className={`fas ${isSaving ? 'fa-spinner fa-spin' : 'fa-save'} me-2`}></i>{isSaving ? 'Saving...' : 'Save Agent'}
              </button>
            </div>
          </div>
        </div>

        {/* RHS: Display Panel */}
        <div className="agents-display-panel" style={{ flex: '1 1 400px', minWidth: 0 }}>
          <div className="agents-display-card" style={{ background: 'var(--bg2)', borderRadius: '8px', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div className="card-header-custom d-flex justify-content-between align-items-center" style={{ padding: '0.75rem 1rem', background: 'var(--bg3)', borderBottom: '1px solid var(--border)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--primary)' }}>
              <span><i className="fas fa-robot me-2"></i>My Custom Agents</span>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-secondary" onClick={() => { fetch(`${apiBase}/agents/custom`, { credentials: 'include' }).then(r => r.json()).then(d => setMyAgents(d.custom_agents || [])); showToast('Refreshed agent list'); }}>
                  <i className="fas fa-sync-alt me-1"></i> Refresh
                </button>
              </div>
            </div>
            <div className="card-body-custom" style={{ padding: '1rem' }}>
              {loading ? (
                <div className="text-center py-4"><i className="fas fa-spinner fa-spin fa-2x" style={{ color: 'var(--primary)' }}></i></div>
              ) : myAgents.length === 0 ? (
                <div className="text-center py-4 text-muted">
                  <i className="fas fa-inbox fa-3x mb-3 d-block"></i>
                  No custom agents yet. Configure one on the left and click Save!
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {myAgents.map(agent => (
                    <div key={agent.id} style={{
                      background: 'var(--card)', borderRadius: '8px', border: '1px solid var(--border)',
                      padding: '1rem', cursor: 'pointer', transition: 'all 0.2s',
                      borderLeft: selectedAgent?.id === agent.id ? '3px solid var(--primary)' : '1px solid var(--border)',
                    }} onClick={() => {
                      setSelectedAgent(agent);
                      setChatMessages([{ role: 'assistant', content: `Hi! I'm **${agent.name}**. Ask me anything related to ${agent.specialization || 'my specialization'}.` }]);
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h6 style={{ margin: 0, color: 'var(--text)', fontSize: '0.95rem', fontWeight: 600 }}>{agent.name}</h6>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{agent.specialization || 'General'}</span>
                        </div>
                        <button onClick={e => { e.stopPropagation(); handleDelete(agent.id); }} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.8rem' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(var(--danger-rgb),0.1)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                      {agent.description && <p style={{ fontSize: '0.8rem', color: 'var(--text2)', margin: '0.4rem 0 0', lineHeight: 1.4 }}>{agent.description}</p>}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.5rem' }}>
                        {(agent.skills || []).slice(0, 4).map(s => (
                          <span key={s} style={{ fontSize: '0.65rem', background: 'var(--primary-glow)', color: 'var(--primary)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>{s}</span>
                        ))}
                        {(agent.skills || []).length > 4 && <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>+{agent.skills.length - 4}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat */}
          {selectedAgent && (
            <div className="custom-agent-chat-card mt-3" style={{ background: 'var(--bg2)', borderRadius: '8px', border: '1px solid var(--border)', overflow: 'hidden' }}>
              <div className="card-header-custom d-flex justify-content-between align-items-center" style={{ padding: '0.75rem 1rem', background: 'var(--bg3)', borderBottom: '1px solid var(--border)' }}>
                <span><i className="fas fa-comments me-2"></i>Chat with <strong>{selectedAgent.name}</strong></span>
                <button className="btn btn-sm btn-outline-secondary" onClick={() => setSelectedAgent(null)}><i className="fas fa-times"></i></button>
              </div>
              <div className="card-body-custom p-0">
                <div style={{ height: '300px', overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {chatMessages.map((msg, i) => (
                    <div key={i} style={{
                      alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                      background: msg.role === 'user' ? 'var(--primary)' : 'var(--card)',
                      color: msg.role === 'user' ? '#fff' : 'var(--text)',
                      padding: '0.6rem 0.9rem',
                      borderRadius: msg.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                      fontSize: '0.85rem',
                      lineHeight: 1.5,
                    }}>
                      {msg.content}
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem', borderTop: '1px solid var(--border)' }}>
                  <textarea value={chatInput} onChange={e => setChatInput(e.target.value)}
                    placeholder="Type your message..."
                    rows="1" style={{
                      flex: 1, background: 'var(--bg3)', border: '1px solid var(--border)',
                      borderRadius: '8px', color: 'var(--text)', padding: '0.5rem',
                      resize: 'none', fontSize: '0.85rem',
                    }}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleChatSend(); } }} />
                  <button onClick={handleChatSend} style={{
                    padding: '0.5rem 1rem', background: 'var(--primary)', color: '#fff',
                    border: 'none', borderRadius: '8px', cursor: 'pointer',
                  }}><i className="fas fa-paper-plane"></i></button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <LoadingOverlay visible={false} />

      {/* ─── Skill Selection Overlay ─── */}
      {showSkillModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 1055,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
        }} onClick={() => setShowSkillModal(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'var(--bg2)', color: 'var(--text)',
            borderRadius: '12px', border: '1px solid var(--border)',
            width: '100%', maxWidth: '700px', maxHeight: '80vh',
            display: 'flex', flexDirection: 'column',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}>
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h5 style={{ margin: 0, fontSize: '1rem' }}><i className="fas fa-star me-2"></i>Select Skills</h5>
              <button onClick={() => setShowSkillModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem', padding: '0 0.25rem' }}>&times;</button>
            </div>
            <div style={{ padding: '1rem 1.25rem', overflowY: 'auto', flex: 1 }}>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Search skills..." value={skillSearch} onChange={e => setSkillSearch(e.target.value)} />
              </div>
              <div className="mb-3 d-flex gap-2 flex-wrap">
                {SKILL_CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => setSkillCategoryFilter(cat.id)} style={{
                    padding: '0.25rem 0.75rem', borderRadius: '12px', border: '1px solid var(--border)',
                    background: skillCategoryFilter === cat.id ? 'var(--primary)' : 'transparent',
                    color: skillCategoryFilter === cat.id ? '#fff' : 'var(--text)', cursor: 'pointer', fontSize: '0.8rem',
                    fontWeight: skillCategoryFilter === cat.id ? 600 : 400,
                  }}>{cat.label}</button>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem' }}>
                {filteredSkills.map(s => (
                  <label key={s.id} style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border)',
                    cursor: 'pointer', background: selectedSkills.includes(s.id) ? 'var(--primary-glow)' : 'transparent',
                    userSelect: 'none',
                  }}>
                    <input type="checkbox" checked={selectedSkills.includes(s.id)} onChange={() => toggleSkill(s.id)} style={{ accentColor: 'var(--primary)' }} />
                    <i className={s.icon} style={{ color: 'var(--primary)', fontSize: '0.8rem' }}></i>
                    <span style={{ fontSize: '0.85rem' }}>{s.name}</span>
                  </label>
                ))}
                {filteredSkills.length === 0 && <span className="text-muted small">No skills match your filter.</span>}
              </div>
            </div>
            <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-muted small">{selectedSkills.length} skill(s) selected</span>
              <button className="btn btn-primary btn-sm" onClick={() => setShowSkillModal(false)}>Done</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MCP Selection Overlay ─── */}
      {showMcpModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 1055,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
        }} onClick={() => setShowMcpModal(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'var(--bg2)', color: 'var(--text)',
            borderRadius: '12px', border: '1px solid var(--border)',
            width: '100%', maxWidth: '550px', maxHeight: '80vh',
            display: 'flex', flexDirection: 'column',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}>
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h5 style={{ margin: 0, fontSize: '1rem' }}><i className="fas fa-plug me-2"></i>Select MCP Tools</h5>
              <button onClick={() => setShowMcpModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem', padding: '0 0.25rem' }}>&times;</button>
            </div>
            <div style={{ padding: '1rem 1.25rem', overflowY: 'auto', flex: 1 }}>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Search MCP tools..." value={mcpSearch} onChange={e => setMcpSearch(e.target.value)} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {filteredMcpTools.map(t => (
                  <label key={t.id} style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.6rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border)',
                    cursor: 'pointer', background: selectedMcpTools.includes(t.id) ? 'rgba(124,58,237,0.08)' : 'transparent',
                    userSelect: 'none',
                  }}>
                    <input type="checkbox" checked={selectedMcpTools.includes(t.id)} onChange={() => toggleMcpTool(t.id)} style={{ accentColor: '#7c3aed' }} />
                    <i className="fas fa-plug" style={{ color: '#7c3aed', fontSize: '0.8rem' }}></i>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{t.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{t.url}</div>
                    </div>
                  </label>
                ))}
                {filteredMcpTools.length === 0 && <span className="text-muted small">No MCP tools match your search.</span>}
              </div>
            </div>
            <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-muted small">{selectedMcpTools.length} tool(s) selected</span>
              <button className="btn btn-primary btn-sm" onClick={() => setShowMcpModal(false)}>Done</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999,
          padding: '0.75rem 1.5rem', borderRadius: '8px',
          background: toast.type === 'error' ? 'var(--danger)' : toast.type === 'warning' ? 'var(--warning)' : 'var(--success)',
          color: '#fff', fontSize: '0.9rem', fontWeight: 500,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          animation: 'fadeInUp 0.3s ease',
        }}>
          <i className={`fas ${toast.type === 'error' ? 'fa-exclamation-circle' : toast.type === 'warning' ? 'fa-exclamation-triangle' : 'fa-check-circle'} me-2`}></i>
          {toast.msg}
        </div>
      )}
    </MainLayout>
  );
}
