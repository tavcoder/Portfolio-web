/**
 * main.js - Application Entry Point
 * 
 * Orchestrates the initialization of all application modules.
 * 
 * @author Tania Arteaga
 * @version 1.0.0
 */

import { initRouter } from './core/router.js';
import { initLanguageSystem } from './core/i18n.js';
import { initAnimationSystem } from './core/animations.js';
import { APP_CONFIG } from './config/constants.js';

/**
 * Displays app info in console
 */
function displayAppInfo() {
  if (!APP_CONFIG.enableDebugMode) return;

  console.log(`
╔════════════════════════════════════════╗
║                                        ║
║   ${APP_CONFIG.name}    ║
║   Built with Vanilla JavaScript        ║
║   Author: ${APP_CONFIG.author}           ║
║                                        ║
╚════════════════════════════════════════╝
    `);
}

/**
 * Main application initializer
 */
async function initApp() {
  try {
    console.log('🚀 Initializing application...');
    displayAppInfo();

    // 1. Initialize i18n system
    initLanguageSystem(APP_CONFIG.defaultLanguage);

    // 2. Initialize animation system
    if (APP_CONFIG.enableAnimations) {
      initAnimationSystem();
    }

    // 3. Initialize router
    initRouter();

    console.log('✅ Application initialized successfully');

    if (APP_CONFIG.enableDebugMode) {
      const loadTime = performance.now();
      console.log(`⏱️ Init time: ${loadTime.toFixed(2)}ms`);
    }

  } catch (error) {
    console.error('❌ Critical initialization error:', error);
    showErrorScreen(error);
  }
}

/**
 * Shows error screen
 * @param {Error} error
 */
function showErrorScreen(error) {
  const content = document.querySelector('#content__page');

  if (!content) {
    document.body.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:system-ui;text-align:center;padding:20px;">
                <h1 style="color:#e74c3c;margin-bottom:20px;">⚠️ Application Error</h1>
                <p style="color:#555;margin-bottom:30px;">The application failed to load.</p>
                <button onclick="window.location.reload()" style="background:#3498db;color:white;border:none;padding:12px 24px;border-radius:6px;font-size:16px;cursor:pointer;">Reload</button>
            </div>
        `;
    return;
  }

  content.innerHTML = `
        <div class="error-screen" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;text-align:center;padding:40px 20px;">
            <h1 style="color:#e74c3c;margin-bottom:20px;">⚠️ Oops! Something went wrong</h1>
            <p style="color:#555;margin-bottom:30px;">Please try reloading the page.</p>
            <button onclick="window.location.reload()" class="primaryBtn">Reload Page</button>
        </div>
    `;
}

/**
 * Global error handlers
 */
window.addEventListener('error', (event) => {
  console.error('🔥 Unhandled error:', event.error);
  if (APP_CONFIG.enableDebugMode) {
    showErrorScreen(event.error);
  }
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('🔥 Unhandled promise rejection:', event.reason);
  if (APP_CONFIG.enableDebugMode) {
    showErrorScreen(new Error(event.reason));
  }
});

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);

// Debug mode utilities
if (APP_CONFIG.enableDebugMode) {
  window.__APP_CONFIG__ = APP_CONFIG;
  console.log('🐛 Debug mode enabled. Access config via window.__APP_CONFIG__');
}