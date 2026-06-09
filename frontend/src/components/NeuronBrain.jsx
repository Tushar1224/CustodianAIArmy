import { useEffect, useRef, useState } from 'react';
import './NeuronBrain.css';

export default function NeuronBrain({ features = [], onFeatureClick }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const neuronsRef = useRef([]);
  const connectionLinesRef = useRef([]);

  // Initialize neurons positioned in a brain-like pattern
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    setDimensions({ width, height });

    // Create neuron positions in a circular/brain pattern
    const centerX = width / 2;
    const centerY = height / 2;
    const numFeatures = features.length;
    
    const neurons = features.map((feature, index) => {
      const angle = (index / numFeatures) * Math.PI * 2;
      const radiusVariation = 100 + Math.sin(index) * 30;
      
      return {
        id: feature.id,
        x: centerX + Math.cos(angle) * radiusVariation,
        y: centerY + Math.sin(angle) * radiusVariation,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        feature: feature,
        pulse: Math.random() * Math.PI * 2,
        active: false,
      };
    });

    // Add a central hub neuron
    neurons.push({
      id: 'center',
      x: centerX,
      y: centerY,
      vx: 0,
      vy: 0,
      feature: null,
      pulse: 0,
      active: true,
      isCenter: true,
    });

    neuronsRef.current = neurons;
  }, [features]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        setDimensions({ width, height });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    let animationId;
    let time = 0;

    const animate = () => {
      time += 1;

      // Clear canvas
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const neurons = neuronsRef.current;
      if (!neurons || neurons.length === 0) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      // Update neuron positions
      neurons.forEach((neuron, index) => {
        if (neuron.isCenter) return;

        neuron.pulse += 0.02;
        
        // Gentle drift movement
        neuron.x += neuron.vx * 0.5;
        neuron.y += neuron.vy * 0.5;

        // Keep within bounds with bounce effect
        if (neuron.x < 30 || neuron.x > canvas.width - 30) {
          neuron.vx *= -1;
          neuron.x = Math.max(30, Math.min(canvas.width - 30, neuron.x));
        }
        if (neuron.y < 30 || neuron.y > canvas.height - 30) {
          neuron.vy *= -1;
          neuron.y = Math.max(30, Math.min(canvas.height - 30, neuron.y));
        }
      });

      // Draw connection lines from center
      const centerNeuron = neurons[neurons.length - 1];
      ctx.strokeStyle = `rgba(77, 171, 247, 0.1)`;
      ctx.lineWidth = 1;

      neurons.forEach((neuron, index) => {
        if (neuron.isCenter) return;

        // Draw line to center
        ctx.beginPath();
        ctx.moveTo(centerNeuron.x, centerNeuron.y);
        ctx.lineTo(neuron.x, neuron.y);
        ctx.stroke();

        // Draw connections between nearby neurons
        neurons.forEach((otherNeuron, otherIndex) => {
          if (otherNeuron.isCenter || otherIndex <= index) return;

          const dx = otherNeuron.x - neuron.x;
          const dy = otherNeuron.y - neuron.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180) {
            ctx.strokeStyle = `rgba(77, 171, 247, ${0.05 * (1 - distance / 180)})`;
            ctx.beginPath();
            ctx.moveTo(neuron.x, neuron.y);
            ctx.lineTo(otherNeuron.x, otherNeuron.y);
            ctx.stroke();
          }
        });
      });

      // Draw neurons
      neurons.forEach((neuron, index) => {
        const pulseIntensity = Math.sin(neuron.pulse) * 0.5 + 0.5;
        const baseSize = neuron.isCenter ? 15 : 10;
        const size = baseSize + pulseIntensity * 2;

        // Draw glow
        const gradient = ctx.createRadialGradient(
          neuron.x, neuron.y, 0,
          neuron.x, neuron.y, size * 3
        );
        
        if (neuron.isCenter || neuron.feature?.status === 'working') {
          gradient.addColorStop(0, `rgba(77, 171, 247, ${0.4 * pulseIntensity})`);
          gradient.addColorStop(1, `rgba(77, 171, 247, 0)`);
        } else {
          gradient.addColorStop(0, `rgba(245, 158, 11, ${0.2 * pulseIntensity})`);
          gradient.addColorStop(1, `rgba(245, 158, 11, 0)`);
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw neuron core
        ctx.fillStyle = neuron.isCenter || neuron.feature?.status === 'working' 
          ? '#4dabf7' 
          : '#f59e0b';
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Draw neuron outline
        ctx.strokeStyle = 'rgba(232, 232, 240, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2);
        ctx.stroke();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [dimensions]);

  // Handle neuron clicks
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    neuronsRef.current.forEach((neuron) => {
      if (neuron.isCenter) return;

      const dx = neuron.x - x;
      const dy = neuron.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 20) {
        onFeatureClick?.(neuron.feature);
      }
    });
  };

  return (
    <div
      ref={containerRef}
      className="neuron-brain-container"
      style={{
        position: 'relative',
        width: '100%',
        height: '500px',
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 50%, rgba(77, 171, 247, 0.05), rgba(10, 10, 15, 0.8))',
        border: '1px solid rgba(77, 171, 247, 0.2)',
      }}
    >
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{
          display: 'block',
          cursor: 'pointer',
          width: '100%',
          height: '100%',
        }}
      />
      
      {/* Legend */}
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          display: 'flex',
          gap: '2rem',
          fontSize: '0.85rem',
          color: '#9090b0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#4dabf7',
            }}
          />
          Working
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#f59e0b',
            }}
          />
          Coming Soon
        </div>
      </div>

      {/* Center Label */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: '1.2rem',
            fontWeight: 900,
            color: '#4dabf7',
            textShadow: '0 0 20px rgba(77, 171, 247, 0.5)',
          }}
        >
          Custodian AI
        </div>
        <div
          style={{
            fontSize: '0.75rem',
            color: '#9090b0',
            marginTop: '0.25rem',
          }}
        >
          Neural Network
        </div>
      </div>
    </div>
  );
}
