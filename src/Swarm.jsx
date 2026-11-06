// Swarm — an original, lightweight canvas particle swarm for the hero.
// No external library, no copied code: small flocking rules written here.
// Analogy: fireflies / a flock of birds. Each dot wanders on its own,
// gently drifts toward your pointer (its "hand"), and keeps a little
// distance from its neighbours. Nothing is tracked or sent anywhere.
import { useEffect, useRef } from "react";

const RED = "227,43,60"; // --red #e32b3c
const OFF_WHITE = "242,239,235"; // --text #f2efeb

function makeParticles(count, width, height) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const red = i % 4 === 0; // about 1 in 4 dots is red, the rest off-white
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: red ? 1.6 + Math.random() * 1.2 : 1 + Math.random() * 1.1,
      color: red ? RED : OFF_WHITE,
      alpha: 0.25 + Math.random() * 0.4,
      // Each dot has its own slow wander rhythm, so they never march in lockstep.
      seed: Math.random() * Math.PI * 2,
      speed: 0.7 + Math.random() * 0.6,
    });
  }
  return particles;
}

export default function Swarm({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const running = active && !reduced;
    let width = 0;
    let height = 0;
    let particles = [];
    let raf = 0;
    let visible = true; // hero on screen?
    let tabVisible = !document.hidden;
    let pointer = null; // {x, y} in canvas pixels, or null when no pointer
    let pointerGoneAt = 0;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Cap the count so a huge screen stays cheap: ~1 dot per 16,000 px²,
      // never fewer than 36, never more than 80.
      const count = Math.max(36, Math.min(80, Math.round((width * height) / 16000)));
      particles = makeParticles(count, width, height);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      // Faint links between close neighbours — only short ones, low opacity,
      // so the text above stays easy to read.
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 90 * 90) {
            const a = (1 - Math.sqrt(d2) / 90) * 0.06;
            ctx.strokeStyle = `rgba(242,239,235,${a.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        ctx.fillStyle = `rgba(${p.color},${p.alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      t += 0.016;
      // When there is no pointer, the swarm follows a slow, invisible
      // "hand" drifting around the centre — so it still moves gently.
      const homeX = width / 2 + Math.sin(t * 0.25) * width * 0.22;
      const homeY = height / 2 + Math.cos(t * 0.19) * height * 0.2;
      const target = pointer || { x: homeX, y: homeY };
      // Freshness: a pointer that left a while ago fades back to the home drift.
      const targetStrength = pointer ? 1 : 0.35;

      for (const p of particles) {
        // 1. Wander — a slow, personal wobble per dot.
        p.vx += Math.sin(t * 0.7 + p.seed) * 0.008 * p.speed;
        p.vy += Math.cos(t * 0.6 + p.seed * 1.3) * 0.008 * p.speed;
        // 2. Follow — a gentle pull toward the pointer / home point.
        const dx = target.x - p.x;
        const dy = target.y - p.y;
        const dist = Math.hypot(dx, dy) || 1;
        const pull = Math.min(0.02, 0.9 / dist) * targetStrength * p.speed;
        p.vx += (dx / dist) * pull;
        p.vy += (dy / dist) * pull;
        // 3. Keep distance — push apart from very close neighbours.
        for (const q of particles) {
          if (q === p) continue;
          const ox = p.x - q.x;
          const oy = p.y - q.y;
          const d2 = ox * ox + oy * oy;
          if (d2 > 0.01 && d2 < 14 * 14) {
            const d = Math.sqrt(d2);
            p.vx += (ox / d) * 0.02;
            p.vy += (oy / d) * 0.02;
          }
        }
        // Cap speed, move, and wrap softly at the edges.
        const speed = Math.hypot(p.vx, p.vy);
        const max = 0.9 * p.speed;
        if (speed > max) {
          p.vx = (p.vx / speed) * max;
          p.vy = (p.vy / speed) * max;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -8) p.x = width + 8;
        if (p.x > width + 8) p.x = -8;
        if (p.y < -8) p.y = height + 8;
        if (p.y > height + 8) p.y = -8;
      }
      draw();
    };

    const loop = () => {
      if (visible && tabVisible) step();
      raf = requestAnimationFrame(loop);
    };

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Only follow when the pointer is actually over the hero.
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        pointer = { x, y };
      } else if (pointer) {
        pointer = null;
        pointerGoneAt = t;
      }
    };
    const onPointerLeave = () => {
      pointer = null;
      pointerGoneAt = t;
    };
    const onVisibility = () => {
      tabVisible = !document.hidden;
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );

    resize();
    observer.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    if (running) {
      raf = requestAnimationFrame(loop);
    } else {
      // Motion off / reduced motion: one still scatter, no loop, no CPU use.
      draw();
    }
    void pointerGoneAt;

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="swarm-canvas"
      aria-hidden="true"
    />
  );
}
