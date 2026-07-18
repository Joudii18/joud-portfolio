(function () {
  'use strict';

  // Only run on devices that have a mouse
  if (window.matchMedia('(hover: none)').matches) return;

  const DARK_COLORS  = ['#ffffff', '#FFA5C5', '#BEEBA9', '#FFE48A', '#ffffff'];
  const LIGHT_COLORS = ['#2E2A24', '#E8628E', '#4F7A3D', '#C98A1E', '#2E2A24'];

  function isLightTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light';
  }

  function currentColors() {
    return isLightTheme() ? LIGHT_COLORS : DARK_COLORS;
  }

  const style = document.createElement('style');
  style.textContent = `
    * { cursor: none !important; }

    .joud-cursor, .joud-trail {
      position: fixed;
      top: 0; left: 0;
      pointer-events: none;
      transform: translate(-50%, -50%);
      z-index: 99999;
      line-height: 0;
      color: #ffffff;
    }

    :root[data-theme="light"] .joud-cursor {
      color: #2E2A24;
    }

    .joud-cursor svg {
      transition: transform 0.15s ease;
      filter: drop-shadow(0 0 4px rgba(255,255,255,0.6));
    }

    :root[data-theme="light"] .joud-cursor svg {
      filter: drop-shadow(0 0 4px rgba(0,0,0,0.25));
    }

    .joud-trail {
      z-index: 99998;
      animation: joud-spark-out 0.55s ease-out forwards;
    }

    @keyframes joud-spark-out {
      0%   { opacity: 0.9; transform: translate(-50%, -50%) scale(1)   rotate(0deg); }
      100% { opacity: 0;   transform: translate(-50%, -50%) scale(0.1) rotate(150deg); }
    }
  `;
  document.head.appendChild(style);

  function makeSVG(color, size) {
    // Classic 4-point sparkle / star shape
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 20 20">
      <path d="M10 0 C10.5 7 13 9.5 20 10 C13 10.5 10.5 13 10 20 C9.5 13 7 10.5 0 10 C7 9.5 9.5 7 10 0 Z" fill="${color}"/>
    </svg>`;
  }

  // Main cursor element — uses currentColor so it follows the .joud-cursor
  // CSS color, which flips automatically with the theme toggle.
  const cursor = document.createElement('div');
  cursor.className = 'joud-cursor';
  cursor.innerHTML = makeSVG('currentColor', 24);
  document.body.appendChild(cursor);

  // Hide cursor when it leaves the window
  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });

  // Scale up cursor on interactive elements
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, [role="button"], input, textarea')) {
      cursor.querySelector('svg').style.transform = 'scale(1.6)';
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, [role="button"], input, textarea')) {
      cursor.querySelector('svg').style.transform = 'scale(1)';
    }
  });

  let lastTrailTime = 0;
  let lastX = 0;
  let lastY = 0;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';

    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const dist = Math.abs(dx) + Math.abs(dy);
    const now = Date.now();

    if (now - lastTrailTime > 50 && dist > 6) {
      spawnTrail(e.clientX, e.clientY);
      lastTrailTime = now;
      lastX = e.clientX;
      lastY = e.clientY;
    }
  });

  function spawnTrail(x, y) {
    const colors = currentColors();
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size  = Math.random() * 10 + 5; // 5–15 px
    const ox    = (Math.random() - 0.5) * 22;
    const oy    = (Math.random() - 0.5) * 22;

    const el = document.createElement('div');
    el.className = 'joud-trail';
    el.innerHTML = makeSVG(color, size);
    el.style.left = (x + ox) + 'px';
    el.style.top  = (y + oy) + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 560);
  }
})();
