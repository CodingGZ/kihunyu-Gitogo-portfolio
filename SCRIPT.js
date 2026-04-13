// ===== Mobile hamburger menu - Modern implementation =====
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navLinks');
  const menuLinks = navMenu ? navMenu.querySelectorAll('a') : [];

  // Toggle menu on hamburger click
  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close menu when a link is clicked
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      navMenu?.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && hamburger?.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu?.classList.remove('active');
    }
  });
});

// ===== Smooth scroll for in-page nav links =====
document.addEventListener('DOMContentLoaded', function() {
  const scrollLinks = document.querySelectorAll('nav a[href^="#"], .hero-actions a[href^="#"]');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// ===== Scroll animations with Intersection Observer =====
const animateOnScroll = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-on-scroll');
      observer.unobserve(entry.target);
    }
  });
};

const scrollObserver = new IntersectionObserver(animateOnScroll, {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
});

// Observe all sections and pillar cards
document.querySelectorAll('section, .pillar, .info-card').forEach((el, index) => {
  el.classList.add(`delayed-${index % 4}`);
  scrollObserver.observe(el);
});

// ===== Active link highlighting on scroll (Intersection Observer) =====
const sectionElements = document.querySelectorAll('section[id]');
const navMenuLinks = document.querySelectorAll('.nav-links a');

if ('IntersectionObserver' in window && navMenuLinks.length > 0) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navMenuLinks.forEach(a => {
            const isActive = a.getAttribute('href') === `#${id}`;
            a.classList.toggle('active-link', isActive);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sectionElements.forEach(section => sectionObserver.observe(section));
}

// ===== Hero tagline word fade-in loop =====
const taglineEl = document.querySelector('.tagline');
if (taglineEl) {
  const baseText = taglineEl.textContent.trim();
  const variants = [
    'Financial & Governance Expert · CPA-K · Laikipia Governor Aspirant (DCP)',
    'Transforming public finance into shared prosperity for every ward in Laikipia',
    'Integrity, accountability and people-centered leadership for Laikipia County'
  ];

  let index = 0;

  function cycleTagline() {
    taglineEl.classList.add('fade-out');

    setTimeout(() => {
      index = (index + 1) % variants.length;
      taglineEl.textContent = variants[index];
      taglineEl.classList.remove('fade-out');
      taglineEl.classList.add('fade-in');

      setTimeout(() => {
        taglineEl.classList.remove('fade-in');
      }, 600);
    }, 300);
  }

  setInterval(cycleTagline, 4500);
}

// ===== Fade animations for tagline =====
const style = document.createElement('style');
style.textContent = `
  .fade-out {
    animation: fadeOut 0.3s ease-out forwards;
  }

  .fade-in {
    animation: fadeIn 0.6s ease-in forwards;
  }

  @keyframes fadeOut {
    to {
      opacity: 0;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Add hover avatar interaction */
  .avatar-placeholder {
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
`;
document.head.appendChild(style);

// ===== Avatar interaction =====
const avatar = document.querySelector('.avatar-placeholder');
if (avatar) {
  avatar.addEventListener('click', () => {
    avatar.style.animation = 'none';
    setTimeout(() => {
      avatar.style.animation = '';
    }, 10);
  });
}

// ===== Form submit with better feedback =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();

    const name = contactForm.querySelector('#name');
    const email = contactForm.querySelector('#email');
    const subject = contactForm.querySelector('#subject');
    const message = contactForm.querySelector('#message');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    if (!name.value.trim() || !email.value.trim() || !subject.value.trim() || !message.value.trim()) {
      // Create visual feedback for validation
      const emptyFields = [name, email, subject, message].filter(f => !f.value.trim());
      emptyFields.forEach(field => {
        field.style.borderColor = '#ef4444';
        field.style.boxShadow = '0 0 0 2px rgba(239, 68, 68, 0.25)';
        setTimeout(() => {
          field.style.borderColor = '';
          field.style.boxShadow = '';
        }, 2000);
      });
      return;
    }

    // Success feedback
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '✓ Message Sent!';
    submitBtn.style.background = 'var(--accent)';
    
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
      contactForm.reset();
    }, 2000);
  });
}

// ===== Parallax effect on hero =====
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrolled = window.pageYOffset;
    const heroElements = hero.querySelectorAll('.hero-text, .hero-card');
    heroElements.forEach((el, index) => {
      el.style.transform = `translateY(${scrolled * 0.3 * (index + 1)}px)`;
    });
  }
});

// ===== Mouse move effect on cards =====
const cards = document.querySelectorAll('.hero-card, .pillar, .info-card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * 3;
    const rotateY = ((centerX - x) / centerX) * 3;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== Scroll to top button =====
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '↑';
scrollBtn.className = 'scroll-to-top';
scrollBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: var(--accent);
  color: #022c22;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 40;
  font-weight: bold;
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
  transform: translateY(100px);
`;

document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollBtn.style.opacity = '1';
    scrollBtn.style.transform = 'translateY(0)';
  } else {
    scrollBtn.style.opacity = '0';
    scrollBtn.style.transform = 'translateY(100px)';
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

scrollBtn.addEventListener('mouseenter', () => {
  scrollBtn.style.transform = 'translateY(0) scale(1.1)';
});

scrollBtn.addEventListener('mouseleave', () => {
  if (window.pageYOffset > 300) {
    scrollBtn.style.transform = 'translateY(0)';
  }
});

