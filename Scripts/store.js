document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menuIcon');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const navMenu = document.getElementById('navMenu'); // Desktop nav menu

    if (menuIcon && mobileNavOverlay) {
        menuIcon.addEventListener('click', function() {
            mobileNavOverlay.classList.toggle('active');
            menuIcon.classList.toggle('active'); // Optional: Add a class for animating the icon

            // Hide/show desktop menu on mobile when mobile menu is toggled
            if (window.innerWidth <= 768) {
                if (mobileNavOverlay.classList.contains('active')) {
                    navMenu.style.display = 'none'; // Hide desktop menu when mobile overlay is active
                } else {
                    // This else block is for when the mobile overlay is *closing*
                    // If you want desktop menu always hidden on mobile, you might not need this.
                    // For now, it keeps desktop nav hidden on mobile unless specifically in desktop view.
                }
            }
        });

        // Close mobile menu when a link is clicked
        mobileNavOverlay.querySelectorAll('.nav-menu-list a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNavOverlay.classList.remove('active');
                menuIcon.classList.remove('active');
                // Ensure desktop menu remains hidden if still in mobile view after click
                if (window.innerWidth <= 768) {
                    navMenu.style.display = 'none';
                }
            });
        });

        // Handle window resize to ensure correct menu display
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileNavOverlay.classList.remove('active');
                menuIcon.classList.remove('active');
                navMenu.style.display = 'flex'; // Ensure desktop menu is visible
            } else {
                // On resize down to mobile, if mobile overlay is not active, hide desktop nav
                if (!mobileNavOverlay.classList.contains('active')) {
                   navMenu.style.display = 'none'; // Hide desktop nav on mobile by default
                }
            }
        });
    }

    // Cart count functionality (basic, non-persistent)
    function updateCartCount(count) {
        document.querySelectorAll('.cart-count').forEach(element => {
            element.textContent = count;
        });
    }

    // Initialize cart count
    let currentCartItems = 0; // Or retrieve from localStorage if you implement persistence
    updateCartCount(currentCartItems);

    // Add to cart button functionality
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            currentCartItems++;
            updateCartCount(currentCartItems);
            // In a real application, you'd add the item to a cart array/object
            console.log(`Item added to cart! Current items: ${currentCartItems}`);
            // alert('Item added to cart!'); // Optional: for immediate feedback
        });
    });
});