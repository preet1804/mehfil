/**
 * MEHFIL — DIGITAL INDIAN WEDDING CARD & RSVP PLATFORM
 * Theme Switcher, Countdown Timer & Multi-Ceremony RSVP Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Switcher Logic
  const themeButtons = document.querySelectorAll('.theme-btn');
  const validThemes = [
    'theme-rajasthani',
    'theme-marigold',
    'theme-minimal',
    'theme-ivory-gold',
    'theme-mehendi',
    'theme-burgundy'
  ];

  function applyTheme(themeName) {
    validThemes.forEach(t => document.body.classList.remove(t));
    document.body.classList.add(themeName);

    themeButtons.forEach(btn => {
      if (btn.getAttribute('data-theme') === themeName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    try {
      localStorage.setItem('mehfil_invitation_theme', themeName);
    } catch (e) {
      // safe fallback
    }
  }

  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-theme');
      applyTheme(selected);
    });
  });

  // Restore saved theme or default to Rajasthani
  const savedTheme = localStorage.getItem('mehfil_invitation_theme') || 'theme-rajasthani';
  applyTheme(savedTheme);

  // 2. Auspicious Wedding Countdown Timer
  // Target: Dec 18, 2026 10:00:00 AM IST
  const targetDate = new Date('2026-12-18T10:00:00+05:30').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      const countdownEl = document.querySelector('.countdown-bar');
      if (countdownEl) countdownEl.innerHTML = '<div class="countdown-val">The Celebrations Have Begun!</div>';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const dEl = document.getElementById('countDays');
    const hEl = document.getElementById('countHours');
    const mEl = document.getElementById('countMins');
    const sEl = document.getElementById('countSecs');

    if (dEl) dEl.innerText = days.toString().padStart(2, '0');
    if (hEl) hEl.innerText = hours.toString().padStart(2, '0');
    if (mEl) mEl.innerText = minutes.toString().padStart(2, '0');
    if (sEl) sEl.innerText = seconds.toString().padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 3. Individual Function RSVP Controls
  const functionCards = document.querySelectorAll('.function-card');

  functionCards.forEach(card => {
    const attendBtn = card.querySelector('.btn-attend');
    const declineBtn = card.querySelector('.btn-decline');
    const guestSelect = card.querySelector('.fn-count-select');

    if (attendBtn && declineBtn) {
      attendBtn.addEventListener('click', () => {
        attendBtn.classList.add('selected-attending');
        declineBtn.classList.remove('selected-declining');
        card.setAttribute('data-rsvp-status', 'attending');
        if (guestSelect) guestSelect.disabled = false;
      });

      declineBtn.addEventListener('click', () => {
        declineBtn.classList.add('selected-declining');
        attendBtn.classList.remove('selected-attending');
        card.setAttribute('data-rsvp-status', 'declined');
        if (guestSelect) guestSelect.disabled = true;
      });
    }
  });

  // 4. RSVP Form Submission & Digital Wedding Pass Generation
  const rsvpForm = document.getElementById('digitalRsvpForm');
  const modalBackdrop = document.getElementById('rsvpConfirmModal');
  const modalClose = document.getElementById('modalCloseBtn');
  const printPassBtn = document.getElementById('printPassBtn');

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Collect data
      const guestName = document.getElementById('guestFullName')?.value || 'Honored Guest';
      const guestPhone = document.getElementById('guestPhone')?.value || '';
      const guestEmail = document.getElementById('guestEmail')?.value || '';
      const dietary = document.getElementById('guestDietary')?.value || 'Traditional Vegetarian';
      const hotelStay = document.getElementById('checkHotelStay')?.checked ? 'Yes (Requested)' : 'Not Required';
      const airportTransfer = document.getElementById('checkAirportTransfer')?.checked ? 'Yes (Requested)' : 'Not Required';

      // Summarize attending ceremonies
      const attendingList = [];
      functionCards.forEach(c => {
        const status = c.getAttribute('data-rsvp-status');
        const title = c.querySelector('.fn-title')?.innerText || '';
        const count = c.querySelector('.fn-count-select')?.value || '1';
        if (status === 'attending') {
          attendingList.push(`${title} (${count} guest${count > 1 ? 's' : ''})`);
        }
      });

      const passBookingId = 'MEHFIL-' + Math.floor(100000 + Math.random() * 900000);

      // Populate Modal Pass
      document.getElementById('passGuestName').innerText = guestName;
      document.getElementById('passBookingRef').innerText = passBookingId;
      document.getElementById('passDietary').innerText = dietary;
      document.getElementById('passStay').innerText = hotelStay;
      document.getElementById('passTransfer').innerText = airportTransfer;
      document.getElementById('passFunctions').innerText = attendingList.length > 0 ? attendingList.join(', ') : 'All Functions Attending';

      // Open Modal
      if (modalBackdrop) modalBackdrop.classList.add('open');
    });
  }

  if (modalClose && modalBackdrop) {
    modalClose.addEventListener('click', () => {
      modalBackdrop.classList.remove('open');
    });

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('open');
      }
    });
  }

  if (printPassBtn) {
    printPassBtn.addEventListener('click', () => {
      window.print();
    });
  }
});
