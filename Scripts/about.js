document.addEventListener('DOMContentLoaded', () => {

    // --- Header Scroll Effects ---
    const header = document.querySelector('.header');
    // const headerLogo = document.querySelector('.header-logo'); // This line is not strictly needed for the effect you want
    // The logo size change is handled purely by CSS via header.scrolled

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // When scrolled down 50px
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Active Navigation Link Highlighting (for desktop and mobile) ---
    const currentPath = window.location.pathname.split('/').pop(); // e.g., 'about.html'

    const highlightNavLink = () => {
        // Desktop nav links
        const desktopNavLinks = document.querySelectorAll('.nav-menu .nav-link');
        desktopNavLinks.forEach(link => {
            const linkHref = link.getAttribute('href').split('/').pop();
            if (linkHref === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Mobile nav links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-overlay .nav-menu-list a');
        mobileNavLinks.forEach(link => {
            const linkHref = link.getAttribute('href').split('/').pop();
            if (linkHref === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };
    highlightNavLink(); // Call on load to set initial active link

    // --- Read More/Less functionality ---
    const readMoreBtn = document.getElementById('readMoreBtn');
    const additionalText = document.getElementById('additional-team-info');

    if (readMoreBtn && additionalText) {
        readMoreBtn.addEventListener('click', () => {
            additionalText.classList.toggle('show');
            additionalText.classList.toggle('hidden-text'); // Keep hidden-text to control initial state and CSS transition

            if (additionalText.classList.contains('hidden-text')) {
                readMoreBtn.textContent = 'Read More';
            } else {
                readMoreBtn.textContent = 'Read Less';
            }
        });
    }

    // --- Mobile Menu Toggle Logic ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const navLinks = document.getElementById('nav-links'); // Desktop nav menu container (to potentially hide/show on mobile)

    if (menuToggle && mobileNavOverlay) {
        menuToggle.addEventListener('click', () => {
            mobileNavOverlay.classList.toggle('active');
            menuToggle.classList.toggle('active'); // For animating the hamburger icon to an 'X' (if CSS supports)

            // Hide desktop nav when mobile menu is active on small screens
            if (window.innerWidth <= 768) {
                if (mobileNavOverlay.classList.contains('active')) {
                    navLinks.style.display = 'none'; // Hide desktop nav when overlay is open
                } else {
                    navLinks.style.display = 'none'; // Keep desktop nav hidden when overlay closes on mobile
                }
            }
        });

        // Close mobile menu when a link inside the overlay is clicked
        mobileNavOverlay.querySelectorAll('.nav-menu-list a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNavOverlay.classList.remove('active');
                menuToggle.classList.remove('active');
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none'; // Ensure desktop nav remains hidden on mobile
                }
            });
        });

        // Handle window resize for responsive menu display
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                mobileNavOverlay.classList.remove('active'); // Close mobile overlay if resizing up
                menuToggle.classList.remove('active');
                navLinks.style.display = 'flex'; // Ensure desktop nav is visible
            } else {
                // If resizing down to mobile and overlay is not active, hide desktop nav
                if (!mobileNavOverlay.classList.contains('active')) {
                    navLinks.style.display = 'none';
                }
            }
        });
    }

    // --- Scroll Animation Logic (Intersection Observer) ---
    // Elements that will animate on scroll
    // Note: The classes are ADDED by JS at DOMContentLoaded for better control and
    // to ensure elements below the fold start hidden.
    const animatedElements = document.querySelectorAll('.mission-vision-section .card, .team-section');

    const observerOptions = {
        root: null, // viewport as root
        rootMargin: '0px',
        threshold: 0.1 // 10% of element visible to trigger
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // For mission/vision cards, apply staggered delay and slide animations
                if (entry.target.classList.contains('card')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.15}s`; // Stagger delay
                    if (index % 2 === 0) { // Alternating slide direction
                        entry.target.classList.add('animate-slide-left');
                    } else {
                        entry.target.classList.add('animate-slide-right');
                    }
                } else if (entry.target.classList.contains('team-section')) {
                    entry.target.classList.add('animate-fade-in');
                }
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each element that should animate
    animatedElements.forEach(element => observer.observe(element));

    // Special handling for the intro section if you want it to fade in on page load
    const introSection = document.querySelector('.intro-section');
    if (introSection) {
        // You can make it instantly visible or add a very short delay
        setTimeout(() => {
            introSection.classList.add('is-visible');
        }, 100); // Small delay to ensure CSS is applied
    }
});