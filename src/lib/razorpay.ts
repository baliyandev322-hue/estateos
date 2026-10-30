/**
 * Razorpay Standard Checkout SDK Loader
 * Loads https://checkout.razorpay.com/v1/checkout.js dynamically
 * Supports UPI (Google Pay, PhonePe, Paytm), Cards, NetBanking & Wallets
 */

declare global {
  interface Window {
    Razorpay?: any;
  }
}

export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      return resolve(false);
    }

    if (window.Razorpay) {
      return resolve(true);
    }

    // Check if script tag is already in DOM
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      console.warn('Razorpay Checkout SDK failed to load from https://checkout.razorpay.com/v1/checkout.js');
      resolve(false);
    };

    document.body.appendChild(script);
  });
}
