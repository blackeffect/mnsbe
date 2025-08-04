document.addEventListener('DOMContentLoaded', () => {

    // --- Header Scroll Effects ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Active Navigation Link Highlighting ---
    const currentPath = window.location.pathname.split('/').pop();
    const highlightNavLink = () => {
        document.querySelectorAll('.nav-menu .nav-link, .mobile-nav-overlay .nav-menu-list a').forEach(link => {
            const linkHref = link.getAttribute('href').split('/').pop();
            if (linkHref === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };
    highlightNavLink();

    // --- Mobile Menu Toggle Logic ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const navLinks = document.getElementById('nav-links'); // Desktop nav menu container

    if (menuToggle && mobileNavOverlay) {
        menuToggle.addEventListener('click', () => {
            mobileNavOverlay.classList.toggle('active');
            menuToggle.classList.toggle('active');

            if (window.innerWidth <= 768) {
                if (mobileNavOverlay.classList.contains('active')) {
                    navLinks.style.display = 'none';
                } else {
                    navLinks.style.display = 'flex'; // This should be 'none' if it's mobile
                }
            }
        });

        mobileNavOverlay.querySelectorAll('.nav-menu-list a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNavOverlay.classList.remove('active');
                menuToggle.classList.remove('active');
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                mobileNavOverlay.classList.remove('active');
                menuToggle.classList.remove('active');
                navLinks.style.display = 'flex';
            } else {
                if (!mobileNavOverlay.classList.contains('active')) {
                    navLinks.style.display = 'none';
                }
            }
        });
    }

    // --- Volunteer Events Data ---
    const events = [
        {
            title: 'Tabling for Awareness',
            date: 'August 15, 2025',
            time: '10:00 AM - 12:00 PM',
            location: 'CSU Lobby',
            description: 'Help us spread the word about NSBE! Assist with setting up our information booth, distributing flyers, and engaging with prospective members. Great for those who love to meet new people!'
        },
        {
            title: 'Community Park Beautification',
            date: 'August 20, 2025',
            time: '1:00 PM - 3:00 PM',
            location: 'Riverside City Park',
            description: 'Join us for a hands-on community clean-up effort. We\'ll be collecting litter, light landscaping, and helping to beautify our local green spaces. Gloves and tools provided.'
        },
        {
            title: 'Mentorship Program Kick-off Support',
            date: 'September 5, 2025',
            time: '5:00 PM - 7:00 PM',
            location: 'Trafton Science Center Room 200',
            description: 'Assist with event registration, guiding attendees, and setting up refreshments for our new mentorship program launch event. A fantastic opportunity to meet incoming students and alumni mentors!'
        },
        {
            title: 'STEM Outreach at Local School',
            date: 'September 22, 2025',
            time: '9:00 AM - 1:00 PM',
            location: 'North Elementary School',
            description: 'Inspire young minds! Help facilitate interactive STEM activities and experiments for elementary school students. No prior experience needed, just enthusiasm for STEM!'
        }
    ];

    const eventsContainer = document.getElementById('events-container');
    const eventSelect = document.getElementById('event');

    // --- Render Events and Populate Dropdown ---
    const renderEvents = () => {
        eventsContainer.innerHTML = ''; // Clear existing content
        eventSelect.innerHTML = '<option value="">-- Select an event --</option>'; // Default empty option

        if (events.length === 0) {
            eventsContainer.innerHTML = '<p class="no-events-message">No volunteer opportunities are currently available. Please check back soon!</p>';
            eventSelect.setAttribute('disabled', 'true');
        } else {
            eventSelect.removeAttribute('disabled');
            events.forEach((event, index) => {
                // Display event card
                const eventCard = document.createElement('div');
                eventCard.className = 'event-card';
                eventCard.innerHTML = `
                    <h3>${event.title}</h3>
                    <p class="meta"><i class="far fa-calendar-alt"></i> ${event.date} | <i class="far fa-clock"></i> ${event.time} | <i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                    <p>${event.description}</p>
                `;
                eventsContainer.appendChild(eventCard);

                // Populate select options
                const option = document.createElement('option');
                option.value = index; // Use index to reference the event object
                option.textContent = `${event.title} (${event.date})`;
                eventSelect.appendChild(option);
            });
        }
    };

    renderEvents(); // Initial rendering of events

    // --- Form Handling and Validation ---
    const signupForm = document.getElementById('signup-form');
    const successModal = document.getElementById('success-modal');
    const errorModal = document.getElementById('error-modal');
    const errorModalMessage = document.getElementById('error-message-text');
    const modalCloseButtons = document.querySelectorAll('.close-button, .modal .btn');

    const showModal = (modalElement, message = '') => {
        if (message) {
            errorModalMessage.textContent = message;
        }
        modalElement.classList.add('visible');
    };

    window.closeModal = (modalId = 'success-modal') => { // Made it a global function for onclick in HTML
        const modalToClose = document.getElementById(modalId);
        if (modalToClose) {
            modalToClose.classList.remove('visible');
        }
    };

    modalCloseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const modalParent = e.target.closest('.modal');
            if (modalParent) {
                closeModal(modalParent.id);
            }
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) { // Click outside modal content
            closeModal(e.target.id);
        }
    });

    const validateForm = (form) => {
        let isValid = true;
        const requiredInputs = form.querySelectorAll('[required]');

        requiredInputs.forEach(input => {
            const parentGroup = input.closest('.form-group');
            const errorMessage = document.getElementById(`${input.id}-error`);

            if (!input.value.trim()) {
                parentGroup.classList.add('error');
                if (errorMessage) {
                    errorMessage.textContent = `${input.previousElementSibling.textContent.replace(':', '')} is required.`;
                }
                isValid = false;
            } else if (input.type === 'email' && !input.value.includes('@')) {
                parentGroup.classList.add('error');
                if (errorMessage) {
                    errorMessage.textContent = 'Please enter a valid email address.';
                }
                isValid = false;
            } else if (input.id === 'hours' && parseInt(input.value) < 1) {
                parentGroup.classList.add('error');
                if (errorMessage) {
                    errorMessage.textContent = 'Minimum 1 hour required.';
                }
                isValid = false;
            } else if (input.tagName === 'SELECT' && input.value === '') {
                parentGroup.classList.add('error');
                if (errorMessage) {
                    errorMessage.textContent = 'Please select an event.';
                }
                isValid = false;
            }
            else {
                parentGroup.classList.remove('error');
                if (errorMessage) {
                    errorMessage.textContent = '';
                }
            }
        });
        return isValid;
    };


    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        document.querySelectorAll('.form-group.error').forEach(el => el.classList.remove('error'));
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        if (validateForm(this)) {
            // In a real application, you would send this data to a server
            const formData = {
                eventIndex: this.event.value,
                eventName: events[this.event.value].title,
                name: this.name.value,
                email: this.email.value,
                phone: this.phone.value,
                hours: this.hours.value
            };
            console.log('Volunteer Signup Data:', formData);

            // Simulate API call success
            setTimeout(() => {
                showModal(successModal);
                signupForm.reset();
            }, 500);
            
        } else {
            // If validation fails, errors are already shown by validateForm
            showModal(errorModal, 'Please correct the errors in the form.');
        }
    });

    // Clear error messages on input change
    signupForm.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', () => {
            const parentGroup = input.closest('.form-group');
            if (parentGroup && parentGroup.classList.contains('error')) {
                parentGroup.classList.remove('error');
                const errorMessage = document.getElementById(`${input.id}-error`);
                if (errorMessage) {
                    errorMessage.textContent = '';
                }
            }
        });
    });


    // --- Motivational Quote Generator ---
    const quotes = [
        {
            quote: "The best way to find yourself is to lose yourself in the service of others.",
            author: "Mahatma Gandhi"
        },
        {
            quote: "No one has ever become poor by giving.",
            author: "Anne Frank"
        },
        {
            quote: "We rise by lifting others.",
            author: "Robert Ingersoll"
        },
        {
            quote: "Only a life lived for others is a life worthwhile.",
            author: "Albert Einstein"
        },
        {
            quote: "Volunteers do not necessarily have the time; they just have the heart.",
            author: "Elizabeth Andrew"
        },
        {
            quote: "Act as if what you do makes a difference. It does.",
            author: "William James"
        }
    ];

    const motivationalQuoteEl = document.getElementById('motivational-quote');
    const quoteAuthorEl = document.getElementById('quote-author');
    const nextQuoteBtn = document.getElementById('next-quote-btn');
    let currentQuoteIndex = 0;

    const displayQuote = (index) => {
        motivationalQuoteEl.textContent = `"${quotes[index].quote}"`;
        quoteAuthorEl.textContent = `— ${quotes[index].author}`;
    };

    const getRandomQuoteIndex = () => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * quotes.length);
        } while (newIndex === currentQuoteIndex && quotes.length > 1); // Ensure different quote if more than one
        return newIndex;
    };

    if (motivationalQuoteEl && quoteAuthorEl && nextQuoteBtn) {
        // Initial display
        displayQuote(currentQuoteIndex);

        nextQuoteBtn.addEventListener('click', () => {
            currentQuoteIndex = getRandomQuoteIndex();
            displayQuote(currentQuoteIndex);
        });
    }

});