/**
 * LEAP LIMITLESS - CONFIDENTIAL CONSULTATION & CALENDAR SCHEDULER
 * Handles multi-step executive intake, calendar slot selection, and booking confirmation
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('consultation-form');
  const calendarSlots = document.querySelectorAll('.cal-slot.available');
  const timeButtons = document.querySelectorAll('.time-btn');
  const selectedDateDisplay = document.getElementById('selected-date-display');
  const selectedTimeDisplay = document.getElementById('selected-time-display');
  const bookingSuccessModal = document.getElementById('booking-success-modal');

  let chosenDate = 'Thursday, Oct 15';
  let chosenTime = '11:00 AM EST';

  calendarSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      calendarSlots.forEach(s => s.classList.remove('selected'));
      slot.classList.add('selected');
      const dateVal = slot.getAttribute('data-date');
      if (dateVal) chosenDate = dateVal;
      if (selectedDateDisplay) selectedDateDisplay.innerText = chosenDate;
    });
  });

  timeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      timeButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const timeVal = btn.getAttribute('data-time');
      if (timeVal) chosenTime = timeVal;
      if (selectedTimeDisplay) selectedTimeDisplay.innerText = chosenTime;
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Securing Confidential Booking... <span class="icon">hourglass_empty</span>';
      submitBtn.setAttribute('disabled', 'true');

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.removeAttribute('disabled');

        // Populate modal data
        const modalDate = document.getElementById('modal-confirmed-date');
        const modalTime = document.getElementById('modal-confirmed-time');
        if (modalDate) modalDate.innerText = chosenDate;
        if (modalTime) modalTime.innerText = chosenTime;

        if (bookingSuccessModal) {
          bookingSuccessModal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      }, 1200);
    });
  }
});
