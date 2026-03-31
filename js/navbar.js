(() => {
  const topbar = document.getElementById('topbar');
  const navbar = document.getElementById('navbar');
  const spacer = document.querySelector('.navbar-spacer');
  const hamburger = document.querySelector('.navbar__hamburger');
  const menu = document.querySelector('.navbar__menu');
  const overlay = document.querySelector('.navbar__overlay');
  const links = document.querySelectorAll('.navbar__link');

  // Sticky navbar al scroll
  const topbarHeight = topbar ? topbar.offsetHeight : 0;

  window.addEventListener('scroll', () => {
    if (window.scrollY > topbarHeight) {
      navbar.classList.add('sticky');
      if (spacer) {
        spacer.style.height = navbar.offsetHeight + 'px';
        spacer.classList.add('active');
      }
    } else {
      navbar.classList.remove('sticky');
      if (spacer) spacer.classList.remove('active');
    }
  });

  // Toggle menu mobile
  function openMenu() {
    hamburger.classList.add('active');
    menu.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    menu.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  // Cerrar menu al click en link + smooth scroll
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();

      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // IntersectionObserver para animaciones fade-in
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    fadeElements.forEach((el) => observer.observe(el));
  }
})();
