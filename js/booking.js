/**
 * LEAP LIMITLESS - CONFIDENTIAL CONSULTATION & CALENDAR SCHEDULER
 * Handles executive intake validation, briefing summary preservation,
 * and direct routing to Microsoft Bookings live calendar.
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('consultation-form');
  const bookingSuccessModal = document.getElementById('booking-success-modal');
  const MS_BOOKING_URL = 'https://bookings.cloud.microsoft/bookwithme/user/bc60b37ec49444039ed7051b8ca224af@skykloud.com/meetingtype/kYf9Fko4O0ycZpLcqVgPfQ2?anonymous&ismsaljsauthenabled&ep=mcard';

  // Wire up close modal handlers
  document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', () => {
      if (bookingSuccessModal) {
        bookingSuccessModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  if (bookingSuccessModal) {
    bookingSuccessModal.addEventListener('click', (e) => {
      if (e.target === bookingSuccessModal) {
        bookingSuccessModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById('consultation-submit-btn') || form.querySelector('button[type="submit"]');
      const originalHtml = submitBtn.innerHTML;

      // Extract form fields
      const fullName = document.getElementById('full-name')?.value?.trim() || '';
      const currentTitle = document.getElementById('current-title')?.value?.trim() || '';
      const currentOrg = document.getElementById('current-org')?.value?.trim() || '';
      const workEmail = document.getElementById('work-email')?.value?.trim() || '';
      const phoneNumber = document.getElementById('phone-number')?.value?.trim() || '';
      const challengeSelect = document.getElementById('strategic-challenge');
      const strategicChallenge = challengeSelect ? challengeSelect.options[challengeSelect.selectedIndex]?.text : '';
      const executiveNotes = document.getElementById('executive-notes')?.value?.trim() || '';

      // Button feedback
      submitBtn.innerHTML = '<span>Saving Briefing &amp; Opening Calendar...</span> <span class="icon">hourglass_top</span>';
      submitBtn.setAttribute('disabled', 'true');

      // Prepare mailto backup payload
      const mailSubject = encodeURIComponent(`[Candidate Briefing] ${fullName} - ${currentOrg}`);
      const mailBody = encodeURIComponent(
        `CONFIDENTIAL EXECUTIVE CANDIDATE BRIEFING\n` +
        `Advisor: Gagan Sharma, ICF-ACC (coach@skykloud.com)\n\n` +
        `Candidate Name: ${fullName}\n` +
        `Current Role: ${currentTitle}\n` +
        `Organization: ${currentOrg}\n` +
        `Email: ${workEmail}\n` +
        `Mobile Phone: ${phoneNumber}\n` +
        `Strategic Priority: ${strategicChallenge}\n\n` +
        `Objective & Context:\n${executiveNotes || 'None provided'}\n\n` +
        `Submitted via leaplimitless.com intake form.`
      );
      const mailtoUrl = `mailto:coach@skykloud.com?subject=${mailSubject}&body=${mailBody}`;

      setTimeout(() => {
        submitBtn.innerHTML = originalHtml;
        submitBtn.removeAttribute('disabled');

        // Populate modal data
        const modalClientName = document.getElementById('modal-client-name');
        const modalClientFocus = document.getElementById('modal-client-focus');
        const emailBriefBtn = document.getElementById('modal-email-brief-btn');
        const launchCalendarBtn = document.getElementById('modal-launch-calendar-btn');

        if (modalClientName && fullName) {
          modalClientName.textContent = fullName.split(' ')[0] || fullName;
        }
        if (modalClientFocus && strategicChallenge) {
          const shortFocus = strategicChallenge.split(':')[0] || strategicChallenge;
          modalClientFocus.textContent = shortFocus;
        }
        if (emailBriefBtn) {
          emailBriefBtn.setAttribute('href', mailtoUrl);
        }
        if (launchCalendarBtn) {
          launchCalendarBtn.setAttribute('href', MS_BOOKING_URL);
        }

        // Open modal
        if (bookingSuccessModal) {
          bookingSuccessModal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }

        // Open live Microsoft Bookings calendar in a new tab
        try {
          window.open(MS_BOOKING_URL, '_blank', 'noopener,noreferrer');
        } catch (err) {
          console.warn('Browser popup blocked auto-open, user can click modal button:', err);
        }
      }, 700);
    });
  }
});
