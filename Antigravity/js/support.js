document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('support-contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Sending...';

            // Simulate API call
            setTimeout(() => {
                // Generate a random Enquiry ID
                const enqID = 'ENQ' + Math.floor(Math.random() * 900000 + 100000);

                // Redirect to confirmation page
                window.location.href = `support-confirmation.html?id=${enqID}`;
            }, 1500);
        });
    }
});
