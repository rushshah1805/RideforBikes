// Filter functionality for bikes page with radio buttons
document.addEventListener('DOMContentLoaded', function () {
    const bikeTypeRadios = document.querySelectorAll('input[name="bike-type"]');
    const priceRangeRadios = document.querySelectorAll('input[name="price-range"]');
    const bikeCards = document.querySelectorAll('.bike-card');

    let currentBikeType = 'all';
    let currentPriceRange = 'all';

    // Check URL parameters for initial filter
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get('type');
    if (typeParam && (typeParam === 'electric' || typeParam === 'petrol')) {
        currentBikeType = typeParam;
        // Update radio button selection
        const targetRadio = document.querySelector(`input[name="bike-type"][value="${typeParam}"]`);
        if (targetRadio) targetRadio.checked = true;
    }

    applyFilters();

    // Bike Type filter
    bikeTypeRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            currentBikeType = this.value;
            applyFilters();
        });
    });

    // Price range filter
    priceRangeRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            currentPriceRange = this.value;
            applyFilters();
        });
    });

    // Combined filter function
    function applyFilters() {
        bikeCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const price = parseInt(card.getAttribute('data-price'));

            let showByType = currentBikeType === 'all' || category === currentBikeType;
            let showByPrice = true;

            // Check price range
            if (currentPriceRange !== 'all') {
                const [minPrice, maxPrice] = currentPriceRange.split('-').map(Number);
                showByPrice = price >= minPrice && price <= maxPrice;
            }

            // Show card only if it matches both filters
            if (showByType && showByPrice) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.classList.add('hidden');
            }
        });
    }
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
