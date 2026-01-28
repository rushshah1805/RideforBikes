document.addEventListener('DOMContentLoaded', function () {
    // Get Bike ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const bikeId = urlParams.get('id');

    const loadingSpinner = document.getElementById('loading-spinner');
    const errorMessage = document.getElementById('error-message');
    const bikeContent = document.getElementById('bike-content');

    // Simulate loading for better UX
    setTimeout(() => {
        if (!bikeId) {
            showError();
            return;
        }

        const bike = bikesData.find(b => b.id === bikeId);

        if (bike) {
            renderBikeDetails(bike);
            renderSimilarBikes(bike);
            loadingSpinner.classList.add('hidden');
            bikeContent.classList.remove('hidden');
        } else {
            showError();
        }
    }, 500);

    function showError() {
        loadingSpinner.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }

    function renderBikeDetails(bike) {
        // Page Title
        document.title = `${bike.name} - RideIndia`;

        // Hero Section
        document.getElementById('bike-image').src = bike.image;
        document.getElementById('bike-image').alt = bike.name;
        document.getElementById('bike-name').textContent = bike.name;
        document.getElementById('bike-price').textContent = bike.price;
        document.getElementById('bike-category').textContent = bike.category;

        // Tagline (mock data if not present)
        const tagline = document.getElementById('bike-tagline');
        // Add tagline property if missing in data or use existing
        tagline.textContent = bike.tagline || 'Experience the thrill of the ride';

        // Type Badge
        const typeBadge = document.getElementById('bike-type-badge');
        typeBadge.textContent = bike.type;
        typeBadge.className = `badge badge-${bike.type.toLowerCase()}`;

        // Top Stats
        document.getElementById('spec-power').textContent = bike.specs.power;
        document.getElementById('spec-top-speed').textContent = bike.specs.topSpeed;
        document.getElementById('spec-range').textContent = bike.specs.range;

        // Dynamic Label for Range/Mileage
        const rangeLabel = document.getElementById('range-label');
        if (bike.type.toLowerCase() === 'electric') {
            rangeLabel.textContent = 'Range';
        } else {
            rangeLabel.textContent = 'Mileage';
        }

        // Features Checklist (Hero)
        const featuresList = document.getElementById('features-list');
        featuresList.innerHTML = '';
        // Show first 4 features in hero
        const heroFeatures = bike.features.slice(0, 4);
        heroFeatures.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });

        // Colors
        const colorsContainer = document.getElementById('colors-container');
        colorsContainer.innerHTML = '';
        bike.specs.colors.forEach(color => {
            const colorOption = document.createElement('div');
            colorOption.className = 'color-option';

            const dot = document.createElement('div');
            dot.className = 'color-dot';
            dot.style.backgroundColor = getColorCode(color);

            const name = document.createElement('span');
            name.className = 'color-name';
            name.textContent = color;

            colorOption.appendChild(dot);
            colorOption.appendChild(name);
            colorsContainer.appendChild(colorOption);
        });

        // Technical Specs Table matching new design
        // Some ids might need to be adjusted if created differently in HTML
        setSafeText('detail-power-row', bike.type === 'Electric' ? 'Electric Motor' : 'Single Cylinder, 4-Stroke');
        setSafeText('detail-power', bike.specs.power);
        setSafeText('detail-top-speed', bike.specs.topSpeed);
        setSafeText('detail-range', bike.specs.range);
        setSafeText('detail-transmission', bike.specs.transmission);
        setSafeText('detail-brakes', bike.specs.brakes);
        setSafeText('detail-weight', bike.specs.weight);

        // Equipment Grid
        const equipmentGrid = document.getElementById('equipment-grid');
        equipmentGrid.innerHTML = '';
        // Use all features for equipment grid
        bike.features.forEach(feature => {
            const item = document.createElement('div');
            item.className = 'equipment-item';
            item.innerHTML = `<i class="ri-check-line"></i> <span>${feature}</span>`;
            equipmentGrid.appendChild(item);
        });

        // Add to Compare Event
        const compareBtn = document.getElementById('compare-btn');
        if (compareBtn) {
            compareBtn.onclick = () => addToCompare(bike);
        }
    }

    function renderSimilarBikes(currentBike) {
        const grid = document.getElementById('similar-bikes-grid');
        grid.innerHTML = '';

        // Filter: Same category or type, exclude current bike
        let similar = bikesData.filter(b =>
            b.id !== currentBike.id &&
            (b.category === currentBike.category || b.type === currentBike.type)
        );

        // Fallback: If not enough similar, take random others
        if (similar.length < 3) {
            const others = bikesData.filter(b => b.id !== currentBike.id && !similar.includes(b));
            similar = [...similar, ...others];
        }

        // Limit to 3 display items
        const toShow = similar.slice(0, 3);

        toShow.forEach(bike => {
            const card = document.createElement('div');
            card.className = 'bike-card';
            // Simple card markup similar to index page
            card.innerHTML = `
                <div class="bike-image" style="height: 200px;">
                    <img src="${bike.image}" alt="${bike.name}">
                    <span class="badge badge-${bike.type.toLowerCase()}">${bike.type}</span>
                </div>
                <div class="bike-content">
                    <h3>${bike.name}</h3>
                    <p class="bike-tagline" style="margin-bottom: 10px; font-size: 0.85rem;">${bike.category}</p>
                    <div class="bike-footer">
                        <div class="price-section">
                            <span class="price" style="font-size: 1.25rem;">${bike.price}</span>
                        </div>
                        <a href="bike-details.html?id=${bike.id}" class="btn-details">View Details</a>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    function setSafeText(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    function getColorCode(colorName) {
        const map = {
            'Red': '#ef4444',
            'Racing Red': '#ff0000',
            'Black': '#1a1a1a',
            'Thunder Black': '#000000',
            'Blue': '#2563eb',
            'White': '#ffffff',
            'Pearl White': '#f8f9fa',
            'Green': '#10b981',
            'Silver': '#9ca3af',
            'Chrome': '#e5e7eb',
            'Maroon': '#800000',
            'Lime Green': '#32cd32',
            'Ebony': '#555555',
            'Grey': '#6b7280',
            'Matte Black': '#333333'
        };
        return map[colorName] || '#cccccc';
    }
    function addToCompare(bike) {
        // 1. Get current slots from localStorage
        let slots = JSON.parse(localStorage.getItem('rideindia_compare_slots')) || { 1: null, 2: null, 3: null };

        // 2. Check if bike is already added
        const isAlreadyAdded = Object.values(slots).some(slotBike => slotBike && slotBike.id === bike.id);

        if (isAlreadyAdded) {
            window.location.href = 'compare.html';
            return;
        }

        // 3. Find first empty slot
        let emptySlot = null;
        for (let i = 1; i <= 3; i++) {
            if (!slots[i]) {
                emptySlot = i;
                break;
            }
        }

        // 4. Add bike if slot available
        if (emptySlot) {
            slots[emptySlot] = bike;
            localStorage.setItem('rideindia_compare_slots', JSON.stringify(slots));
            window.location.href = 'compare.html';
        } else {
            alert('Comparison slots are full. Please remove a bike to add a new one.');
            window.location.href = 'compare.html';
        }
    }

    // Expose to window for button onclick
    window.addToCompare = addToCompare;
});
