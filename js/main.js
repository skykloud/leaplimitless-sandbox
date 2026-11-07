/**
 * LEAP LIMITLESS - CORE JAVASCRIPT
 * Executive Leadership & Immigrant Career Transformation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer
  const menuToggle = document.getElementById('menu-toggle');
  const drawerClose = document.getElementById('drawer-close');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 2. Header Scroll Effect & Adaptive Dropdown Menu
  const header = document.querySelector('.site-header');
  const dropdownMenu = document.querySelector('.nav-dropdown-menu');
  const dropdownToggle = document.querySelector('.nav-item-dropdown');

  function checkAdaptiveDropdown() {
    if (!dropdownMenu || !dropdownToggle) return;

    if (document.body.classList.contains('lc-body')) {
      dropdownMenu.classList.add('adaptive-dark');
      return;
    }

    const rect = dropdownToggle.getBoundingClientRect();
    const sampleX = Math.round(rect.left + Math.min(60, rect.width / 2));
    const sampleY = Math.round(rect.bottom + 50);

    let isOverDark = false;
    const elements = document.elementsFromPoint(sampleX, sampleY);

    if (elements && elements.length) {
      for (const el of elements) {
        if (el === dropdownMenu || dropdownMenu.contains(el)) continue;
        if (el.closest('.site-header')) continue;

        // Dark section or dark container
        if (el.closest('.section-dark, .site-footer, .calc-output-panel, .diagnostic-header, .dark-surface, [data-theme="dark"]')) {
          isOverDark = true;
          break;
        }

        // Image or photo backdrop
        if (el.tagName === 'IMG' || el.tagName === 'PICTURE' || el.closest('.hero-image-frame, .hero-image-inner, .playbook-hero, .image-overlay')) {
          isOverDark = true;
          break;
        }

        // Background color brightness check
        const style = window.getComputedStyle(el);
        const bg = style.backgroundColor;
        const rgb = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (rgb) {
          const r = parseInt(rgb[1], 10);
          const g = parseInt(rgb[2], 10);
          const b = parseInt(rgb[3], 10);
          const isTransparent = bg.includes('rgba') && bg.includes(', 0)');
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;
          if (!isTransparent && brightness < 110) {
            isOverDark = true;
            break;
          }
        }
      }
    }

    if (isOverDark) {
      dropdownMenu.classList.add('adaptive-dark');
    } else {
      dropdownMenu.classList.remove('adaptive-dark');
    }
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    checkAdaptiveDropdown();
  }, { passive: true });

  if (dropdownToggle) {
    dropdownToggle.addEventListener('mouseenter', checkAdaptiveDropdown);
  }
  checkAdaptiveDropdown();

  // 3. Modal Interactions (Consultation Intake)
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  const modalCloseButtons = document.querySelectorAll('[data-close-modal]');
  const modals = document.querySelectorAll('.modal-backdrop');

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-open-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  modalCloseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modals.forEach(m => m.classList.remove('open'));
      document.body.style.overflow = '';
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // 4. Unified Submission Router (Submits to Microsoft Form: Leap Limitless Coaching Requests)
  const MS_FORM_ID = 'UpKv0Eu0xUSDrLy1GycO6-808UQy815Ct_t1ldoWaO9UNkY5S1lJR1pCWlpFQlJFSVlEQ0c0NzBGVC4u';
  const MS_FORM_BASE_URL = `https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=${MS_FORM_ID}`;
  const MS_FORM_API_URL = `https://forms.cloud.microsoft/formapi/api/d0af9252-b44b-44c5-83ac-bcb51b270eeb/users/44f134ef-f332-425e-b7fb-7595da1668ef/forms('${MS_FORM_ID}')/responses`;

  // Exact Question IDs from Gagan's Microsoft Form
  const MS_Q = {
    requestType: 'r99e013107f3542d7b71326586708f549',
    fullName: 'r2f2b4072347445aca2a1c4fbf6ab4341',
    email: 'rc41c2038581c478baf358654f07ef2cd',
    phone: 'r70a9d9278e7542f389109c5b3df81b67',
    roleOrg: 'r8c562b32fca5447383cc4a7848bf6606',
    focus: 'rca14cd2311164db891e38cca4dea0068',
    goals: 'readd2b5595e14cabaf81dc8c109a0f41'
  };

  function mapToMsFormChoice(type) {
    const t = String(type || '').toLowerCase();
    if (t.includes('discovery')) return 'Discovery Call (30-Min Consultation)';
    if (t.includes('pro bono')) return '1:1 Pro Bono Coaching Request';
    if (t.includes('nonprofit')) return 'Special Rates for Nonprofits';
    return 'General Inquiry / Newsletter';
  }

  window.buildPrefilledMsFormUrl = function (payload) {
    const choice = mapToMsFormChoice(payload.type);
    const params = new URLSearchParams({
      id: MS_FORM_ID,
      [MS_Q.requestType]: choice,
      [MS_Q.fullName]: payload.name || '',
      [MS_Q.email]: payload.email || '',
      [MS_Q.phone]: payload.phone || '',
      [MS_Q.roleOrg]: payload.roleOrg || '',
      [MS_Q.focus]: payload.focus || '',
      [MS_Q.goals]: payload.details || ''
    });
    return `https://forms.cloud.microsoft/Pages/ResponsePage.aspx?${params.toString()}`;
  };

  window.submitLeapLimitlessRequest = async function (payload) {
    const nowIso = new Date().toISOString();
    const choice = mapToMsFormChoice(payload.type);

    const msAnswers = [
      { questionId: MS_Q.requestType, answer1: choice },
      { questionId: MS_Q.fullName, answer1: payload.name || 'Website Visitor' },
      { questionId: MS_Q.email, answer1: payload.email || '' },
      { questionId: MS_Q.phone, answer1: payload.phone || 'Not provided' },
      { questionId: MS_Q.roleOrg, answer1: payload.roleOrg || 'Not specified' },
      { questionId: MS_Q.focus, answer1: payload.focus || 'General' },
      {
        questionId: MS_Q.goals,
        answer1: [payload.details, payload.extra, payload.sourcePage ? `(Source: ${payload.sourcePage})` : '']
          .filter(Boolean)
          .join(' | ')
      }
    ];

    const msBody = {
      startDate: nowIso,
      submitDate: nowIso,
      answers: JSON.stringify(msAnswers)
    };

    const endpoint = '/api/submit-ms-form';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(msBody)
      });
      const result = await response.json().catch(() => ({}));
      return {
        ok: response.ok,
        result,
        prefilledUrl: window.buildPrefilledMsFormUrl(payload)
      };
    } catch (networkErr) {
      console.warn('Direct MS Form API warning:', networkErr);
      return {
        ok: false,
        error: networkErr,
        prefilledUrl: window.buildPrefilledMsFormUrl(payload)
      };
    }
  };

  // Newsletter / Executive Briefing Opt-In Forms
  const briefingForms = document.querySelectorAll('.briefing-form');
  briefingForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button');
      if (input && input.value) {
        const subscriberEmail = input.value.trim();
        const origText = btn.innerHTML;
        btn.innerHTML = 'Subscribing...';
        btn.setAttribute('disabled', 'true');

        window.submitLeapLimitlessRequest({
          type: 'Newsletter Subscription',
          name: subscriberEmail.split('@')[0],
          email: subscriberEmail,
          focus: 'Monthly Coaching & Leadership Insights',
          details: 'Opted in via website newsletter form.'
        }).finally(() => {
          btn.innerHTML = 'Subscribed &amp; Confirmed <span class="icon">check</span>';
          btn.removeAttribute('disabled');
          btn.classList.add('btn-gold');
          input.value = '';
          setTimeout(() => {
            btn.innerHTML = origText;
            btn.classList.remove('btn-gold');
          }, 4000);
        });
      }
    });
  });

  // 5. Intersection Observer for Subtle Reveal
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // 6. Blueprint Tabs Switcher & Deep Linking (Rule 1 through Rule 5)
  const tabButtons = document.querySelectorAll('.blueprint-tab');
  const tabContents = document.querySelectorAll('.blueprint-content');

  function activateBlueprintTab(targetId, shouldScroll) {
    if (!targetId) return;
    const cleanId = targetId.replace(/^#/, '');
    const targetContent = document.getElementById(cleanId);
    const targetButton = document.querySelector(`.blueprint-tab[data-tab="${cleanId}"]`);

    if (targetContent && targetButton) {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      targetButton.classList.add('active');
      targetContent.classList.add('active');

      if (shouldScroll) {
        const headerOffset = 100;
        const elementPosition = targetButton.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - headerOffset,
          behavior: 'smooth'
        });
      }
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      activateBlueprintTab(targetId, false);
      if (history.replaceState) {
        history.replaceState(null, null, `#${targetId}`);
      }
    });
  });

  // Intercept all links targeting #tab-rule (including footer links)
  document.querySelectorAll('a[href*="#tab-rule"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const hashIndex = href.indexOf('#');
      if (hashIndex !== -1) {
        const hash = href.substring(hashIndex + 1);
        const targetContent = document.getElementById(hash);
        if (targetContent) {
          e.preventDefault();
          activateBlueprintTab(hash, true);
          if (history.pushState) {
            history.pushState(null, null, `#${hash}`);
          }
        }
      }
    });
  });

  // Handle URL hash on initial page load and on hashchange
  if (window.location.hash && window.location.hash.startsWith('#tab-rule')) {
    setTimeout(() => {
      activateBlueprintTab(window.location.hash, true);
    }, 150);
  }

  window.addEventListener('hashchange', () => {
    if (window.location.hash && window.location.hash.startsWith('#tab-rule')) {
      activateBlueprintTab(window.location.hash, true);
    }
  });
});
