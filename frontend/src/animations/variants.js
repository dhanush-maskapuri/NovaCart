/**
 * Framer Motion Animation Variants
 * Reusable animation definitions for consistent component transitions throughout ShopSphere.
 */

// Simple Fade In animation
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.3, ease: 'easeOut' } 
  },
  exit: { 
    opacity: 0, 
    transition: { duration: 0.2, ease: 'easeIn' } 
  }
};

// Slide Down animation (ideal for top navbars and dropdowns)
export const slideDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.3, ease: 'easeOut' } 
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    transition: { duration: 0.2, ease: 'easeIn' } 
  }
};

// Mobile Navigation Drawer Slide from right
export const drawerSlide = {
  hidden: { opacity: 0, x: '100%' },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { type: 'spring', damping: 25, stiffness: 200 } 
  },
  exit: { 
    opacity: 0, 
    x: '100%', 
    transition: { duration: 0.2, ease: 'easeInOut' } 
  }
};

// Scale Up animation (ideal for modals, dialogs, popups)
export const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.25, ease: 'easeOut' } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    transition: { duration: 0.2, ease: 'easeIn' } 
  }
};

// Staggered Container for child elements
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

// Card Hover Animation settings
export const cardHover = {
  rest: { y: 0, scale: 1, boxShadow: '0px 1px 3px rgba(0,0,0,0.1)' },
  hover: { 
    y: -4, 
    scale: 1.01,
    transition: { duration: 0.2, ease: 'easeOut' } 
  }
};

// Button interaction presets
export const buttonTap = {
  hover: { scale: 1.02 },
  tap: { scale: 0.97 }
};
