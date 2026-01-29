// Homepage GTM Tracking
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    
    // GTM: Homepage view event
    dataLayer.push({
        event: 'homepageView',
        pageType: 'homepage',
        pageTitle: 'RideIndia - Ride Into The Future',
        totalFeaturedBikes: document.querySelectorAll('.models-grid .bike-card').length
    });

    // GTM: Track navigation clicks
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            const linkText = this.textContent.trim();
            const linkHref = this.getAttribute('href');
            
            dataLayer.push({
                event: 'navigationClick',
                navigationType: 'mainNav',
                linkText: linkText,
                linkUrl: linkHref,
                destinationPage: linkHref.replace('.html', '')
            });
        });
    });

    // GTM: Track hero button clicks
    document.querySelectorAll('.hero-buttons .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            const buttonType = this.classList.contains('btn-primary') ? 'primary' : 'secondary';
            const buttonUrl = this.getAttribute('href');
            
            dataLayer.push({
                event: 'heroButtonClick',
                buttonType: buttonType,
                buttonText: buttonText,
                destinationUrl: buttonUrl,
                section: 'hero'
            });
        });
    });

    // GTM: Track feature card interactions
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', function(e) {
            const featureTitle = this.querySelector('h3').textContent;
            const featureDescription = this.querySelector('p').textContent;
            
            dataLayer.push({
                event: 'featureCardClick',
                featureTitle: featureTitle,
                featureDescription: featureDescription.substring(0, 50) + '...',
                section: 'features'
            });
        });
    });

    // GTM: Track featured bike card clicks
    document.querySelectorAll('.models-grid .bike-card').forEach(card => {
        const viewDetailsBtn = card.querySelector('.btn-details');
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', function(e) {
                const bikeName = card.querySelector('h3').textContent;
                const bikeCategory = card.querySelector('.badge').textContent;
                const bikePrice = card.querySelector('.price').textContent;
                const bikeSpec = card.querySelector('.spec').textContent;
                const bikeUrl = this.getAttribute('href');
                const bikeId = bikeUrl.split('id=')[1];
                
                dataLayer.push({
                    event: 'featuredBikeClick',
                    bikeName: bikeName,
                    bikeCategory: bikeCategory,
                    bikePrice: bikePrice,
                    bikeSpec: bikeSpec,
                    bikeId: bikeId,
                    destinationUrl: bikeUrl,
                    section: 'featuredModels',
                    clickAction: 'viewDetails'
                });
            });
        }
    });

    // GTM: Track "View All Bikes" link clicks
    document.querySelectorAll('.view-all-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const linkText = this.textContent.trim();
            const linkUrl = this.getAttribute('href');
            
            dataLayer.push({
                event: 'viewAllBikesClick',
                linkText: linkText,
                destinationUrl: linkUrl,
                section: 'featuredModels'
            });
        });
    });

    // GTM: Track CTA section button clicks
    document.querySelectorAll('.cta-section .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            const buttonUrl = this.getAttribute('href');
            
            dataLayer.push({
                event: 'ctaButtonClick',
                buttonText: buttonText,
                destinationUrl: buttonUrl,
                section: 'cta',
                action: 'bookTestDrive'
            });
        });
    });

    // GTM: Track footer link clicks
    document.querySelectorAll('.footer-links a, .social-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            const linkText = this.textContent.trim();
            const linkUrl = this.getAttribute('href');
            const linkType = this.closest('.social-links') ? 'social' : 'footer';
            const ariaLabel = this.getAttribute('aria-label') || '';
            
            dataLayer.push({
                event: 'footerLinkClick',
                linkType: linkType,
                linkText: linkText || ariaLabel,
                linkUrl: linkUrl,
                section: 'footer'
            });
        });
    });

    // GTM: Track logo clicks
    document.querySelectorAll('.logo').forEach(logo => {
        logo.addEventListener('click', function(e) {
            dataLayer.push({
                event: 'logoClick',
                destinationUrl: this.getAttribute('href'),
                section: 'header'
            });
        });
    });

    // GTM: Track scroll depth (25%, 50%, 75%, 100%)
    let maxScrollDepth = 0;
    const scrollDepths = [25, 50, 75, 90];
    
    function checkScrollDepth() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = window.scrollY;
        const scrollPercentage = Math.round((scrollPosition / scrollHeight) * 100);
        
        scrollDepths.forEach(depth => {
            if (scrollPercentage >= depth && maxScrollDepth < depth) {
                maxScrollDepth = depth;
                dataLayer.push({
                    event: 'scrollDepth',
                    scrollPercentage: depth,
                    pageType: 'homepage'
                });
            }
        });
    }
    
    window.addEventListener('scroll', checkScrollDepth);

    // GTM: Track time on page (every 30 seconds)
    let timeOnPage = 0;
    setInterval(() => {
        timeOnPage += 30;
        dataLayer.push({
            event: 'timeOnPage',
            timeSpent: timeOnPage,
            pageType: 'homepage'
        });
    }, 30000);

    // GTM: Track page visibility changes (user leaves/returns)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            dataLayer.push({
                event: 'pageVisibilityChange',
                visibility: 'hidden',
                timeOnPage: timeOnPage,
                pageType: 'homepage'
            });
        } else {
            dataLayer.push({
                event: 'pageVisibilityChange',
                visibility: 'visible',
                pageType: 'homepage'
            });
        }
    });
});
