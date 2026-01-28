const bikesData = [
    {
        id: 'thunder-250',
        name: 'Thunder 250',
        price: '₹1,85,000',
        type: 'Petrol',
        category: 'Street Fighter',
        image: 'images/thunder-250.png',
        specs: {
            power: '25 BHP',
            topSpeed: '140 km/h',
            range: '35 kmpl',
            weight: '160 kg',
            transmission: '6-Speed',
            brakes: 'Dual Channel ABS',
            colors: ['Red', 'Black', 'Blue']
        },
        features: ['LED Headlamp', 'Digital Console', 'Slipper Clutch']
    },
    {
        id: 'ecoride-pro',
        name: 'EcoRide Pro',
        price: '₹1,45,000',
        type: 'Electric',
        category: 'Commuter',
        image: 'images/ecoride-pro.png',
        specs: {
            power: '6 kW',
            topSpeed: '85 km/h',
            range: '120 km',
            weight: '110 kg',
            transmission: 'Automatic',
            brakes: 'Disc (Front/Rear)',
            colors: ['White', 'Green', 'Silver']
        },
        features: ['Regenerative Braking', 'Mobile App Connectivity', 'Fast Charging']
    },
    {
        id: 'cruiser-elite',
        name: 'Cruiser Elite',
        price: '₹2,25,000',
        type: 'Petrol',
        category: 'Cruiser',
        image: 'images/cruiser-elite.png',
        specs: {
            power: '32 BHP',
            topSpeed: '130 km/h',
            range: '30 kmpl',
            weight: '185 kg',
            transmission: '5-Speed',
            brakes: 'Dual Channel ABS',
            colors: ['Black', 'Chrome', 'Maroon']
        },
        features: ['Comfortable Seating', 'Windshield', 'USB Charging']
    },
    {
        id: 'ninja-300',
        name: 'Ninja 300',
        price: '₹3,15,000',
        type: 'Petrol',
        category: 'Sports',
        image: 'images/ninja-300.png',
        specs: {
            power: '39 BHP',
            topSpeed: '170 km/h',
            range: '25 kmpl',
            weight: '179 kg',
            transmission: '6-Speed',
            brakes: 'Dual Channel ABS',
            colors: ['Lime Green', 'Ebony']
        },
        features: ['Liquid Cooled', 'Assist & Slipper Clutch', 'Twin Cylinder']
    },
    {
        id: 'city-rider-150',
        name: 'City Rider 150',
        price: '₹95,000',
        type: 'Petrol',
        category: 'Commuter',
        image: 'images/city-rider.png',
        specs: {
            power: '14 BHP',
            topSpeed: '110 km/h',
            range: '45 kmpl',
            weight: '135 kg',
            transmission: '5-Speed',
            brakes: 'Disc (Front)',
            colors: ['Red', 'Blue', 'Grey']
        },
        features: ['High Mileage', 'Low Maintenance', 'Comfortable Suspension']
    },
    {
        id: 'ecoride-max',
        name: 'EcoRide Max',
        price: '₹1,85,000',
        type: 'Electric',
        category: 'Performance Scooter',
        image: 'images/ecoride-pro.png', // Reusing pro image as per previous page
        specs: {
            power: '8 kW',
            topSpeed: '100 km/h',
            range: '150 km',
            weight: '125 kg',
            transmission: 'Automatic',
            brakes: 'Disc (Both)',
            colors: ['Matte Black', 'Pearl White']
        },
        features: ['Hyper Mode', 'Touchscreen Dashboard', 'Cruise Control']
    }
];
