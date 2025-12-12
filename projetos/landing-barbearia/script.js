// ===== Initialize Lucide Icons =====
document.addEventListener('DOMContentLoaded', function() {
  lucide.createIcons();
  
  initHeader();
  initMobileMenu();
  initSmoothScroll();
});

// ===== Header Scroll Effect =====
function initHeader() {
  const header = document.getElementById('header');
  
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial state
}

// ===== Mobile Menu Toggle =====
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  let isOpen = false;
  
  function toggleMenu() {
    isOpen = !isOpen;
    mobileMenu.classList.toggle('active', isOpen);
    
    // Update icon
    const icon = mobileMenuBtn.querySelector('i');
    icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
    lucide.createIcons();
  }
  
  function closeMenu() {
    isOpen = false;
    mobileMenu.classList.remove('active');
    
    const icon = mobileMenuBtn.querySelector('i');
    icon.setAttribute('data-lucide', 'menu');
    lucide.createIcons();
  }
  
  mobileMenuBtn.addEventListener('click', toggleMenu);
  
  // Close menu when clicking on nav links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // Close menu on resize to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });
}

// ===== Smooth Scroll for Anchor Links =====
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== Intersection Observer for Animations =====
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.benefit-card, .gallery-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `all 0.5s ease ${index * 0.1}s`;
    observer.observe(el);
  });
}

// Initialize scroll animations after page load
window.addEventListener('load', initScrollAnimations);
