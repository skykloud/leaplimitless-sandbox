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

  // 4. Unified Submission Router (Emails coach@leaplimitless.com + Logs to List View)
  const SUBMISSIONS_STORAGE_KEY = 'leap_submissions_list_v1';
  const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/coach@leaplimitless.com';

  window.submitLeapLimitlessRequest = async function (payload) {
    const now = new Date();
    const record = {
      id: 'LL-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
      timestamp: now.toISOString(),
      formattedDate: now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      }),
      type: payload.type || 'General Inquiry',
      name: payload.name || 'Website Visitor',
      email: payload.email || '',
      phone: payload.phone || 'Not provided',
      roleOrg: payload.roleOrg || 'Not specified',
      focus: payload.focus || 'General',
      details: payload.details || '',
      extra: payload.extra || '',
      sourcePage: payload.sourcePage || window.location.pathname || '/',
      status: 'New'
    };

    // 1. Save to Local Submissions List View Store ONLY when running on localhost
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocalhost) {
      try {
        const existing = JSON.parse(localStorage.getItem(SUBMISSIONS_STORAGE_KEY) || '[]');
        existing.unshift(record);
        localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(existing));
      } catch (err) {
        console.warn('Could not save submission locally:', err);
      }
    }

    // 2. Send Background Email to coach@leaplimitless.com via FormSubmit AJAX
    const emailPayload = {
      _subject: `[Leap Limitless - ${record.type}] ${record.name !== 'Website Visitor' ? record.name : record.email}`,
      _template: 'table',
      _captcha: 'false',
      _replyto: record.email,
      Request_ID: record.id,
      Request_Type: record.type,
      Submitted_At: record.formattedDate,
      Full_Name: record.name,
      Email_Address: record.email,
      Phone_Number: record.phone,
      Role_or_Organization: record.roleOrg,
      Focus_or_Category: record.focus,
      Details_and_Notes: record.details || 'None provided',
      Additional_Info: record.extra || 'N/A',
      Source_Page: record.sourcePage
    };

    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailPayload)
      });
      const result = await response.json().catch(() => ({}));

      // Optional secondary Cloud Webhook (e.g. Power Automate / Google Sheet if configured)
      const customWebhook = localStorage.getItem('leap_cloud_webhook_url');
      if (customWebhook && customWebhook.startsWith('http')) {
        fetch(customWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record)
        }).catch(() => {});
      }

      return { ok: response.ok, result, record };
    } catch (networkErr) {
      console.warn('Background email delivery warning:', networkErr);
      return { ok: false, error: networkErr, record };
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
