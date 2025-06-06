document.addEventListener('DOMContentLoaded', () => {
  initAppointmentForm();
  initAppointmentTestimonialSlider();
});

// Appointment form multi-step functionality
function initAppointmentForm() {
  const form = document.getElementById('appointment-form');
  if (!form) return;
  
  const steps = form.querySelectorAll('.form-step');
  const nextButtons = form.querySelectorAll('.next-step');
  const prevButtons = form.querySelectorAll('.prev-step');
  
  // Set up next buttons
  nextButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      const currentStep = button.closest('.form-step');
      const currentStepIndex = Array.from(steps).indexOf(currentStep);
      
      // Validate current step
      if (validateStep(currentStep)) {
        // Hide current step
        currentStep.style.display = 'none';
        
        // Show next step
        steps[currentStepIndex + 1].style.display = 'block';
        
        // Scroll to top of form
        form.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Set up previous buttons
  prevButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      const currentStep = button.closest('.form-step');
      const currentStepIndex = Array.from(steps).indexOf(currentStep);
      
      // Hide current step
      currentStep.style.display = 'none';
      
      // Show previous step
      steps[currentStepIndex - 1].style.display = 'block';
    });
  });
  
  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const lastStep = steps[steps.length - 1];
    
    if (validateStep(lastStep)) {
      // Simulate form submission
      const submitButton = lastStep.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';
      
      // Simulate server request
      setTimeout(() => {
        submitButton.textContent = 'Submitted!';
        
        // Show success modal
        const modal = document.getElementById('appointment-success');
        modal.classList.add('show');
        
        // Reset form after submission
        setTimeout(() => {
          form.reset();
          steps.forEach((step, index) => {
            step.style.display = index === 0 ? 'block' : 'none';
          });
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }, 1000);
      }, 2000);
    }
  });
  
  // Close modal functionality
  const modal = document.getElementById('appointment-success');
  const closeButtons = modal.querySelectorAll('.close-modal, .close-btn');
  
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      modal.classList.remove('show');
    });
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });
  
  // Form validation
  function validateStep(step) {
    let isValid = true;
    const requiredFields = step.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      // Reset previous error
      removeError(field);
      
      if (!field.value.trim()) {
        showError(field, 'This field is required');
        isValid = false;
      } else if (field.type === 'email' && !validateEmail(field.value)) {
        showError(field, 'Please enter a valid email address');
        isValid = false;
      } else if (field.type === 'tel' && !validatePhone(field.value)) {
        showError(field, 'Please enter a valid phone number');
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  function showError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--error-500)';
    errorElement.style.fontSize = 'var(--font-size-sm)';
    errorElement.style.marginTop = '4px';
    
    // Insert error message after the field
    field.parentNode.insertBefore(errorElement, field.nextSibling);
    
    // Highlight the field
    field.style.borderColor = 'var(--error-500)';
  }
  
  function removeError(field) {
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
    
    // Reset field style
    field.style.borderColor = '';
  }
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function validatePhone(phone) {
    // Basic phone validation - can be enhanced for specific formats
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return re.test(phone) || phone.length >= 10;
  }
}

// Appointment page testimonial slider
function initAppointmentTestimonialSlider() {
  const testimonialSlider = document.getElementById('appointment-testimonial-slider');
  if (!testimonialSlider) return;
  
  const testimonials = testimonialSlider.querySelectorAll('.testimonial');
  const prevButton = document.getElementById('prev-appointment-testimonial');
  const nextButton = document.getElementById('next-appointment-testimonial');
  
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
  const autoRotateInterval = 6000; // 6 seconds
  let intervalId = setInterval(nextTestimonial, autoRotateInterval);
  
  // Pause auto-rotation on hover
  testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(intervalId);
  });
  
  testimonialSlider.addEventListener('mouseleave', () => {
    intervalId = setInterval(nextTestimonial, autoRotateInterval);
  });
}

// Date picker enhancement
const dateInputs = document.querySelectorAll('input[type="date"]');
dateInputs.forEach(input => {
  // Set min date to today
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  input.min = formattedDate;
  
  // Set max date to 1 year from now
  const nextYear = new Date();
  nextYear.setFullYear(today.getFullYear() + 1);
  const maxDate = nextYear.toISOString().split('T')[0];
  input.max = maxDate;
});

// Animated focus effects for form fields
const formFields = document.querySelectorAll('input, select, textarea');
formFields.forEach(field => {
  field.addEventListener('focus', () => {
    field.parentElement.classList.add('field-focus');
  });
  
  field.addEventListener('blur', () => {
    field.parentElement.classList.remove('field-focus');
  });
});

// Add focus animation style
const style = document.createElement('style');
style.textContent = `
  .field-focus label {
    color: var(--primary-600);
    transform: translateY(-2px);
    transition: all 0.3s ease;
  }
  
  .form-group {
    position: relative;
  }
  
  .form-group label {
    transition: all 0.3s ease;
  }
`;
document.head.appendChild(style);