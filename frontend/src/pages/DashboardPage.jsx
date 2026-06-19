import { useState, useEffect, useRef, useCallback } from 'react';
import { marked } from 'marked';
import MainLayout from '../components/layout/MainLayout';
import LoadingOverlay from '../components/shared/LoadingOverlay';

const API_BASE = '/api/v1';

const AGENT_UI_DATA = {
  CustodianAI: { description: 'Orchestrates tasks and coordinates all other AI agents to achieve mission objectives.', useCases: ['"Summarize the status of all active agents."', '"Assign a research task about market trends to the best agent."'] },
  AnalystAI: { description: 'Specializes in data interpretation, market trends, and statistical analysis.', useCases: ['"Analyze the attached dataset and find correlations."', '"What are the current market trends for AI technologies?"'] },
  DataAnalystAI: { description: 'Focuses on deep data processing, ETL tasks, and complex statistical modeling.', useCases: ['"Clean and normalize this messy CSV file."', '"Build a predictive model based on this historical sales data."'] },
  MarketAnalystAI: { description: 'Tracks market indicators, competitor analysis, and consumer behavior.', useCases: ['"Provide a competitive analysis for the electric vehicle market."', '"What are the projected growth sectors in tech for next year?"'] },
  CreativeAI: { description: 'Generates novel concepts, content, and visual designs for creative tasks.', useCases: ['"Brainstorm 5 unique marketing campaigns for a new product."', '"Write a catchy slogan for an eco-friendly brand."'] },
  WriterAI: { description: 'Crafts compelling copy, articles, and long-form written content.', useCases: ['"Draft a 500-word blog post about the benefits of remote work."', '"Edit this email to sound more professional and persuasive."'] },
  DesignerAI: { description: 'Suggests UI/UX improvements, color palettes, and visual design concepts.', useCases: ['"Suggest a modern color palette for a healthcare app."', '"How can I improve the user flow of this checkout process?"'] },
  TechnicalAI: { description: 'Handles code generation, system architecture, and complex technical problem-solving.', useCases: ['"Review this architecture diagram and suggest optimizations."', '"Explain the tradeoffs between microservices and monoliths."'] },
  CoderAI: { description: 'Specializes in writing, debugging, and refactoring code across multiple languages.', useCases: ['"Write a Python script to scrape product prices from a website."', '"Find the bug in this React component that\u2019s causing a memory leak."'] },
  ArchitectAI: { description: 'Designs scalable system architectures and evaluates infrastructure choices.', useCases: ['"Design a highly available database schema for a social network."', '"What is the best cloud architecture for a real-time streaming app?"'] },
  ResearchAI: { description: 'Conducts in-depth research, fact-checking, and information synthesis.', useCases: ['"Gather comprehensive research on renewable energy policies in Europe."', '"Summarize the key findings of this 50-page academic paper."'] },
  FactCheckerAI: { description: 'Verifies claims, cross-references sources, and ensures informational accuracy.', useCases: ['"Fact-check the claims made in this news article."', '"Find credible sources to support this historical statement."'] },
  TrendAnalystAI: { description: 'Identifies emerging patterns and forecasts future trends in various domains.', useCases: ['"What are the emerging trends in remote team collaboration tools?"', '"Analyze social media sentiment to forecast next season\u2019s fashion trends."'] },
};

function apiGet(path) {
  return fetch(`${API_BASE}${path}`, { credentials: 'include' }).then(r => r.json());
}

export default function DashboardPage() {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState('anthropic');
  const [activeAgents, setActiveAgents] = useState(0);
  const [chatId, setChatId] = useState(() => 'chat-' + Date.now());
  const [incognito, setIncognito] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    loadInitialData();
    const handleLoadChat = (e) => {
      const chat = e.detail;
      if (chat && chat.messages) {
        setMessages(chat.messages);
        setChatId(chat.id);
        const firstAgentMsg = chat.messages.find(m => m.sender !== 'You');
        if (firstAgentMsg) {
          const agent = agents.find(a => a.name === firstAgentMsg.sender);
          if (agent) setSelectedAgent(agent);
        }
      }
    };
    window.addEventListener('load-chat', handleLoadChat);
    window.addEventListener('provider-changed', handleProviderChanged);
    return () => {
      window.removeEventListener('load-chat', handleLoadChat);
      window.removeEventListener('provider-changed', handleProviderChanged);
    };
  }, []);

  const handleProviderChanged = async (e) => {
    const newProvider = e.detail;
    setProvider(newProvider);
    try {
      const agentsData = await fetch(`${API_BASE}/agents`, { credentials: 'include' }).then(r => r.json());
      setAgents(agentsData.agents || []);
      setActiveAgents(agentsData.agents?.length || 0);
      const preferred = agentsData.agents.find(a => a.name === 'CustodianAI');
      setSelectedAgent(preferred || agentsData.agents[0]);
      setMessages([]);
    } catch (e) {
      console.error('Failed to reload agents after provider change', e);
    }
  };

  const loadInitialData = async () => {
    try {
      const [providerData, agentsData] = await Promise.all([
        apiGet('/provider/active'),
        apiGet('/agents'),
      ]);
      setProvider(providerData.active_provider || 'anthropic');
      setAgents(agentsData.agents || []);
      setActiveAgents(agentsData.agents?.length || 0);
      if (agentsData.agents?.length > 0) {
        const preferred = agentsData.agents.find(a => a.name === 'CustodianAI');
        setSelectedAgent(preferred || agentsData.agents[0]);
      }
    } catch (e) {
      console.error('Failed to load initial data', e);
    }
  };

  const selectAgent = (agent) => {
    setSelectedAgent(agent);
    const uiData = AGENT_UI_DATA[agent.name] || {};
    const desc = uiData.description || 'A versatile AI assistant ready for any task.';
    const useCases = uiData.useCases || [];
    const casesMd = useCases.length ? useCases.map(u => `- \`${u}\``).join('\n') : '';
    const welcome = `## Welcome to ${agent.name}\n\n${desc}\n\n${useCases.length ? `**Example use cases:**\n${casesMd}\n\n` : ''}I'm ready to help. What would you like to do?`;
    setMessages([{ sender: agent.name, content: welcome }]);
    setChatId('chat-' + Date.now());
  };

  const statusPhrases = ['Thinking...', 'Analyzing...', 'Synthesizing...', 'Generating...'];
  const sendMessage = async () => {
    if (!input.trim() || isLoading || !selectedAgent) return;
    const msg = input.trim();
    setInput('');
    setIsLoading(true);

    const userMsg = { sender: 'You', content: msg };
    const agentName = selectedAgent.name || 'Assistant';
    const agentMsg = { sender: agentName, content: '', _streaming: true, _status: 'Thinking...' };
    setMessages(prev => [...prev, userMsg, agentMsg]);

    let accumulatedContent = '';
    let statusIdx = 0;
    const statusInterval = setInterval(() => {
      statusIdx = (statusIdx + 1) % statusPhrases.length;
      setMessages(prev => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last && last._streaming && !accumulatedContent) {
          updated[updated.length - 1] = { ...last, _status: statusPhrases[statusIdx] };
        }
        return updated;
      });
    }, 1200);

    try {
      const userStr = localStorage.getItem('custodian_user');
      const isGuest = !userStr;
      const endpoint = isGuest ? '/api/v1/chat/stream/guest' : '/api/v1/chat/stream';

      let body = {
        message: msg,
        agent_id: selectedAgent.agent_id,
        agent_name: selectedAgent.name,
        history: [...messages.slice(-19), userMsg],
      };

      let response = await fetch(endpoint, {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        if (response.status === 404 && errData.detail?.includes('Agent')) {
          // Agent went stale (provider switch) — reload agents and retry once
          const agentsData = await apiGet('/agents');
          setAgents(agentsData.agents || []);
          const refreshed = agentsData.agents.find(a => a.name === selectedAgent?.name);
          if (refreshed) {
            setSelectedAgent(refreshed);
            body.agent_id = refreshed.agent_id;
            response = await fetch(endpoint, {
              method: 'POST', credentials: 'include',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body),
            });
          }
        }
        if (!response.ok) {
          const err2 = response.status === 404
            ? { detail: 'Agent not found after refresh. Please select the agent again.' }
            : await response.json().catch(() => ({}));
          throw new Error(err2.detail || 'Failed to send message');
        }
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split('\n\n');
        buffer = parts.pop() || '';

        for (const part of parts) {
          if (!part || !part.startsWith('data: ')) continue;
          try {
            const eventData = JSON.parse(part.slice(6));
            if (eventData.type === 'message') {
              if (!accumulatedContent) clearInterval(statusInterval);
              accumulatedContent += eventData.content;
              setMessages(prev => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last && last._streaming) {
                  updated[updated.length - 1] = { ...last, content: accumulatedContent, _status: null };
                }
                return updated;
              });
            } else if (eventData.type === 'done') {
              clearInterval(statusInterval);
              setMessages(prev => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last && last._streaming) {
                  updated[updated.length - 1] = { sender: agentName, content: accumulatedContent, _streaming: false, _status: null };
                }
                return updated;
              });
            } else if (eventData.type === 'error') {
              throw new Error(eventData.content);
            }
          } catch (e) {
            console.warn('SSE parse error:', e);
          }
        }
      }
    } catch (e) {
      clearInterval(statusInterval);
      setMessages(prev => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last && last._streaming) {
          updated[updated.length - 1] = { sender: agentName, content: accumulatedContent || `Error: ${e.message}`, _streaming: false, _status: null };
        }
        return updated;
      });
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleTextareaInput = (e) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px';
  };

  const providerLabel = provider === 'anthropic' ? 'Anthropic' : 'Google';

  const subHeaderContent = (
    <>
      <div className="sub-header-stat">
        <span className="stat-label">Active Agents</span>
        <span className="stat-value" id="active-agents">{activeAgents}</span>
      </div>
      <div className="sub-header-divider"></div>
      <div className="sub-header-stat">
        <span className="stat-label">System Status</span>
        <span className="stat-value status-online" id="system-status">Online</span>
      </div>
      <div className="sub-header-divider"></div>
      <div className="sub-header-stat">
        <span className="stat-label">Current Provider</span>
        <span className="stat-value" id="current-provider" style={{ color: provider === 'anthropic' ? 'var(--warning-color)' : 'var(--info-color)' }}>{providerLabel}</span>
      </div>
    </>
  );

  return (
    <MainLayout showSubHeader={true} subHeaderContent={subHeaderContent}>
      <div className="page-header-box mb-3">
        <div className="section-header mb-0">
          <h2><i className="fas fa-brain me-2"></i>Custodian AI Dashboard</h2>
          <p>Select an agent from the list to start a conversation.</p>
        </div>
      </div>

      <div className="chat-container chat-container-desktop">
        <div className="chat-main" id="chat-main" style={{ flex: 1, minHeight: 0 }}>
          {selectedAgent && (
            <div className="active-agent-banner d-flex align-items-center gap-2 flex-wrap px-3 py-2" style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(77,171,247,0.03)' }}>
              <span className="badge" style={{ background: 'var(--primary-color)', color: '#000' }}><i className="fas fa-robot me-1"></i>Active Agent</span>
              <span className="fw-bold" style={{ color: 'var(--primary-color)', fontSize: '0.85rem' }}>{selectedAgent.name}</span>
              <span className="small" style={{ color: 'var(--text-secondary)' }}>· {selectedAgent.specialization || 'general'}</span>
            </div>
          )}
          <div className="chat-messages" id="chat-messages">
            {messages.length === 0 ? (
              <div className="welcome-message">
                <i className="fas fa-robot"></i>
                <p>Welcome to the Custodian AI Army!</p>
                <p>Select an agent to begin your conversation.</p>
              </div>
            ) : (
              messages.map((msg, i) => {
                const isUser = msg.sender === 'You';
                const isStreaming = msg._streaming;
                const parsed = isUser || isStreaming ? msg.content : marked.parse(msg.content);
                return (
                  <div key={i} className={`message ${isUser ? 'user' : 'agent'}`}>
                    <div className="message-header" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{msg.sender}</div>
                    {isStreaming ? (
                      <div className="message-content">{msg.content}<span className="streaming-cursor">▊</span></div>
                    ) : (
                      <div className={`message-content ${isUser ? '' : 'markdown-body'}`} dangerouslySetInnerHTML={{ __html: parsed }} />
                    )}
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-options-bar d-flex align-items-center gap-2 px-3 py-2" style={{ borderTop: '1px solid var(--border-color)', background: 'rgba(77,171,247,0.03)' }}>
            <div className="dropdown">
              <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" title="Switch agent" style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem' }}>
                <i className="fas fa-robot me-1"></i> {selectedAgent?.name || 'Agent'}
              </button>
              <ul className="dropdown-menu" style={{ maxHeight: '300px', overflowY: 'auto', fontSize: '0.8rem' }}>
                {agents.map(agent => (
                  <li key={agent.agent_id}>
                    <a className={`dropdown-item ${selectedAgent?.agent_id === agent.agent_id ? 'active' : ''}`} href="#"
                      onClick={(e) => { e.preventDefault(); selectAgent(agent); }}>
                      <i className="fas fa-robot text-info me-2"></i>
                      <span>{agent.name}</span>
                      <small className="ms-1 text-muted">· {agent.specialization || 'general'}</small>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="form-check form-switch ms-auto">
              <input className="form-check-input" type="checkbox" id="incognitoToggle"
                checked={incognito}
                onChange={e => setIncognito(e.target.checked)}
              />
              <label className="form-check-label small" htmlFor="incognitoToggle" style={{ color: 'var(--text-secondary)' }}>
                <i className="fas fa-user-secret"></i> Incognito
              </label>
            </div>
          </div>

          <div className="chat-input-container">
            <textarea
              ref={inputRef}
              id="chat-input"
              placeholder={selectedAgent ? `Message ${selectedAgent.name}...` : 'Select an agent to start...'}
              value={input}
              onChange={handleTextareaInput}
              onKeyDown={handleKeyDown}
              disabled={!selectedAgent || isLoading}
              rows="1"
            />
            <button id="send-btn" onClick={sendMessage} disabled={!selectedAgent || isLoading || !input.trim()}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>

      <LoadingOverlay visible={false} />
    </MainLayout>
  );
}
