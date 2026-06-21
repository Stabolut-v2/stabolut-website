/* ============ Stabolut — interactions ============ */
document.addEventListener('DOMContentLoaded', () => {

  /* FAQ accordion */
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      // close others
      document.querySelectorAll('.faq-item.open').forEach((other) => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-answer').style.maxHeight = null;
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });
  /* Show success notification if returning from Formspree */
  if (window.location.search.includes('submitted=true')) {
    const status = document.querySelector('.form-status');
    if (status) {
      status.textContent = 'Thanks! We\'ll get back to you soon.';
      status.style.color = '#4ade80';
    }
    // Clean URL
    window.history.replaceState({}, '', '/');
  }

      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
      answer.style.maxHeight = isOpen ? null : answer.scrollHeight + 'px';
    });
  /* Show success notification if returning from Formspree */
  if (window.location.search.includes('submitted=true')) {
    const status = document.querySelector('.form-status');
    if (status) {
      status.textContent = 'Thanks! We\'ll get back to you soon.';
      status.style.color = '#4ade80';
    }
    // Clean URL
    window.history.replaceState({}, '', '/');
  }
  });
  /* Show success notification if returning from Formspree */
  if (window.location.search.includes('submitted=true')) {
    const status = document.querySelector('.form-status');
    if (status) {
      status.textContent = 'Thanks! We\'ll get back to you soon.';
      status.style.color = '#4ade80';
    }
    // Clean URL
    window.history.replaceState({}, '', '/');
  }

  /* Reports slider */
  const slider = document.querySelector('[data-slider]');
  if (slider) {
    const slides = slider.querySelectorAll('.slide');
    const count = slider.querySelector('.slider-count');
    let index = 0;

    const show = (i) => {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, n) => s.classList.toggle('is-active', n === index));
      count.textContent =
        String(index + 1).padStart(2, '0') + ' - ' + String(slides.length).padStart(2, '0');
    };

    slider.querySelector('[data-prev]').addEventListener('click', () => show(index - 1));
    slider.querySelector('[data-next]').addEventListener('click', () => show(index + 1));

    // auto-advance every 7s
    setInterval(() => show(index + 1), 7000);
  }

  /* Reveal on scroll */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
  /* Show success notification if returning from Formspree */
  if (window.location.search.includes('submitted=true')) {
    const status = document.querySelector('.form-status');
    if (status) {
      status.textContent = 'Thanks! We\'ll get back to you soon.';
      status.style.color = '#4ade80';
    }
    // Clean URL
    window.history.replaceState({}, '', '/');
  }
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  /* Contact form — validates then submits to Formspree (native POST) */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      const status = form.querySelector('.form-status');
      const name = form.name.value.trim();
      const email = form._replyto.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        e.preventDefault();
        status.textContent = 'Please fill in all fields.';
        return;
      }

      status.textContent = 'Sending…';
      // Native form submission — redirects to Formspree's thank you page
    });
  /* Show success notification if returning from Formspree */
  if (window.location.search.includes('submitted=true')) {
    const status = document.querySelector('.form-status');
    if (status) {
      status.textContent = 'Thanks! We\'ll get back to you soon.';
      status.style.color = '#4ade80';
    }
    // Clean URL
    window.history.replaceState({}, '', '/');
  }
  }
});
  /* Show success notification if returning from Formspree */
  if (window.location.search.includes('submitted=true')) {
    const status = document.querySelector('.form-status');
    if (status) {
      status.textContent = 'Thanks! We\'ll get back to you soon.';
      status.style.color = '#4ade80';
    }
    // Clean URL
    window.history.replaceState({}, '', '/');
  }
