document.addEventListener('DOMContentLoaded', () => {
  initTestimonialSlider();
});

// Testimonial Slider
function initTestimonialSlider() {
  const testimonialSlider = document.getElementById('testimonial-slider');
  if (!testimonialSlider) return;
  
  const testimonials = testimonialSlider.querySelectorAll('.testimonial');
  const prevButton = document.getElementById('prev-testimonial');
  const nextButton = document.getElementById('next-testimonial');
  
  let currentIndex = 0;
  
  // Initialize first testimonial
  testimonials[currentIndex].classList.add('active');
  
  function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
      testimonial.classList.remove('active');
    });
    
    // Show the selected testimonial
    testimonials[index].classList.add('active');
  }
  
  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }
  
  function prevTestimonial() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
  }
  
  // Button event listeners
  if (prevButton) {
    prevButton.addEventListener('click', prevTestimonial);
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', nextTestimonial);
  }
  
  // Auto-rotate testimonials
  const autoRotateInterval = 5000; // 5 seconds
  let intervalId = setInterval(nextTestimonial, autoRotateInterval);
  
  // Pause auto-rotation on hover
  testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(intervalId);
  });
  
  testimonialSlider.addEventListener('mouseleave', () => {
    intervalId = setInterval(nextTestimonial, autoRotateInterval);
  });
  
  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  
  testimonialSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  testimonialSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left
      nextTestimonial();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right
      prevTestimonial();
    }
  }
}

// Hero animation extension
window.addEventListener('load', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '1';
    heroContent.style.transform = 'translateY(0)';
  }
});

// Service cards animation on scroll
const serviceCards = document.querySelectorAll('.service-card');
const features = document.querySelectorAll('.feature');

function animateOnScroll(elements, className = 'animate') {
  if (!elements.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(className);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  elements.forEach(element => {
    observer.observe(element);
  });
}

// Initialize animations
animateOnScroll(serviceCards, 'show');
animateOnScroll(features, 'show');

// Add CSS animations for these elements
const style = document.createElement('style');
style.textContent = `
  .service-card, .feature {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  
  .service-card.show, .feature.show {
    opacity: 1;
    transform: translateY(0);
  }
  
  .service-card:nth-child(2), .feature:nth-child(2) {
    transition-delay: 0.2s;
  }
  
  .service-card:nth-child(3), .feature:nth-child(3) {
    transition-delay: 0.4s;
  }
  
  .feature:nth-child(4) {
    transition-delay: 0.6s;
  }
`;
document.head.appendChild(style);