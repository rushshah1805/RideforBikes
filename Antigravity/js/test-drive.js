document.addEventListener('DOMContentLoaded', function () {
    const bikeSelect = document.getElementById('bike-select');
    const dealerSelect = document.getElementById('dealer-select');
    const testDriveForm = document.getElementById('test-drive-form');

    // Populate Bikes
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    if (typeof bikesData !== 'undefined') {
        bikesData.forEach(bike => {
            const option = document.createElement('option');
            option.value = bike.id;
            option.textContent = bike.name;
            bikeSelect.appendChild(option);
        });
    }

    // Populate Dealers
    if (typeof dealersData !== 'undefined') {
        dealersData.forEach(dealer => {
            const option = document.createElement('option');
            option.value = dealer.id;
            // Show Name and City
            const city = dealer.address.split(',')[1].trim();
            option.textContent = `${dealer.name} (${city})`;
            dealerSelect.appendChild(option);
        });
    }

    // Handle Form Submission
    testDriveForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Simulate API call
        const submitBtn = testDriveForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Booking...';
        submitBtn.disabled = true;

        setTimeout(() => {
            const confirmationID = 'RID' + Math.floor(Math.random() * 900000 + 100000);

            // Redirect to confirmation page
            window.location.href = `booking-confirmation.html?id=${confirmationID}`;
        }, 1500);
    });
});
