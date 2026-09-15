/* ============================================
   SN TRADERS — Luxury Animation & Interactive System
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. PAGE LOADER ANIMATION ── */
  const pageLoader = document.getElementById('pageLoader');
  if (pageLoader) {
    setTimeout(() => {
      pageLoader.classList.add('loaded');
      setTimeout(() => {
        pageLoader.style.display = 'none';
      }, 750);
    }, 600);
  }

  /* ── 2. SMOOTH PAGE TRANSITIONS ── */
  const internalLinks = document.querySelectorAll('a[href*=".html"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const target = link.getAttribute('target');
      if (href && !href.startsWith('#') && target !== '_blank' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        document.body.classList.add('page-exiting');
        setTimeout(() => {
          window.location.href = href;
        }, 350);
      }
    });
  });

  /* ── 3. NAVBAR SCROLL EFFECT ── */
  const navbar = document.getElementById('navbar');
  const isInnerPage = document.body.classList.contains('inner-page');

  const onScroll = () => {
    if (navbar) {
      if (window.scrollY > 40 || isInnerPage) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── 4. MOBILE HAMBURGER MENU ── */
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ── 5. SCROLL REVEAL (INTERSECTION OBSERVER) ── */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-hero');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ── 6. HERO TEXT STAGGERED REVEAL ── */
  const heroReveals = document.querySelectorAll('.hero-content .reveal-hero');
  heroReveals.forEach(el => {
    const delay = parseInt(el.dataset.delay || 0);
    setTimeout(() => {
      el.classList.add('active');
    }, 400 + delay * 200);
  });

  /* ── 7. SCROLL INDICATOR FADE ── */
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
      } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
      }
    }, { passive: true });
  }

  /* ── 8. PARALLAX EFFECT ── */
  const heroBg = document.getElementById('heroBg');
  const ctaSection = document.querySelector('.final-cta');

  if ((heroBg || ctaSection) && window.innerWidth > 768) {
    let ticking = false;
    const updateParallax = () => {
      const scrollY = window.scrollY;

      if (heroBg) {
        const img = heroBg.querySelector('img');
        if (img) {
          img.style.transform = `translateY(${scrollY * 0.35}px)`;
        }
      }

      if (ctaSection) {
        const ctaImg = ctaSection.querySelector('.final-cta-bg img');
        if (ctaImg) {
          const rect = ctaSection.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (rect.top - window.innerHeight * 0.5) * 0.12;
            ctaImg.style.transform = `translateY(${offset}px)`;
          }
        }
      }

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── 9. NUMBER COUNTER ANIMATION ── */
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    let hasCounted = false;
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasCounted) {
          hasCounted = true;
          statNumbers.forEach(el => {
            const originalText = el.textContent.trim();
            const match = originalText.match(/(\d+)/);
            if (!match) return;

            const targetVal = parseInt(match[0]);
            const suffix = originalText.replace(match[0], '');
            const startTime = performance.now();
            const duration = 1500;

            const animateCount = (now) => {
              const progress = Math.min((now - startTime) / duration, 1);
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const currentVal = Math.floor(easeOut * targetVal);
              el.textContent = currentVal + suffix;

              if (progress < 1) {
                requestAnimationFrame(animateCount);
              } else {
                el.textContent = originalText;
              }
            };

            requestAnimationFrame(animateCount);
          });
        }
      });
    }, { threshold: 0.4 });

    const statsContainer = document.querySelector('.about-stats');
    if (statsContainer) {
      counterObserver.observe(statsContainer);
    }
  }

  /* ── 10. 3D INTERACTIVE TILT ANIMATION ── */
  const tiltCards = document.querySelectorAll('.product-card, .cement-brand-card, .trust-card, .contact-card-creative, .mv-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

});

