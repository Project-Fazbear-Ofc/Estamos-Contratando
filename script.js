// ═══════════════════════════════════════════════
//  FREDDY FAZBEAR'S PIZZA — Script
// ═══════════════════════════════════════════════

// ── Scroll-reveal animations ──
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.char-card, .timeline-item, .arquivo-card, .polaroid').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Inject CSS for fade-in
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .char-card.fade-in { transition-duration: 0.5s; }
  .timeline-item.fade-in { transition-duration: 0.7s; }
  .timeline-item.reverse.fade-in { transform: translateY(28px); }
`;
document.head.appendChild(style);

// ── Stagger char cards ──
document.querySelectorAll('.char-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.12}s`;
});
document.querySelectorAll('.arquivo-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

// ── Random flicker effect on hero badge ──
const heroBadge = document.querySelector('.hero-badge');
if (heroBadge) {
  setInterval(() => {
    if (Math.random() < 0.05) {
      heroBadge.style.opacity = '0.7';
      setTimeout(() => { heroBadge.style.opacity = '1'; }, 80);
      setTimeout(() => {
        if (Math.random() < 0.5) {
          heroBadge.style.opacity = '0.85';
          setTimeout(() => { heroBadge.style.opacity = '1'; }, 60);
        }
      }, 140);
    }
  }, 800);
}

// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
}

// ── Smooth nav scroll (fecha menu mobile ao clicar) ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    if (hamburger) hamburger.classList.remove('open');
    if (navLinks)  navLinks.classList.remove('open');
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Archive button click effect ──
document.querySelectorAll('.btn-arquivo').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.textContent = 'ACESSO NEGADO';
    btn.style.color = '#c0392b';
    btn.style.borderColor = '#8b1a1a';
    setTimeout(() => {
      btn.textContent = 'VER ARQUIVO';
      btn.style.color = '';
      btn.style.borderColor = '';
    }, 1500);
  });
});

// ── Konami-style easter egg: type "FNAF" to get a message ──
let typed = '';
document.addEventListener('keydown', e => {
  typed += e.key.toLowerCase();
  typed = typed.slice(-4);
  if (typed === 'fnaf') {
    const msg = document.createElement('div');
    msg.textContent = '⚠ Ele está te assistindo... ⚠';
    Object.assign(msg.style, {
      position: 'fixed',
      bottom: '30px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#c0392b',
      color: '#fff',
      fontFamily: "'Creepster', cursive",
      fontSize: '1.4rem',
      padding: '14px 30px',
      borderRadius: '4px',
      zIndex: '10000',
      letterSpacing: '3px',
      boxShadow: '0 0 30px rgba(192,57,43,0.8)',
      animation: 'none'
    });
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
  }
});

console.log('%c⚠ AVISO DE SEGURANÇA ⚠', 'color:#ff8c00;font-family:monospace;font-size:1.2rem;font-weight:bold;');
console.log('%cOs animatrônicos ficam ativos entre 00:00 e 06:00.', 'color:#888;font-family:monospace;');
console.log('%cMantenha as portas fechadas.', 'color:#c0392b;font-family:monospace;');
