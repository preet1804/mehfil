/**
 * MEHFIL — EDITORIAL PHOTO GALLERY & LIGHTBOX
 */

document.addEventListener('DOMContentLoaded', () => {
  const filterPills = document.querySelectorAll('.gallery-filter-pill');
  const photoCards = document.querySelectorAll('.photo-card');

  // Filter Pills
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');

      photoCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Lightbox Modal
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxAuthor = document.getElementById('lightboxAuthor');
  const lightboxLicense = document.getElementById('lightboxLicense');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentIndex = 0;
  const visibleCards = () => Array.from(photoCards).filter(c => c.style.display !== 'none');

  function openLightbox(index) {
    const list = visibleCards();
    if (index < 0) index = list.length - 1;
    if (index >= list.length) index = 0;
    currentIndex = index;

    const card = list[currentIndex];
    if (!card) return;

    const img = card.querySelector('img');
    const title = card.querySelector('.photo-title')?.innerText || '';
    const desc = card.querySelector('.photo-desc')?.innerText || '';
    const author = card.getAttribute('data-author') || 'Photographer';
    const license = card.getAttribute('data-license') || 'Verified License';
    const webpSrc = card.getAttribute('data-full-src') || img.src;

    if (lightboxImg) lightboxImg.src = webpSrc;
    if (lightboxTitle) lightboxTitle.innerText = title;
    if (lightboxDesc) lightboxDesc.innerText = desc;
    if (lightboxAuthor) lightboxAuthor.innerText = author;
    if (lightboxLicense) lightboxLicense.innerText = license;

    lightboxModal.classList.add('open');
  }

  photoCards.forEach((card) => {
    card.addEventListener('click', () => {
      const list = visibleCards();
      const idx = list.indexOf(card);
      openLightbox(idx);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('open');
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('open');
      }
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(currentIndex - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(currentIndex + 1);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('open')) return;
    if (e.key === 'Escape') lightboxModal.classList.remove('open');
    if (e.key === 'ArrowLeft') openLightbox(currentIndex - 1);
    if (e.key === 'ArrowRight') openLightbox(currentIndex + 1);
  });
});
