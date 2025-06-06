document.addEventListener('DOMContentLoaded', () => {
  initServiceTestimonialSlider();
  initDocumentListAnimation();
  initProcessStepsAnimation();
});

// Service page testimonial slider
function initServiceTestimonialSlider() {
  const testimonialSlider = document.getElementById('service-testimonial-slider');
  if (!testimonialSlider) return;
  
  const testimonials = testimonialSlider.querySelectorAll('.testimonial');
  const prevButton = document.getElementById('prev-service-testimonial');
  const nextButton = document.getElementById('next-service-testimonial');
  
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
}

// Document list animation
function initDocumentListAnimation() {
  const documentList = document.querySelector('.document-list');
  if (!documentList) return;
  
  const listItems = documentList.querySelectorAll('li');
  
  function animateItems() {
    listItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('animate');
      }, 100 * index);
    });
  }
  
  // Create IntersectionObserver to trigger animation when the list is in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateItems();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  observer.observe(documentList);
  
  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    .document-list li {
      opacity: 0;
      transform: translateX(20px);
      transition: opacity 0.5s ease-out, transform 0.5s ease-out;
    }
    
    .document-list li.animate {
      opacity: 1;
      transform: translateX(0);
    }
  `;
  document.head.appendChild(style);
}

// Process steps animation
function initProcessStepsAnimation() {
  const processSteps = document.querySelectorAll('.process-step');
  if (!processSteps.length) return;
  
  function animateSteps() {
    processSteps.forEach((step, index) => {
      setTimeout(() => {
        step.classList.add('animate');
      }, 200 * index);
    });
  }
  
  // Create IntersectionObserver to trigger animation when steps are in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSteps();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(document.querySelector('.process-steps'));
  
  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    .process-step {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .process-step.animate {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
}

// Visa type hover animation
const visaTypes = document.querySelectorAll('.visa-type');
visaTypes.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const icon = item.querySelector('.visa-icon');
    icon.style.transform = 'scale(1.1)';
  });
  
  item.addEventListener('mouseleave', () => {
    const icon = item.querySelector('.visa-icon');
    icon.style.transform = 'scale(1)';
  });
});

// Interview tips hover effect
const interviewTips = document.querySelectorAll('.tip');
interviewTips.forEach(tip => {
  tip.addEventListener('mouseenter', () => {
    const icon = tip.querySelector('.tip-icon');
    icon.style.transform = 'translateY(-5px)';
  });
  
  tip.addEventListener('mouseleave', () => {
    const icon = tip.querySelector('.tip-icon');
    icon.style.transform = 'translateY(0)';
  });
});