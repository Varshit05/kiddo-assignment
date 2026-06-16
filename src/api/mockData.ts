import { SDUIPayload, SDUIProduct } from '../types/sdui.types';

// Helper to generate mock products
const generateProducts = (category: string, count: number, startId = 1): SDUIProduct[] => {
  return Array.from({ length: count }).map((_, index) => {
    const id = `${category}_prod_${startId + index}`;
    return {
      id,
      title: `${category} Item #${startId + index}`,
      price: Math.floor(Math.random() * 500) + 99,
      originalPrice: Math.floor(Math.random() * 200) + 600,
      imageUrl: `https://picsum.photos/seed/${id}/300/300`,
      badge: index % 3 === 0 ? 'Best Seller' : index % 4 === 0 ? 'New' : undefined,
      category,
    };
  });
};

// Common products used across layouts
const babyEssentials = generateProducts('Baby', 10);
const toys = generateProducts('Toys', 10);
const snacks = generateProducts('Snacks', 10);
const schoolGear = generateProducts('School', 10);
const summerItems = generateProducts('Summer', 10);

// Helper to generate a large list of 30+ blocks for scroll performance testing
const generateSpamBlocks = (startIndex: number, count: number) => {
  return Array.from({ length: count }).map((_, index) => {
    const blockId = `spam_block_${startIndex + index}`;
    if (index % 3 === 0) {
      return {
        id: blockId,
        type: 'BANNER_HERO',
        data: {
          imageUrl: `https://picsum.photos/seed/${blockId}/800/400`,
          title: `Promotional Ad #${startIndex + index}`,
          subtitle: 'Limited time daily deal! Tap to shop.',
          action: {
            type: 'DEEP_LINK' as const,
            payload: { url: `/promo/${startIndex + index}` },
          },
        },
      };
    } else if (index % 3 === 1) {
      return {
        id: blockId,
        type: 'PRODUCT_GRID_2X2',
        data: {
          title: `Recommendations - Grid #${startIndex + index}`,
          products: generateProducts(`RecomGrid_${index}`, 4),
        },
      };
    } else {
      return {
        id: blockId,
        type: 'DYNAMIC_COLLECTION',
        data: {
          title: `Deals under ₹199 - Carousel #${startIndex + index}`,
          subtitle: 'Curated by parents',
          products: generateProducts(`RecomCarousel_${index}`, 6),
        },
      };
    }
  });
};

// 1. DEFAULT HOME PAYLOAD
export const DEFAULT_PAYLOAD: SDUIPayload = {
  pageTitle: 'Kiddo - Best for your Kiddo',
  theme: {
    primary: '#FF6B6B',
    background: '#FFFFFF',
    text: '#2D3748',
    cardBackground: '#F7FAFC',
  },
  components: [
    {
      id: 'default_hero_1',
      type: 'BANNER_HERO',
      data: {
        imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
        title: 'Newborn Essentials Sale',
        subtitle: 'Up to 40% OFF on premium cotton wear',
        action: {
          type: 'DEEP_LINK',
          payload: { url: '/category/newborn' },
        },
      },
    },
    {
      id: 'default_carousel_1',
      type: 'DYNAMIC_COLLECTION',
      data: {
        title: 'Snacks under ₹99',
        subtitle: 'Healthy organic bites for toddlers',
        products: snacks.slice(0, 6),
      },
    },
    {
      id: 'default_grid_1',
      type: 'PRODUCT_GRID_2X2',
      data: {
        title: 'Trending Toys',
        products: toys.slice(0, 4),
      },
    },
    // Adding unsupported component to test resilience / graceful degradation
    {
      id: 'corrupt_block_1',
      type: 'NEW_COMPONENT_V2',
      data: {
        corrupt: 'This block should be dropped quietly without crashing the App',
      },
    },
    {
      id: 'default_hero_2',
      type: 'BANNER_HERO',
      data: {
        imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
        title: 'Learning Toys Festival',
        subtitle: 'Educational blocks & puzzles starting at ₹149',
        action: {
          type: 'DEEP_LINK',
          payload: { url: '/category/educational-toys' },
        },
      },
    },
    ...generateSpamBlocks(1, 25), // 25 spam blocks to reach 30+ total components
  ],
};

// 2. BACK TO SCHOOL CAMPAIGN PAYLOAD
export const BACK_TO_SCHOOL_PAYLOAD: SDUIPayload = {
  pageTitle: '🎒 Back to School Mega-Sale',
  theme: {
    primary: '#0052CC', // Intense Primary Blue
    background: '#FFFBE6', // Bright Yellowish Tint
    text: '#172B4D',
    cardBackground: '#FFFFFF',
  },
  overlay: {
    id: 'overlay_back_to_school',
    type: 'FULL_SCREEN_OVERLAY',
    data: {
      animation_url: 'https://raw.githubusercontent.com/fedemartinm/react-award/main/example/animations/confetti.json', // Stable confetti animation
      animation_type: 'LOTTIE',
    },
  },
  components: [
    {
      id: 'bts_hero_1',
      type: 'BANNER_HERO',
      data: {
        imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800',
        title: 'Back to School Mega-Sale!',
        subtitle: 'Flat 50% OFF on school backpacks, books, and stationeries',
        action: {
          type: 'DEEP_LINK',
          payload: { url: '/bts-campaign' },
        },
      },
    },
    {
      id: 'bts_carousel_lunchboxes',
      type: 'DYNAMIC_COLLECTION',
      data: {
        title: 'Lunchboxes & Bags',
        subtitle: 'Leak-proof and insulated boxes',
        products: schoolGear.slice(0, 6),
        theme: {
          primary: '#0052CC',
          background: '#FFE600', // Yellow background for the contextual carousel
        },
      },
    },
    {
      id: 'bts_grid_school',
      type: 'PRODUCT_GRID_2X2',
      data: {
        title: 'Top School Essentials',
        products: schoolGear.slice(6, 10),
      },
    },
    // Adding another unsupported block to verify resilience in campaigns
    {
      id: 'corrupt_block_2',
      type: 'LEGACY_AD_BANNER_V1',
      data: { adId: 'legacy-99' },
    },
    ...generateSpamBlocks(50, 27), // Fill to 30+ total components
  ],
};

// 3. SUMMER PLAYHOUSE FESTIVAL PAYLOAD
export const SUMMER_PLAYHOUSE_PAYLOAD: SDUIPayload = {
  pageTitle: '🌊 Summer Playhouse Festival',
  theme: {
    primary: '#00A3C4', // Cool Ocean Blue
    background: '#E6FFFA', // Fluid ocean mint background
    text: '#234E52',
    cardBackground: '#FFFFFF',
  },
  overlay: {
    id: 'overlay_summer_playhouse',
    type: 'FULL_SCREEN_OVERLAY',
    data: {
      // Custom WebP image url representing interactive beach ball splash
      animation_url: 'https://media.giphy.com/media/xUPGGDh1s7hV7vjM9G/giphy.webp',
      animation_type: 'WEBP',
    },
  },
  components: [
    {
      id: 'summer_hero_1',
      type: 'BANNER_HERO',
      data: {
        imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800',
        title: 'Summer Splash Festival!',
        subtitle: 'Grab pool accessories and cool outfits',
        action: {
          type: 'DEEP_LINK',
          payload: { url: '/summer-playhouse' },
        },
      },
    },
    {
      id: 'summer_event_tickets',
      type: 'SPECIAL_EVENT_BOOKING',
      data: {
        title: 'Petting Zoo Tickets 🎟️',
        subtitle: 'Live Animal Interaction, Feeding sessions, and Photo-ops!',
        imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800',
        price: 499,
        action: {
          type: 'DEEP_LINK',
          payload: { url: '/booking/petting-zoo' },
        },
      },
    },
    {
      id: 'summer_carousel_essentials',
      type: 'DYNAMIC_COLLECTION',
      data: {
        title: 'Summer Essentials',
        subtitle: 'Swimsuits, floats, sunscreen, & toys',
        products: summerItems.slice(0, 6),
        theme: {
          primary: '#00A3C4',
          background: '#B2F5EA',
        },
      },
    },
    {
      id: 'summer_grid_pool',
      type: 'PRODUCT_GRID_2X2',
      data: {
        title: 'Outdoor Play Essentials',
        products: summerItems.slice(6, 10),
      },
    },
    ...generateSpamBlocks(100, 26), // Fill to 30+ total components
  ],
};

// 4. MYSTERY GIFT CARNIVAL PAYLOAD
export const MYSTERY_GIFT_PAYLOAD: SDUIPayload = {
  pageTitle: '🎁 Mystery Gift Carnival',
  theme: {
    primary: '#E53E3E', // Carnival Red
    background: '#FFF5F5', // Red tint background
    text: '#742A2A',
    cardBackground: '#FFFFFF',
  },
  overlay: {
    id: 'overlay_mystery_gift',
    type: 'FULL_SCREEN_OVERLAY',
    data: {
      animation_url: 'https://raw.githubusercontent.com/fedemartinm/react-award/main/example/animations/confetti.json', // Stable confetti animation
      animation_type: 'LOTTIE',
    },
  },
  components: [
    {
      id: 'mystery_hero_1',
      type: 'BANNER_HERO',
      data: {
        imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
        title: 'Mystery Gift Carnival is LIVE!',
        subtitle: 'Unlock surprise coupons on every checkout. Tap to view coupons.',
        action: {
          type: 'APPLY_MYSTERY_GIFT_COUPON',
          payload: { couponCode: 'CARNIVAL_MYSTERY_50' },
        },
      },
    },
    {
      id: 'mystery_carousel_toys',
      type: 'DYNAMIC_COLLECTION',
      data: {
        title: 'Mystery Toy Gift Packs 🎁',
        subtitle: 'Double click on item to buy & apply mystery offer',
        products: toys.slice(0, 6),
        theme: {
          primary: '#E53E3E',
          background: '#FED7D7',
        },
      },
    },
    {
      id: 'mystery_grid_toys',
      type: 'PRODUCT_GRID_2X2',
      data: {
        title: 'Unlock Gift Targets',
        products: toys.slice(6, 10),
      },
    },
    ...generateSpamBlocks(200, 27), // Fill to 30+ total components
  ],
};
