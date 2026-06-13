import { useState, useEffect, useCallback } from 'react';
import MainLayout from '../components/layout/MainLayout';
import LoadingOverlay from '../components/shared/LoadingOverlay';

const API_BASE = '/api/v1';

const CATEGORIES = [
  { id: 'professional', label: 'Professional', icon: 'fa-briefcase' },
  { id: 'academic', label: 'Academic', icon: 'fa-graduation-cap' },
  { id: 'technical', label: 'Technical', icon: 'fa-microchip' },
  { id: 'creative', label: 'Creative', icon: 'fa-palette' },
  { id: 'general', label: 'General', icon: 'fa-folder' },
];

const ALL_SECTION_DEFS = [
  { id: 'personal_info', name: 'Personal Info', icon: 'fa-user', required: true, type: 'object' },
  { id: 'summary', name: 'Professional Summary', icon: 'fa-align-left', required: false, type: 'text' },
  { id: 'education', name: 'Education', icon: 'fa-graduation-cap', required: true, type: 'array' },
  { id: 'experience', name: 'Experience', icon: 'fa-briefcase', required: true, type: 'array' },
  { id: 'skills', name: 'Skills', icon: 'fa-code', required: true, type: 'array' },
  { id: 'certifications', name: 'Certifications', icon: 'fa-certificate', required: false, type: 'array' },
  { id: 'projects', name: 'Projects', icon: 'fa-project-diagram', required: false, type: 'array' },
  { id: 'achievements', name: 'Achievements', icon: 'fa-trophy', required: false, type: 'array' },
  { id: 'languages', name: 'Languages', icon: 'fa-language', required: false, type: 'array' },
  { id: 'publications', name: 'Publications', icon: 'fa-book', required: false, type: 'array' },
  { id: 'volunteering', name: 'Volunteering', icon: 'fa-hands-helping', required: false, type: 'array' },
  { id: 'references', name: 'References', icon: 'fa-address-card', required: false, type: 'array' },
];

const EMPTY_RESUME = {};

const BUILTIN_TEMPLATES = [
  {
    name: 'Modern Professional',
    category: 'professional',
    description: 'Clean, ATS-optimized layout for corporate and tech roles. Full demo content included.',
    section_defs: ALL_SECTION_DEFS.filter(s => ['personal_info','summary','education','experience','skills','certifications','projects','achievements'].includes(s.id)),
    default_enabled_sections: ['personal_info','summary','education','experience','skills','certifications','projects','achievements'],
    pages: [{ page_number: 1, layout: 'single', sections: ['personal_info','summary','education','experience','skills','certifications','projects','achievements'] }],
    styling: { font: "'Times New Roman', serif", size: '11pt', primary_color: '#222', accent_color: '#4dabf7', spacing: 'compact' },
    data: {
      personal_info: { full_name: '', email: '', phone: '', linkedin: '', github: '', website: '', title: 'Software Engineer', summary: 'Results-driven software engineer with expertise in full-stack development, cloud architecture, and team leadership.' },
      education: [{ id: 1, degree: 'B.Tech in Computer Science', institution: 'University of Technology', field_of_study: 'Computer Science', start_date: '2018', end_date: '2022', cgpa: '8.5', achievements: "Dean's list, Hackathon winner" }],
      experience: [{ id: 1, company: 'Tech Corp', role: 'Senior Software Engineer', location: '', start_date: '06/2022', end_date: '', current: true, description: 'Led development of microservices architecture serving 1M+ users.', tech_stack: ['React', 'Python', 'AWS', 'PostgreSQL'], achievements: ['Reduced deployment time by 60%', 'Mentored 3 junior developers'] }],
      certifications: [{ id: 1, name: 'AWS Solutions Architect', issuer: 'Amazon', date: '2023', url: '' }],
      skills: [{ id: 1, value: 'React' }, { id: 2, value: 'Python' }, { id: 3, value: 'TypeScript' }, { id: 4, value: 'AWS' }, { id: 5, value: 'Docker' }, { id: 6, value: 'PostgreSQL' }],
      projects: [{ id: 1, name: 'E-Commerce Platform', description: 'Built a scalable e-commerce platform with React, Node.js, and AWS.', tech_stack: ['React', 'Node.js', 'AWS'], url: '' }],
      achievements: [{ id: 1, value: 'Best Innovation Award 2023' }, { id: 2, value: 'Published 3 technical articles' }],
    },
  },
  {
    name: 'Classic Academic',
    category: 'academic',
    description: 'Traditional two-page format for research and academic roles.',
    section_defs: ALL_SECTION_DEFS.filter(s => ['personal_info','education','experience','skills','certifications','projects','achievements','publications','languages','volunteering'].includes(s.id)),
    default_enabled_sections: ['personal_info','summary','education','experience','skills','certifications','projects','achievements','publications','languages'],
    pages: [
      { page_number: 1, layout: 'single', sections: ['personal_info','summary','education','experience'] },
      { page_number: 2, layout: 'single', sections: ['skills','certifications','projects','publications','achievements','languages'] },
    ],
    styling: { font: "'Times New Roman', serif", size: '12pt', primary_color: '#1a1a2e', accent_color: '#6c5ce7', spacing: 'relaxed' },
    data: {},
  },
  {
    name: 'Full-Stack Developer',
    category: 'technical',
    description: 'Skills-first layout highlighting technical stack and project experience.',
    section_defs: ALL_SECTION_DEFS.filter(s => ['personal_info','summary','education','experience','skills','certifications','projects','achievements','languages'].includes(s.id)),
    default_enabled_sections: ['personal_info','summary','skills','experience','projects','education','certifications','achievements'],
    pages: [{ page_number: 1, layout: 'single', sections: ['personal_info','summary','skills','experience','projects','education','certifications','achievements'] }],
    styling: { font: "'Segoe UI', sans-serif", size: '10.5pt', primary_color: '#0d1117', accent_color: '#58a6ff', spacing: 'compact' },
    data: {},
  },
  {
    name: 'Executive Leader',
    category: 'professional',
    description: 'Executive-focused layout emphasizing leadership and strategy.',
    section_defs: ALL_SECTION_DEFS.filter(s => ['personal_info','summary','education','experience','skills','certifications','achievements','volunteering','references'].includes(s.id)),
    default_enabled_sections: ['personal_info','summary','experience','education','certifications','achievements','volunteering'],
    pages: [
      { page_number: 1, layout: 'single', sections: ['personal_info','summary','experience'] },
      { page_number: 2, layout: 'single', sections: ['education','certifications','achievements','volunteering'] },
    ],
    styling: { font: "'Georgia', serif", size: '11pt', primary_color: '#1a1a2e', accent_color: '#c9a84c', spacing: 'relaxed' },
    data: {},
  },
  {
    name: 'Creative Portfolio',
    category: 'creative',
    description: 'Modern layout for designers, artists, and creative professionals.',
    section_defs: ALL_SECTION_DEFS.filter(s => ['personal_info','summary','education','experience','skills','projects','achievements','languages'].includes(s.id)),
    default_enabled_sections: ['personal_info','summary','skills','experience','projects','education','achievements'],
    pages: [{ page_number: 1, layout: 'single', sections: ['personal_info','summary','skills','experience','projects','education','achievements'] }],
    styling: { font: "'Inter', sans-serif", size: '10pt', primary_color: '#2d3436', accent_color: '#e17055', spacing: 'compact' },
    data: {},
  },
  {
    name: 'Student Internship',
    category: 'academic',
    description: 'Internship-focused layout highlighting education, projects, and technical skills for students and entry-level candidates.',
    section_defs: ALL_SECTION_DEFS.filter(s => ['personal_info','summary','education','skills','projects','achievements','certifications','languages','volunteering'].includes(s.id)),
    default_enabled_sections: ['personal_info','summary','education','skills','projects','achievements','certifications','languages'],
    pages: [{ page_number: 1, layout: 'single', sections: ['personal_info','summary','education','skills','projects','achievements','certifications','languages'] }],
    styling: { font: "'Inter', sans-serif", size: '10.5pt', primary_color: '#0f172a', accent_color: '#06b6d4', spacing: 'compact' },
    data: {},
  },
];

function computeDiffSections(optimizedData, originalData) {
  const sections = new Set();
  if (!optimizedData) return sections;
  for (const [section, val] of Object.entries(optimizedData)) {
    if (section === 'personal_info') {
      for (const [key, newVal] of Object.entries(val)) {
        const oldVal = originalData?.personal_info?.[key];
        if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
          sections.add('personal_info');
          break;
        }
      }
    } else if (Array.isArray(val)) {
      const oldArr = originalData?.[section] || [];
      if (JSON.stringify(oldArr) !== JSON.stringify(val)) { sections.add(section); }
    }
  }
  return sections;
}

function getChangedFields(optimizedData, originalData) {
  const fields = new Set();
  const optPi = optimizedData?.personal_info;
  const origPi = originalData?.personal_info || {};
  if (optPi) {
    for (const [key, newVal] of Object.entries(optPi)) {
      if (JSON.stringify(origPi[key]) !== JSON.stringify(newVal)) { fields.add(key); }
    }
  }
  return fields;
}

export default function ResumePage() {
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('list');
  const [resumes, setResumes] = useState([]);
  const [currentResume, setCurrentResume] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [jdText, setJdText] = useState('');
  const [showJdInput, setShowJdInput] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [editField, setEditField] = useState(null);
  const CHAT_COMPACTION_CHAR_THRESHOLD = 8000;

  const handleFieldSave = (value, section, field, index = null) => {
    setCurrentResume(prev => {
      if (!prev) return prev;
      const newData = JSON.parse(JSON.stringify(prev.data));
      if (index !== null) {
        if (!newData[section]) newData[section] = [];
        if (!newData[section][index]) newData[section][index] = {};
        newData[section][index][field] = value;
      } else if (section === 'personal_info') {
        if (!newData.personal_info) newData.personal_info = {};
        newData.personal_info[field] = value;
      } else {
        newData[section] = value;
      }
      return { ...prev, data: newData };
    });
    setEditField(null);
  };

  const isEditing = (section, field, index = null) => {
    if (!editField) return false;
    return editField.section === section && editField.field === field && editField.index === index;
  };

  const getBlankItem = (section) => {
    const id = Date.now();
    switch (section) {
      case 'education': return { id, degree: '', institution: '', field_of_study: '', start_date: '', end_date: '', cgpa: '', achievements: '' };
      case 'experience': return { id, company: '', role: '', location: '', start_date: '', end_date: '', current: false, description: '', tech_stack: [], achievements: [] };
      case 'skills': return { id, value: '' };
      case 'certifications': return { id, name: '', issuer: '', date: '', url: '' };
      case 'projects': return { id, name: '', description: '', tech_stack: [], url: '' };
      case 'achievements': return { id, value: '' };
      default: return { id };
    }
  };

  const addSectionItem = (section) => {
    const newItem = getBlankItem(section);
    setCurrentResume(prev => {
      if (!prev) return prev;
      const newData = JSON.parse(JSON.stringify(prev.data));
      if (!newData[section]) newData[section] = [];
      newData[section].push(newItem);
      return { ...prev, data: newData };
    });
    const idx = (currentResume?.data?.[section] || []).length;
    if (section === 'skills') {
      setEditField({ section, field: '_section', index: null });
    } else {
      setEditField({ section, field: section === 'achievements' ? 'value' : 'name', index: idx });
    }
  };

  const removeSectionItem = (section, index, e) => {
    if (e) e.stopPropagation();
    setCurrentResume(prev => {
      if (!prev) return prev;
      const newData = JSON.parse(JSON.stringify(prev.data));
      if (newData[section]) {
        newData[section] = newData[section].filter((_, i) => i !== index);
      }
      return { ...prev, data: newData };
    });
    setEditField(null);
  };

  const [userTemplates, setUserTemplates] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedCategory, setSelectedCategory] = useState('professional');
  const [availableCategories, setAvailableCategories] = useState(CATEGORIES);
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingChanges, setPendingChanges] = useState(null);
  const [remainingSections, setRemainingSections] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadResumes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/resumes`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setResumes(data.resumes || []);
      }
    } catch (e) { console.error('Failed to load resumes', e); }
    setLoading(false);
  }, []);

  const loadTemplates = useCallback(async (category) => {
    try {
      const params = category ? `?category=${category}` : '';
      const res = await fetch(`${API_BASE}/resumes/templates${params}`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setUserTemplates(data.templates || []);
      }
    } catch (e) { console.error('Failed to load templates', e); }
  }, []);

  const loadCategories = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/resumes/templates/categories`, { credentials: 'include' });
      if (!res.ok) return;
      const text = await res.text();
      if (!text.startsWith('{')) return; // not JSON
      const data = JSON.parse(text);
      if (data.categories?.length) {
        const merged = CATEGORIES.filter(c => data.categories.includes(c.id));
        const extras = data.categories.filter(c => !CATEGORIES.find(x => x.id === c)).map(c => ({ id: c, label: c.charAt(0).toUpperCase() + c.slice(1), icon: 'fa-folder' }));
        setAvailableCategories([...merged, ...extras]);
      }
    } catch (e) { console.error('Failed to load categories', e); }
  }, []);

  useEffect(() => { loadResumes(); loadTemplates(selectedCategory); loadCategories(); }, [loadResumes, loadTemplates, loadCategories, selectedCategory]);

  // Load chat history when entering viewer
  useEffect(() => {
    if (view === 'viewer' && currentResume?.id) {
      fetch(`${API_BASE}/resumes/${currentResume.id}/chat`, { credentials: 'include' })
        .then(r => r.json())
        .then(data => {
          if (data.chat_history) setChatHistory(data.chat_history);
        })
        .catch(() => {});
    }
  }, [view, currentResume?.id]);

  // Auto-expand templates panel when entering editor
  useEffect(() => {
    if (view === 'editor') {
      setActiveTab('templates');
    }
  }, [view]);

  const createResume = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/resumes`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Untitled Resume', data: EMPTY_RESUME }),
      });
      if (res.status === 403) {
        const err = await res.json();
        alert(err.detail);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setCurrentResume(data.resume);
        setView('editor');
        setActiveTab('personal');
        await loadResumes();
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.detail || 'Failed to create resume. Make sure the backend server is running.');
      }
    } catch (e) { console.error('Failed to create resume', e); alert('Network error — is the backend running?'); }
    setLoading(false);
  };

  const saveResume = async () => {
    if (!currentResume) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/resumes/${currentResume.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: currentResume.data, title: currentResume.title, template_name: currentResume.template_name || null }),
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentResume(data.resume);
        setLoading(false);
        setView('viewer');
        loadResumes();
      } else {
        setLoading(false);
        const err = await res.json().catch(() => ({}));
        alert(err.detail || 'Failed to save resume. Is the backend running?');
      }
    } catch (e) { console.error('Failed to save resume', e); setLoading(false); alert('Network error — is the backend running?'); }
  };

  const deleteResume = async (id) => {
    if (!confirm('Delete this resume?')) return;
    setLoading(true);
    try {
      await fetch(`${API_BASE}/resumes/${id}`, { method: 'DELETE', credentials: 'include' });
      if (currentResume?.id === id) { setCurrentResume(null); setView('list'); }
      await loadResumes();
    } catch (e) { console.error('Failed to delete resume', e); }
    setLoading(false);
  };

  const startRename = (resume) => {
    setRenamingId(resume.id);
    setRenameValue(resume.title || '');
  };

  const submitRename = async (id) => {
    if (!renameValue.trim()) { setRenamingId(null); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/resumes/${id}`, {
        method: 'PUT', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: renameValue.trim() }),
      });
      if (res.ok) {
        setRenamingId(null);
        await loadResumes();
      }
    } catch (e) { console.error('Failed to rename resume', e); }
    setLoading(false);
  };

  const acceptSection = (section) => {
    setPendingChanges(prev => {
      if (!prev) return prev;
      const newOriginal = { ...prev.originalData };
      if (section === 'personal_info') {
        newOriginal.personal_info = { ...(newOriginal.personal_info || {}), ...(prev.optimizedData.personal_info || {}) };
      } else {
        newOriginal[section] = prev.optimizedData[section];
      }
      setCurrentResume(cr => ({ ...cr, data: newOriginal }));
      const newRemaining = new Set(prev.remainingSections);
      newRemaining.delete(section);
      if (newRemaining.size === 0) {
        setRemainingSections(null);
        return null;
      }
      setRemainingSections(newRemaining);
      return { ...prev, originalData: newOriginal, remainingSections: newRemaining };
    });
  };

  const rejectSection = (section) => {
    setPendingChanges(prev => {
      if (!prev) return prev;
      const newRemaining = new Set(prev.remainingSections);
      newRemaining.delete(section);
      if (newRemaining.size === 0) {
        setPendingChanges(null);
        setRemainingSections(null);
        return null;
      }
      setRemainingSections(newRemaining);
      return { ...prev, remainingSections: newRemaining };
    });
  };

  const saveAcceptedData = async (data, optimization) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/resumes/${currentResume.id}`, {
        method: 'PUT', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, title: currentResume.title, template_name: currentResume.template_name || null }),
      });
      if (res.ok) {
        const result = await res.json();
        setCurrentResume(result.resume);
        setOptimizationResult(optimization);
        await loadResumes();
      }
    } catch (e) { console.error('Failed to save accepted data', e); }
    setLoading(false);
  };

  const optimizeResume = async () => {
    if (!currentResume) return;
    setLoading(true);
    setOptimizationResult(null);
    try {
      const res = await fetch(`${API_BASE}/resumes/${currentResume.id}/optimize`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume_id: currentResume.id, jd: jdText || null }),
      });
      if (res.ok) {
        const data = await res.json();
        setOptimizationResult(data.optimization);
        if (data.optimization?.optimized_data) {
          const originalData = JSON.parse(JSON.stringify(currentResume.data));
          const diffSections = computeDiffSections(data.optimization.optimized_data, originalData);
          setRemainingSections(diffSections);
          setPendingChanges({
            originalData,
            optimizedData: data.optimization.optimized_data,
            remainingSections: diffSections,
            optimization: data.optimization,
            changes: data.optimization.changes || [],
          });
          if (data.optimization.ats_score) {
            setCurrentResume(prev => ({ ...prev, ats_score: data.optimization.ats_score }));
          }
        }
        setView('viewer');
      }
    } catch (e) { console.error('Failed to optimize resume', e); }
    setLoading(false);
  };

  const applyTemplate = async (indexOrName) => {
    let templateData, name, category, sectionDefs;
    if (typeof indexOrName === 'number') {
      const builtin = BUILTIN_TEMPLATES[indexOrName];
      if (!builtin) return;
      templateData = builtin.data;
      name = builtin.name;
      category = builtin.category;
      sectionDefs = builtin.section_defs;
    } else {
      const tpl = userTemplates.find(t => t.name === indexOrName);
      if (!tpl) return;
      templateData = tpl.config;
      name = tpl.name;
      category = tpl.category || 'general';
      sectionDefs = tpl.section_defs || ALL_SECTION_DEFS;
    }
    setCurrentResume(prev => {
      const existing = prev?.data || {};
      const merged = JSON.parse(JSON.stringify(templateData || {}));
      sectionDefs.forEach(section => {
        const secId = section.id;
        if (existing[secId] !== undefined) {
          merged[secId] = existing[secId];
        }
      });
      Object.keys(existing).forEach(key => {
        if (!sectionDefs.find(s => s.id === key)) {
          merged[key] = existing[key];
        }
      });
      return { ...prev, data: merged, template_name: name };
    });
    setActiveTab('personal');
    try {
      await fetch(`${API_BASE}/resumes/templates`, {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, config: templateData, category, section_defs: sectionDefs }),
      });
    } catch (e) { console.error('Failed to save template', e); }
  };

  const updateField = (section, field, value) => {
    setCurrentResume(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [section]: typeof field === 'string'
          ? { ...(prev.data[section] || {}), [field]: value }
          : value,
      },
    }));
  };

  const addArrayItem = (section) => {
    setCurrentResume(prev => {
      const items = [...(prev.data[section] || [])];
      const newItem = section === 'education' ? { id: Date.now(), degree: '', institution: '', field_of_study: '', start_date: '', end_date: '', cgpa: '', achievements: '' }
        : section === 'experience' ? { id: Date.now(), company: '', role: '', location: '', start_date: '', end_date: '', current: false, description: '', tech_stack: [], achievements: [] }
        : section === 'certifications' ? { id: Date.now(), name: '', issuer: '', date: '', url: '' }
        : section === 'projects' ? { id: Date.now(), name: '', description: '', tech_stack: [], url: '' }
        : { id: Date.now(), value: '' };
      items.push(newItem);
      return { ...prev, data: { ...prev.data, [section]: items } };
    });
  };

  const updateArrayItem = (section, id, field, value) => {
    setCurrentResume(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [section]: (prev.data[section] || []).map(item =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const removeArrayItem = (section, id) => {
    setCurrentResume(prev => ({
      ...prev,
      data: { ...prev.data, [section]: (prev.data[section] || []).filter(item => item.id !== id) },
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const input = e.target;
    setLoading(true);
    const statusPhrases = ['Extracting text...', 'Analyzing resume...', 'Parsing sections...', 'Building structure...'];
    let statusIdx = 0;
    setUploadStatus(statusPhrases[0]);
    const statusInterval = setInterval(() => {
      statusIdx = (statusIdx + 1) % statusPhrases.length;
      setUploadStatus(statusPhrases[statusIdx]);
    }, 1200);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const uploadRes = await fetch(`${API_BASE}/resumes/upload`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      clearInterval(statusInterval);
      setUploadStatus('');
      if (uploadRes.ok) {
        const data = await uploadRes.json();
        setCurrentResume(data.resume);
        setOptimizationResult(null);
        setView('viewer');
        await loadResumes();
      } else {
        const err = await uploadRes.json().catch(() => ({}));
        const msg = err.detail || uploadRes.statusText || 'Unknown error';
        if (uploadRes.status === 404 || uploadRes.status === 405) {
          alert('Upload endpoint not available. Make sure the backend is running and has been restarted with the latest code.');
        } else {
          alert(`Failed to upload resume: ${msg}`);
        }
      }
    } catch (err) { console.error('Upload failed', err); alert('Upload error — is the backend running?'); }
    setLoading(false);
    input.value = '';
  };

  const saveChatHistory = async (history) => {
    if (!currentResume?.id) return;
    try {
      await fetch(`${API_BASE}/resumes/${currentResume.id}/chat`, {
        method: 'PUT', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_history: history }),
      });
      // Auto-compact if chat exceeds threshold
      const totalChars = (history || []).reduce((sum, m) => sum + (m.content || '').length, 0);
      if (totalChars > CHAT_COMPACTION_CHAR_THRESHOLD) {
        const compRes = await fetch(`${API_BASE}/resumes/${currentResume.id}/compact-chat`, {
          method: 'POST', credentials: 'include',
        });
        if (compRes.ok) {
          const compData = await compRes.json();
          if (compData.compacted && compData.chat_history) {
            setChatHistory(compData.chat_history);
          }
        }
      }
    } catch (e) { console.error('Failed to save chat history', e); }
  };

  const acceptAllChanges = async () => {
    if (!pendingChanges) return;
    const mergedData = {
      ...pendingChanges.originalData,
      ...pendingChanges.optimizedData,
      personal_info: { ...(pendingChanges.originalData?.personal_info || {}), ...(pendingChanges.optimizedData?.personal_info || {}) },
      education: pendingChanges.optimizedData.education || pendingChanges.originalData?.education || [],
      experience: pendingChanges.optimizedData.experience || pendingChanges.originalData?.experience || [],
      skills: pendingChanges.optimizedData.skills || pendingChanges.originalData?.skills || [],
      certifications: pendingChanges.optimizedData.certifications || pendingChanges.originalData?.certifications || [],
      projects: pendingChanges.optimizedData.projects || pendingChanges.originalData?.projects || [],
      achievements: pendingChanges.optimizedData.achievements || pendingChanges.originalData?.achievements || [],
    };
    await saveAcceptedData(mergedData, pendingChanges.optimization);
  };

  const rejectAllChanges = () => {
    setPendingChanges(null);
    setRemainingSections(null);
  };

  const handleChatSend = async () => {
    if (!chatMessage.trim() || !currentResume) return;
    const msg = chatMessage;
    setChatMessage('');
    setChatHistory(prev => [...prev, { role: 'user', content: msg }, { role: 'assistant', content: 'Optimizing...', _temp: true }]);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/resumes/${currentResume.id}/optimize`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume_id: currentResume.id, instructions: msg, jd: jdText || null }),
      });
      if (res.ok) {
        const data = await res.json();
        setOptimizationResult(data.optimization);
        if (data.optimization?.optimized_data) {
          const originalData = JSON.parse(JSON.stringify(currentResume.data));
          const diffSections = computeDiffSections(data.optimization.optimized_data, originalData);
          setRemainingSections(diffSections);
          setPendingChanges({
            originalData,
            optimizedData: data.optimization.optimized_data,
            remainingSections: diffSections,
            optimization: data.optimization,
            changes: data.optimization.changes || [],
          });
          if (data.optimization.ats_score) {
            setCurrentResume(prev => ({ ...prev, ats_score: data.optimization.ats_score }));
          }
        }
        const summary = data.optimization?.suggestions?.join('\n') || data.optimization?.changes?.join('\n') || '';
        const newHistory = [...chatHistory.filter(m => !m._temp), { role: 'user', content: msg }, { role: 'assistant', content: summary || (data.optimization?.optimized_data ? 'Review changes inline below, accept or reject each section.' : 'Resume optimized successfully!') }];
        setChatHistory(newHistory);
        saveChatHistory(newHistory);
      } else {
        const err = await res.json().catch(() => ({}));
        const newHistory = [...chatHistory.filter(m => !m._temp), { role: 'user', content: msg }, { role: 'assistant', content: `Error: ${err.detail || 'Optimization failed'}` }];
        setChatHistory(newHistory);
        saveChatHistory(newHistory);
      }
    } catch (e) {
      console.error('Chat failed', e);
      const newHistory = [...chatHistory.filter(m => !m._temp), { role: 'user', content: msg }, { role: 'assistant', content: 'Network error — is the backend running?' }];
      setChatHistory(newHistory);
      saveChatHistory(newHistory);
    }
    setLoading(false);
  };

  // ── View: Resume List ──
  if (view === 'list') {
    return (
      <MainLayout>
        <LoadingOverlay show={loading} text={uploadStatus || 'Processing...'} />
        <div className="page-container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="page-header-box mb-4">
            <div className="section-header">
              <h2><i className="fas fa-file-alt me-2"></i>Resume Optimizer</h2>
              <p>Build, optimize, and manage your ATS-ready resumes with AI.</p>
            </div>
            <div className="d-flex gap-2 mt-3 flex-wrap">
              <button className="btn btn-primary" onClick={createResume}>
                <i className="fas fa-plus me-2"></i>Create New Resume
              </button>
              <label className="btn btn-outline-info">
                <i className="fas fa-upload me-2"></i>Upload Resume
                <input type="file" accept=".pdf,.doc,.docx,.txt" style={{ display: 'none' }} onChange={handleFileUpload} />
              </label>
            </div>
          </div>

          {resumes.length === 0 && !loading && (
            <div className="empty-state text-center py-5" style={{ color: 'var(--text-secondary)' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}><i className="fas fa-file-alt"></i></div>
              <h4>No resumes yet</h4>
              <p>Create a new resume or upload an existing one to get started.</p>
            </div>
          )}

          <div className="resume-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {resumes.map(resume => (
              <div key={resume.id} className="resume-card"
                style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem', cursor: 'pointer', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary-color)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.transform = 'none'; }}
                onClick={() => { setCurrentResume(resume); setView('editor'); }}>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 style={{ color: 'var(--primary-color)', margin: 0 }}>{resume.data?.personal_info?.full_name || 'Untitled'}</h5>
                    {renamingId === resume.id ? (
                      <input autoFocus className="form-control form-control-sm" style={{ width: '200px', padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                        value={renameValue}
                        onChange={e => setRenameValue(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') submitRename(resume.id); if (e.key === 'Escape') setRenamingId(null); }}
                        onBlur={() => submitRename(resume.id)}
                        onClick={e => e.stopPropagation()} />
                    ) : (
                      <small style={{ color: 'var(--text-muted)', cursor: 'pointer' }}
                        onClick={e => { e.stopPropagation(); startRename(resume); }}>
                        {resume.title} <i className="fas fa-pen ms-1" style={{ fontSize: '0.6rem', opacity: 0.5 }}></i>
                      </small>
                    )}
                  </div>
                  {resume.ats_score != null && (
                    <div className={`ats-badge ${resume.ats_score >= 90 ? 'text-success' : resume.ats_score >= 70 ? 'text-warning' : 'text-danger'}`}
                      style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                      {resume.ats_score}
                      <small style={{ fontSize: '0.65rem', display: 'block' }}>ATS</small>
                    </div>
                  )}
                </div>
                <div className="resume-preview-info" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <div><i className="fas fa-user-tie me-2"></i>{resume.data?.personal_info?.title || 'No title'}</div>
                  <div className="mt-1"><i className="fas fa-calendar me-2"></i>Updated: {new Date(resume.updated_at).toLocaleDateString()}</div>
                  <div className="mt-1"><i className="fas fa-layer-group me-2"></i>{resume.data?.skills?.length || 0} skills | {resume.data?.experience?.length || 0} experiences</div>
                </div>
                <div className="d-flex gap-2 mt-3">
                  <button className="btn btn-sm btn-outline-primary flex-fill" onClick={(e) => { e.stopPropagation(); setCurrentResume(resume); setView('viewer'); }}>
                    <i className="fas fa-eye me-1"></i> View
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={(e) => { e.stopPropagation(); deleteResume(resume.id); }}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }

  // ── Sub-views for Editor ──
  const renderEditor = () => (
    <div className="resume-editor-layout d-flex gap-3" style={{ flexDirection: isMobile ? 'column' : 'row', height: isMobile ? 'auto' : 'calc(100vh - 140px)' }}>
      {/* Left: Form Tabs */}
      <div className="editor-form-panel" style={{ width: isMobile ? '100%' : '420px', minWidth: isMobile ? '100%' : '350px', display: 'flex', flexDirection: 'column', gap: '0.5rem', overflow: isMobile ? 'visible' : 'hidden' }}>
        {/* Templates */}
        <div className="templates-section mb-1" style={{ background: 'var(--tertiary-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
          <div className="templates-header d-flex justify-content-between align-items-center px-2 py-1"
            style={{ cursor: 'pointer', borderBottom: '1px solid var(--border-color)' }}
            onClick={() => setActiveTab(activeTab === 'templates' ? 'personal' : 'templates')}>
            <span style={{ color: 'var(--primary-color)', fontSize: '0.8rem', fontWeight: 600 }}>
              <i className="fas fa-folder me-1"></i> Templates
              {currentResume?.template_name && activeTab !== 'templates' && (
                <small className="ms-2" style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 400 }}>
                  ({currentResume.template_name})
                </small>
              )}
            </span>
            <i className={`fas fa-chevron-${activeTab === 'templates' ? 'up' : 'down'}`} style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}></i>
          </div>
          {activeTab === 'templates' && (
            <div className="templates-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {/* Category tabs */}
              <div className="d-flex gap-1 p-1 flex-wrap" style={{ borderBottom: '1px solid var(--border-color)' }}>
                {availableCategories.map(cat => (
                  <button key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`btn btn-sm ${selectedCategory === cat.id ? 'btn-primary' : 'btn-outline-secondary'}`}
                    style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem' }}>
                    <i className={`fas ${cat.icon} me-1`}></i>{cat.label}
                  </button>
                ))}
              </div>
              {/* Template cards for selected category */}
              <div className="p-2">
                {/* Built-in templates matching category */}
                {BUILTIN_TEMPLATES.filter(t => t.category === selectedCategory).map((tpl, idx) => {
                  const builtinIdx = BUILTIN_TEMPLATES.indexOf(tpl);
                  return (
                    <div key={tpl.name} className="mb-2 p-2 template-card" style={{
                      background: currentResume?.template_name === tpl.name ? 'rgba(77,171,247,0.15)' : 'var(--secondary-bg)',
                      borderRadius: '6px', border: `1px solid ${currentResume?.template_name === tpl.name ? 'var(--primary-color)' : 'var(--border-color)'}`,
                      cursor: 'pointer'
                    }}
                      onClick={() => applyTemplate(builtinIdx)}>
                      <div className="d-flex align-items-center gap-2">
                        <i className="fas fa-file-alt" style={{ color: 'var(--primary-color)' }}></i>
                        <div>
                          <strong style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>{tpl.name}</strong>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{tpl.description}</div>
                          <div className="d-flex gap-1 mt-1">
                            {tpl.section_defs.map(s => (
                              <span key={s.id} className="badge" style={{ background: 'var(--tertiary-bg)', color: 'var(--text-muted)', fontSize: '0.55rem', fontWeight: 400 }}>{s.name}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {/* User-accumulated templates matching category */}
                {userTemplates.filter(t => !t.is_system && t.category === selectedCategory).map(tpl => (
                  <div key={tpl.name} className="mb-2 p-2 template-card" style={{
                    background: currentResume?.template_name === tpl.name ? 'rgba(77,171,247,0.15)' : 'var(--secondary-bg)',
                    borderRadius: '6px', border: `1px solid ${currentResume?.template_name === tpl.name ? 'var(--primary-color)' : 'var(--border-color)'}`,
                    cursor: 'pointer'
                  }}
                    onClick={() => applyTemplate(tpl.name)}>
                    <div className="d-flex align-items-center gap-2">
                      <i className="fas fa-file-export" style={{ color: 'var(--accent3, #6c5ce7)' }}></i>
                      <div>
                        <strong style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>{tpl.name}</strong>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {(tpl.section_defs?.length || Object.keys(tpl.config || {}).length) + ' sections'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Section management */}
                <div className="mt-2 p-2" style={{ background: 'rgba(77,171,247,0.05)', borderRadius: '6px', border: '1px dashed var(--primary-color)' }}>
                  <strong style={{ fontSize: '0.75rem', color: 'var(--primary-color)' }}>
                    <i className="fas fa-plus-circle me-1"></i> Sections
                  </strong>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {ALL_SECTION_DEFS.map(s => {
                      const isEnabled = !currentResume?.data?.[s.id] || (Array.isArray(currentResume.data[s.id]) && currentResume.data[s.id].length > 0) || (typeof currentResume.data?.[s.id] === 'object' && currentResume.data[s.id]?.full_name);
                      return (
                        <label key={s.id} className="d-flex align-items-center gap-1 p-1"
                          style={{ fontSize: '0.65rem', cursor: 'pointer', opacity: isEnabled ? 1 : 0.5, borderRadius: '4px', background: isEnabled ? 'var(--tertiary-bg)' : 'transparent' }}>
                          <input type="checkbox" checked={isEnabled}
                            onChange={() => {
                              setCurrentResume(prev => {
                                const data = { ...prev.data };
                                if (isEnabled) {
                                  // Remove section data
                                  delete data[s.id];
                                } else {
                                  // Add empty section data
                                  const def = ALL_SECTION_DEFS.find(d => d.id === s.id);
                                  if (def?.type === 'array') data[s.id] = [];
                                  else if (def?.type === 'object') data[s.id] = { full_name: '', email: '' };
                                  else data[s.id] = '';
                                }
                                return { ...prev, data };
                              });
                            }}
                            style={{ width: '0.7rem', height: '0.7rem' }} />
                          <i className={`fas ${s.icon}`} style={{ fontSize: '0.6rem', color: 'var(--primary-color)' }}></i>
                          {s.name}
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="d-flex gap-1 flex-wrap" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          {[
            { id: 'personal', icon: 'fas fa-user', label: 'Personal' },
            { id: 'education', icon: 'fas fa-graduation-cap', label: 'Education' },
            { id: 'experience', icon: 'fas fa-briefcase', label: 'Experience' },
            { id: 'skills', icon: 'fas fa-code', label: 'Skills' },
            { id: 'certifications', icon: 'fas fa-certificate', label: 'Certs' },
            { id: 'projects', icon: 'fas fa-project-diagram', label: 'Projects' },
            { id: 'achievements', icon: 'fas fa-trophy', label: 'Achievements' },
          ].map(tab => (
            <button key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              style={{
                padding: '0.4rem 0.75rem', border: `1px solid ${activeTab === tab.id ? 'var(--primary-color)' : 'var(--border-color)'}`,
                borderRadius: '6px', background: activeTab === tab.id ? 'var(--primary-color)' : 'transparent',
                color: activeTab === tab.id ? '#000' : 'var(--text-secondary)', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600,
              }}>
              <i className={`${tab.icon} me-1`}></i>{tab.label}
            </button>
          ))}
        </div>

        <div className="editor-form-content" style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
          {/* Empty state guide for new resumes */}
          {(!currentResume?.data?.personal_info?.full_name && !currentResume?.data?.education?.length && !currentResume?.data?.experience?.length) && activeTab !== 'templates' && (
            <div className="mb-3 p-3 text-center" style={{ background: 'rgba(77,171,247,0.08)', border: '1px dashed var(--primary-color)', borderRadius: '8px' }}>
              <i className="fas fa-lightbulb" style={{ fontSize: '1.5rem', color: 'var(--primary-color)', marginBottom: '0.5rem', display: 'block' }}></i>
              <strong style={{ fontSize: '0.85rem', color: 'var(--primary-color)' }}>Getting Started</strong>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.25rem 0' }}>
                Fill in your details using the tabs above, or choose a template from the folder icon to get started quickly.
              </p>
            </div>
          )}

          {/* Personal Info */}
          {activeTab === 'personal' && (
            <div className="personal-info-form">
              <h6 className="mb-3" style={{ color: 'var(--primary-color)' }}>Personal Information</h6>
              <div className="mb-2">
                <label className="form-label small">Full Name</label>
                <input className="form-control form-control-sm" value={currentResume?.data?.personal_info?.full_name || ''}
                  onChange={e => updateField('personal_info', 'full_name', e.target.value)}
                  style={{ background: 'var(--tertiary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              </div>
              <div className="mb-2">
                <label className="form-label small">Professional Title / Designation</label>
                <input className="form-control form-control-sm" value={currentResume?.data?.personal_info?.title || ''}
                  onChange={e => updateField('personal_info', 'title', e.target.value)}
                  style={{ background: 'var(--tertiary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              </div>
              <div className="row g-2 mb-2">
                <div className="col-6">
                  <label className="form-label small">Email</label>
                  <input className="form-control form-control-sm" value={currentResume?.data?.personal_info?.email || ''}
                    onChange={e => updateField('personal_info', 'email', e.target.value)}
                    style={{ background: 'var(--tertiary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                </div>
                <div className="col-6">
                  <label className="form-label small">Phone</label>
                  <input className="form-control form-control-sm" value={currentResume?.data?.personal_info?.phone || ''}
                    onChange={e => updateField('personal_info', 'phone', e.target.value)}
                    style={{ background: 'var(--tertiary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                </div>
              </div>
              <div className="mb-2">
                <label className="form-label small">LinkedIn</label>
                <input className="form-control form-control-sm" value={currentResume?.data?.personal_info?.linkedin || ''}
                  onChange={e => updateField('personal_info', 'linkedin', e.target.value)}
                  style={{ background: 'var(--tertiary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              </div>
              <div className="mb-2">
                <label className="form-label small">GitHub</label>
                <input className="form-control form-control-sm" value={currentResume?.data?.personal_info?.github || ''}
                  onChange={e => updateField('personal_info', 'github', e.target.value)}
                  style={{ background: 'var(--tertiary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              </div>
              <div className="mb-2">
                <label className="form-label small">Website</label>
                <input className="form-control form-control-sm" value={currentResume?.data?.personal_info?.website || ''}
                  onChange={e => updateField('personal_info', 'website', e.target.value)}
                  style={{ background: 'var(--tertiary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              </div>
              <div className="mb-2">
                <label className="form-label small">Professional Summary</label>
                <textarea className="form-control form-control-sm" rows="4" value={currentResume?.data?.personal_info?.summary || ''}
                  onChange={e => updateField('personal_info', 'summary', e.target.value)}
                  style={{ background: 'var(--tertiary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              </div>
            </div>
          )}

          {/* Education */}
          {activeTab === 'education' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 style={{ color: 'var(--primary-color)', margin: 0 }}>Education</h6>
                <button className="btn btn-sm btn-outline-primary" onClick={() => addArrayItem('education')}>
                  <i className="fas fa-plus"></i> Add
                </button>
              </div>
              {(currentResume?.data?.education || []).map((edu, i) => (
                <div key={edu.id} className="education-item mb-3 p-3" style={{ background: 'var(--tertiary-bg)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <div className="d-flex justify-content-between mb-2">
                    <strong style={{ color: 'var(--primary-color)' }}>#{i + 1}</strong>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeArrayItem('education', edu.id)}><i className="fas fa-times"></i></button>
                  </div>
                  <div className="mb-2">
                    <label className="form-label small">Degree</label>
                    <input className="form-control form-control-sm" value={edu.degree || ''}
                      onChange={e => updateArrayItem('education', edu.id, 'degree', e.target.value)}
                      style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                  </div>
                  <div className="mb-2">
                    <label className="form-label small">Institution</label>
                    <input className="form-control form-control-sm" value={edu.institution || ''}
                      onChange={e => updateArrayItem('education', edu.id, 'institution', e.target.value)}
                      style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                  </div>
                  <div className="mb-2">
                    <label className="form-label small">Field of Study</label>
                    <input className="form-control form-control-sm" value={edu.field_of_study || ''}
                      onChange={e => updateArrayItem('education', edu.id, 'field_of_study', e.target.value)}
                      style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                  </div>
                  <div className="row g-2 mb-2">
                    <div className="col-5">
                      <label className="form-label small">Start</label>
                      <input className="form-control form-control-sm" type="text" value={edu.start_date || ''} placeholder="YYYY"
                        onChange={e => updateArrayItem('education', edu.id, 'start_date', e.target.value)}
                        style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                    </div>
                    <div className="col-5">
                      <label className="form-label small">End</label>
                      <input className="form-control form-control-sm" type="text" value={edu.end_date || ''} placeholder="YYYY"
                        onChange={e => updateArrayItem('education', edu.id, 'end_date', e.target.value)}
                        style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                    </div>
                    <div className="col-2">
                      <label className="form-label small">CGPA</label>
                      <input className="form-control form-control-sm" value={edu.cgpa || ''}
                        onChange={e => updateArrayItem('education', edu.id, 'cgpa', e.target.value)}
                        style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                    </div>
                  </div>
                  <div className="mb-2">
                    <label className="form-label small">Achievements</label>
                    <textarea className="form-control form-control-sm" rows="2" value={edu.achievements || ''}
                      onChange={e => updateArrayItem('education', edu.id, 'achievements', e.target.value)}
                      style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Experience */}
          {activeTab === 'experience' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 style={{ color: 'var(--primary-color)', margin: 0 }}>Experience</h6>
                <button className="btn btn-sm btn-outline-primary" onClick={() => addArrayItem('experience')}>
                  <i className="fas fa-plus"></i> Add
                </button>
              </div>
              {(currentResume?.data?.experience || []).map((exp, i) => (
                <div key={exp.id} className="experience-item mb-3 p-3" style={{ background: 'var(--tertiary-bg)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <div className="d-flex justify-content-between mb-2">
                    <strong style={{ color: 'var(--primary-color)' }}>#{i + 1}</strong>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeArrayItem('experience', exp.id)}><i className="fas fa-times"></i></button>
                  </div>
                  <div className="row g-2 mb-2">
                    <div className="col-6">
                      <label className="form-label small">Company</label>
                      <input className="form-control form-control-sm" value={exp.company || ''}
                        onChange={e => updateArrayItem('experience', exp.id, 'company', e.target.value)}
                        style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                    </div>
                    <div className="col-6">
                      <label className="form-label small">Role</label>
                      <input className="form-control form-control-sm" value={exp.role || ''}
                        onChange={e => updateArrayItem('experience', exp.id, 'role', e.target.value)}
                        style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                    </div>
                  </div>
                  <div className="row g-2 mb-2">
                    <div className="col-5">
                      <label className="form-label small">Start</label>
                      <input className="form-control form-control-sm" value={exp.start_date || ''} placeholder="MM/YYYY"
                        onChange={e => updateArrayItem('experience', exp.id, 'start_date', e.target.value)}
                        style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                    </div>
                    <div className="col-5">
                      <label className="form-label small">End</label>
                      <input className="form-control form-control-sm" value={exp.end_date || ''} placeholder="MM/YYYY"
                        onChange={e => updateArrayItem('experience', exp.id, 'end_date', e.target.value)}
                        style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                    </div>
                    <div className="col-2 d-flex align-items-end">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" checked={exp.current || false}
                          onChange={e => updateArrayItem('experience', exp.id, 'current', e.target.checked)} />
                        <label className="form-check-label small">Current</label>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <label className="form-label small">Tech Stack (comma separated)</label>
                    <input className="form-control form-control-sm" value={(exp.tech_stack || []).join(', ')}
                      onChange={e => updateArrayItem('experience', exp.id, 'tech_stack', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                      style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                  </div>
                  <div className="mb-2">
                    <label className="form-label small">Description</label>
                    <textarea className="form-control form-control-sm" rows="3" value={exp.description || ''}
                      onChange={e => updateArrayItem('experience', exp.id, 'description', e.target.value)}
                      style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label className="form-label small">Key Achievements (one per line)</label>
                    <textarea className="form-control form-control-sm" rows="2" value={(exp.achievements || []).join('\n')}
                      onChange={e => updateArrayItem('experience', exp.id, 'achievements', e.target.value.split('\n').filter(Boolean))}
                      style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {activeTab === 'skills' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 style={{ color: 'var(--primary-color)', margin: 0 }}>Skills</h6>
                <button className="btn btn-sm btn-outline-primary" onClick={() => {
                  const skill = prompt('Enter a skill:');
                  if (skill) setCurrentResume(prev => ({
                    ...prev,
                    data: { ...prev.data, skills: [...(prev.data.skills || []), { id: Date.now(), value: skill }] },
                  }));
                }}><i className="fas fa-plus"></i> Add</button>
              </div>
              <div className="d-flex flex-wrap gap-2">
                {(currentResume?.data?.skills || []).map(skill => (
                  <span key={skill.id} className="skill-badge d-flex align-items-center gap-1"
                    style={{ background: 'rgba(77,171,247,0.15)', border: '1px solid var(--primary-color)', borderRadius: '20px', padding: '0.3rem 0.75rem', fontSize: '0.85rem' }}>
                    {skill.value}
                    <button className="btn btn-sm p-0 ms-1" onClick={() => removeArrayItem('skills', skill.id)}
                      style={{ color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer' }}>
                      <i className="fas fa-times"></i>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {activeTab === 'certifications' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 style={{ color: 'var(--primary-color)', margin: 0 }}>Certifications</h6>
                <button className="btn btn-sm btn-outline-primary" onClick={() => addArrayItem('certifications')}>
                  <i className="fas fa-plus"></i> Add
                </button>
              </div>
              {(currentResume?.data?.certifications || []).map((cert, i) => (
                <div key={cert.id} className="mb-2 p-2" style={{ background: 'var(--tertiary-bg)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <div className="d-flex justify-content-between mb-1">
                    <strong style={{ color: 'var(--primary-color)', fontSize: '0.85rem' }}>#{i + 1}</strong>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeArrayItem('certifications', cert.id)}><i className="fas fa-times"></i></button>
                  </div>
                  <input className="form-control form-control-sm mb-1" placeholder="Certification name" value={cert.name || ''}
                    onChange={e => updateArrayItem('certifications', cert.id, 'name', e.target.value)}
                    style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                  <div className="row g-1">
                    <div className="col-6">
                      <input className="form-control form-control-sm" placeholder="Issuer" value={cert.issuer || ''}
                        onChange={e => updateArrayItem('certifications', cert.id, 'issuer', e.target.value)}
                        style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                    </div>
                    <div className="col-6">
                      <input className="form-control form-control-sm" placeholder="Date" value={cert.date || ''}
                        onChange={e => updateArrayItem('certifications', cert.id, 'date', e.target.value)}
                        style={{ background: 'var(--secondary-bg)', border: '1px var(--border-color)', color: 'var(--text-primary)' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {activeTab === 'projects' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 style={{ color: 'var(--primary-color)', margin: 0 }}>Projects</h6>
                <button className="btn btn-sm btn-outline-primary" onClick={() => addArrayItem('projects')}>
                  <i className="fas fa-plus"></i> Add
                </button>
              </div>
              {(currentResume?.data?.projects || []).map((proj, i) => (
                <div key={proj.id} className="mb-3 p-3" style={{ background: 'var(--tertiary-bg)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <div className="d-flex justify-content-between mb-2">
                    <strong style={{ color: 'var(--primary-color)' }}>#{i + 1}</strong>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeArrayItem('projects', proj.id)}><i className="fas fa-times"></i></button>
                  </div>
                  <input className="form-control form-control-sm mb-1" placeholder="Project name" value={proj.name || ''}
                    onChange={e => updateArrayItem('projects', proj.id, 'name', e.target.value)}
                    style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                  <textarea className="form-control form-control-sm mb-1" rows="2" placeholder="Description" value={proj.description || ''}
                    onChange={e => updateArrayItem('projects', proj.id, 'description', e.target.value)}
                    style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                  <input className="form-control form-control-sm" placeholder="Tech stack (comma separated)" value={(proj.tech_stack || []).join(', ')}
                    onChange={e => updateArrayItem('projects', proj.id, 'tech_stack', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                    style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                </div>
              ))}
            </div>
          )}

          {/* Achievements */}
          {activeTab === 'achievements' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 style={{ color: 'var(--primary-color)', margin: 0 }}>Achievements</h6>
                <button className="btn btn-sm btn-outline-primary" onClick={() => addArrayItem('achievements')}>
                  <i className="fas fa-plus"></i> Add
                </button>
              </div>
              {(currentResume?.data?.achievements || []).map((ach, i) => (
                <div key={ach.id} className="d-flex align-items-center gap-2 mb-2 p-2" style={{ background: 'var(--tertiary-bg)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  <span style={{ color: 'var(--primary-color)', fontWeight: 700, fontSize: '0.85rem' }}>#{i + 1}</span>
                  <input className="form-control form-control-sm flex-fill" value={ach.value || ''}
                    onChange={e => updateArrayItem('achievements', ach.id, 'value', e.target.value)}
                    style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                  <button className="btn btn-sm btn-outline-danger" onClick={() => removeArrayItem('achievements', ach.id)}><i className="fas fa-times"></i></button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Live Preview + Actions */}
      <div className="editor-preview-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem', overflow: isMobile ? 'visible' : 'hidden' }}>
        {/* JD Input */}
        <div className="jd-section" style={{ background: 'var(--secondary-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', padding: '1rem' }}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 style={{ margin: 0, color: 'var(--primary-color)', fontSize: '0.9rem' }}>
              <i className="fas fa-briefcase me-2"></i>Job Description (Optional)
            </h6>
            <button className="btn btn-sm btn-outline-info" onClick={() => setShowJdInput(!showJdInput)}>
              <i className={`fas fa-${showJdInput ? 'chevron-up' : 'chevron-down'}`}></i>
            </button>
          </div>
          {showJdInput && (
            <textarea className="form-control" rows="4" value={jdText}
              onChange={e => setJdText(e.target.value)} placeholder="Paste the job description here to tailor your resume..."
              style={{ background: 'var(--tertiary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }} />
          )}
        </div>

        {/* Resume Live Preview */}
        <div className="resume-preview-section" style={{ flex: 1, background: 'var(--secondary-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div className="preview-header d-flex justify-content-between align-items-center p-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}><i className="fas fa-eye me-2"></i>Live Preview</span>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-outline-success" onClick={saveResume}>
                <i className="fas fa-save me-1"></i> Save
              </button>
              <button className="btn btn-sm btn-primary" onClick={optimizeResume} disabled={loading}>
                <i className="fas fa-magic me-1"></i> Optimize with AI
              </button>
            </div>
          </div>
          <div className="preview-content p-3" style={{ flex: 1, overflowY: 'auto' }}>
            <div className="resume-preview-doc" style={{ background: '#fff', color: '#222', borderRadius: '4px', padding: '2rem 1.5rem', maxWidth: '800px', margin: '0 auto', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', fontSize: '11pt', lineHeight: 1.5, fontFamily: "'Times New Roman', serif" }}>
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '1rem', borderBottom: '2px solid #222', paddingBottom: '0.75rem' }}>
                <h2 style={{ margin: 0, fontSize: '18pt', fontWeight: 700, color: '#000' }}>
                  {currentResume?.data?.personal_info?.full_name || 'Your Name'}
                </h2>
                <div style={{ fontSize: '10pt', color: '#444', marginTop: '0.25rem' }}>
                  {currentResume?.data?.personal_info?.title && <div>{currentResume.data.personal_info.title}</div>}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                    {currentResume?.data?.personal_info?.email && <span>{currentResume.data.personal_info.email}</span>}
                    {currentResume?.data?.personal_info?.phone && <span>{currentResume.data.personal_info.phone}</span>}
                    {currentResume?.data?.personal_info?.linkedin && <span>{currentResume.data.personal_info.linkedin}</span>}
                    {currentResume?.data?.personal_info?.github && <span>{currentResume.data.personal_info.github}</span>}
                  </div>
                </div>
              </div>

              {/* Summary */}
              {currentResume?.data?.personal_info?.summary && (
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontWeight: 700, borderBottom: '1px solid #999', marginBottom: '0.25rem' }}>Professional Summary</div>
                  <p style={{ margin: 0, fontSize: '10pt' }}>{currentResume.data.personal_info.summary}</p>
                </div>
              )}

              {/* Education */}
              {(currentResume?.data?.education || []).length > 0 && (
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontWeight: 700, borderBottom: '1px solid #999', marginBottom: '0.25rem' }}>Education</div>
                {(currentResume.data.education || []).map((edu, i) => (
                    <div key={i} style={{ marginBottom: '0.35rem', fontSize: '10pt' }}>
                      <strong>{edu.degree}</strong> — {edu.institution}
                      {edu.cgpa && <span> | CGPA: {edu.cgpa}</span>}
                      <div style={{ color: '#555' }}>{edu.start_date} - {edu.end_date}{edu.achievements ? ` | ${edu.achievements}` : ''}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Experience */}
              {(currentResume?.data?.experience || []).length > 0 && (
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontWeight: 700, borderBottom: '1px solid #999', marginBottom: '0.25rem' }}>Experience</div>
                {(currentResume.data.experience || []).map((exp, i) => (
                    <div key={i} style={{ marginBottom: '0.5rem', fontSize: '10pt' }}>
                      <strong>{exp.role}</strong> at <strong>{exp.company}</strong>
                      <div style={{ color: '#555' }}>{exp.start_date} - {exp.current ? 'Present' : exp.end_date}</div>
                      {exp.description && <p style={{ margin: '0.15rem 0', fontSize: '9.5pt' }}>{exp.description}</p>}
                      {(exp.tech_stack || []).length > 0 && <div style={{ color: '#555', fontSize: '9pt' }}>Tech: {exp.tech_stack.join(', ')}</div>}
                      {(exp.achievements || []).length > 0 && (
                        <ul style={{ margin: '0.15rem 0', paddingLeft: '1.25rem', fontSize: '9.5pt' }}>
                          {exp.achievements.map((a, j) => <li key={j}>{a}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Skills */}
              {(currentResume?.data?.skills || []).length > 0 && (
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontWeight: 700, borderBottom: '1px solid #999', marginBottom: '0.25rem' }}>Skills</div>
                  <div style={{ fontSize: '10pt' }}>{(currentResume.data.skills || []).map(s => s.value).join(', ')}</div>
                </div>
              )}

              {/* Certifications */}
              {(currentResume?.data?.certifications || []).length > 0 && (
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontWeight: 700, borderBottom: '1px solid #999', marginBottom: '0.25rem' }}>Certifications</div>
                  {(currentResume.data.certifications || []).map((cert, i) => (
                    <div key={i} style={{ fontSize: '10pt' }}>
                      <strong>{cert.name}</strong> — {cert.issuer} {cert.date && `(${cert.date})`}
                    </div>
                  ))}
                </div>
              )}

              {/* Projects */}
              {(currentResume?.data?.projects || []).length > 0 && (
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontWeight: 700, borderBottom: '1px solid #999', marginBottom: '0.25rem' }}>Projects</div>
                  {(currentResume.data.projects || []).map((proj, i) => (
                    <div key={i} style={{ marginBottom: '0.35rem', fontSize: '10pt' }}>
                      <strong>{proj.name}</strong>
                      <p style={{ margin: '0.1rem 0', fontSize: '9.5pt' }}>{proj.description}</p>
                      {(proj.tech_stack || []).length > 0 && <div style={{ color: '#555', fontSize: '9pt' }}>{proj.tech_stack.join(', ')}</div>}
                    </div>
                  ))}
                </div>
              )}

              {/* Achievements */}
              {(currentResume?.data?.achievements || []).length > 0 && (
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontWeight: 700, borderBottom: '1px solid #999', marginBottom: '0.25rem' }}>Achievements</div>
                  {(currentResume.data.achievements || []).map((ach, i) => (
                    <div key={i} style={{ fontSize: '10pt' }}>• {ach.value}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── View: Resume Viewer (NOVA-style with click-to-edit) ──
  if (view === 'viewer') {
    return (
      <MainLayout>
        <LoadingOverlay show={loading} text={uploadStatus || 'Processing...'} />
        <div className="page-container" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 style={{ color: 'var(--primary-color)' }}>
                <i className="fas fa-file-alt me-2"></i>Resume Preview
              </h4>
              {currentResume?.ats_score != null && (
                <div className="d-flex align-items-center gap-3 mt-1">
                  <div className="ats-score-display d-flex align-items-center gap-2">
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ATS Score:</span>
                    <span className={`badge ${currentResume.ats_score >= 90 ? 'bg-success' : currentResume.ats_score >= 70 ? 'bg-warning text-dark' : 'bg-danger'}`}
                      style={{ fontSize: '1rem' }}>
                      {currentResume.ats_score}/100
                    </span>
                  </div>
                  {optimizationResult?.score_breakdown && (
                    <div className="score-breakdown d-flex gap-2" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {Object.entries(optimizationResult.score_breakdown).map(([key, val]) => (
                        <span key={key} className="badge bg-dark">{key}: {val}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="d-flex align-items-center gap-2">
              {/* Template badge */}
              <div className="dropdown">
                <button className="btn btn-sm btn-outline-secondary dropdown-toggle" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                  data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fas fa-folder me-1"></i>
                  {currentResume?.template_name || 'Template'}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" style={{ maxHeight: '300px', overflowY: 'auto', fontSize: '0.8rem', background: 'var(--secondary-bg)', border: '1px solid var(--border-color)' }}>
                  {BUILTIN_TEMPLATES.map((tpl, idx) => (
                    <li key={tpl.name}>
                      <button className={`dropdown-item ${currentResume?.template_name === tpl.name ? 'active' : ''}`}
                        style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem', color: currentResume?.template_name === tpl.name ? 'var(--primary-color)' : 'var(--text-primary)' }}
                        onClick={() => {
                          const cat = CATEGORIES.find(c => c.id === tpl.category);
                          const label = cat ? cat.label : tpl.category;
                          if (confirm(`Switch to "${tpl.name}" (${label})?\n\nYour existing resume data will be preserved and mapped to the new template.`)) {
                            applyTemplate(idx);
                          }
                        }}>
                        <i className="fas fa-file-alt me-1" style={{ color: 'var(--primary-color)' }}></i>
                        <strong>{tpl.name}</strong>
                        <small className="ms-1" style={{ color: 'var(--text-muted)' }}>
                          ({CATEGORIES.find(c => c.id === tpl.category)?.label || tpl.category})
                        </small>
                      </button>
                    </li>
                  ))}
                  {userTemplates.filter(t => !t.is_system).map(tpl => (
                    <li key={tpl.name}>
                      <button className={`dropdown-item ${currentResume?.template_name === tpl.name ? 'active' : ''}`}
                        style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem', color: currentResume?.template_name === tpl.name ? 'var(--primary-color)' : 'var(--text-primary)' }}
                        onClick={() => {
                          if (confirm(`Switch to "${tpl.name}"?\n\nYour existing resume data will be preserved.`)) {
                            applyTemplate(tpl.name);
                          }
                        }}>
                        <i className="fas fa-file-export me-1" style={{ color: 'var(--accent3, #6c5ce7)' }}></i>
                        {tpl.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              {currentResume?.ats_score != null && currentResume.ats_score < 90 && (
                <button className="btn btn-sm btn-warning" onClick={optimizeResume} disabled={loading}>
                  <i className="fas fa-magic me-1"></i> Re-optimize
                </button>
              )}
              <button className="btn btn-sm btn-outline-info" onClick={() => {
                const win = window.open('', '_blank');
                const doc = document.querySelector('.resume-preview-doc');
                if (win && doc) {
                  win.document.write(`<html><head><title>${currentResume?.data?.personal_info?.full_name || 'Resume'} - Export</title>`);
                  win.document.write('<style>body { font-family: "Times New Roman", serif; padding: 2rem; max-width: 800px; margin: 0 auto; }</style></head><body>');
                  win.document.write(doc.innerHTML);
                  win.document.write('</body></html>');
                  win.document.close();
                  win.print();
                }
              }}>
                <i className="fas fa-download me-1"></i> Download
              </button>
              <button className="btn btn-sm btn-outline-secondary" onClick={() => { setView('list'); setCurrentResume(null); setOptimizationResult(null); }}>
                <i className="fas fa-arrow-left me-1"></i> Back
              </button>
            </div>
          </div>

        <div className="viewer-two-column d-flex gap-3" style={{ flexWrap: isMobile ? 'wrap' : 'nowrap' }}>

          {/* LHS: Templates mini + NOVA Document */}
          <div className="viewer-lhs" style={{ flex: 1, minWidth: isMobile ? '100%' : '300px' }}>

            {/* NOVA-style Viewable Resume (click to edit inline) */}

            {/* Page navigation */}
            {(() => {
              const tpl = BUILTIN_TEMPLATES.find(t => t.name === currentResume?.template_name);
              const pages = tpl?.pages || [{ page_number: 1, layout: 'single', sections: ['personal_info','summary','education','experience','skills','certifications','projects','achievements'] }];
              return pages.length > 1 ? (
                <div className="page-nav d-flex justify-content-between align-items-center mb-2 p-1" style={{ background: 'var(--tertiary-bg)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  <button className="btn btn-sm btn-outline-secondary" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>
                    <i className="fas fa-chevron-left me-1"></i> Prev
                  </button>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Page {currentPage} of {pages.length}
                  </span>
                  <button className="btn btn-sm btn-outline-secondary" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}
                    disabled={currentPage >= pages.length}
                    onClick={() => setCurrentPage(p => Math.min(pages.length, p + 1))}>
                    Next <i className="fas fa-chevron-right ms-1"></i>
                  </button>
                </div>
              ) : null;
            })()}

            {/* NOVA-style Viewable Resume (click to edit inline) */}
            {(() => {
              // Determine which data source and whether in review mode
              const displayData = pendingChanges?.originalData ?? currentResume?.data;
              const isReview = !!pendingChanges;
              const changedSections = pendingChanges?.remainingSections ?? new Set();
              const changedFields = pendingChanges ? getChangedFields(pendingChanges.optimizedData, pendingChanges.originalData) : new Set();

              const sectionDiffStyle = (sectionId) => {
                if (!changedSections.has(sectionId)) return {};
                return {
                  borderLeft: '4px solid #fbbf24',
                  paddingLeft: '0.75rem',
                  background: 'rgba(251,191,36,0.04)',
                  borderRadius: '4px',
                  marginBottom: '1.25rem',
                  position: 'relative',
                };
              };

              const renderOldValue = (oldVal, newVal) => {
                if (!isReview || oldVal === newVal) return null;
                return (
                  <div style={{ background: 'rgba(239,68,68,0.08)', padding: '0.25rem 0.5rem', borderRadius: '3px', marginBottom: '0.15rem' }}>
                    <span style={{ fontSize: '0.65rem', color: '#ef4444', fontWeight: 600, display: 'block' }}>OLD</span>
                    <span style={{ textDecoration: 'line-through', color: '#dc2626', fontSize: '10pt' }}>{oldVal}</span>
                  </div>
                );
              };

              const renderNewValue = (newVal, section) => {
                if (!isReview) return null;
                return (
                  <div style={{ background: 'rgba(34,197,94,0.08)', padding: '0.25rem 0.5rem', borderRadius: '3px' }}>
                    <span style={{ fontSize: '0.65rem', color: '#16a34a', fontWeight: 600, display: 'block' }}>AI PROPOSED</span>
                    <span style={{ color: '#15803d', fontSize: '10pt', fontWeight: 600 }}>{newVal}</span>
                  </div>
                );
              };

              const renderDiffActions = (sectionId) => {
                if (!changedSections.has(sectionId)) return null;
                return (
                  <div className="d-flex gap-1 mt-1 justify-content-end" style={{ borderTop: '1px dashed rgba(251,191,36,0.3)', paddingTop: '0.35rem' }}>
                    <button className="btn btn-sm" onClick={() => acceptSection(sectionId)}
                      style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem', background: 'rgba(34,197,94,0.12)', border: '1px solid #22c55e', color: '#16a34a', borderRadius: '3px' }}>
                      <i className="fas fa-check me-1"></i> Accept
                    </button>
                    <button className="btn btn-sm" onClick={() => rejectSection(sectionId)}
                      style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem', background: 'rgba(239,68,68,0.08)', border: '1px solid #ef4444', color: '#dc2626', borderRadius: '3px' }}>
                      <i className="fas fa-times me-1"></i> Reject
                    </button>
                  </div>
                );
              };

              const pi = displayData?.personal_info || {};
              const optPi = pendingChanges?.optimizedData?.personal_info || {};

              return (
                <div className="resume-preview-doc nova-style" style={{
                  background: '#fff', color: '#222', borderRadius: '8px', padding: '2.5rem 2rem',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.15)', fontSize: '11pt', lineHeight: 1.5,
                  fontFamily: "'Times New Roman', serif", position: 'relative',
                  outline: isReview ? '2px solid #fbbf24' : 'none',
                }}>
                {!isReview && (
                  <div className="edit-hint text-center mb-3" style={{ fontSize: '0.75rem', color: '#999' }}>
                    <i className="fas fa-mouse-pointer me-1"></i> Click any field to edit inline
                  </div>
                )}

                {/* Header / Personal Info */}
                <div style={sectionDiffStyle('personal_info')}>
                  <div style={{ textAlign: 'center', marginBottom: '0.75rem', borderBottom: '2px solid #222', paddingBottom: '0.75rem' }}>
                    <div style={{ margin: 0, fontSize: '20pt', fontWeight: 700, color: '#000' }}>
                      {changedFields.has('full_name') ? (
                        <div>
                          {renderOldValue(pi.full_name, optPi.full_name)}
                          {renderNewValue(optPi.full_name, 'personal_info')}
                        </div>
                      ) : (
                        <span contentEditable={!isReview && isEditing('personal_info', 'full_name')}
                              suppressContentEditableWarning
                              onClick={(e) => { if (!isReview) { e.stopPropagation(); setEditField({ section: 'personal_info', field: 'full_name', index: null }); setTimeout(() => e.target.focus(), 0); } }}
                              onBlur={(e) => handleFieldSave(e.target.innerText.trim() || 'Your Name', 'personal_info', 'full_name')}
                              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } }}
                              style={{ cursor: !isReview ? 'pointer' : 'default', outline: 'none', borderBottom: isEditing('personal_info', 'full_name') ? '1px dashed #4dabf7' : 'none', minWidth: '100px', display: 'inline-block' }}>
                          {pi.full_name || 'Your Name'}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '10pt', color: '#444', marginTop: '0.25rem' }}>
                      <div style={{ display: 'inline-block' }}>
                        {changedFields.has('title') ? (
                          <div>
                            {renderOldValue(pi.title, optPi.title)}
                            {renderNewValue(optPi.title, 'personal_info')}
                          </div>
                        ) : (
                          <span contentEditable={!isReview && isEditing('personal_info', 'title')}
                                suppressContentEditableWarning
                                onClick={(e) => { if (!isReview) { e.stopPropagation(); setEditField({ section: 'personal_info', field: 'title', index: null }); setTimeout(() => e.target.focus(), 0); } }}
                                onBlur={(e) => handleFieldSave(e.target.innerText.trim() || 'Professional Title', 'personal_info', 'title')}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } }}
                                style={{ cursor: !isReview ? 'pointer' : 'default', outline: 'none', borderBottom: isEditing('personal_info', 'title') ? '1px dashed #4dabf7' : 'none', minWidth: '60px', display: 'inline-block' }}>
                            {pi.title || 'Professional Title'}
                          </span>
                        )}
                      </div>
                      <div className="d-flex justify-content-center gap-3 flex-wrap mt-1" style={{ fontSize: '9pt' }}>
                        {['email', 'phone', 'linkedin', 'github', 'website'].filter(f => pi[f] || f === 'email').map(f => (
                          <span key={f}>{changedFields.has(f) ? (
                            <span><span style={{ textDecoration: 'line-through', color: '#dc2626', marginRight: '0.25rem' }}>{pi[f]}</span><span style={{ color: '#15803d', fontWeight: 600 }}>{optPi[f] || ''}</span></span>
                          ) : (
                            <span contentEditable={!isReview && isEditing('personal_info', f)}
                                  suppressContentEditableWarning
                                  onClick={(e) => { if (!isReview) { e.stopPropagation(); setEditField({ section: 'personal_info', field: f, index: null }); setTimeout(() => e.target.focus(), 0); } }}
                                  onBlur={(e) => handleFieldSave(e.target.innerText.trim(), 'personal_info', f)}
                                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } }}
                                  style={{ cursor: !isReview ? 'pointer' : 'default', outline: 'none', borderBottom: isEditing('personal_info', f) ? '1px dashed #4dabf7' : 'none', display: 'inline-block' }}>
                              {pi[f] || (f === 'email' ? 'email@example.com' : '')}
                            </span>
                          )}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Summary under personal_info */}
                  {(pi.summary || isEditing('personal_info', 'summary')) && (
                    <div style={{ marginBottom: '0.5rem' }}>
                      <div style={{ fontWeight: 700, borderBottom: '1px solid #999', marginBottom: '0.35rem' }}>Professional Summary</div>
                      {changedFields.has('summary') ? (
                        <div>
                          {renderOldValue(pi.summary, optPi.summary)}
                          {renderNewValue(optPi.summary, 'personal_info')}
                        </div>
                      ) : (
                        <p contentEditable={!isReview && isEditing('personal_info', 'summary')}
                           suppressContentEditableWarning
                           onClick={(e) => { if (!isReview) { e.stopPropagation(); setEditField({ section: 'personal_info', field: 'summary', index: null }); setTimeout(() => e.target.focus(), 0); } }}
                           onBlur={(e) => handleFieldSave(e.target.innerText.trim(), 'personal_info', 'summary')}
                           style={{ margin: 0, fontSize: '10pt', cursor: !isReview ? 'pointer' : 'default', outline: 'none', borderBottom: isEditing('personal_info', 'summary') ? '1px dashed #4dabf7' : 'none' }}>
                          {pi.summary || 'Click to add professional summary'}
                        </p>
                      )}
                    </div>
                  )}
                  {renderDiffActions('personal_info')}
                </div>

                {/* Education */}
                {(displayData?.education || []).length > 0 && (
                  <div style={{ ...sectionDiffStyle('education'), ...(changedSections.has('education') ? { marginTop: '0' } : { marginBottom: '1rem' }) }}>
                    <div className="d-flex align-items-center gap-2" style={{ fontWeight: 700, borderBottom: '1px solid #999', marginBottom: '0.35rem' }}>
                      <span>Education</span>
                      {!isReview && <i className="fas fa-pen fa-xs" style={{ color: '#999', cursor: 'pointer' }} onClick={() => setEditField(editField?.section === 'education' ? null : { section: 'education', field: '_section', index: null })}></i>}
                    </div>
                    {changedSections.has('education') ? (
                      <div>
                        <div style={{ background: 'rgba(239,68,68,0.08)', padding: '0.35rem 0.5rem', borderRadius: '3px', marginBottom: '0.25rem' }}>
                          <span style={{ fontSize: '0.65rem', color: '#ef4444', fontWeight: 600 }}>OLD</span>
                          {(displayData.education || []).map((edu, i) => (
                            <div key={edu.id || i} style={{ fontSize: '10pt', textDecoration: 'line-through', color: '#dc2626', marginBottom: '0.2rem' }}>
                              <strong>{edu.degree}</strong> — {edu.institution}{edu.cgpa && <span> | CGPA: {edu.cgpa}</span>}
                              <div style={{ color: '#999' }}>{edu.start_date} - {edu.end_date}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{ background: 'rgba(34,197,94,0.08)', padding: '0.35rem 0.5rem', borderRadius: '3px' }}>
                          <span style={{ fontSize: '0.65rem', color: '#16a34a', fontWeight: 600 }}>AI PROPOSED</span>
                          {(pendingChanges.optimizedData.education || []).map((edu, i) => (
                            <div key={edu.id || i} style={{ fontSize: '10pt', color: '#15803d', fontWeight: 600, marginBottom: '0.2rem' }}>
                              <strong>{edu.degree}</strong> — {edu.institution}{edu.cgpa && <span> | CGPA: {edu.cgpa}</span>}
                              <div style={{ color: '#166534' }}>{edu.start_date} - {edu.end_date}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      (displayData.education || []).map((edu, i) => (
                        <div key={edu.id || i} style={{ marginBottom: '0.35rem', fontSize: '10pt' }}>
                          {(!isReview && isEditing('education', 'degree', i)) ? (
                            <div className="inline-edit-form" style={{ background: '#f8f9fa', padding: '0.35rem', borderRadius: '4px', border: '1px solid #dee2e6', marginBottom: '0.25rem' }}>
                              <div className="d-flex justify-content-between mb-1">
                                <span style={{ fontSize: '0.7rem', color: '#666' }}><i className="fas fa-pen me-1"></i>Editing</span>
                                <button className="btn btn-sm" onClick={(e) => removeSectionItem('education', i, e)}
                                  style={{ fontSize: '0.6rem', padding: '0.05rem 0.3rem', background: 'none', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '3px' }}>
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                              <input className="form-control form-control-sm mb-1" defaultValue={edu.degree} placeholder="Degree"
                                onBlur={(e) => handleFieldSave(e.target.value, 'education', 'degree', i)}
                                onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); }} autoFocus />
                              <input className="form-control form-control-sm mb-1" defaultValue={edu.institution} placeholder="Institution"
                                onBlur={(e) => handleFieldSave(e.target.value, 'education', 'institution', i)}
                                onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); }} />
                              <input className="form-control form-control-sm mb-1" defaultValue={edu.field_of_study} placeholder="Field of study"
                                onBlur={(e) => handleFieldSave(e.target.value, 'education', 'field_of_study', i)} />
                              <div className="d-flex gap-2">
                                <input className="form-control form-control-sm" defaultValue={edu.start_date} placeholder="Start"
                                  onBlur={(e) => handleFieldSave(e.target.value, 'education', 'start_date', i)} style={{ width: '40%' }} />
                                <input className="form-control form-control-sm" defaultValue={edu.end_date} placeholder="End"
                                  onBlur={(e) => handleFieldSave(e.target.value, 'education', 'end_date', i)} style={{ width: '40%' }} />
                              </div>
                              <input className="form-control form-control-sm mb-1" defaultValue={edu.cgpa} placeholder="CGPA"
                                onBlur={(e) => handleFieldSave(e.target.value, 'education', 'cgpa', i)}
                                onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); }} />
                              <textarea className="form-control form-control-sm" rows={2} defaultValue={edu.achievements} placeholder="Achievements / honors"
                                onBlur={(e) => handleFieldSave(e.target.value, 'education', 'achievements', i)} />
                              <button className="btn btn-sm btn-outline-success mt-1" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}
                                onClick={() => setEditField(null)}>
                                <i className="fas fa-check me-1"></i> Done
                              </button>
                            </div>
                          ) : (
                            <div style={{ cursor: !isReview ? 'pointer' : 'default' }}
                                 onClick={() => { if (!isReview) setEditField({ section: 'education', field: 'degree', index: i }); }}>
                              <strong>{edu.degree}</strong> — {edu.institution}{edu.cgpa && <span> | CGPA: {edu.cgpa}</span>}
                              <div style={{ color: '#555' }}>{edu.start_date} - {edu.end_date}</div>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                    {!isReview && (
                      <div className="text-center mt-1">
                        <button className="btn btn-sm" style={{ fontSize: '0.7rem', padding: '0', color: '#4dabf7', background: 'none', border: 'none', cursor: 'pointer' }}
                          onClick={() => addSectionItem('education')}>
                          <i className="fas fa-plus me-1"></i>Add Education
                        </button>
                      </div>
                    )}
                    {renderDiffActions('education')}
                  </div>
                )}

                {/* Experience */}
                {(displayData?.experience || []).length > 0 && (
                  <div style={sectionDiffStyle('experience')}>
                    <div className="d-flex align-items-center gap-2" style={{ fontWeight: 700, borderBottom: '1px solid #999', marginBottom: '0.35rem' }}>
                      <span>Experience</span>
                      {!isReview && <i className="fas fa-pen fa-xs" style={{ color: '#999', cursor: 'pointer' }} onClick={() => setEditField(editField?.section === 'experience' ? null : { section: 'experience', field: '_section', index: null })}></i>}
                    </div>
                    {changedSections.has('experience') ? (
                      <div>
                        <div style={{ background: 'rgba(239,68,68,0.08)', padding: '0.35rem 0.5rem', borderRadius: '3px', marginBottom: '0.25rem' }}>
                          <span style={{ fontSize: '0.65rem', color: '#ef4444', fontWeight: 600 }}>OLD</span>
                          {(displayData.experience || []).map((exp, i) => (
                            <div key={exp.id || i} style={{ fontSize: '10pt', textDecoration: 'line-through', color: '#dc2626', marginBottom: '0.3rem' }}>
                              <strong>{exp.role}</strong> at <strong>{exp.company}</strong>
                              <div style={{ color: '#999' }}>{exp.start_date} - {exp.current ? 'Present' : exp.end_date}</div>
                              {exp.description && <p style={{ margin: '0.1rem 0', fontSize: '9pt' }}>{exp.description}</p>}
                            </div>
                          ))}
                        </div>
                        <div style={{ background: 'rgba(34,197,94,0.08)', padding: '0.35rem 0.5rem', borderRadius: '3px' }}>
                          <span style={{ fontSize: '0.65rem', color: '#16a34a', fontWeight: 600 }}>AI PROPOSED</span>
                          {(pendingChanges.optimizedData.experience || []).map((exp, i) => (
                            <div key={exp.id || i} style={{ fontSize: '10pt', color: '#15803d', fontWeight: 600, marginBottom: '0.3rem' }}>
                              <strong>{exp.role}</strong> at <strong>{exp.company}</strong>
                              <div style={{ color: '#166534' }}>{exp.start_date} - {exp.current ? 'Present' : exp.end_date}</div>
                              {exp.description && <p style={{ margin: '0.1rem 0', fontSize: '9pt' }}>{exp.description}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      (displayData.experience || []).map((exp, i) => (
                        <div key={exp.id || i} style={{ marginBottom: '0.5rem', fontSize: '10pt' }}>
                          {(!isReview && isEditing('experience', 'role', i)) ? (
                            <div className="inline-edit-form" style={{ background: '#f8f9fa', padding: '0.35rem', borderRadius: '4px', border: '1px solid #dee2e6', marginBottom: '0.25rem' }}>
                              <div className="d-flex justify-content-between mb-1">
                                <span style={{ fontSize: '0.7rem', color: '#666' }}><i className="fas fa-pen me-1"></i>Editing</span>
                                <button className="btn btn-sm" onClick={(e) => removeSectionItem('experience', i, e)}
                                  style={{ fontSize: '0.6rem', padding: '0.05rem 0.3rem', background: 'none', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '3px' }}>
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                              <input className="form-control form-control-sm mb-1" defaultValue={exp.role} placeholder="Role"
                                onBlur={(e) => handleFieldSave(e.target.value, 'experience', 'role', i)}
                                onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); }} autoFocus />
                              <input className="form-control form-control-sm mb-1" defaultValue={exp.company} placeholder="Company"
                                onBlur={(e) => handleFieldSave(e.target.value, 'experience', 'company', i)}
                                onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); }} />
                              <input className="form-control form-control-sm mb-1" defaultValue={exp.location} placeholder="Location"
                                onBlur={(e) => handleFieldSave(e.target.value, 'experience', 'location', i)} />
                              <div className="d-flex gap-2 mb-1">
                                <input className="form-control form-control-sm" defaultValue={exp.start_date} placeholder="Start"
                                  onBlur={(e) => handleFieldSave(e.target.value, 'experience', 'start_date', i)} style={{ width: '40%' }} />
                                <input className="form-control form-control-sm" defaultValue={exp.end_date} placeholder="End"
                                  onBlur={(e) => handleFieldSave(e.target.value, 'experience', 'end_date', i)} style={{ width: '40%' }} />
                              </div>
                              <input className="form-control form-control-sm mb-1" defaultValue={(exp.tech_stack || []).join(', ')} placeholder="Tech stack (comma-separated)"
                                onBlur={(e) => handleFieldSave(e.target.value.split(',').map(s => s.trim()).filter(Boolean), 'experience', 'tech_stack', i)} />
                              <textarea className="form-control form-control-sm mb-1" rows={2} defaultValue={exp.description} placeholder="Description"
                                onBlur={(e) => handleFieldSave(e.target.value, 'experience', 'description', i)} />
                              <textarea className="form-control form-control-sm mb-1" rows={1} defaultValue={(exp.achievements || []).join('\n')} placeholder="Achievements (one per line)"
                                onBlur={(e) => handleFieldSave(e.target.value.split('\n').map(s => s.trim()).filter(Boolean), 'experience', 'achievements', i)} />
                              <button className="btn btn-sm btn-outline-success mt-1" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}
                                onClick={() => setEditField(null)}>
                                <i className="fas fa-check me-1"></i> Done
                              </button>
                            </div>
                          ) : (
                            <div style={{ cursor: !isReview ? 'pointer' : 'default' }}
                                 onClick={() => { if (!isReview) setEditField({ section: 'experience', field: 'role', index: i }); }}>
                              <strong>{exp.role}</strong> at <strong>{exp.company}</strong>
                              <div style={{ color: '#555' }}>{exp.start_date} - {exp.current ? 'Present' : exp.end_date}</div>
                              {exp.description && <p style={{ margin: '0.15rem 0', fontSize: '9pt' }}>{exp.description}</p>}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                    {!isReview && (
                      <div className="text-center mt-1">
                        <button className="btn btn-sm" style={{ fontSize: '0.7rem', padding: '0', color: '#4dabf7', background: 'none', border: 'none', cursor: 'pointer' }}
                          onClick={() => addSectionItem('experience')}>
                          <i className="fas fa-plus me-1"></i>Add Experience
                        </button>
                      </div>
                    )}
                    {renderDiffActions('experience')}
                  </div>
                )}

                {/* Skills */}
                {(displayData?.skills || []).length > 0 && (
                  <div style={sectionDiffStyle('skills')}>
                    <div className="d-flex align-items-center gap-2" style={{ fontWeight: 700, borderBottom: '1px solid #999', marginBottom: '0.35rem' }}>
                      <span>Skills</span>
                      {!isReview && <i className="fas fa-pen fa-xs" style={{ color: '#999', cursor: 'pointer' }} onClick={() => setEditField(editField?.section === 'skills' ? null : { section: 'skills', field: '_section', index: null })}></i>}
                    </div>
                    {changedSections.has('skills') ? (
                      <div>
                        <div style={{ background: 'rgba(239,68,68,0.08)', padding: '0.25rem 0.5rem', borderRadius: '3px', marginBottom: '0.25rem' }}>
                          <span style={{ fontSize: '0.65rem', color: '#ef4444', fontWeight: 600 }}>OLD</span>
                          <span style={{ fontSize: '10pt', textDecoration: 'line-through', color: '#dc2626' }}>
                            {(displayData.skills || []).map(s => s.value).join(', ')}
                          </span>
                        </div>
                        <div style={{ background: 'rgba(34,197,94,0.08)', padding: '0.25rem 0.5rem', borderRadius: '3px' }}>
                          <span style={{ fontSize: '0.65rem', color: '#16a34a', fontWeight: 600 }}>AI PROPOSED</span>
                          <span style={{ fontSize: '10pt', color: '#15803d', fontWeight: 600 }}>
                            {(pendingChanges.optimizedData.skills || []).map(s => s.value).join(', ')}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {isEditing('skills', '_section') ? (
                          <div style={{ background: '#f8f9fa', padding: '0.35rem', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                            <input className="form-control form-control-sm mb-1" defaultValue={(displayData.skills || []).map(s => s.value).join(', ')} placeholder="Comma-separated skills"
                              onBlur={(e) => {
                                const vals = e.target.value.split(',').map(v => v.trim()).filter(Boolean);
                                setCurrentResume(prev => ({ ...prev, data: { ...prev.data, skills: vals.map((v, i) => ({ id: i + 1, value: v })) } }));
                                setEditField(null);
                              }}
                              onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); }} autoFocus />
                            <div style={{ fontSize: '0.7rem', color: '#999' }}>Type skills separated by commas, then press Enter</div>
                          </div>
                        ) : (
                          <span style={{ fontSize: '10pt', cursor: !isReview ? 'pointer' : 'default' }}
                                onClick={() => { if (!isReview) setEditField({ section: 'skills', field: '_section', index: null }); }}>
                            {(displayData.skills || []).map(s => s.value).join(', ')}
                          </span>
                        )}
                      </div>
                    )}
                    {!isReview && (
                      <div className="text-center mt-1">
                        <button className="btn btn-sm" style={{ fontSize: '0.7rem', padding: '0', color: '#4dabf7', background: 'none', border: 'none', cursor: 'pointer' }}
                          onClick={() => addSectionItem('skills')}>
                          <i className="fas fa-plus me-1"></i>Add Skill
                        </button>
                      </div>
                    )}
                    {renderDiffActions('skills')}
                  </div>
                )}

                {/* Certifications */}
                {(displayData?.certifications || []).length > 0 && (
                  <div style={sectionDiffStyle('certifications')}>
                    <div className="d-flex align-items-center gap-2" style={{ fontWeight: 700, borderBottom: '1px solid #999', marginBottom: '0.35rem' }}>
                      <span>Certifications</span>
                      {!isReview && <i className="fas fa-pen fa-xs" style={{ color: '#999', cursor: 'pointer' }} onClick={() => setEditField(editField?.section === 'certifications' ? null : { section: 'certifications', field: '_section', index: null })}></i>}
                    </div>
                    {changedSections.has('certifications') ? (
                      <div>
                        <div style={{ background: 'rgba(239,68,68,0.08)', padding: '0.25rem 0.5rem', borderRadius: '3px', marginBottom: '0.25rem' }}>
                          <span style={{ fontSize: '0.65rem', color: '#ef4444', fontWeight: 600 }}>OLD</span>
                          {(displayData.certifications || []).map((cert, i) => (
                            <div key={i} style={{ fontSize: '10pt', textDecoration: 'line-through', color: '#dc2626', marginBottom: '0.15rem' }}>
                              <strong>{cert.name}</strong> — {cert.issuer}
                              {cert.date && <span style={{ display: 'block', fontSize: '9pt', color: '#b91c1c' }}>{cert.date}</span>}
                            </div>
                          ))}
                        </div>
                        <div style={{ background: 'rgba(34,197,94,0.08)', padding: '0.25rem 0.5rem', borderRadius: '3px' }}>
                          <span style={{ fontSize: '0.65rem', color: '#16a34a', fontWeight: 600 }}>AI PROPOSED</span>
                          {(pendingChanges.optimizedData.certifications || []).map((cert, i) => (
                            <div key={i} style={{ fontSize: '10pt', color: '#15803d', fontWeight: 600, marginBottom: '0.15rem' }}>
                              <strong>{cert.name}</strong> — {cert.issuer}
                              {cert.date && <span style={{ display: 'block', fontSize: '9pt', color: '#166534' }}>{cert.date}</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      (displayData.certifications || []).map((cert, i) => (
                        <div key={i} style={{ marginBottom: '0.35rem', fontSize: '10pt' }}>
                          {(!isReview && isEditing('certifications', 'name', i)) ? (
                            <div className="inline-edit-form" style={{ background: '#f8f9fa', padding: '0.35rem', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                              <div className="d-flex justify-content-between mb-1">
                                <span style={{ fontSize: '0.7rem', color: '#666' }}><i className="fas fa-pen me-1"></i>Editing</span>
                                <button className="btn btn-sm" onClick={(e) => removeSectionItem('certifications', i, e)}
                                  style={{ fontSize: '0.6rem', padding: '0.05rem 0.3rem', background: 'none', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '3px' }}>
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                              <input className="form-control form-control-sm mb-1" defaultValue={cert.name} placeholder="Certification name"
                                onBlur={(e) => handleFieldSave(e.target.value, 'certifications', 'name', i)}
                                onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); }} autoFocus />
                              <input className="form-control form-control-sm mb-1" defaultValue={cert.issuer} placeholder="Issuing organization"
                                onBlur={(e) => handleFieldSave(e.target.value, 'certifications', 'issuer', i)}
                                onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); }} />
                              <input className="form-control form-control-sm mb-1" defaultValue={cert.date} placeholder="Date (e.g. 2023)"
                                onBlur={(e) => handleFieldSave(e.target.value, 'certifications', 'date', i)} />
                              <button className="btn btn-sm btn-outline-success mt-1" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}
                                onClick={() => setEditField(null)}>
                                <i className="fas fa-check me-1"></i> Done
                              </button>
                            </div>
                          ) : (
                            <div style={{ cursor: !isReview ? 'pointer' : 'default' }}
                                 onClick={() => { if (!isReview) setEditField({ section: 'certifications', field: 'name', index: i }); }}>
                              <strong>{cert.name}</strong> — {cert.issuer}
                              {cert.date && <span style={{ display: 'block', fontSize: '9pt', color: '#666' }}>{cert.date}</span>}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                    {!isReview && (
                      <div className="text-center mt-1">
                        <button className="btn btn-sm" style={{ fontSize: '0.7rem', padding: '0', color: '#4dabf7', background: 'none', border: 'none', cursor: 'pointer' }}
                          onClick={() => addSectionItem('certifications')}>
                          <i className="fas fa-plus me-1"></i>Add Certification
                        </button>
                      </div>
                    )}
                    {renderDiffActions('certifications')}
                  </div>
                )}

                {/* Projects */}
                {(displayData?.projects || []).length > 0 && (
                  <div style={sectionDiffStyle('projects')}>
                    <div className="d-flex align-items-center gap-2" style={{ fontWeight: 700, borderBottom: '1px solid #999', marginBottom: '0.35rem' }}>
                      <span>Projects</span>
                      {!isReview && <i className="fas fa-pen fa-xs" style={{ color: '#999', cursor: 'pointer' }} onClick={() => setEditField(editField?.section === 'projects' ? null : { section: 'projects', field: '_section', index: null })}></i>}
                    </div>
                    {changedSections.has('projects') ? (
                      <div>
                        <div style={{ background: 'rgba(239,68,68,0.08)', padding: '0.25rem 0.5rem', borderRadius: '3px', marginBottom: '0.25rem' }}>
                          <span style={{ fontSize: '0.65rem', color: '#ef4444', fontWeight: 600 }}>OLD</span>
                          {(displayData.projects || []).map((proj, i) => (
                            <div key={i} style={{ fontSize: '10pt', textDecoration: 'line-through', color: '#dc2626', marginBottom: '0.2rem' }}>
                              <strong>{proj.name}</strong> — {proj.description}
                            </div>
                          ))}
                        </div>
                        <div style={{ background: 'rgba(34,197,94,0.08)', padding: '0.25rem 0.5rem', borderRadius: '3px' }}>
                          <span style={{ fontSize: '0.65rem', color: '#16a34a', fontWeight: 600 }}>AI PROPOSED</span>
                          {(pendingChanges.optimizedData.projects || []).map((proj, i) => (
                            <div key={i} style={{ fontSize: '10pt', color: '#15803d', fontWeight: 600, marginBottom: '0.2rem' }}>
                              <strong>{proj.name}</strong> — {proj.description}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      (displayData.projects || []).map((proj, i) => (
                        <div key={i} style={{ marginBottom: '0.35rem', fontSize: '10pt' }}>
                          {(!isReview && isEditing('projects', 'name', i)) ? (
                            <div className="inline-edit-form" style={{ background: '#f8f9fa', padding: '0.35rem', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                              <div className="d-flex justify-content-between mb-1">
                                <span style={{ fontSize: '0.7rem', color: '#666' }}><i className="fas fa-pen me-1"></i>Editing</span>
                                <button className="btn btn-sm" onClick={(e) => removeSectionItem('projects', i, e)}
                                  style={{ fontSize: '0.6rem', padding: '0.05rem 0.3rem', background: 'none', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '3px' }}>
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                              <input className="form-control form-control-sm mb-1" defaultValue={proj.name} placeholder="Project name"
                                onBlur={(e) => handleFieldSave(e.target.value, 'projects', 'name', i)}
                                onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); }} autoFocus />
                              <textarea className="form-control form-control-sm mb-1" rows={2} defaultValue={proj.description} placeholder="Description"
                                onBlur={(e) => handleFieldSave(e.target.value, 'projects', 'description', i)} />
                              <input className="form-control form-control-sm mb-1" defaultValue={(proj.tech_stack || []).join(', ')} placeholder="Tech stack (comma-separated)"
                                onBlur={(e) => handleFieldSave(e.target.value.split(',').map(s => s.trim()).filter(Boolean), 'projects', 'tech_stack', i)} />
                              <button className="btn btn-sm btn-outline-success mt-1" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}
                                onClick={() => setEditField(null)}>
                                <i className="fas fa-check me-1"></i> Done
                              </button>
                            </div>
                          ) : (
                            <div style={{ cursor: !isReview ? 'pointer' : 'default' }}
                                 onClick={() => { if (!isReview) setEditField({ section: 'projects', field: 'name', index: i }); }}>
                              <strong>{proj.name}</strong> — {proj.description}
                              {(proj.tech_stack || []).length > 0 && <div style={{ color: '#555', fontSize: '9pt' }}>{proj.tech_stack.join(', ')}</div>}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                    {!isReview && (
                      <div className="text-center mt-1">
                        <button className="btn btn-sm" style={{ fontSize: '0.7rem', padding: '0', color: '#4dabf7', background: 'none', border: 'none', cursor: 'pointer' }}
                          onClick={() => addSectionItem('projects')}>
                          <i className="fas fa-plus me-1"></i>Add Project
                        </button>
                      </div>
                    )}
                    {renderDiffActions('projects')}
                  </div>
                )}

                {/* Achievements */}
                {(displayData?.achievements || []).length > 0 && (
                  <div style={sectionDiffStyle('achievements')}>
                    <div className="d-flex align-items-center gap-2" style={{ fontWeight: 700, borderBottom: '1px solid #999', marginBottom: '0.35rem' }}>
                      <span>Achievements</span>
                      {!isReview && <i className="fas fa-pen fa-xs" style={{ color: '#999', cursor: 'pointer' }} onClick={() => setEditField(editField?.section === 'achievements' ? null : { section: 'achievements', field: '_section', index: null })}></i>}
                    </div>
                    {changedSections.has('achievements') ? (
                      <div>
                        <div style={{ background: 'rgba(239,68,68,0.08)', padding: '0.25rem 0.5rem', borderRadius: '3px', marginBottom: '0.25rem' }}>
                          <span style={{ fontSize: '0.65rem', color: '#ef4444', fontWeight: 600 }}>OLD</span>
                          {(displayData.achievements || []).map((ach, i) => (
                            <div key={i} style={{ fontSize: '10pt', textDecoration: 'line-through', color: '#dc2626' }}>• {ach.value}</div>
                          ))}
                        </div>
                        <div style={{ background: 'rgba(34,197,94,0.08)', padding: '0.25rem 0.5rem', borderRadius: '3px' }}>
                          <span style={{ fontSize: '0.65rem', color: '#16a34a', fontWeight: 600 }}>AI PROPOSED</span>
                          {(pendingChanges.optimizedData.achievements || []).map((ach, i) => (
                            <div key={i} style={{ fontSize: '10pt', color: '#15803d', fontWeight: 600 }}>• {ach.value}</div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      (displayData.achievements || []).map((ach, i) => (
                        <div key={i} style={{ fontSize: '10pt' }}>
                          {(!isReview && isEditing('achievements', 'value', i)) ? (
                            <span className="d-flex align-items-center gap-1">
                              <input className="form-control form-control-sm" style={{ width: '75%' }}
                                defaultValue={ach.value} placeholder="Achievement"
                                onBlur={(e) => handleFieldSave(e.target.value.trim(), 'achievements', 'value', i)}
                                onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); }} autoFocus />
                              <button className="btn btn-sm" onClick={(e) => removeSectionItem('achievements', i, e)}
                                style={{ fontSize: '0.6rem', padding: '0.05rem 0.3rem', background: 'none', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '3px' }}>
                                <i className="fas fa-trash"></i>
                              </button>
                            </span>
                          ) : (
                            <span style={{ cursor: !isReview ? 'pointer' : 'default' }}
                                  onClick={() => { if (!isReview) setEditField({ section: 'achievements', field: 'value', index: i }); }}>
                              • {ach.value}
                            </span>
                          )}
                        </div>
                      ))
                    )}
                    {!isReview && (
                      <div className="text-center mt-1">
                        <button className="btn btn-sm" style={{ fontSize: '0.7rem', padding: '0', color: '#4dabf7', background: 'none', border: 'none', cursor: 'pointer' }}
                          onClick={() => addSectionItem('achievements')}>
                          <i className="fas fa-plus me-1"></i>Add Achievement
                        </button>
                      </div>
                    )}
                    {renderDiffActions('achievements')}
                  </div>
                )}
                </div>
              );
            })()}
          </div>  {/* close viewer-lhs */}

          {/* Diff Review Bar */}
          {pendingChanges && (
            <div className="diff-review-bar mb-3 p-2 d-flex align-items-center justify-content-between flex-wrap gap-2" style={{
              background: 'rgba(251,191,36,0.08)',
              border: '1px solid #fbbf24',
              borderRadius: '6px',
              width: '100%',
            }}>
              <div className="d-flex align-items-center gap-2">
                <i className="fas fa-code-branch" style={{ color: '#fbbf24', fontSize: '0.85rem' }}></i>
                <span style={{ color: '#fbbf24', fontSize: '0.8rem', fontWeight: 600 }}>
                  Reviewing AI Changes
                </span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                  {Array.from(remainingSections || []).length} section(s) modified
                </span>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-success" onClick={acceptAllChanges} disabled={loading}
                  style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                  <i className="fas fa-check me-1"></i> Accept All
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={rejectAllChanges} disabled={loading}
                  style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                  <i className="fas fa-times me-1"></i> Reject All
                </button>
              </div>
            </div>
          )}

          {/* RHS: Chat + ATS Suggestions */}
          <div className="viewer-rhs" style={{ width: isMobile ? '100%' : '360px', minWidth: isMobile ? '100%' : '300px' }}>
            {/* Chat-based modifications */}
            <div className="chat-section mb-3" style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
              <div className="chat-header p-2" style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--primary-color)' }}>
                <i className="fas fa-comment me-2"></i>Chat to Modify Resume
              </div>
              {chatHistory.length > 0 && (
                <div className="chat-history p-2" style={{ maxHeight: '250px', overflowY: 'auto', borderBottom: '1px solid var(--border-color)' }}>
                  {chatHistory.map((msg, i) => (
                    <div key={i} className={`chat-msg mb-1 p-1 ${msg.role === 'user' ? 'text-end' : ''}`}>
                      <span className={`badge ${msg.role === 'user' ? 'bg-primary' : 'bg-info'}`} style={{ fontSize: '0.7rem' }}>
                        {msg.role === 'user' ? 'You' : 'AI'}
                      </span>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '0.15rem' }}>{msg.content}</div>
                    </div>
                  ))}
                </div>
              )}
              <div className="chat-input d-flex gap-2 p-2">
                <input className="form-control form-control-sm" value={chatMessage}
                  onChange={e => setChatMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleChatSend()}
                  placeholder="Tell AI what to change..."
                  style={{ background: 'var(--tertiary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                <button className="btn btn-sm btn-primary" onClick={handleChatSend}><i className="fas fa-paper-plane"></i></button>
              </div>
            </div>

            {/* ATS Optimization Results */}
            {optimizationResult && (
              <div className="optimization-results p-3" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid var(--success)', borderRadius: '8px' }}>
                <h6 style={{ color: 'var(--success)', fontSize: '0.85rem' }}><i className="fas fa-check-circle me-2"></i>Optimization Complete</h6>
                {optimizationResult.changes?.length > 0 && (
                  <div className="mt-2">
                    <strong style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Changes Made:</strong>
                    <ul style={{ margin: '0.25rem 0', paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                      {optimizationResult.changes.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>
                )}
                {optimizationResult.suggestions?.length > 0 && (
                  <div className="mt-2">
                    <strong style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Suggestions:</strong>
                    <ul style={{ margin: '0.25rem 0', paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                      {optimizationResult.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
  }

  // ── Default: Editor View ──
  return (
    <MainLayout>
      <LoadingOverlay show={loading} text={uploadStatus || 'Processing...'} />
      <div className="page-container" style={{ padding: '1.5rem' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-sm btn-outline-secondary" onClick={() => { setView('list'); setCurrentResume(null); }}>
              <i className="fas fa-arrow-left me-1"></i> Back
            </button>
            <h5 style={{ margin: 0, color: 'var(--primary-color)' }}>
              <i className="fas fa-file-edit me-2"></i>{currentResume?.title || 'Resume Editor'}
            </h5>
          </div>
          <div className="d-flex gap-2">
            {currentResume?.ats_score != null && (
              <span className={`badge ${currentResume.ats_score >= 90 ? 'bg-success' : 'bg-warning text-dark'}`}>
                ATS: {currentResume.ats_score}/100
              </span>
            )}
          </div>
        </div>
        {renderEditor()}
      </div>
    </MainLayout>
  );
}


