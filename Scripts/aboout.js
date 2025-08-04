document.addEventListener('DOMContentLoaded', () => {
    // Get the button and the additional text element
    const readMoreBtn = document.getElementById('readMoreBtn');
    const additionalTeamInfo = document.getElementById('additional-team-info');

    // Check if both elements exist on the page
    if (readMoreBtn && additionalTeamInfo) {
        // Add a click event listener to the button
        readMoreBtn.addEventListener('click', () => {
            // Toggle the 'hidden-text' class
            additionalTeamInfo.classList.toggle('hidden-text');

            // Change the button text based on visibility
            if (additionalTeamInfo.classList.contains('hidden-text')) {
                readMoreBtn.textContent = 'Read More';
            } else {
                readMoreBtn.textContent = 'Show Less';
            }
        });
    } else {
        console.warn("Read More button or additional text element not found. Read More functionality will not work.");
    }
});