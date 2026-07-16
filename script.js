/* ==========================================================================
   Lucky Diwakar — Portfolio v2 | script.js
   Vanilla JS. No external libraries required.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- loader ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('hidden'), 500);
  });
  // fallback in case 'load' already fired
  setTimeout(() => loader && loader.classList.add('hidden'), 2000);

  /* ---------- navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  const onScrollNav = () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  };
  document.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.style.display === 'flex';
      navLinks.style.display = open ? 'none' : 'flex';
      if (!open) {
        navLinks.style.cssText += 'position:fixed;top:70px;left:0;width:100%;flex-direction:column;background:rgba(6,6,7,0.96);padding:24px 6vw;gap:18px;backdrop-filter:blur(14px);display:flex;';
      }
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth <= 760) navLinks.style.display = 'none';
      });
    });
  }

  /* ---------- scroll progress bar ---------- */
  const progress = document.getElementById('scrollProgress');
  const updateProgress = () => {
    const h = document.documentElement;
    const scrollTop = h.scrollTop || document.body.scrollTop;
    const scrollHeight = h.scrollHeight - h.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (progress) progress.style.width = pct + '%';
  };
  document.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------- mouse glow ---------- */
  const glow = document.getElementById('mouseGlow');
  let glowX = window.innerWidth / 2, glowY = window.innerHeight / 2;
  let curX = glowX, curY = glowY;
  window.addEventListener('mousemove', (e) => { glowX = e.clientX; glowY = e.clientY; });
  const animateGlow = () => {
    curX += (glowX - curX) * 0.12;
    curY += (glowY - curY) * 0.12;
    if (glow) glow.style.transform = `translate(${curX}px, ${curY}px) translate(-50%,-50%)`;
    requestAnimationFrame(animateGlow);
  };
  if (window.matchMedia('(hover: hover)').matches) animateGlow();

  /* ---------- reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- counters ---------- */
  const counters = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10) || 0;
      const duration = 1200;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(eased * target);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------- typewriter ---------- */
  const typewriterEl = document.getElementById('typewriter');
  const phrases = ['Backend Developer', 'AI / ML Enthusiast', 'API Builder', 'Problem Solver'];
  let phraseIndex = 0, charIndex = 0, deleting = false;

  const typeLoop = () => {
    if (!typewriterEl) return;
    const current = phrases[phraseIndex];
    if (!deleting) {
      charIndex++;
      typewriterEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIndex--;
      typewriterEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, deleting ? 40 : 80);
  };
  typeLoop();

  /* ---------- smooth scroll for in-page links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ---------- particle background (canvas) ---------- */
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width, height;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const density = Math.min(90, Math.floor((width * height) / 18000));

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.r = Math.random() * 1.8 + 0.6;
        this.alpha = Math.random() * 0.5 + 0.2;
      }
      step() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230,57,70,${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < density; i++) particles.push(new Particle());

    const linkDistance = 130;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => { p.step(); p.draw(); });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(230,57,70,${0.12 * (1 - dist / linkDistance)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      if (!reduceMotion) requestAnimationFrame(render);
    };
    render();
  }

});
