/**
 * animations.js - Animation System
 * 
 * Manages all scroll-based animations using Intersection Observer API.
 * 
 * @module core/animations
 */

import { APP_CONFIG, SELECTORS } from '../config/constants.js';

/**
 * Intersection Observer instance
 * @type {IntersectionObserver|null}
 */
let observer = null;

/**
 * Callback function for Intersection Observer
 * @param {IntersectionObserverEntry[]} entries
 */
function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}

/**
 * Observes elements with animation classes
 * @public
 */
export function observeAnimations() {
    if (!observer) {
        console.warn('⚠️ Animation system not initialized');
        return;
    }

    const animatedElements = document.querySelectorAll(SELECTORS.animatedElements);
    
    if (animatedElements.length === 0 && APP_CONFIG.enableDebugMode) {
        console.log('No animated elements found');
        return;
    }

    animatedElements.forEach(el => observer.observe(el));
    
    if (APP_CONFIG.enableDebugMode) {
        console.log(`👁️ Observing ${animatedElements.length} animated elements`);
    }
}

/**
 * Initializes the animation system
 * @public
 */
export function initAnimationSystem() {
    if (!APP_CONFIG.enableAnimations) {
        console.log('⏭️ Animations disabled');
        return;
    }

    const observerOptions = {
        threshold: APP_CONFIG.animationThreshold,
        rootMargin: APP_CONFIG.animationRootMargin,
    };

    observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    console.log('✅ Animation system initialized');
}

/**
 * Destroys the animation system
 * @public
 */
export function destroyAnimationSystem() {
    if (observer) {
        observer.disconnect();
        observer = null;
        console.log('🗑️ Animation system destroyed');
    }
}