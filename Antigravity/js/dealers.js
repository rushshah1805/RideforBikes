document.addEventListener('DOMContentLoaded', function () {
    const dealerSearch = document.getElementById('dealer-search');
    const stateFilter = document.getElementById('state-filter');
    const dealersListContainer = document.getElementById('dealers-list-container');
    const dealerCountHelper = document.getElementById('dealer-count');
    const mapCountHelper = document.getElementById('map-count');

    // Populate States Dropdown
    const uniqueStates = [...new Set(dealersData.map(d => d.state))].sort();
    uniqueStates.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateFilter.appendChild(option);
    });

    // Initial Render
    renderDealers(dealersData);

    // Event Listeners
    dealerSearch.addEventListener('input', filterDealers);
    stateFilter.addEventListener('change', filterDealers);

    function filterDealers() {
        const searchTerm = dealerSearch.value.toLowerCase();
        const selectedState = stateFilter.value;

        const filtered = dealersData.filter(dealer => {
            const matchesSearch = dealer.name.toLowerCase().includes(searchTerm) ||
                dealer.address.toLowerCase().includes(searchTerm);
            const matchesState = selectedState === '' || dealer.state === selectedState;

            return matchesSearch && matchesState;
        });

        renderDealers(filtered);
    }

    function renderDealers(dealers) {
        dealersListContainer.innerHTML = '';
        dealerCountHelper.textContent = dealers.length;
        mapCountHelper.textContent = dealers.length;

        if (dealers.length === 0) {
            dealersListContainer.innerHTML = `
                <div class="empty-results">
                    <p>No dealers found matching your criteria.</p>
                </div>
            `;
            return;
        }

        dealers.forEach(dealer => {
            const card = document.createElement('div');
            card.className = 'dealer-card';

            card.innerHTML = `
                <h3>${dealer.name}</h3>
                <div class="dealer-info">
                    <div class="dealer-info-item">
                        <i class="ri-map-pin-line"></i>
                        <span>${dealer.address}</span>
                    </div>
                    <div class="dealer-info-item">
                        <i class="ri-phone-line"></i>
                        <span>${dealer.phone}</span>
                    </div>
                    <div class="dealer-info-item">
                        <i class="ri-mail-line"></i>
                        <span>${dealer.email}</span>
                    </div>
                </div>
                <div class="dealer-actions">
                    <a href="https://maps.google.com/?q=${dealer.lat},${dealer.lng}" target="_blank" class="btn-primary-small">Get Directions</a>
                    <a href="tel:${dealer.phone}" class="btn-outline-small">Call Now</a>
                </div>
            `;

            dealersListContainer.appendChild(card);
        });

        // Update Map Markers
        renderMapMarkers(dealers);
    }

    function renderMapMarkers(dealers) {
        const markersContainer = document.querySelector('.map-markers');
        markersContainer.innerHTML = '';

        if (dealers.length === 0) return;

        // Simple projection bounds (approx India bounds)
        // Lat: 8 (South) to 37 (North)
        // Lng: 68 (West) to 97 (East)
        // Inverted Y (Map Top = High Lat)

        const minLat = 8;
        const maxLat = 37;
        const minLng = 68;
        const maxLng = 97;

        dealers.forEach((dealer, index) => {
            const marker = document.createElement('span');
            marker.className = 'marker';

            // Calculate % position
            // Top: (MaxLat - Lat) / (MaxLat - MinLat) * 100
            // Left: (Lng - MinLng) / (MaxLng - MinLng) * 100

            const top = ((maxLat - dealer.lat) / (maxLat - minLat)) * 100;
            const left = ((dealer.lng - minLng) / (maxLng - minLng)) * 100;

            marker.style.top = `${Math.max(10, Math.min(90, top))}%`;
            marker.style.left = `${Math.max(10, Math.min(90, left))}%`;

            // Use index + 1 for number, or special icon for single result
            marker.textContent = index + 1;

            // Highlight marker on hover of dealer card corresponding to this index could be a nice addition later

            markersContainer.appendChild(marker);
        });
    }
});
