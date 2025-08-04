document.addEventListener('DOMContentLoaded', () => {

    // --- Header Scroll Effects ---
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // When scrolled down 50px
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Active Navigation Link Highlighting (for desktop and mobile) ---
    const currentPath = window.location.pathname.split('/').pop(); // e.g., 'blog.html'

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

    // --- No specific scroll animations for individual blog posts are included
    //     in this version, but you can add them similar to how it was done
    //     in about.js if you wish.
});