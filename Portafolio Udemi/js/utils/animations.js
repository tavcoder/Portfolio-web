/**
 * Custom scroll animations using IntersectionObserver.
 */
document.addEventListener('DOMContentLoaded', function() {
    /**
     * Options for the Intersection Observer.
     * @type {Object}
     */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    /**
     * Intersection Observer for triggering animations on scroll.
     * @type {IntersectionObserver}
     */
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('[class*="animate-"]');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});