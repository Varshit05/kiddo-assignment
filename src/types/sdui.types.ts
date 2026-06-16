export interface SDUIAction {
  type: 'ADD_TO_CART' | 'DEEP_LINK' | 'APPLY_MYSTERY_GIFT_COUPON';
  payload: {
    id?: string;
    url?: string;
    couponCode?: string;
    [key: string]: any;
  };
}

export interface SDUITheme {
  primary: string;
  background: string;
  text?: string;
  cardBackground?: string;
}

export interface SDUIProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  badge?: string;
  category?: string;
}

export interface BannerHeroData {
  imageUrl: string;
  title?: string;
  subtitle?: string;
  action?: SDUIAction;
}

export interface ProductGrid2x2Data {
  title: string;
  products: SDUIProduct[];
}

export interface DynamicCollectionData {
  title: string;
  subtitle?: string;
  products: SDUIProduct[];
  theme?: SDUITheme; // contextual marketing theme (e.g. primary/background colors)
}

export interface SpecialEventBookingData {
  title: string;
  subtitle?: string;
  imageUrl: string;
  price: number;
  action?: SDUIAction;
}

export interface FullScreenOverlayData {
  animation_url: string;
  animation_type: 'LOTTIE' | 'WEBP';
}

export interface SDUIComponentNode {
  id: string;
  type: string; // Stored as string to support defensive resilience & fallback checks
  data: any;
  action?: SDUIAction;
}

export interface SDUIPayload {
  pageTitle: string;
  theme?: SDUITheme;
  components: SDUIComponentNode[];
  overlay?: SDUIComponentNode;
}
