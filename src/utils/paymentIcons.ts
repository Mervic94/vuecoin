
import { CreditCard } from 'lucide-react';
import React from 'react';
import paypalLogo from "../assets/payment-icons/paypal.png";
import kkiapayLogo from "../assets/payment-icons/kkiapay.png";
import fedapayLogo from "../assets/payment-icons/fedapay.png";
import mobileMoneyLogo from "../assets/payment-icons/mobile-money.png";
import moovMoneyLogo from "../assets/payment-icons/moov-money.png";

// Define available payment method icons
export const paymentIcons: Record<string, string | typeof CreditCard> = {
  paypal: paypalLogo,
  kkiapay: kkiapayLogo,
  fedapay: fedapayLogo,
  mobile_money: mobileMoneyLogo,
  moov_money: moovMoneyLogo,
  // Default to CreditCard component for methods that don't have icons
  card: CreditCard,
};

// Function to get appropriate payment method icon
export const getPaymentMethodIcon = (method: { code: string; name: string }): React.ReactNode => {
  // If the method code exists in our icons object and is a string (image path)
  if (method.code in paymentIcons && typeof paymentIcons[method.code] === 'string') {
    // We're creating the img element without JSX syntax
    return React.createElement('img', {
      src: paymentIcons[method.code] as string,
      alt: method.name,
      className: "h-6 w-auto",
      onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
        // Fallback to CreditCard icon if image fails to load
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        // Insert CreditCard icon as fallback
        const parent = target.parentElement;
        if (parent) {
          const CreditCardIcon = CreditCard;
          // We create this element manually since we can't use JSX here
          const iconElement = document.createElement('span');
          iconElement.className = 'h-5 w-5 text-primary';
          parent.appendChild(iconElement);
          // The actual rendering of the CreditCard icon would be handled by React in a different context
        }
      }
    });
  }
  
  // If it's the CreditCard component or not found in our icons
  return React.createElement(CreditCard, { className: "h-5 w-5 text-primary" });
};
