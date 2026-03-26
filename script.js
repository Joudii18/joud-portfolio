// ─── Smooth scroll helper (accounts for fixed navbar height) ───
const NAV_HEIGHT = 72;

function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
  window.scrollTo({ top, behavior: 'smooth' });
}

// ─── Click delegation ────────────────────────────────────────────
document.addEventListener('click', (e) => {

  // Nav logo / star → scroll to top
  if (e.target.closest('.nav-logo')) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Nav links → scroll to matching section
  const navLink = e.target.closest('.nav-links a');
  if (navLink) {
    const href = navLink.getAttribute('href');
    if (href?.startsWith('#') && !href.includes('placeholder')) {
      e.preventDefault();
      smoothScrollTo(href.slice(1));
    }
    return;
  }

});

// ─── Navbar shadow on scroll ─────────────────────────────────────
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ─── Contact form feedback ───────────────────────────────────────
document.addEventListener('submit', (e) => {
  if (!e.target.closest('.contact-form')) return;
  e.preventDefault();

  const btn = e.target.querySelector('.send-btn');
  const inputs = e.target.querySelectorAll('.form-input, .form-textarea');
  if (!btn) return;

  btn.textContent = '✓ Sent!';
  btn.disabled = true;
  inputs.forEach(i => { i.value = ''; });

  setTimeout(() => {
    btn.textContent = '✉ Send';
    btn.disabled = false;
  }, 3000);
});
