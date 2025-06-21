document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = this.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Video Modal
    const videoModal = document.getElementById('videoModal');
    const videoTriggers = document.querySelectorAll('.video-trigger');
    const closeModal = document.querySelector('.close-modal');
    const videoFrame = document.getElementById('videoFrame');
    
    videoTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Add your video URL here
            videoFrame.src = 'https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1';
        });
    });
    
    closeModal.addEventListener('click', () => {
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
        videoFrame.src = '';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            document.body.style.overflow = '';
            videoFrame.src = '';
        }
    });
    
    // Animate numbers in metrics section
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = end >= 1000 ? (value / 1000).toFixed(1) + 'K' : value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class to animate elements in
                entry.target.classList.add('active');
                
                // Animate numbers in metrics section
                if (entry.target.classList.contains('metric-value')) {
                    const target = +entry.target.getAttribute('data-target');
                    animateValue(entry.target, 0, target, 2000);
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with reveal class
    document.querySelectorAll('.reveal, .metric-value').forEach(el => {
        observer.observe(el);
    });
    
    // Testimonial Carousel
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto-advance slides
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
    
    // Initialize first slide
    if (slides.length > 0) {
        showSlide(0);
    }
    
    // Add scroll event for navbar background
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // Add animation to service cards on hover
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
            card.style.boxShadow = `${-angleY}px ${angleX}px 30px rgba(0, 0, 0, 0.1)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
            card.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Add animation to timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Initialize AOS (Animate On Scroll)
    // This is a simplified version of AOS functionality
    function checkScroll() {
        const elements = document.querySelectorAll('.reveal');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    // Check scroll position on load and scroll
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
    
    // Add animation to hero title lines
    const titleLines = document.querySelectorAll('.title-line');
    titleLines.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.2}s`;
    });
});
