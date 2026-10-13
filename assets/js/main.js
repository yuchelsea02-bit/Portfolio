// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Click any portfolio image to inspect it in the lightbox.
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('.lightbox__image');
const lightboxCaption = lightbox.querySelector('.lightbox__caption');
let lightboxZoom = 1;

function setLightboxZoom(zoom) {
  lightboxZoom = Math.min(3, Math.max(1, zoom));
  lightboxImage.style.transform = `scale(${lightboxZoom})`;
  lightbox.querySelector('[data-zoom="reset"]').textContent = `${Math.round(lightboxZoom * 100)}%`;
}

function openLightbox(image) {
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = image.alt;
  setLightboxZoom(1);
  lightbox.showModal();
}

document.querySelectorAll('body img:not(.lightbox__image)').forEach(image => {
  image.tabIndex = 0;
  image.setAttribute('role', 'button');
  image.setAttribute('aria-label', `View image larger: ${image.alt}`);
  image.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    openLightbox(image);
  });
  image.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      openLightbox(image);
    }
  });
});

lightbox.addEventListener('click', event => {
  if (event.target === lightbox || event.target.closest('[data-lightbox-close]')) {
    lightbox.close();
  }
  const zoomControl = event.target.closest('[data-zoom]');
  if (!zoomControl) return;
  if (zoomControl.dataset.zoom === 'in') setLightboxZoom(lightboxZoom + 0.25);
  if (zoomControl.dataset.zoom === 'out') setLightboxZoom(lightboxZoom - 0.25);
  if (zoomControl.dataset.zoom === 'reset') setLightboxZoom(1);
});

// Scroll-reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('is-visible'), i * 40);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => io.observe(el));

// Custom cursor (pointer devices only)
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let dotX = 0, dotY = 0, ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    dotX = e.clientX; dotY = e.clientY;
    dot.style.opacity = 1;
    ring.style.opacity = 1;
  });

  function animate() {
    ringX += (dotX - ringX) * 0.18;
    ringY += (dotY - ringY) * 0.18;
    dot.style.left = dotX + 'px';
    dot.style.top = dotY + 'px';
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animate);
  }
  animate();

  const hoverTargets = document.querySelectorAll('a, button, img, .pills li');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-active'));
  });
}
