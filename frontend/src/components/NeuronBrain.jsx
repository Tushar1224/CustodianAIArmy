import { useEffect, useRef, useState, useCallback } from 'react';
import './NeuronBrain.css';

function cssVar(name) {
  if (typeof document === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function getThemeColors() {
  const text = cssVar('--text');
  const text2 = cssVar('--text-secondary');
  const primary = cssVar('--primary');
  const warning = cssVar('--warning');
  const textMuted = cssVar('--text-muted');
  return { text: text || '#1a2332', text2: text2 || '#475569', primary: primary || '#4dabf7', warning: warning || '#f59e0b', textMuted: textMuted || '#94a3b8' };
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

const CENTER_COL = { hex: '#8b5cf6', rgb: '139, 92, 246' };
const FEATURE_COL = { hex: '#4dabf7', rgb: '77, 171, 247' };
const COMING_COL = { hex: '#f59e0b', rgb: '245, 158, 11' };
const DUMMY_COL = { hex: '#94a3b8', rgb: '148, 163, 184' };

const DUMMY_COUNT = 14;

function colorFor(f) {
  if (!f) return DUMMY_COL;
  return f.status === 'coming' ? COMING_COL : FEATURE_COL;
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h |= 0; }
  return Math.abs(h) / 0x7fffffff;
}

export default function NeuronBrain({ features = [], onFeatureClick, topOffset = 0 }) {
  const cvsRef = useRef(null);
  const elRef = useRef(null);
  const nsRef = useRef([]);
  const psRef = useRef([]);

  const mouseRef = useRef({ x: -9999, y: -9999 });
  const hovRef = useRef(null);
  const dimRef = useRef({ w: 800, h: 500 });
  const cbRef = useRef({ onFeatureClick });
  const animRef = useRef(null);
  const dragRef = useRef({ active: false, id: null, sx: 0, sy: 0, moved: false });
  const centerWaveRef = useRef(0);
  cbRef.current = { onFeatureClick };

  const [hovFeature, setHovFeature] = useState(null);

  const init = useCallback((w, h) => {
    const cx = w / 2, cy = h / 2 + topOffset;
    const maxR = Math.min(w, h) * 0.55;

    const placed = [];
    function overlaps(x, y, sz) {
      for (const p of placed) {
        if (Math.hypot(p.x - x, p.y - y) < (p.sz + sz + 22)) return true;
      }
      return false;
    }

    const usedAngles = [];
    const ns = features.map((f, i) => {
      let a, attempts = 0;
      do {
        a = Math.random() * Math.PI * 2;
        attempts++;
      } while (attempts < 40 && usedAngles.some(ua => Math.abs(ua - a) < 0.3));
      usedAngles.push(a);

      const r = maxR * (0.2 + hash(f.id + 'dist') * 0.7);
      const z = 0.4 + hash(f.id + 'z') * 0.6;
        const sz = 24 + hash(f.id + 'sz') * 14;
      let x = cx + Math.cos(a) * r;
      let y = cy + Math.sin(a) * r;
      let iter = 0;
      while (overlaps(x, y, sz) && iter < 20) {
        x += (Math.random() - 0.5) * 18;
        y += (Math.random() - 0.5) * 18;
        const clampedR = Math.hypot(x - cx, y - cy);
        if (clampedR > maxR * 1.1) { x = cx + Math.cos(a) * r; y = cy + Math.sin(a) * r; }
        iter++;
      }
      placed.push({ x, y, sz });
      return {
        id: f.id, feature: f, z,
        baseX: x, baseY: y,
        x, y,
        vx: (hash(f.id + 'x') - 0.5) * 0.2, vy: (hash(f.id + 'y') - 0.5) * 0.2,
        seed: hash(f.id) * 100, isCenter: false, isDummy: false,
        spike: 0, targetSpike: 0, dendriteAngle: hash(f.id + 'da') * Math.PI * 2,
        glowPhase: Math.random() * Math.PI * 2,
        subVx: (hash(f.id + 'xv') - 0.5) * 3,
        subVy: (hash(f.id + 'yv') - 0.5) * 3,
        size: sz,
      };
    });

    for (let i = 0; i < DUMMY_COUNT; i++) {
      let a = Math.random() * Math.PI * 2;
      const dist = maxR * (0.08 + Math.random() * 1.15);
      const sz = 5 + Math.random() * 6;
      let x = cx + Math.cos(a) * dist;
      let y = cy + Math.sin(a) * dist;
      let iter = 0;
      while (overlaps(x, y, sz) && iter < 30) {
        a = Math.random() * Math.PI * 2;
        x = cx + Math.cos(a) * maxR * (0.08 + Math.random() * 1.15);
        y = cy + Math.sin(a) * maxR * (0.08 + Math.random() * 1.15);
        iter++;
      }
      placed.push({ x, y, sz });
      const z = 0.15 + Math.random() * 0.5;
      ns.push({
        id: `dummy-${i}`, feature: null, z,
        baseX: x, baseY: y, x, y,
        vx: (Math.random() - 0.5) * 0.1, vy: (Math.random() - 0.5) * 0.1,
        seed: Math.random() * 100, isCenter: false, isDummy: true,
        spike: 0, targetSpike: 0, dendriteAngle: Math.random() * Math.PI * 2,
        glowPhase: Math.random() * Math.PI * 2,
        subVx: 0, subVy: 0, size: sz,
      });
    }

    ns.push({
      id: 'center', x: cx, y: cy, baseX: cx, baseY: cy,
      vx: 0, vy: 0, feature: null, seed: 0, isCenter: true, isDummy: false, z: 1,
      spike: 0, targetSpike: 0, dendriteAngle: 0,
      targetX: cx, targetY: cy, glowPhase: 0, subVx: 0, subVy: 0,
      size: 48,
    });
    nsRef.current = ns;

    const featNodes = ns.filter(n => !n.isCenter && !n.isDummy);
    const dummyNodes = ns.filter(n => n.isDummy);
    const allNonCenter = ns.filter(n => !n.isCenter);

    for (const n of allNonCenter) {
      if (n.isDummy) {
        const otherDummies = dummyNodes.filter(d => d.id !== n.id)
          .map(d => ({ id: d.id, d: Math.hypot(n.baseX - d.baseX, n.baseY - d.baseY) }));
        otherDummies.sort((a, b) => a.d - b.d);
        n.connections = otherDummies.slice(0, 2).map(o => o.id);
      } else {
        const others = allNonCenter.filter(o => o.id !== n.id);
        others.sort((a, b) => {
          return Math.hypot(n.baseX - a.baseX, n.baseY - a.baseY) - Math.hypot(n.baseX - b.baseX, n.baseY - b.baseY);
        });
        n.connections = others.slice(0, 6).map(o => o.id);
      }
    }
    const centerN = ns.find(n => n.isCenter);
    centerN.connections = featNodes.map(o => o.id);

    const ps = [];
    for (let i = 0; i < 80; i++) {
      ps.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.03, vy: (Math.random() - 0.5) * 0.03,
        r: 0.3 + Math.random() * 1.2, pulse: Math.random() * Math.PI * 2,
        speed: 0.003 + Math.random() * 0.02,
        baseAlpha: 0.08 + Math.random() * 0.2,
        twinkleOff: Math.random() * Math.PI * 2,
        isFire: false,
      });
    }
    for (let i = 0; i < 15; i++) {
      ps.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.06, vy: (Math.random() - 0.5) * 0.06,
        r: 1.2 + Math.random() * 2.5, pulse: Math.random() * Math.PI * 2,
        speed: 0.01 + Math.random() * 0.03,
        baseAlpha: 0.15 + Math.random() * 0.35,
        twinkleOff: Math.random() * Math.PI * 2,
        isFire: true,
      });
    }
    psRef.current = ps;
    centerWaveRef.current = 0;
  }, [features, topOffset]);

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

  function drawSoma(ctx, x, y, sz, rgb, seed, hov) {
    const irr = 0.08;
    const segments = 18;
    ctx.beginPath();
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      const r = sz * (1 + Math.sin(seed + i * 2.2) * irr + Math.sin(seed * 0.7 + i * 3.5) * 0.03);
      i === 0 ? ctx.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r) : ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
    }
    ctx.closePath();

    const g = ctx.createRadialGradient(x - sz * 0.3, y - sz * 0.3, 0, x, y, sz);
    g.addColorStop(0, 'rgba(255,255,255,0.55)');
    g.addColorStop(0.15, `rgba(${rgb}, 0.88)`);
    g.addColorStop(0.45, `rgba(${rgb}, 0.7)`);
    g.addColorStop(0.75, `rgba(${rgb}, 0.5)`);
    g.addColorStop(1, `rgba(${rgb}, 0.2)`);
    ctx.fillStyle = g; ctx.fill();
    ctx.strokeStyle = `rgba(${rgb}, ${hov ? 0.7 : 0.35})`;
    ctx.lineWidth = hov ? 2.5 : 1.2; ctx.stroke();

    const hlG = ctx.createRadialGradient(x - sz * 0.3, y - sz * 0.3, 0, x, y, sz);
    hlG.addColorStop(0, 'rgba(255,255,255,0.4)');
    hlG.addColorStop(0.3, 'rgba(255,255,255,0.1)');
    hlG.addColorStop(1, 'rgba(0,0,0,0.04)');
    ctx.fillStyle = hlG;
    ctx.beginPath();
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      const r = sz * (1 + Math.sin(seed + i * 2.2) * irr + Math.sin(seed * 0.7 + i * 3.5) * 0.03);
      i === 0 ? ctx.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r) : ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
    }
    ctx.closePath(); ctx.fill();

    const nR = sz * 0.28;
    ctx.beginPath(); ctx.arc(x - sz * 0.1, y - sz * 0.1, nR, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.fill();
    ctx.strokeStyle = `rgba(${rgb}, 0.25)`; ctx.lineWidth = 0.7; ctx.stroke();
    ctx.beginPath(); ctx.arc(x - sz * 0.1, y - sz * 0.1, nR * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fill();

    for (let i = 0; i < 8; i++) {
      const na = seed + i * 1.1, nd = sz * 0.38 * (0.2 + Math.sin(na) * 0.3);
      ctx.beginPath();
      ctx.arc(x + Math.cos(na) * nd, y + Math.sin(na) * nd, sz * 0.035, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb}, 0.15)`; ctx.fill();
    }
  }

  function drawDendrites(ctx, x, y, sz, rgb, seed, hov, t, dAngle, ns, n) {
    const cnt = 7 + (seed % 4);
    const baseAlpha = hov ? 0.65 : 0.35;
    const targets = ns && n && !n.isDummy && n.connections
      ? n.connections.map(cid => ns.find(m => m.id === cid)).filter(Boolean)
      : [];
    const directCount = Math.min(targets.length, cnt - 2);
    for (let i = 0; i < cnt; i++) {
      let baseA, len;
      if (i < directCount && targets[i]) {
        const tgt = targets[i];
        const dx = tgt.x - x, dy = tgt.y - y;
        const dist = Math.hypot(dx, dy);
        baseA = Math.atan2(dy, dx);
        len = dist * 0.85;
        ctx.strokeStyle = `rgba(${rgb}, ${baseAlpha})`;
        ctx.lineWidth = hov ? 4 : 3;
        ctx.beginPath(); ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(baseA) * len, y + Math.sin(baseA) * len);
        ctx.stroke();
      } else {
        baseA = dAngle + (i / cnt) * Math.PI * 2 + Math.sin(seed + i * 0.7) * 0.4 + t * 0.0001;
        len = sz * (5 + Math.sin(seed * 0.5 + i * 1.1) * 1.2);

        const midA = baseA + Math.sin(seed + i * 2.3 + t * 0.0002) * 0.3;
        const mx = x + Math.cos(baseA) * len * 0.5, my = y + Math.sin(baseA) * len * 0.5;
        const ex = x + Math.cos(midA) * len * 0.85, ey = y + Math.sin(midA) * len * 0.85;

        ctx.strokeStyle = `rgba(${rgb}, ${baseAlpha})`;
        ctx.lineWidth = hov ? 4 : 3;
        ctx.beginPath(); ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + Math.cos(baseA) * len * 0.2, y + Math.sin(baseA) * len * 0.2, mx, my);
        ctx.stroke();

        ctx.lineWidth = hov ? 3 : 2;
        ctx.beginPath(); ctx.moveTo(mx, my);
        ctx.quadraticCurveTo(x + Math.cos(midA + 0.1) * len * 0.4, y + Math.sin(midA + 0.1) * len * 0.4, ex, ey);
        ctx.stroke();
      }

      for (let s = 0; s < 4; s++) {
        const sp = 0.1 + s * (0.8 / 4);
        const spx = x + Math.cos(baseA) * len * sp, spy = y + Math.sin(baseA) * len * sp;
        const spA = baseA + (Math.sin(seed + i + s * 5) > 0 ? 1.3 : -1.3) * 0.3;
        ctx.strokeStyle = `rgba(${rgb}, ${hov ? 0.3 : 0.14})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(spx, spy);
        ctx.lineTo(spx + Math.cos(spA) * sz * 0.18, spy + Math.sin(spA) * sz * 0.18);
        ctx.stroke();
      }

      if (i < directCount && targets[i]) {
        const tgt = targets[i];
        const ex = x + Math.cos(baseA) * len, ey = y + Math.sin(baseA) * len;
        ctx.fillStyle = `rgba(${rgb}, ${hov ? 0.5 : 0.25})`;
        ctx.beginPath(); ctx.arc(ex, ey, 1.8, 0, Math.PI * 2); ctx.fill();
      }
    }
  }

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

      const ns = nsRef.current, ps = psRef.current;
      const dr = dragRef.current;
      if (!ns.length) { animRef.current = requestAnimationFrame(frame); return; }

      const cx = w / 2, cy = h / 2 + topOffset;
      const safeR = Math.min(w, h) * 0.5;

      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, safeR);
      bgGrad.addColorStop(0, 'rgba(139, 92, 246, 0.07)');
      bgGrad.addColorStop(0.3, 'rgba(77, 171, 247, 0.04)');
      bgGrad.addColorStop(0.6, 'rgba(77, 171, 247, 0.02)');
      bgGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      const outerGlow = ctx.createRadialGradient(cx, cy, safeR * 0.4, cx, cy, safeR);
      outerGlow.addColorStop(0, 'rgba(139, 92, 246, 0.03)');
      outerGlow.addColorStop(0.6, 'rgba(77, 171, 247, 0.04)');
      outerGlow.addColorStop(1, 'rgba(77, 171, 247, 0)');
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, safeR * 0.95, 0, Math.PI * 2);
      ctx.fill();

      const innerRingCount = 4;
      for (let ri = 0; ri < innerRingCount; ri++) {
        const ringR = safeR * (0.25 + ri * 0.22);
        const ringA = Math.sin(t * 0.0005 + ri * 1.8) * 0.08 + 0.5;
        ctx.strokeStyle = `rgba(139, 92, 246, ${ringA * 0.035})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
        ctx.stroke();
      }

      const rot = Math.sin(t * 0.00015) * 0.08 + Math.cos(t * 0.0001) * 0.04;
      const cosR = Math.cos(rot), sinR = Math.sin(rot);

      for (const p of ps) {
        p.x += p.vx; p.y += p.vy; p.pulse += p.speed;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      ns.forEach((n, i) => {
        if (n.isCenter) return;
        if (dr.active && dr.id === n.id) {
          n.x += (mouseRef.current.x - n.x) * 0.3;
          n.y += (mouseRef.current.y - n.y) * 0.3;
          return;
        }
        const relX = n.baseX - cx, relY = n.baseY - cy;
        const rx = relX * cosR - relY * sinR, ry = relX * sinR + relY * cosR;
        const depthScale = 0.7 + n.z * 0.5;
        const driftX = Math.sin(t * 0.0015 + n.subVx) * 0.12 * depthScale;
        const driftY = Math.cos(t * 0.0015 + n.subVy) * 0.12 * depthScale;
        const targetX = cx + rx + driftX, targetY = cy + ry + driftY;
        n.x += (targetX - n.x) * 0.06 + n.vx;
        n.y += (targetY - n.y) * 0.06 + n.vy;
        n.vx += (targetX - n.x) * 0.0008;
        n.vy += (targetY - n.y) * 0.0008;
        n.vx *= 0.96; n.vy *= 0.96;
        n.x += Math.sin(t * 0.01 + i * 2.3) * 0.02;
        n.y += Math.cos(t * 0.009 + i * 1.9) * 0.02;
        n.dendriteAngle += 0.0001 * depthScale;
        n.targetSpike = hovRef.current === n.id ? 1 : 0;
        n.spike += (n.targetSpike - n.spike) * 0.06;
        const margin = 30;
        if (n.x < margin) { n.x = margin; n.vx *= -1; }
        if (n.x > w - margin) { n.x = w - margin; n.vx *= -1; }
        if (n.y < margin + 10) { n.y = margin + 10; n.vy *= -1; }
        if (n.y > h - margin) { n.y = h - margin; n.vy *= -1; }
      });

      const cn = ns.find(n => n.isCenter);
      cn.x += (cx - cn.x) * 0.015;
      cn.y += (cy - cn.y) * 0.015;

      centerWaveRef.current += 1;

      for (const p of ps) {
        const twinkle = Math.sin(p.pulse * 2 + p.twinkleOff) * 0.3 + 0.7;
        if (p.isFire) {
          const firePhase = Math.sin(p.pulse * 3 + p.twinkleOff) * 0.5 + 0.5;
          ctx.fillStyle = `rgba(245, 158, 11, ${p.baseAlpha * firePhase * 0.7})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (0.8 + firePhase * 0.6), 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = `rgba(239, 68, 68, ${p.baseAlpha * firePhase * 0.3})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (0.5 + firePhase * 0.4), 0, Math.PI * 2); ctx.fill();
        } else {
          ctx.fillStyle = `rgba(139, 92, 246, ${p.baseAlpha * 0.5 * twinkle})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        }
      }

      const mx = mouseRef.current.x, my = mouseRef.current.y;
      let newHov = null, newHovFeat = null;
      ns.forEach((n) => {
        if (n.isCenter || n.isDummy) return;
        const d = Math.hypot(n.x - mx, n.y - my);
        if (d < 28) { newHov = n.id; newHovFeat = n.feature; }
      });

      if (newHov !== hovRef.current) {
        hovRef.current = newHov;
        if (newHovFeat) {
          setHovFeature(newHovFeat);
        } else {
          setHovFeature(null);
        }
      }

      const wavePhase = (centerWaveRef.current % 360) / 360 * Math.PI * 2;
      const waveRadius = 45 + Math.sin(wavePhase) * 22;
      const waveAlpha = Math.max(0, Math.sin(wavePhase)) * 0.08;
      if (waveAlpha > 0.01) {
        ctx.strokeStyle = `rgba(139, 92, 246, ${waveAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(cn.x, cn.y, waveRadius, 0, Math.PI * 2); ctx.stroke();
      }

      ns.forEach((n) => {
        if (n.isCenter) {
          const col = CENTER_COL;
          const sz = n.size;
          const gR = 80;
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, gR);
          g.addColorStop(0, `rgba(${col.rgb}, 0.22)`);
          g.addColorStop(0.3, `rgba(${col.rgb}, 0.06)`);
          g.addColorStop(1, `rgba(${col.rgb}, 0)`);
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(n.x, n.y, gR, 0, Math.PI * 2); ctx.fill();

          drawDendrites(ctx, n.x, n.y, sz, col.rgb, n.seed, false, t, n.dendriteAngle, ns, n);
          drawSoma(ctx, n.x, n.y, sz, col.rgb, n.seed, false);
          return;
        }

        const hov = hovRef.current === n.id;
        const col = colorFor(n.feature);
        const pulse = Math.sin(t * 0.02 + n.glowPhase) * 0.15 + 0.85;
        const zScale = 0.7 + n.z * 0.5;
        const baseSz = n.isDummy ? n.size : n.size;
        const size = baseSz * zScale * (0.95 + pulse * 0.05) * (hov ? 1.12 : 1);

        const gRGlow = n.isDummy ? size * 2.5 : size * (hov ? 10 : 4);
        const glowAlpha = n.isDummy
          ? (hov ? 0.12 : 0.03)
          : (hov ? 0.5 : 0.06 * pulse * zScale);
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, gRGlow);
        g.addColorStop(0, `rgba(${col.rgb}, ${glowAlpha})`);
        g.addColorStop(0.3, `rgba(${col.rgb}, ${n.isDummy ? 0 : (hov ? 0.15 : 0.01)})`);
        g.addColorStop(1, `rgba(${col.rgb}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(n.x, n.y, gRGlow, 0, Math.PI * 2); ctx.fill();

        drawDendrites(ctx, n.x, n.y, size, col.rgb, n.seed, hov, t, n.dendriteAngle, ns, n);
        drawSoma(ctx, n.x, n.y, size, col.rgb, n.seed, hov);

        if (n.spike > 0.01 && !n.isDummy) {
          const sr = size * (2 + n.spike * 3);
          const sg = ctx.createRadialGradient(n.x, n.y, size, n.x, n.y, sr);
          sg.addColorStop(0, `rgba(${col.rgb}, ${n.spike * 0.22})`);
          sg.addColorStop(1, `rgba(${col.rgb}, 0)`);
          ctx.fillStyle = sg;
          ctx.beginPath(); ctx.arc(n.x, n.y, sr, 0, Math.PI * 2); ctx.fill();
        }

        if (!n.isDummy && n.feature) {
          ctx.save();
          ctx.textAlign = 'center'; ctx.textBaseline = 'top';
          ctx.font = `${hov ? 'bold ' : ''}${10}px 'Inter','Segoe UI',sans-serif`;
          const tc = getThemeColors();
          ctx.fillStyle = hov ? tc.text : tc.text2;
          ctx.shadowColor = 'rgba(255,255,255,0.6)';
          ctx.shadowBlur = 4;
          ctx.fillText(n.feature.name, n.x, n.y + size * 1.1 + 16);
          ctx.restore();
        }
      });

      animRef.current = requestAnimationFrame(frame);
    };
    animRef.current = requestAnimationFrame(frame);
    return () => { running = false; cancelAnimationFrame(animRef.current); };
  }, [topOffset]);

  const onMouseDown = (e) => {
    const cvs = cvsRef.current;
    if (!cvs) return;
    const r = cvs.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    for (const n of nsRef.current) {
      if (n.isCenter || n.isDummy) continue;
      if (Math.hypot(n.x - x, n.y - y) < 28) {
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
      if (Math.hypot(x - dragRef.current.sx, y - dragRef.current.sy) > 5) {
        dragRef.current.moved = true;
      }
    }
  };

  const onMouseUp = () => {
    const dr = dragRef.current;
    if (dr.active && dr.id && !dr.moved) {
      const n = nsRef.current.find(n => n.id === dr.id);
      if (n && n.feature) {
        cbRef.current.onFeatureClick?.(n.feature);
      }
    }
    dragRef.current = { active: false, id: null, sx: 0, sy: 0, moved: false };
  };

  const onMouseLeave = () => {
    mouseRef.current = { x: -9999, y: -9999 };
    hovRef.current = null;
    setHovFeature(null);
    dragRef.current = { active: false, id: null, sx: 0, sy: 0, moved: false };
  };

  return (
    <div ref={elRef} className="neuron-brain-container">
      <canvas
        ref={cvsRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        style={{ touchAction: 'none' }}
      />
    </div>
  );
}
