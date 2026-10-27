/**
 * ============================================================================
 * Ayush Kumar Mishra — Premium Personal Portfolio JavaScript
 * Functionality: Dynamic Typing, Scrollspy, Mobile Drawer, Form Validation,
 *                IntersectionObserver Scroll Reveals, Smooth Scroll & Back-to-Top
 * ============================================================================
 */

(function () {
  'use strict';

  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------------------------
     1. Dynamic Role Typing Animation
     Cycles through: Web Developer, Frontend Developer, UI-Focused Developer
     -------------------------------------------------------------------------- */
  function initDynamicRole() {
    const roleElement = document.getElementById('role-text');
    if (!roleElement) return;

    const roles = [
      'Web Developer',
      'SEO Executive',
      'Frontend Developer',
      'UI-Focused Developer'
    ];

    if (prefersReducedMotion) {
      roleElement.textContent = roles[0];
      return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 90;
    const deletingSpeed = 45;
    const holdTime = 2000;

    function typeLoop() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        charIndex--;
        roleElement.textContent = currentRole.substring(0, charIndex);
      } else {
        charIndex++;
        roleElement.textContent = currentRole.substring(0, charIndex);
      }

      let timeoutDuration = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIndex === currentRole.length) {
        timeoutDuration = holdTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        timeoutDuration = 400;
      }

      setTimeout(typeLoop, timeoutDuration);
    }

    // Start typing loop
    setTimeout(typeLoop, 500);
  }

  /* --------------------------------------------------------------------------
     2. Header Elevation on Scroll
     -------------------------------------------------------------------------- */
  function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    function updateHeader() {
      if (window.scrollY > 20) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  /* --------------------------------------------------------------------------
     3. Mobile Navigation Drawer
     -------------------------------------------------------------------------- */
  function initMobileNav() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];

    if (!mobileToggle || !mobileNav) return;

    function toggleMenu(forceClose = false) {
      const isCurrentlyOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
      const shouldOpen = forceClose ? false : !isCurrentlyOpen;

      mobileToggle.setAttribute('aria-expanded', String(shouldOpen));
      mobileNav.setAttribute('aria-hidden', String(!shouldOpen));

      if (shouldOpen) {
        mobileNav.classList.add('open');
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
      } else {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    }

    mobileToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    // Close when clicking any link inside mobile drawer
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        toggleMenu(true);
      });
    });

    // Close when pressing Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        toggleMenu(true);
        mobileToggle.focus();
      }
    });

    // Close when clicking outside of drawer
    document.addEventListener('click', function (e) {
      if (
        mobileNav.classList.contains('open') &&
        !mobileNav.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        toggleMenu(true);
      }
    });

    // Automatically close mobile menu if resized to desktop or rotated
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024 && mobileNav.classList.contains('open')) {
        toggleMenu(true);
      }
    }, { passive: true });
  }

  /* Helper to ensure all elements in a section are immediately revealed */
  function revealSection(sectionId) {
    if (!sectionId) return;
    const sec = document.getElementById(sectionId);
    if (!sec) return;
    const elements = sec.querySelectorAll(
      '.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade, .experience-card, .timeline-item'
    );
    elements.forEach(function (el) {
      el.classList.add('reveal-visible');
    });
  }

  /* --------------------------------------------------------------------------
     4. Navigation Scrollspy (Active State Highlight)
     -------------------------------------------------------------------------- */
  function initScrollspy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    function onScrollSpy() {
      const scrollY = window.scrollY;
      const headerOffset = 140;

      let currentSectionId = '';

      sections.forEach(function (section) {
        const sectionTop = section.offsetTop - headerOffset;
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      // Special case: if near bottom of page, activate contact
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 80) {
        currentSectionId = 'contact';
      }

      if (currentSectionId) {
        revealSection(currentSectionId);
      }

      navLinks.forEach(function (link) {
        const linkSection = link.getAttribute('data-section');
        if (linkSection === currentSectionId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    // Attach click listeners to all anchor links for instant reveal
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function () {
        const targetId = this.getAttribute('href').substring(1);
        if (targetId) {
          revealSection(targetId);
        }
      });
    });

    window.addEventListener('scroll', onScrollSpy, { passive: true });
    onScrollSpy();
  }

  /* --------------------------------------------------------------------------
     5. Scroll-Based Progress Bar (Top Header Indicator)
     -------------------------------------------------------------------------- */
  function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    function updateProgress() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = scrollPercent.toFixed(2) + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* --------------------------------------------------------------------------
     6. Dynamic Scroll-Driven Timeline Beam
     -------------------------------------------------------------------------- */
  function initTimelineProgress() {
    const timelineSection = document.getElementById('experience');
    const progressLine = document.getElementById('timeline-progress');
    if (!timelineSection || !progressLine) return;

    function updateTimeline() {
      const rect = timelineSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const totalHeight = rect.height;
        const scrolled = windowHeight - rect.top;
        const percent = Math.min(Math.max((scrolled / (totalHeight + windowHeight * 0.25)) * 100, 0), 100);
        progressLine.style.height = percent.toFixed(1) + '%';
      }
    }

    window.addEventListener('scroll', updateTimeline, { passive: true });
    updateTimeline();
  }

  /* --------------------------------------------------------------------------
     7. Hero Parallax & Depth on Scroll
     -------------------------------------------------------------------------- */
  function initHeroParallax() {
    if (prefersReducedMotion) return;
    const heroVisual = document.querySelector('.hero-visual');
    const heroContent = document.querySelector('.hero-content');
    if (!heroVisual && !heroContent) return;

    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        if (heroVisual) {
          heroVisual.style.transform = `translateY(${scrollY * 0.12}px)`;
        }
        if (heroContent) {
          heroContent.style.transform = `translateY(${scrollY * 0.05}px)`;
        }
      }
    }, { passive: true });
  }

  /* --------------------------------------------------------------------------
     8. Interactive Card Spotlight Glow Effect
     -------------------------------------------------------------------------- */
  function initCardSpotlight() {
    const cards = document.querySelectorAll(
      '.card-spotlight, .skill-category-card, .project-card, .education-card, .info-card, .contact-card, .form-card'
    );

    cards.forEach(function (card) {
      card.classList.add('card-spotlight');
      card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--spotlight-x', x + 'px');
        card.style.setProperty('--spotlight-y', y + 'px');
      });
    });
  }

  /* --------------------------------------------------------------------------
     9. Multi-Directional Scroll-Triggered Reveals (IntersectionObserver)
     -------------------------------------------------------------------------- */
  function initScrollReveals() {
    // Assign directional and stagger classes
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(el => el.classList.add('reveal-up'));

    const aboutStory = document.querySelector('.about-story');
    if (aboutStory) aboutStory.classList.add('reveal-left');

    const aboutInfo = document.querySelector('.about-info-col');
    if (aboutInfo) aboutInfo.classList.add('reveal-right');

    const skillCards = document.querySelectorAll('.skill-category-card');
    skillCards.forEach(function (card, index) {
      card.classList.add('reveal-scale');
      card.classList.add('delay-' + ((index % 4) + 1));
    });

    const expCard = document.querySelector('.experience-card');
    if (expCard) expCard.classList.add('reveal-up');

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(function (card, index) {
      card.classList.add('reveal-up');
      card.classList.add('delay-' + (index + 1));
    });

    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach(function (card, index) {
      card.classList.add('reveal-scale');
      card.classList.add('delay-' + (index + 1));
    });

    const contactCard = document.querySelector('.contact-info-panel');
    if (contactCard) contactCard.classList.add('reveal-left');

    const formCard = document.querySelector('.contact-form-panel');
    if (formCard) formCard.classList.add('reveal-right');

    // Query all reveal elements
    const targets = document.querySelectorAll(
      '.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade, .experience-card'
    );

    // Fallback visibility checker that runs on scroll & load
    function checkAllReveals() {
      const windowHeight = window.innerHeight;
      targets.forEach(function (el) {
        if (!el.classList.contains('reveal-visible')) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight + 100 && rect.bottom >= -100) {
            el.classList.add('reveal-visible');
          }
        }
      });
    }

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('reveal-visible'));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '120px 0px 60px 0px',
      threshold: 0
    };

    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    targets.forEach(function (el) {
      revealObserver.observe(el);
    });

    // Run fallback check immediately and on scroll & resize
    window.addEventListener('scroll', checkAllReveals, { passive: true });
    window.addEventListener('resize', checkAllReveals, { passive: true });
    checkAllReveals();
    setTimeout(checkAllReveals, 50);
    setTimeout(checkAllReveals, 150);
    setTimeout(checkAllReveals, 350);
  }

  /* --------------------------------------------------------------------------
     6. Back to Top Buttons
     -------------------------------------------------------------------------- */
  function initBackToTop() {
    const floatingBtn = document.getElementById('floating-back-top');
    const footerBtn = document.getElementById('back-to-top');

    function toggleFloatingBtn() {
      if (!floatingBtn) return;
      if (window.scrollY > 380) {
        floatingBtn.classList.add('show');
      } else {
        floatingBtn.classList.remove('show');
      }
    }

    function scrollToTop(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    }

    if (floatingBtn) {
      window.addEventListener('scroll', toggleFloatingBtn, { passive: true });
      floatingBtn.addEventListener('click', scrollToTop);
      toggleFloatingBtn();
    }

    if (footerBtn) {
      footerBtn.addEventListener('click', scrollToTop);
    }
  }

  /* --------------------------------------------------------------------------
     7. Contact Form Validation & Mailto Action
     -------------------------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const feedbackBox = document.getElementById('form-feedback');

    if (!form) return;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');

    const whatsappBtn = document.getElementById('btn-submit-whatsapp');
    const gmailBtn = document.getElementById('btn-submit-gmail');
    const submitBtn = document.getElementById('btn-submit-message');

    function clearErrors() {
      if (nameError) nameError.textContent = '';
      if (emailError) emailError.textContent = '';
      if (subjectError) subjectError.textContent = '';
      if (messageError) messageError.textContent = '';
      if (feedbackBox) {
        feedbackBox.style.display = 'none';
        feedbackBox.className = 'form-feedback-alert';
        feedbackBox.textContent = '';
      }
    }

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    }

    function getFormData() {
      return {
        nameVal: nameInput ? nameInput.value.trim() : '',
        emailVal: emailInput ? emailInput.value.trim() : '',
        subjectVal: subjectInput ? subjectInput.value.trim() : '',
        messageVal: messageInput ? messageInput.value.trim() : ''
      };
    }

    // Helper: Build WhatsApp pre-filled URL
    function getWhatsAppUrl(data) {
      const parts = ['*New Portfolio Inquiry for Ayush Mishra*'];
      if (data.nameVal) parts.push(`*Name:* ${data.nameVal}`);
      if (data.emailVal) parts.push(`*Email:* ${data.emailVal}`);
      if (data.subjectVal) parts.push(`*Subject:* ${data.subjectVal}`);
      if (data.messageVal) parts.push(`*Message:* ${data.messageVal}`);
      if (!data.nameVal && !data.messageVal) {
        parts.push('Hi Ayush, I saw your portfolio website and would like to discuss a web project.');
      }
      return `https://api.whatsapp.com/send?phone=919794307570&text=${encodeURIComponent(parts.join('\n\n'))}`;
    }

    // Helper: Build Gmail Web compose URL
    function getGmailUrl(data) {
      const su = encodeURIComponent(data.subjectVal ? `Portfolio Inquiry: ${data.subjectVal}` : 'Portfolio Project Inquiry');
      const body = encodeURIComponent(
        `Hi Ayush,\n\nName: ${data.nameVal || 'Visitor'}\nEmail: ${data.emailVal || 'Not provided'}\nSubject: ${data.subjectVal || 'Inquiry'}\n\nMessage:\n${data.messageVal || 'Hi Ayush, I would like to get in touch.'}`
      );
      return `https://mail.google.com/mail/?view=cm&fs=1&to=amsp78810@gmail.com&su=${su}&body=${body}`;
    }

    // Direct WhatsApp Button Click
    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', function () {
        const data = getFormData();
        const url = getWhatsAppUrl(data);
        window.open(url, '_blank');
      });
    }

    // Direct Gmail Web Button Click
    if (gmailBtn) {
      gmailBtn.addEventListener('click', function () {
        const data = getFormData();
        const url = getGmailUrl(data);
        window.open(url, '_blank');
      });
    }

    // Primary Form Submission via AJAX to amsp78810@gmail.com
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();

      const { nameVal, emailVal, subjectVal, messageVal } = getFormData();
      let hasError = false;

      // Validate Name
      if (!nameVal) {
        nameError.textContent = 'Please enter your full name.';
        hasError = true;
      } else if (nameVal.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters long.';
        hasError = true;
      }

      // Validate Email
      if (!emailVal) {
        emailError.textContent = 'Please enter your email address.';
        hasError = true;
      } else if (!isValidEmail(emailVal)) {
        emailError.textContent = 'Please enter a valid email address (e.g. name@domain.com).';
        hasError = true;
      }

      // Validate Subject
      if (!subjectVal) {
        subjectError.textContent = 'Please enter a subject.';
        hasError = true;
      } else if (subjectVal.length < 3) {
        subjectError.textContent = 'Subject must be at least 3 characters long.';
        hasError = true;
      }

      // Validate Message
      if (!messageVal) {
        messageError.textContent = 'Please write a message.';
        hasError = true;
      } else if (messageVal.length < 5) {
        messageError.textContent = 'Message must be at least 5 characters long.';
        hasError = true;
      }

      if (hasError) {
        if (feedbackBox) {
          feedbackBox.className = 'form-feedback-alert alert-error';
          feedbackBox.textContent = 'Please correct the highlighted errors above before proceeding.';
          feedbackBox.style.display = 'block';
        }
        return;
      }

      const waUrl = getWhatsAppUrl({ nameVal, emailVal, subjectVal, messageVal });
      const gmailUrl = getGmailUrl({ nameVal, emailVal, subjectVal, messageVal });

      // Visual feedback: Sending state
      const originalBtnContent = submitBtn ? submitBtn.innerHTML : 'Send Message';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="icon-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite;">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10"></path>
          </svg>
          <span>Sending Message...</span>
        `;
      }

      if (feedbackBox) {
        feedbackBox.className = 'form-feedback-alert alert-info';
        feedbackBox.innerHTML = `<strong>Sending message...</strong> Delivering to amsp78810@gmail.com.`;
        feedbackBox.style.display = 'block';
      }

      // Post to FormSubmit JSON endpoint
      fetch('https://formsubmit.co/ajax/amsp78810@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: nameVal,
          email: emailVal,
          subject: subjectVal,
          message: messageVal,
          _replyto: emailVal,
          _subject: `New Portfolio Inquiry from ${nameVal}: ${subjectVal}`
        })
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnContent;
        }

        if (feedbackBox) {
          feedbackBox.className = 'form-feedback-alert alert-success';
          feedbackBox.innerHTML = `
            <strong>✅ Message Sent Successfully!</strong><br>
            Thank you <strong>${nameVal}</strong>! Your message has been received for <strong>amsp78810@gmail.com</strong>. Ayush will respond to you at <strong>${emailVal}</strong> shortly.
            <div style="margin-top:0.85rem;display:flex;gap:0.5rem;flex-wrap:wrap;">
              <a href="${waUrl}" target="_blank" class="btn btn-sm btn-whatsapp" style="display:inline-flex;">Chat on WhatsApp (+91 9794307570)</a>
              <a href="${gmailUrl}" target="_blank" class="btn btn-sm btn-secondary" style="display:inline-flex;">Open in Gmail</a>
            </div>
          `;
          feedbackBox.style.display = 'block';
        }
        form.reset();
      })
      .catch(function (error) {
        console.warn('FormSubmit AJAX notice:', error);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnContent;
        }

        if (feedbackBox) {
          feedbackBox.className = 'form-feedback-alert alert-info';
          feedbackBox.innerHTML = `
            <strong>Message Ready to Deliver!</strong><br>
            Click below to deliver your message immediately via WhatsApp or Gmail Web with 1 click:
            <div style="margin-top:0.85rem;display:flex;gap:0.5rem;flex-wrap:wrap;">
              <a href="${waUrl}" target="_blank" class="btn btn-sm btn-whatsapp" style="display:inline-flex;">Send on WhatsApp (+91 9794307570)</a>
              <a href="${gmailUrl}" target="_blank" class="btn btn-sm btn-secondary" style="display:inline-flex;">Open in Gmail Web</a>
            </div>
          `;
          feedbackBox.style.display = 'block';
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     8. Dynamic Copyright Year
     -------------------------------------------------------------------------- */
  function initDynamicYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = String(new Date().getFullYear());
    }
  }

  /* --------------------------------------------------------------------------
     9. Resume Modal Preview & Download Handling
     -------------------------------------------------------------------------- */
  function initResumeModal() {
    const modal = document.getElementById('resume-modal');
    const openBtn = document.getElementById('btn-preview-resume-modal');
    const closeBtn = document.getElementById('resume-modal-close');
    const overlay = document.getElementById('resume-modal-overlay');

    if (!modal) return;

    function openModal() {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    if (openBtn) {
      openBtn.addEventListener('click', openModal);
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    if (overlay) {
      overlay.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  function initResumeCheck() {
    const resumeBtn = document.getElementById('btn-download-resume');
    const resumeStatus = document.getElementById('resume-status-text');

    if (!resumeBtn) return;

    resumeBtn.addEventListener('click', function (e) {
      // Validate file availability
      fetch(resumeBtn.getAttribute('href'), { method: 'HEAD' })
        .then(function (response) {
          if (!response.ok && resumeStatus) {
            resumeStatus.style.display = 'block';
            resumeStatus.style.color = '#f87171';
            resumeStatus.textContent = 'Notice: Resume PDF file is updating. Email amsp78810@gmail.com for a direct copy!';
          }
        })
        .catch(function () {
          // File protocol / offline fallback
        });
    });
  }

  /* --------------------------------------------------------------------------
     Initialize All Modules When DOM is Ready
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initDynamicRole();
    initHeaderScroll();
    initScrollProgress();
    initMobileNav();
    initScrollspy();
    initScrollReveals();
    initTimelineProgress();
    initHeroParallax();
    initCardSpotlight();
    initBackToTop();
    initContactForm();
    initDynamicYear();
    initResumeModal();
    initResumeCheck();
  });
})();
