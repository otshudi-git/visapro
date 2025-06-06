// Header scroll effect
const header = document.getElementById('header');
const scrollThreshold = 50;

function handleScroll() {
  if (window.scrollY > scrollThreshold) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleScroll);

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mainMenu = document.getElementById('main-menu');

mobileMenuToggle.addEventListener('click', () => {
  mobileMenuToggle.classList.toggle('active');
  mainMenu.classList.toggle('active');
  document.body.classList.toggle('menu-open');
});

// Handle dropdowns in mobile view
document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.dropdown');
  
  if (window.innerWidth <= 768) {
    dropdowns.forEach(dropdown => {
      const dropdownLink = dropdown.querySelector('a');
      
      dropdownLink.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('active');
      });
    });
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (mainMenu.classList.contains('active') && 
      !e.target.closest('#main-menu') && 
      !e.target.closest('#mobile-menu-toggle')) {
    mainMenu.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
});

// WhatsApp widget
const whatsappButton = document.querySelector('.whatsapp-button');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    whatsappButton.style.opacity = '1';
  } else {
    whatsappButton.style.opacity = '0.7';
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    // Don't interfere with dropdown toggles in mobile view
    if (window.innerWidth <= 768 && this.parentElement.classList.contains('dropdown')) {
      return;
    }
    
    const targetId = this.getAttribute('href');
    
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      e.preventDefault();
      
      // Close mobile menu if it's open
      if (mainMenu.classList.contains('active')) {
        mainMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
      
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for fixed header
        behavior: 'smooth'
      });
    }
  });
});