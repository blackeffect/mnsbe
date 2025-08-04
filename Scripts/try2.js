// Ensure the DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Slideshow Script ---
    let slideIndex = 1;
    showSlides(slideIndex);

    window.plusSlides = function(n) {
        showSlides(slideIndex += n);
    };

    window.currentSlide = function(n) {
        showSlides(slideIndex = n);
    };

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("slides");
        let dots = document.getElementsByClassName("dot");

        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }

    let autoSlideshowInterval = setInterval(() => {
        plusSlides(1);
    }, 4000);


    // --- On-scroll reveal animations (Intersection Observer) ---
    const missionSection = document.querySelector('.mission-statement');
    const onLeftSection = document.querySelector('.onTheLeftofMySection');
    const onRightSection = document.querySelector('.onTheRightOfMySection');
    const testimonialsSectionForObserver = document.querySelector('.testimonials');

    const elementsToObserve = [];
    if (missionSection) elementsToObserve.push(missionSection);
    if (onLeftSection) elementsToObserve.push(onLeftSection);
    if (onRightSection) elementsToObserve.push(onRightSection);
    if (testimonialsSectionForObserver) elementsToObserve.push(testimonialsSectionForObserver);

    if (elementsToObserve.length === 0) {
        console.warn("No animatable elements found. Scroll animations won't apply.");
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elementsToObserve.forEach(element => {
        observer.observe(element);
    });

    // --- Responsive Navigation Toggle Script ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelector('.nav-links'); // Get the ul element

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });

        // Optional: Close menu when a link is clicked (for single-page navigation)
        if (navLinks) {
            navLinks.addEventListener('click', (event) => {
                if (event.target.tagName === 'A') { // Check if a link was clicked
                    mainNav.classList.remove('active'); // Close the menu
                }
            });
        }
    } else {
        console.warn("Menu toggle or main navigation not found. Responsive navigation script will not run.");
    }

}); // End of DOMContentLoaded