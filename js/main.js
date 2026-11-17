/**
 * MEHFIL — LUXURY BESPOKE INDIAN WEDDINGS
 * Main Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Sticky Header Elevation on Scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
      header.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.08)';
    } else {
      header.classList.remove('scrolled');
      header.style.boxShadow = 'none';
    }
  });

  // Homepage Gallery Filter Tabs
  const tabBtns = document.querySelectorAll('.gallery-tabs .tab-btn');
  const galleryItems = document.querySelectorAll('.editorial-grid .gallery-item');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Interactive Wedding Inquiry Form Handler
  const inquiryForm = document.getElementById('weddingInquiryForm');
  const inquirySuccess = document.getElementById('inquirySuccessMsg');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = 'Sending Request...';
      submitBtn.disabled = true;

      setTimeout(() => {
        inquiryForm.style.display = 'none';
        if (inquirySuccess) {
          inquirySuccess.style.display = 'block';
          inquirySuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 900);
    });
  }
});
