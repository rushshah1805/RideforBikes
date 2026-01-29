// Filter functionality for bikes page with radio buttons
document.addEventListener('DOMContentLoaded', function () {
    const bikeTypeRadios = document.querySelectorAll('input[name="bike-type"]');
    const priceRangeRadios = document.querySelectorAll('input[name="price-range"]');
    const bikeCards = document.querySelectorAll('.bike-card');

    let currentBikeType = 'all';
    let currentPriceRange = 'all';

    // GTM: Push bikes page view event
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
        event: 'bikesPageView',
        pageType: 'bikesCatalog',
        totalBikes: bikeCards.length
    });

    // GTM: User Journey Start - User lands on bikes page
    dataLayer.push({
        event: 'userJourneyStart',
        journeyStep: 'bikes_catalog_entry',
        journeyAction: 'page_view',
        pageType: 'bikesCatalog',
        totalBikes: bikeCards.length,
        entrySource: document.referrer || 'direct'
    });

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
            
            // GTM: Track filter interaction
            const filterLabel = this.nextElementSibling.textContent.trim();
            dataLayer.push({
                event: 'bikeFilter',
                filterType: 'bikeType',
                filterValue: currentBikeType,
                filterLabel: filterLabel,
                filterAction: 'apply'
            });

            // GTM: User Journey Step - Filter applied
            dataLayer.push({
                event: 'userJourneyStep',
                journeyStep: 'filter_interaction',
                journeyAction: 'bike_type_filter',
                filterType: 'bikeType',
                filterValue: currentBikeType,
                filterLabel: filterLabel
            });

            // GTM: Filter Interaction Event
            dataLayer.push({
                event: 'filterInteraction',
                filterType: 'bikeType',
                filterValue: currentBikeType,
                filterAction: 'apply'
            });
            
            applyFilters();
        });
    });

    // Price range filter
    priceRangeRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            currentPriceRange = this.value;
            
            // GTM: Track filter interaction
            const filterLabel = this.nextElementSibling.textContent.trim();
            dataLayer.push({
                event: 'bikeFilter',
                filterType: 'priceRange',
                filterValue: currentPriceRange,
                filterLabel: filterLabel,
                filterAction: 'apply'
            });

            // GTM: User Journey Step - Price filter applied
            dataLayer.push({
                event: 'userJourneyStep',
                journeyStep: 'filter_interaction',
                journeyAction: 'price_range_filter',
                filterType: 'priceRange',
                filterValue: currentPriceRange,
                filterLabel: filterLabel
            });

            // GTM: Filter Interaction Event
            dataLayer.push({
                event: 'filterInteraction',
                filterType: 'priceRange',
                filterValue: currentPriceRange,
                filterAction: 'apply'
            });
            
            applyFilters();
        });
    });

    // GTM: Track bike details clicks
    document.querySelectorAll('.btn-details').forEach(button => {
        button.addEventListener('click', function(e) {
            const bikeCard = this.closest('.bike-card');
            const bikeName = bikeCard.querySelector('h3').textContent;
            const bikeCategory = bikeCard.getAttribute('data-category');
            const bikePrice = bikeCard.getAttribute('data-price');
            const bikeId = this.getAttribute('href').split('id=')[1];
            
            dataLayer.push({
                event: 'bikeDetailsClick',
                bikeName: bikeName,
                bikeCategory: bikeCategory,
                bikePrice: bikePrice,
                bikeId: bikeId,
                clickAction: 'viewDetails',
                clickUrl: this.getAttribute('href')
            });

            // GTM: User Journey Step - Bike details view
            dataLayer.push({
                event: 'userJourneyStep',
                journeyStep: 'bike_selection',
                journeyAction: 'view_details',
                bikeName: bikeName,
                bikeCategory: bikeCategory,
                bikePrice: bikePrice,
                bikeId: bikeId,
                destinationUrl: this.getAttribute('href')
            });

            // GTM: Bike Comparison Event
            dataLayer.push({
                event: 'bikeComparison',
                bikeName: bikeName,
                bikeCategory: bikeCategory,
                bikePrice: bikePrice,
                comparisonAction: 'view_details',
                bikeId: bikeId
            });
        });
    });

    // Combined filter function
    function applyFilters() {
        let visibleCount = 0;
        
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
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });
        
        // GTM: Track filter results
        dataLayer.push({
            event: 'filterResults',
            bikeTypeFilter: currentBikeType,
            priceRangeFilter: currentPriceRange,
            visibleBikes: visibleCount,
            totalBikes: bikeCards.length
        });

        // GTM: User Journey Step - Filter results displayed
        dataLayer.push({
            event: 'userJourneyStep',
            journeyStep: 'filter_results',
            journeyAction: 'results_displayed',
            bikeTypeFilter: currentBikeType,
            priceRangeFilter: currentPriceRange,
            visibleBikes: visibleCount,
            totalBikes: bikeCards.length,
            conversionRate: (visibleCount / bikeCards.length * 100).toFixed(1)
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
