import { useEffect, useRef, useState, useCallback } from 'react';
import './NeuronBrain.css';

const C = {
  working: { hex: '#4dabf7', rgb: '77, 171, 247', hl: '#e3f8ff' },
  coming: { hex: '#f59e0b', rgb: '245, 158, 11', hl: '#fff3e0' },
  dummy: { hex: '#3a5a7a', rgb: '90, 120, 160', hl: '#c0d8f0' },
};

function clr(f, isC, isDummy) {
  if (isDummy) return C.dummy;
  return isC || f?.status === 'working' ? C.working : C.coming;
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h |= 0; }
  return Math.abs(h) / 0x7fffffff;
}

const DUMMY_COUNT = 14;

export default function NeuronBrain({ features = [], onFeatureClick, onFeatureHover, onFeatureLeave, topOffset = 0 }) {
  const cvsRef = useRef(null);
  const elRef = useRef(null);
  const nsRef = useRef([]);
  const psRef = useRef([]);
  const pulsesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const hovRef = useRef(null);
  const dimRef = useRef({ w: 800, h: 500 });
  const cbRef = useRef({ onFeatureClick, onFeatureHover, onFeatureLeave });
  const dragRef = useRef({ active: false, id: null, sx: 0, sy: 0, moved: false });
  const animRef = useRef(null);
  const centerWaveRef = useRef(0);
  const nebulaRef = useRef([]);
  const tentaclesRef = useRef([]);
  cbRef.current = { onFeatureClick, onFeatureHover, onFeatureLeave };

  const [hovFeature, setHovFeature] = useState(null);
  const hovFeatRef = useRef(null);

  const initNebula = useCallback((w, h) => {
    nebulaRef.current = [
      { x: w * 0.2, y: h * 0.3, radius: Math.min(w, h) * 0.5, phase: 0, c1: 'rgba(77, 30, 120, 0.06)', c2: 'rgba(20, 10, 40, 0)' },
      { x: w * 0.7, y: h * 0.6, radius: Math.min(w, h) * 0.45, phase: 2, c1: 'rgba(30, 60, 140, 0.07)', c2: 'rgba(10, 10, 30, 0)' },
      { x: w * 0.5, y: h * 0.8, radius: Math.min(w, h) * 0.35, phase: 4, c1: 'rgba(100, 40, 120, 0.05)', c2: 'rgba(10, 10, 30, 0)' },
      { x: w * 0.8, y: h * 0.2, radius: Math.min(w, h) * 0.3, phase: 6, c1: 'rgba(20, 100, 150, 0.05)', c2: 'rgba(10, 10, 30, 0)' },
    ];
  }, []);

  const init = useCallback((w, h) => {
    const cx = w / 2, cy = h / 2 + topOffset, n = features.length, radius = Math.min(w, h) * 0.32;
    const ns = features.map((f, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      const j = 0.7 + hash(f.id) * 0.35;
      const r = radius * j;
      const z = 0.5 + hash(f.id + 'z') * 0.5;
      return {
        id: f.id, feature: f, z,
        baseX: cx + Math.cos(a) * r,
        baseY: cy + Math.sin(a) * r,
        x: cx + Math.cos(a) * r,
        y: cy + Math.sin(a) * r,
        vx: (hash(f.id + 'x') - 0.5) * 0.6, vy: (hash(f.id + 'y') - 0.5) * 0.6,
        seed: hash(f.id) * 100, isCenter: false, isDummy: false,
        spike: 0, targetSpike: 0, dendriteAngle: hash(f.id + 'da') * Math.PI * 2,
        fireBurst: 0, dummySz: 0,
      };
    });

    // Dummy neurons: scattered around the feature ring
    for (let i = 0; i < DUMMY_COUNT; i++) {
      const a = Math.random() * Math.PI * 2;
      const dist = radius * (0.35 + Math.random() * 1.4);
      const z = 0.3 + Math.random() * 0.7;
      const sz = 8 + Math.random() * 7;
      ns.push({
        id: `dummy-${i}`, feature: null, z,
        baseX: cx + Math.cos(a) * dist,
        baseY: cy + Math.sin(a) * dist,
        x: cx + Math.cos(a) * dist,
        y: cy + Math.sin(a) * dist,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        seed: Math.random() * 100, isCenter: false, isDummy: true,
        spike: 0, targetSpike: 0, dendriteAngle: Math.random() * Math.PI * 2,
        fireBurst: 0, dummySz: sz,
      });
    }

    ns.push({
      id: 'center', x: cx, y: cy, baseX: cx, baseY: cy,
      vx: 0, vy: 0, feature: null, seed: 0, isCenter: true, isDummy: false, z: 1,
      spike: 0, targetSpike: 0, dendriteAngle: 0, fireBurst: 0, dummySz: 0,
    });
    nsRef.current = ns;

    // Per-neuron connections
    const allNodes = ns.filter(n => !n.isCenter);
    const featNodes = allNodes.filter(n => !n.isDummy);
    const dummyNodes = allNodes.filter(n => n.isDummy);
    for (const n of allNodes) {
      if (n.isDummy) {
        // Dummy dendrites extend to nearest 3 feature neurons
        const byDist = featNodes.map(f => ({ id: f.id, d: Math.hypot(n.baseX - f.baseX, n.baseY - f.baseY) }));
        byDist.sort((a, b) => a.d - b.d);
        const toFeatures = byDist.slice(0, 3).map(o => o.id);
        // Also keep 1 nearest dummy neighbor for internal cluster connectivity
        const otherDummies = dummyNodes.filter(d => d.id !== n.id)
          .map(d => ({ id: d.id, d: Math.hypot(n.baseX - d.baseX, n.baseY - d.baseY) }));
        otherDummies.sort((a, b) => a.d - b.d);
        n.connections = toFeatures.concat(otherDummies.slice(0, 1).map(o => o.id));
      } else {
        // Feature neurons connect to 2 nearest non-center neighbors
        const others = allNodes.filter(o => o.id !== n.id);
        others.sort((a, b) => {
          const da = Math.hypot(n.baseX - a.baseX, n.baseY - a.baseY);
          const db = Math.hypot(n.baseX - b.baseX, n.baseY - b.baseY);
          return da - db;
        });
        n.connections = others.slice(0, 2).map(o => o.id);
      }
    }
    // Center connects to all feature neurons (not dummies)
    const centerN = ns.find(n => n.isCenter);
    centerN.connections = featNodes.map(o => o.id);

    const ps = [];
    for (let i = 0; i < 80; i++) {
      ps.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.08, vy: (Math.random() - 0.5) * 0.08,
        r: 0.2 + Math.random() * 1.5, pulse: Math.random() * Math.PI * 2,
        speed: 0.005 + Math.random() * 0.02,
        baseAlpha: 0.1 + Math.random() * 0.4,
        twinkleOff: Math.random() * Math.PI * 2,
      });
    }
    psRef.current = ps;
    pulsesRef.current = [];
    centerWaveRef.current = 0;
    initNebula(w, h);
  }, [features, initNebula, topOffset]);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    dimRef.current = { w: width, h: height };
    init(width, height);
    const onResize = () => {
      const { width: w, height: h } = el.getBoundingClientRect();
      dimRef.current = { w, h };
      init(w, h);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [init]);

  // ─── DRAWING ────────────────────────────────────────────────────────────

  function drawDendrites(ctx, x, y, sz, cl, seed, hov, t, dAngle, isDummy) {
    const cnt = isDummy ? 4 + (seed % 3) : 6 + (seed % 4);
    const baseOpacity = hov ? 0.65 : (isDummy ? 0.3 : 0.28);
    const baseWidth = isDummy ? 1.8 : 3;
    const hovWidth = isDummy ? 2.5 : 4.5;

    for (let i = 0; i < cnt; i++) {
      const baseA = dAngle + (i / cnt) * Math.PI * 2 + Math.sin(seed + i * 0.7) * 0.4 + t * 0.0002;
      const len = sz * (isDummy ? 2.2 : 3 + Math.sin(seed * 0.5 + i * 1.1) * 0.8);

      const midA = baseA + Math.sin(seed + i * 2.3 + t * 0.0004) * 0.3;
      const mx = x + Math.cos(baseA) * len * 0.5, my = y + Math.sin(baseA) * len * 0.5;
      const ex = x + Math.cos(midA) * len, ey = y + Math.sin(midA) * len;

      ctx.strokeStyle = `rgba(${cl.rgb}, ${baseOpacity * 1.2})`;
      ctx.lineWidth = hov ? hovWidth : baseWidth;
      ctx.beginPath(); ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + Math.cos(baseA) * len * 0.25, y + Math.sin(baseA) * len * 0.25, mx, my);
      ctx.stroke();

      ctx.lineWidth = hov ? (isDummy ? 1.2 : 2) : (isDummy ? 0.8 : 1.2);
      ctx.beginPath(); ctx.moveTo(mx, my);
      ctx.quadraticCurveTo(x + Math.cos(midA + 0.15) * len * (isDummy ? 0.5 : 0.7), y + Math.sin(midA + 0.15) * len * (isDummy ? 0.5 : 0.7), ex, ey);
      ctx.stroke();

      if (!isDummy) {
        for (let j = 0; j < 2; j++) {
          const sa = midA + (j === 0 ? 1.2 : -1.2) * (0.3 + Math.sin(seed + i + j) * 0.3);
          const sl = len * 0.5;
          const sx = mx + Math.cos(sa) * sl * 0.6, sy = my + Math.sin(sa) * sl * 0.6;
          ctx.strokeStyle = `rgba(${cl.rgb}, ${hov ? 0.4 : 0.14})`;
          ctx.lineWidth = hov ? 1.5 : 0.8;
          ctx.beginPath(); ctx.moveTo(mx, my);
          ctx.quadraticCurveTo(mx + Math.cos(sa) * sl * 0.3, my + Math.sin(sa) * sl * 0.3, sx, sy);
          ctx.stroke();

          const ta = sa + (j === 0 ? 0.7 : -0.7) * 0.5;
          const tx = sx + Math.cos(ta) * sl * 0.35, ty = sy + Math.sin(ta) * sl * 0.35;
          ctx.strokeStyle = `rgba(${cl.rgb}, ${hov ? 0.25 : 0.08})`;
          ctx.lineWidth = hov ? 0.8 : 0.4;
          ctx.beginPath(); ctx.moveTo(sx, sy);
          ctx.quadraticCurveTo(sx + Math.cos(ta) * sl * 0.15, sy + Math.sin(ta) * sl * 0.15, tx, ty);
          ctx.stroke();
        }
      }

      // Spines (fewer for dummies)
      const spineCnt = isDummy ? 2 : 5;
      for (let s = 0; s < spineCnt; s++) {
        const sp = 0.15 + s * (0.7 / spineCnt);
        const spx = x + Math.cos(baseA) * len * sp, spy = y + Math.sin(baseA) * len * sp;
        const spA = baseA + (Math.sin(seed + i + s * 5) > 0 ? 1.5 : -1.5) * (0.3 + Math.sin(sp * 3) * 0.2);
        ctx.strokeStyle = `rgba(${cl.rgb}, ${hov ? 0.35 : (isDummy ? 0.2 : 0.12)})`;
        ctx.lineWidth = isDummy ? 0.5 : 0.4;
        ctx.beginPath(); ctx.moveTo(spx, spy);
        ctx.lineTo(spx + Math.cos(spA) * sz * (isDummy ? 0.1 : 0.14), spy + Math.sin(spA) * sz * (isDummy ? 0.1 : 0.14));
        ctx.stroke();
      }
    }
  }

  function drawAxon(ctx, x1, y1, x2, y2, cl, hov, t, seed) {
    const dx = x2 - x1, dy = y2 - y1, dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 10) return;
    const ang = Math.atan2(dy, dx), seg = Math.max(6, Math.min(14, dist / 6)), cnt = Math.floor(dist / seg);
    const wob = Math.sin(t * 0.002 + (seed || 0)) * 3 + Math.sin(t * 0.0013 + (seed || 0) * 1.7) * 2;
    ctx.beginPath();
    for (let i = 0; i <= cnt; i++) {
      const p = i / cnt;
      const w = wob * Math.sin(i * 2.1 + (seed || 0) * 0.5 + t * 0.0003);
      const px = x1 + Math.cos(ang) * p * dist + Math.sin(ang + 1.57) * w;
      const py = y1 + Math.sin(ang) * p * dist - Math.cos(ang + 1.57) * w;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.shadowColor = `rgba(${cl.rgb}, ${hov ? 0.5 : 0.15})`;
    ctx.shadowBlur = hov ? 14 : 4;
    ctx.strokeStyle = `rgba(${cl.rgb}, ${hov ? 0.5 : 0.2})`;
    ctx.lineWidth = hov ? 4 : 2.5;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Myelin sheath — continuous thick tube over the tentacle
    ctx.beginPath();
    for (let i = 0; i <= cnt; i++) {
      const p = i / cnt;
      const w = wob * Math.sin(i * 2.1 + (seed || 0) * 0.5 + t * 0.0003);
      const px = x1 + Math.cos(ang) * p * dist + Math.sin(ang + 1.57) * w;
      const py = y1 + Math.sin(ang) * p * dist - Math.cos(ang + 1.57) * w;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.strokeStyle = `rgba(${cl.rgb}, ${hov ? 0.5 : 0.28})`;
    ctx.lineWidth = hov ? 5 : 3.5;
    ctx.stroke();

    // Synaptic bouton cluster at end
    for (let b = -1; b <= 1; b++) {
      const ba = ang + 1.57 * 0.2 * b;
      ctx.fillStyle = `rgba(${cl.rgb}, ${hov ? 0.65 : 0.3})`;
      ctx.beginPath();
      ctx.arc(x2 + Math.cos(ba) * (hov ? 5 : 3), y2 + Math.sin(ba) * (hov ? 5 : 3), hov ? 2.5 : 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawSoma(ctx, x, y, sz, cl, seed, hov, isDummy) {
    if (isDummy) {
      const g = ctx.createRadialGradient(x - sz * 0.15, y - sz * 0.15, 0, x, y, sz);
      g.addColorStop(0, `rgba(${cl.rgb}, 0.5)`);
      g.addColorStop(0.6, `rgba(${cl.rgb}, 0.3)`);
      g.addColorStop(1, `rgba(${cl.rgb}, 0.12)`);
      ctx.beginPath(); ctx.arc(x, y, sz, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
      ctx.strokeStyle = `rgba(${cl.rgb}, ${hov ? 0.4 : 0.15})`;
      ctx.lineWidth = hov ? 1.5 : 0.8;
      ctx.stroke();
      const nucR = sz * 0.35;
      ctx.beginPath(); ctx.arc(x - sz * 0.08, y - sz * 0.08, nucR, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.fill();
      ctx.beginPath(); ctx.arc(x - sz * 0.08, y - sz * 0.08, nucR * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fill();
      return;
    }

    const irr = 0.15;
    ctx.beginPath();
    for (let i = 0; i <= 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      const r = sz * (1 + Math.sin(seed + i * 2.2) * irr + Math.sin(seed * 0.7 + i * 3.5) * 0.06);
      i === 0 ? ctx.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r) : ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
    }
    ctx.closePath();

    const g = ctx.createRadialGradient(x - sz * 0.25, y - sz * 0.25, 0, x, y, sz);
    g.addColorStop(0, `rgba(${cl.rgb}, 1)`);
    g.addColorStop(0.4, `rgba(${cl.rgb}, 0.95)`);
    g.addColorStop(0.8, `rgba(${cl.rgb}, 0.7)`);
    g.addColorStop(1, `rgba(${cl.rgb}, 0.4)`);
    ctx.fillStyle = g; ctx.fill();
    ctx.strokeStyle = `rgba(${cl.rgb}, ${hov ? 0.9 : 0.5})`;
    ctx.lineWidth = hov ? 3 : 2; ctx.stroke();

    const hl = ctx.createRadialGradient(x - sz * 0.35, y - sz * 0.35, 0, x, y, sz);
    hl.addColorStop(0, 'rgba(255,255,255,0.4)');
    hl.addColorStop(0.3, 'rgba(255,255,255,0.08)');
    hl.addColorStop(0.6, 'rgba(0,0,0,0.06)');
    hl.addColorStop(1, `rgba(0,0,0,${hov ? 0.5 : 0.35})`);
    ctx.fillStyle = hl;
    ctx.beginPath();
    for (let i = 0; i <= 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      const r = sz * (1 + Math.sin(seed + i * 2.2) * irr + Math.sin(seed * 0.7 + i * 3.5) * 0.06);
      i === 0 ? ctx.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r) : ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
    }
    ctx.closePath(); ctx.fill();

    const nR = sz * 0.3;
    ctx.beginPath(); ctx.arc(x - sz * 0.1, y - sz * 0.1, nR, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.fill();
    ctx.strokeStyle = `rgba(${cl.rgb}, 0.4)`; ctx.lineWidth = 1; ctx.stroke();

    ctx.beginPath(); ctx.arc(x - sz * 0.1, y - sz * 0.1, nR * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fill();

    ctx.beginPath();
    ctx.arc(x - sz * 0.3, y - sz * 0.3, sz * 0.13, 0, Math.PI * 2);
    ctx.fillStyle = cl.hl;
    ctx.globalAlpha = hov ? 0.7 : 0.3;
    ctx.fill();
    ctx.globalAlpha = 1;

    for (let i = 0; i < 10; i++) {
      const na = seed + i * 1.1, nd = sz * 0.4 * (0.3 + Math.sin(na) * 0.35);
      ctx.beginPath();
      ctx.arc(x + Math.cos(na) * nd, y + Math.sin(na) * nd, sz * (0.06 + Math.sin(na * 2) * 0.03), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${cl.rgb}, 0.25)`; ctx.fill();
    }

    for (let i = 0; i < 14; i++) {
      const ca = (i / 14) * Math.PI * 2 + seed * 0.1;
      const cr = sz * (1 + Math.sin(seed + i * 2.2) * irr + Math.sin(seed * 0.7 + i * 3.5) * 0.06) * 0.9;
      ctx.beginPath();
      ctx.arc(x + Math.cos(ca) * cr, y + Math.sin(ca) * cr, sz * 0.045, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${cl.rgb}, ${hov ? 0.75 : 0.35})`;
      ctx.fill();
    }

    const hillAngle = seed + 4.7;
    ctx.beginPath();
    ctx.moveTo(x + Math.cos(hillAngle - 0.4) * sz * 0.8, y + Math.sin(hillAngle - 0.4) * sz * 0.8);
    ctx.quadraticCurveTo(
      x + Math.cos(hillAngle) * sz * 1.3, y + Math.sin(hillAngle) * sz * 1.3,
      x + Math.cos(hillAngle + 0.4) * sz * 0.8, y + Math.sin(hillAngle + 0.4) * sz * 0.8
    );
    ctx.fillStyle = `rgba(${cl.rgb}, 0.4)`;
    ctx.fill();
  }

  function drawNebula(ctx, w, h, t) {
    const clouds = nebulaRef.current;
    for (const c of clouds) {
      const cx = c.x + Math.sin(t * 0.0001 + c.phase) * 40;
      const cy = c.y + Math.cos(t * 0.00008 + c.phase * 1.3) * 30;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, c.radius);
      g.addColorStop(0, c.c1);
      g.addColorStop(0.6, c.c2);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }
  }

  function drawWaves(ctx, w, h, t) {
    for (let wave = 0; wave < 3; wave++) {
      ctx.beginPath();
      const baseY = h * (0.3 + wave * 0.2);
      for (let x = 0; x <= w; x += 3) {
        const y = baseY + Math.sin(x * 0.008 + t * 0.0015 + wave * 2.1) * 25
                  + Math.sin(x * 0.015 + t * 0.002 + wave * 3.7) * 12;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(77, 171, 247, ${0.02 + wave * 0.015})`;
      ctx.lineWidth = 1.5 - wave * 0.3;
      ctx.stroke();
    }
  }

  function drawConnectingDendrite(ctx, x1, y1, r1, x2, y2, cl, hov, t, seed) {
    const dx = x2 - x1, dy = y2 - y1, dist = Math.sqrt(dx * dx + dy * dy);
    if (dist - r1 < 8) return;
    const ang = Math.atan2(dy, dx);
    const sx = x1 + Math.cos(ang) * r1, sy = y1 + Math.sin(ang) * r1;
    const adjDist = dist - r1;
    const seg = Math.max(5, Math.min(10, adjDist / 8));
    const cnt = Math.floor(adjDist / seg);
    const wob = Math.sin(t * 0.002 + seed) * 2.5 + Math.sin(t * 0.0013 + seed * 1.7) * 1.5;

    // Tapering dendrite path — thicker at soma, thin at tip
    ctx.beginPath();
    for (let i = 0; i <= cnt; i++) {
      const p = i / cnt;
      const w = wob * Math.sin(i * 2.3 + seed * 0.5 + t * 0.0003);
      const px = sx + Math.cos(ang) * p * adjDist + Math.sin(ang + 1.57) * w;
      const py = sy + Math.sin(ang) * p * adjDist - Math.cos(ang + 1.57) * w;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.shadowColor = `rgba(${cl.rgb}, ${hov ? 0.5 : 0.15})`;
    ctx.shadowBlur = hov ? 14 : 4;
    ctx.strokeStyle = `rgba(${cl.rgb}, ${hov ? 0.5 : 0.22})`;
    ctx.lineWidth = hov ? 2.8 : 1.8;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Spines along the dendrite
    const spineCount = Math.min(5, Math.floor(adjDist / 28));
    for (let s = 0; s < spineCount; s++) {
      const sp = 0.15 + s * (0.7 / spineCount);
      const spDist = adjDist * sp;
      const wobSp = wob * Math.sin(sp * cnt * 0.8 + seed * 0.5 + t * 0.0003);
      const spx = sx + Math.cos(ang) * spDist + Math.sin(ang + 1.57) * wobSp;
      const spy = sy + Math.sin(ang) * spDist - Math.cos(ang + 1.57) * wobSp;
      const spA = ang + (Math.sin(seed + s * 5) > 0 ? 1.2 : -1.2) * 0.4;
      ctx.strokeStyle = `rgba(${cl.rgb}, ${hov ? 0.3 : 0.1})`;
      ctx.lineWidth = 0.6;
      ctx.beginPath(); ctx.moveTo(spx, spy);
      ctx.lineTo(spx + Math.cos(spA) * 4, spy + Math.sin(spA) * 4);
      ctx.stroke();
    }

    // Bouton at end
    const endW = wob * Math.sin(cnt * 2.3 + seed * 0.5 + t * 0.0003);
    const ex = sx + Math.cos(ang) * adjDist + Math.sin(ang + 1.57) * endW;
    const ey = sy + Math.sin(ang) * adjDist - Math.cos(ang + 1.57) * endW;
    for (let b = -1; b <= 1; b++) {
      const ba = ang + 1.57 * 0.2 * b;
      ctx.fillStyle = `rgba(${cl.rgb}, ${hov ? 0.5 : 0.22})`;
      ctx.beginPath();
      ctx.arc(ex + Math.cos(ba) * (hov ? 2.5 : 1.5), ey + Math.sin(ba) * (hov ? 2.5 : 1.5), hov ? 1.5 : 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // ─── SIGNAL PULSE SYSTEM ────────────────────────────────────────────────

  function spawnPulse(fromX, fromY, toX, toY, rgb) {
    pulsesRef.current.push({
      fromX, fromY, toX, toY,
      progress: 0,
      speed: 0.006 + Math.random() * 0.008,
      rgb,
    });
  }

  // ─── ANIMATION ──────────────────────────────────────────────────────────

  useEffect(() => {
    const cvs = cvsRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let running = true, t = 0;

    const frame = () => {
      if (!running) return;
      t += 1;
      const { w, h } = dimRef.current;
      if (cvs.width !== w * dpr || cvs.height !== h * dpr) { cvs.width = w * dpr; cvs.height = h * dpr; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const ns = nsRef.current, ps = psRef.current, dr = dragRef.current;
      const pulses = pulsesRef.current;
      if (!ns.length) { animRef.current = requestAnimationFrame(frame); return; }

      // ── Nebula background ──
      drawNebula(ctx, w, h, t);

      // ── Animated waves ──
      drawWaves(ctx, w, h, t);

      // ── 3D rotation ──
      const rot = Math.sin(t * 0.00018) * 0.2 + Math.cos(t * 0.00012) * 0.1;
      const cosR = Math.cos(rot), sinR = Math.sin(rot);
      const cx = w / 2, cy = h / 2 + topOffset;

      // Update particles
      for (const p of ps) {
        p.x += p.vx; p.y += p.vy; p.pulse += p.speed;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      // Update neurons
      ns.forEach((n, i) => {
        if (n.isCenter) return;

        if (dr.active && dr.id === n.id && !n.isDummy) {
          n.x += (mouseRef.current.x - n.x) * 0.4;
          n.y += (mouseRef.current.y - n.y) * 0.4;
          return;
        }

        const relX = n.baseX - cx, relY = n.baseY - cy;
        const rx = relX * cosR - relY * sinR, ry = relX * sinR + relY * cosR;
        const depthScale = 0.7 + n.z * 0.5;
        const driftX = Math.sin(t * 0.002 + i * 1.1) * 0.2 * depthScale;
        const driftY = Math.cos(t * 0.002 + i * 1.3) * 0.2 * depthScale;
        const targetX = cx + rx + driftX, targetY = cy + ry + driftY;

        n.x += (targetX - n.x) * 0.1 + n.vx;
        n.y += (targetY - n.y) * 0.1 + n.vy;
        n.vx += (targetX - n.x) * 0.002;
        n.vy += (targetY - n.y) * 0.002;
        n.vx *= 0.96; n.vy *= 0.96;
        n.x += Math.sin(t * 0.015 + i * 2.3) * 0.06;
        n.y += Math.cos(t * 0.012 + i * 1.9) * 0.06;

        n.dendriteAngle += 0.0003 * depthScale;

        n.targetSpike = hovRef.current === n.id ? 1 : 0;
        n.spike += (n.targetSpike - n.spike) * 0.08;

        const margin = 40;
        if (n.x < margin) { n.x = margin; n.vx *= -1; }
        if (n.x > w - margin) { n.x = w - margin; n.vx *= -1; }
        if (n.y < margin + 10) { n.y = margin + 10; n.vy *= -1; }
        if (n.y > h - margin) { n.y = h - margin; n.vy *= -1; }
      });

      const cn = ns[ns.length - 1];
      if (dr.active && dr.id === 'center') {
        cn.x += (mouseRef.current.x - cn.x) * 0.4;
        cn.y += (mouseRef.current.y - cn.y) * 0.4;
      } else {
        cn.x += (cx - cn.x) * 0.02;
        cn.y += (cy - cn.y) * 0.02;
      }

      // Spawn random pulses
      if (t % 2 === 0 && Math.random() < 0.035) {
        const real = ns.filter(n => !n.isCenter && !n.isDummy);
        if (real.length) {
          const n = real[Math.floor(Math.random() * real.length)];
          spawnPulse(cn.x, cn.y, n.x, n.y, C.working.rgb);
        }
      }

      centerWaveRef.current += 1;

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;
        if (p.progress >= 1) pulses.splice(i, 1);
      }

      // Draw particles (stars)
      ctx.fillStyle = 'rgba(200, 210, 255, 0.3)';
      for (const p of ps) {
        const twinkle = Math.sin(p.pulse * 2 + p.twinkleOff) * 0.3 + 0.7;
        const pa = p.baseAlpha * twinkle;
        ctx.globalAlpha = pa;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Hover detection (skip dummy)
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      let newHov = null, newHovFeat = null;
      ns.forEach((n) => {
        if (n.isCenter || n.isDummy) return;
        const dx = n.x - mx, dy = n.y - my;
        if (Math.sqrt(dx * dx + dy * dy) < 35) { newHov = n.id; newHovFeat = n.feature; }
      });

      if (newHov !== hovRef.current) {
        hovRef.current = newHov;
        if (newHovFeat) {
          setHovFeature(newHovFeat);
          hovFeatRef.current = newHovFeat;
          cbRef.current.onFeatureHover?.(newHovFeat);
          const hn = ns.find(n => n.id === newHov);
          if (hn) {
            for (let b = 0; b < 3; b++) {
              setTimeout(() => spawnPulse(cn.x, cn.y, hn.x, hn.y, C.working.rgb), b * 70);
            }
          }
        } else {
          setHovFeature(null);
          hovFeatRef.current = null;
          cbRef.current.onFeatureLeave?.();
        }
      }

      // ── Per-neuron tentacles — each connection drawn from its soma edge ──
      const drawnTents = new Set();
      ns.forEach((n) => {
        const r1 = n.isCenter ? 32 : (n.isDummy ? n.dummySz : 22) * (0.7 + (n.z || 0.5) * 0.5);
        for (const connId of (n.connections || [])) {
          const key = [n.id, connId].sort().join('\x00');
          if (drawnTents.has(key)) continue;
          drawnTents.add(key);
          const target = ns.find(m => m.id === connId);
          if (!target) continue;
          const active = hovRef.current === n.id || hovRef.current === target.id;
          const dnCol = n.isDummy ? C.dummy : C.working;
          drawConnectingDendrite(ctx, n.x, n.y, r1, target.x, target.y,
            dnCol, active, t, (hash(n.id + connId) + 1) * 20);
        }
      });
      // Traveling pulses
      for (const p of pulses) {
        const px = p.fromX + (p.toX - p.fromX) * p.progress;
        const py = p.fromY + (p.toY - p.fromY) * p.progress;
        const pulseAlpha = Math.sin(p.progress * Math.PI) * 0.9;
        const pulseR = 2.5 + Math.sin(p.progress * Math.PI) * 3;

        ctx.fillStyle = `rgba(${p.rgb}, ${pulseAlpha})`;
        ctx.shadowColor = `rgba(${p.rgb}, ${pulseAlpha * 0.8})`;
        ctx.shadowBlur = 16;
        ctx.beginPath(); ctx.arc(px, py, pulseR, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Center hub energy wave
      const wavePhase = (centerWaveRef.current % 300) / 300 * Math.PI * 2;
      const waveRadius = 35 + Math.sin(wavePhase) * 30 + 25;
      const waveAlpha = Math.max(0, Math.sin(wavePhase)) * 0.12;
      if (waveAlpha > 0.01) {
        ctx.strokeStyle = `rgba(77, 171, 247, ${waveAlpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(cn.x, cn.y, waveRadius, 0, Math.PI * 2); ctx.stroke();
      }

      // Draw neurons
      ns.forEach((n, i) => {
        if (n.isCenter) {
          const col = C.working;
          const size = 32;
          const gR = 80;
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, gR);
          g.addColorStop(0, `rgba(${col.rgb}, 0.3)`);
          g.addColorStop(0.5, `rgba(${col.rgb}, 0.05)`);
          g.addColorStop(1, `rgba(${col.rgb}, 0)`);
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(n.x, n.y, gR, 0, Math.PI * 2); ctx.fill();
          drawDendrites(ctx, n.x, n.y, size, col, n.seed, false, t, n.dendriteAngle, false);
          drawSoma(ctx, n.x, n.y, size, col, n.seed, false, false);
          return;
        }

        const hov = hovRef.current === n.id;
        const col = clr(n.feature, false, n.isDummy);
        const pulse = Math.sin(t * 0.02 + i * 1.7) * 0.25 + 0.75;
        const zScale = 0.7 + n.z * 0.5;
        const baseSz = n.isDummy ? n.dummySz : 22;
        const size = baseSz * zScale * (0.95 + pulse * 0.05) * (hov ? 1.2 : 1);

        // Glow (bigger for feature neurons)
        const gR = n.isDummy ? size * 3 : size * (hov ? 16 : 6);
        const glowAlpha = n.isDummy
          ? (hov ? 0.18 : 0.08)
          : (hov ? 0.75 : 0.15 * pulse * zScale);
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, gR);
        g.addColorStop(0, `rgba(${col.rgb}, ${glowAlpha})`);
        g.addColorStop(0.4, `rgba(${col.rgb}, ${n.isDummy ? 0 : (hov ? 0.25 : 0)})`);
        g.addColorStop(1, `rgba(${col.rgb}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(n.x, n.y, gR, 0, Math.PI * 2); ctx.fill();

        drawDendrites(ctx, n.x, n.y, size, col, n.seed, hov, t, n.dendriteAngle, n.isDummy);
        drawSoma(ctx, n.x, n.y, size, col, n.seed, hov, n.isDummy);

        if (n.spike > 0.01 && !n.isDummy) {
          const sr = size * (3 + n.spike * 6);
          const sg = ctx.createRadialGradient(n.x, n.y, size, n.x, n.y, sr);
          sg.addColorStop(0, `rgba(${col.rgb}, ${n.spike * 0.4})`);
          sg.addColorStop(1, `rgba(${col.rgb}, 0)`);
          ctx.fillStyle = sg;
          ctx.beginPath(); ctx.arc(n.x, n.y, sr, 0, Math.PI * 2); ctx.fill();
        }

        // Label
        if (!n.isDummy && n.feature) {
          ctx.save();
          ctx.textAlign = 'center'; ctx.textBaseline = 'top';
          ctx.font = `${hov ? 'bold ' : ''}${hov ? 12 : 11}px 'Inter','Segoe UI',sans-serif`;
          if (hov) {
            ctx.shadowColor = `rgba(${col.rgb}, 0.9)`; ctx.shadowBlur = 16;
            ctx.fillStyle = '#ffffff';
          } else {
            ctx.shadowColor = 'rgba(0,0,0,0.9)'; ctx.shadowBlur = 8;
            ctx.fillStyle = 'rgba(200,200,220,0.7)';
          }
          ctx.fillText(n.feature.name, n.x, n.y + size + 26);
          ctx.restore();
        }
      });

      animRef.current = requestAnimationFrame(frame);
    };
    animRef.current = requestAnimationFrame(frame);
    return () => { running = false; cancelAnimationFrame(animRef.current); };
  }, [topOffset]);

  // ─── MOUSE EVENTS ───────────────────────────────────────────────────────

  const onMouseDown = (e) => {
    const cvs = cvsRef.current;
    if (!cvs) return;
    const r = cvs.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    for (const n of nsRef.current) {
      if (n.isCenter || n.isDummy) continue;
      const d = Math.sqrt((n.x - x) ** 2 + (n.y - y) ** 2);
      if (d < 35) {
        dragRef.current = { active: true, id: n.id, sx: x, sy: y, moved: false };
        return;
      }
    }
  };

  const onMouseMove = (e) => {
    const cvs = cvsRef.current;
    if (!cvs) return;
    const r = cvs.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    mouseRef.current = { x, y };
    if (dragRef.current.active) {
      const dx = x - dragRef.current.sx, dy = y - dragRef.current.sy;
      if (Math.sqrt(dx * dx + dy * dy) > 5) dragRef.current.moved = true;
    }
  };

  const onMouseUp = () => {
    const dr = dragRef.current;
    if (dr.active && dr.id && !dr.moved) {
      const n = nsRef.current.find(n => n.id === dr.id);
      if (n && n.feature) {
        setHovFeature(n.feature);
        hovFeatRef.current = n.feature;
        cbRef.current.onFeatureClick?.(n.feature);
      }
    }
    dragRef.current = { active: false, id: null, sx: 0, sy: 0, moved: false };
  };

  const onMouseLeave = () => {
    mouseRef.current = { x: -9999, y: -9999 };
    hovRef.current = null;
    hovFeatRef.current = null;
    setHovFeature(null);
    cbRef.current.onFeatureLeave?.();
    dragRef.current = { active: false, id: null, sx: 0, sy: 0, moved: false };
  };

  const col = hovFeature ? clr(hovFeature, false, false) : C.working;

  return (
    <div ref={elRef} className="neuron-brain-container">
      <canvas
        ref={cvsRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      />

      <div className="neuron-brain-legend">
        <span className="neuron-brain-legend-item">
          <span className="neuron-brain-dot working" /> Working
        </span>
        <span className="neuron-brain-legend-item">
          <span className="neuron-brain-dot coming" /> Coming Soon
        </span>
      </div>

      <div className={`neuron-right-panel ${hovFeature ? 'visible' : ''}`}>
        {hovFeature ? (
          <div className="neuron-panel-inner">
            <div className="neuron-panel-icon" style={{ background: `${col.hex}20`, borderColor: `${col.hex}40`, color: col.hex }}>
              <i className={hovFeature.icon} />
            </div>
            <h3 className="neuron-panel-name" style={{ color: col.hex }}>{hovFeature.name}</h3>
            {hovFeature.status === 'coming' && (
              <span className="neuron-panel-badge" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid #f59e0b' }}>Coming Soon</span>
            )}
            {hovFeature.status === 'working' && (
              <span className="neuron-panel-badge" style={{ background: 'rgba(77,171,247,0.15)', color: '#4dabf7', border: '1px solid #4dabf7' }}>Available</span>
            )}
            <p className="neuron-panel-desc">{hovFeature.description}</p>
            {hovFeature.status === 'working' && (
              <button className="neuron-panel-btn" style={{ background: col.hex, color: '#000' }}
                onClick={() => cbRef.current.onFeatureClick?.(hovFeature)}>
                <i className="fas fa-arrow-right" /> Explore
              </button>
            )}
          </div>
        ) : (
          <div className="neuron-panel-empty">
            <i className="fas fa-brain" />
            <p>Hover over a neuron<br />to see details</p>
          </div>
        )}
      </div>
    </div>
  );
}
