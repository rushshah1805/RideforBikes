document.addEventListener('DOMContentLoaded', function () {
    const bikeSelectorModal = document.getElementById('bikeSelectorModal');
    const bikeListContainer = document.getElementById('bikeListContainer');

    // State to track selected bikes in each slot
    // Load from localStorage if available
    let savedBikes = {};
    try {
        savedBikes = JSON.parse(localStorage.getItem('rideindia_compare_slots')) || {};
    } catch (e) {
        console.error("Error loading saved bikes", e);
    }

    const selectedBikes = {
        1: savedBikes[1] || null,
        2: savedBikes[2] || null,
        3: savedBikes[3] || null
    };

    let currentSlot = null;

    // Check Empty State
    function checkEmptyState() {
        const emptyState = document.getElementById('empty-state');
        if (!emptyState) return;

        const hasBikes = Object.values(selectedBikes).some(bike => bike !== null);

        if (hasBikes) {
            emptyState.classList.add('hidden');
        } else {
            emptyState.classList.remove('hidden');
        }
    }

    // Initial Render
    Object.keys(selectedBikes).forEach(slot => {
        if (selectedBikes[slot]) {
            renderSlot(slot, selectedBikes[slot]);
        }
    });
    checkEmptyState();

    // Save to LocalStorage
    function saveState() {
        localStorage.setItem('rideindia_compare_slots', JSON.stringify(selectedBikes));
        checkEmptyState();
    }


    // Open Modal
    window.openBikeSelector = function (slot) {
        console.log("Opening bike selector for slot:", slot);
        currentSlot = slot;

        if (!bikeSelectorModal || !bikeListContainer) {
            console.error("Modal elements not found!");
            // Try to find them again just in case
            const modal = document.getElementById('bikeSelectorModal');
            const container = document.getElementById('bikeListContainer');
            if (!modal || !container) return;
        }

        renderBikeList();
        bikeSelectorModal.classList.remove('hidden'); // Explicitly remove hidden
        bikeSelectorModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    // Close Modal
    window.closeBikeSelector = function () {
        if (bikeSelectorModal) {
            bikeSelectorModal.classList.remove('active');
            bikeSelectorModal.classList.add('hidden'); // Re-add hidden for safety
        }
        document.body.style.overflow = '';
        currentSlot = null;
    };

    // Close modal on outside click
    window.onclick = function (event) {
        if (event.target == bikeSelectorModal) {
            closeBikeSelector();
        }
    };

    // Render Bike List in Modal
    function renderBikeList() {
        if (typeof bikesData === 'undefined') {
            console.error("bikesData is not defined!");
            bikeListContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #ef4444;">Error: Bike data not loaded.</p>';
            return;
        }

        bikeListContainer.innerHTML = '';

        bikesData.forEach(bike => {
            // Check if bike is already selected in another slot
            const isSelected = Object.values(selectedBikes).some(selected => selected && selected.id === bike.id);

            if (!isSelected) {
                const card = document.createElement('div');
                card.className = 'bike-select-card';
                card.onclick = () => selectBike(bike);

                card.innerHTML = `
                    <div class="bike-select-img">
                        <img src="${bike.image}" alt="${bike.name}">
                    </div>
                    <h4>${bike.name}</h4>
                    <div class="price">${bike.price}</div>
                `;

                bikeListContainer.appendChild(card);
            }
        });

        if (bikeListContainer.children.length === 0) {
            bikeListContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">All bikes are already selected.</p>';
        }
    }

    // Select Bike
    function selectBike(bike) {
        if (currentSlot) {
            selectedBikes[currentSlot] = bike;
            saveState();
            renderSlot(currentSlot, bike);
            closeBikeSelector();
        }
    }

    // Remove Bike
    window.removeBike = function (slot) {
        selectedBikes[slot] = null;
        saveState();
        clearSlot(slot);
    };

    // Render Slot
    function renderSlot(slot, bike) {
        // Update Header
        const headerCell = document.querySelector(`.bike-slot[data-slot="${slot}"]`);
        headerCell.innerHTML = `
            <div class="selected-bike-header">
                <button class="btn-remove-bike" onclick="removeBike(${slot})" title="Remove Bike">
                    <i class="ri-close-line"></i>
                </button>
                <img src="${bike.image}" alt="${bike.name}" class="selected-bike-img">
                <div class="selected-bike-name">${bike.name}</div>
                <div class="price" style="font-size: 1rem;">${bike.price}</div>
            </div>
        `;

        // Update Data Rows
        const dataRows = document.querySelectorAll('tr[data-field]');
        dataRows.forEach(row => {
            const field = row.getAttribute('data-field');
            const cell = row.querySelector(`.slot-data[data-slot="${slot}"]`);

            let value = getValueByPath(bike, field);

            // Handle array values (like colors)
            if (Array.isArray(value)) {
                value = value.join(', ');
            }

            cell.textContent = value || '-';
        });

        highlightDifferences();
    }

    // Clear Slot
    function clearSlot(slot) {
        // Reset Header
        const headerCell = document.querySelector(`.bike-slot[data-slot="${slot}"]`);
        headerCell.innerHTML = `
            <div class="empty-slot">
                <button class="btn-add-bike" onclick="openBikeSelector(${slot})">
                    <i class="ri-add-line"></i>
                    <span>Add Bike</span>
                </button>
            </div>
        `;

        // Reset Data Rows
        const dataRows = document.querySelectorAll('tr[data-field]');
        dataRows.forEach(row => {
            const cell = row.querySelector(`.slot-data[data-slot="${slot}"]`);
            cell.textContent = '';
            cell.classList.remove('highlight');
        });

        highlightDifferences();
    }

    // Helper to get nested object property by string path
    function getValueByPath(obj, path) {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    }

    // Highlight differences (simple implementation)
    function highlightDifferences() {
        const dataRows = document.querySelectorAll('tr[data-field]');

        dataRows.forEach(row => {
            const cells = row.querySelectorAll('.slot-data');
            const values = [];

            // Collect values from non-empty slots
            cells.forEach((cell, index) => {
                const slot = index + 1;
                if (selectedBikes[slot]) {
                    values.push(cell.textContent);
                }
                cell.classList.remove('highlight');
            });

            // If we have at least 2 different values, highlight them
            if (values.length > 1) {
                const uniqueValues = new Set(values);
                if (uniqueValues.size > 1) {
                    // There are differences, highlight comparisons
                    // Logic can be improved to only highlight better specs, 
                    // but for now we just highlight that they are different content-wise visually if desired.
                    // Actually, for this task, standard compare usually just lists them. 
                    // I won't force bold styles unless it's a specific requirement.
                    // But I added a .highlight class in CSS, let's use it for row labels? 
                    // or maybe just leave it clean. 
                    // Let's NOT highlight for now to keep it clean unless user asked.
                    // I will leave this function empty effectively or just return.
                    return;
                }
            }
        });
    }
});
