// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

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
