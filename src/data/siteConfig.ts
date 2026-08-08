// ==========================================================
// CENTRALIZED SITE CONFIGURATION
// Easily modify business details, WhatsApp number, logos, and prices here.
// ==========================================================

export const SITE_CONFIG = {
  name: 'HelloBajo Scooter Rental',
  shortName: 'HelloBajo',
  tagline: 'Hassle-Free Scooter Rental in Labuan Bajo',
  logo: '/logo.png', // Main logo image path (change in /public/logo.png or set custom path)
  
  // Contact & Social Details
  mainWebsite: 'https://hellobajo.com/blog',
  websiteDisplay: 'hellobajo.com/blog',
  whatsappNumber: '628170788181', // Format: 628170788181 (without + or spaces)
  whatsappDisplay: '+62 817-0788-181',
  email: 'hellobajo.go@gmail.com',
  location: 'Labuan Bajo, Flores, Nusa Tenggara Timur, Indonesia',
  instagram: '@hellobajo.go',

  // Delivery & Service Locations
  deliveryLocations: [
    'Komodo Airport (LBJ)',
    'Labuan Bajo Town Center',
    'Waecicu Area (Ayana, Meruorah, Sylvia)',
    'Pelabuhan / Marina Harbour',
    'Katamaran / La Prima Hotel',
    'Marriott Ta\'aktana Resort',
    'Golo Mori Road / Puncak Waringin',
    'Custom Hotel / Villa (Specify in WhatsApp)'
  ],

  // Payment Badges
  paymentBadges: [
    'Cash on Delivery',
    'Local Bank Transfer (BCA, Mandiri, BRI)',
    'Wise Transfer',
    'Revolut Accepted'
  ]
};
