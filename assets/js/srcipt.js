// Swiper background initialization
const swiper = new Swiper(".mySwiper", {
  effect: "fade",
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  speed: 1800
});

// Counter animation with Intersection Observer
const counters = document.querySelectorAll('.counter');
const observerOptions = { threshold: 0.4 };
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const updateCount = () => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = parseInt(counter.innerText);
        if (isNaN(current)) current = 0;
        const increment = Math.ceil(target / 35);
        if (current < target) {
          counter.innerText = current + increment;
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
      counterObserver.unobserve(counter);
    }
  });
}, observerOptions);

counters.forEach(counter => counterObserver.observe(counter));

// Back to top button visibility & functionality
window.addEventListener('scroll', () => {
  const btn = document.getElementById('backToTop');
  if (window.scrollY > 400) {
    btn.classList.add('show');
  } else {
    btn.classList.remove('show');
  }
});

document.getElementById('backToTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Donation amount selection inside modal
document.querySelectorAll('.donate-amount').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.donate-amount').forEach(b => {
      b.classList.remove('btn-primary', 'text-white');
      b.classList.add('btn-outline-primary');
    });
    btn.classList.remove('btn-outline-primary');
    btn.classList.add('btn-primary', 'text-white');
  });
});

// Optional: close mobile offcanvas when a link is clicked (for better UX)
const offcanvasLinks = document.querySelectorAll('#mobileMenu .nav-link');
offcanvasLinks.forEach(link => {
  link.addEventListener('click', () => {
    const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('mobileMenu'));
    if (offcanvas) offcanvas.hide();
  });
});