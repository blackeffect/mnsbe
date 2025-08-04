/* // Slideshow Script (ensure this part is correct and working)
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Auto-advance every 4 seconds
setInterval(() => {
    plusSlides(1);
}, 4000);


// NEW: On-scroll reveal animations
document.addEventListener('DOMContentLoaded', () => {
    const missionSection = document.querySelector('.mission-statement');
    const onLeftSection = document.querySelector('.onTheLeftofMySection');
    const onRightSection = document.querySelector('.onTheRightOfMySection');

    const elementsToObserve = [];
    if (missionSection) elementsToObserve.push(missionSection);
    if (onLeftSection) elementsToObserve.push(onLeftSection);
    if (onRightSection) elementsToObserve.push(onRightSection);

    if (elementsToObserve.length === 0) {
        console.warn("No animatable elements found. Scroll animations won't apply.");
        return;
    }

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing after animation for one-time effect
            }
        });
    }, observerOptions);

    // Observe each relevant element
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});





 */







// Ensure the DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Slideshow Script ---
    let slideIndex = 1; // Keep track of the current slide
    showSlides(slideIndex); // Initialize the slideshow

    // Function to change slides by a given number (n)
    window.plusSlides = function(n) { // Make it global so HTML onclick can access it
        showSlides(slideIndex += n);
    };

    // Function to jump to a specific slide (n)
    window.currentSlide = function(n) { // Make it global so HTML onclick can access it
        showSlides(slideIndex = n);
    };

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("slides");
        let dots = document.getElementsByClassName("dot");

        // Loop back to the start if n is too high, or to the end if n is too low
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        // Hide all slides
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        // Deactivate all dots
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        // Display the current slide and activate the corresponding dot
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }

    // Auto-advance every 4 seconds for the main slideshow
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

    // The "Testimonials Carousel Script" section has been removed entirely.
    // This ensures that the CSS controls the layout of testimonial items,
    // allowing all of them to appear simultaneously.

}); // End of DOMContentLoaded