const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');
const cursorGlow = document.querySelector('.cursor-glow');

// Mobile navigation: open and close the menu.
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');

  menuToggle.setAttribute('aria-expanded', String(isOpen));

  menuToggle.setAttribute(
    'aria-label',
    isOpen ? 'Close navigation menu' : 'Open navigation menu'
  );

  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

// Close the mobile menu after selecting a section.
navItems.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');

    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');

    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// Reveal sections and cards smoothly as they enter the viewport.
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

document.querySelectorAll('.reveal').forEach((element) => {
  revealObserver.observe(element);
});

// Highlight the navigation item for the section currently on screen.
function updateActiveNavigation() {
  let currentSection = 'home';

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= 170) {
      currentSection = section.id;
    }
  });

  navItems.forEach((link) => {
    const active =
      link.getAttribute('href') === `#${currentSection}`;

    link.classList.toggle('active', active);

    if (active) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

window.addEventListener('scroll', updateActiveNavigation, {
  passive: true
});

window.addEventListener('load', updateActiveNavigation);

// Soft cursor glow on devices with a fine pointer.
if (window.matchMedia('(pointer: fine)').matches && cursorGlow) {
  window.addEventListener('mousemove', (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
} else if (cursorGlow) {
  cursorGlow.style.display = 'none';
}

// Update the footer year automatically.
document.getElementById('currentYear').textContent =
  new Date().getFullYear();