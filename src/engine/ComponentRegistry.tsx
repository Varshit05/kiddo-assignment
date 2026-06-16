import React from 'react';
import { SDUIComponentNode } from '../types/sdui.types';
import { BannerHero } from '../components/BannerHero';
import { ProductGrid2x2 } from '../components/ProductGrid2x2';
import { DynamicCollection } from '../components/DynamicCollection';
import { SpecialEventBooking } from '../components/SpecialEventBooking';

const REGISTRY: Record<string, React.ComponentType<{ data: any }>> = {
  BANNER_HERO: BannerHero,
  PRODUCT_GRID_2X2: ProductGrid2x2,
  DYNAMIC_COLLECTION: DynamicCollection,
  SPECIAL_EVENT_BOOKING: SpecialEventBooking,
};

interface SDUIBlockRendererProps {
  node: SDUIComponentNode;
}

export const SDUIBlockRenderer: React.FC<SDUIBlockRendererProps> = React.memo(({ node }) => {
  const Component = REGISTRY[node.type];

  if (!Component) {
    console.warn(
      `[SDUI Engine] Unsupported component type: "${node.type}". Node ID: "${node.id}". Node dropped quietly to preserve tree stability.`
    );
    return null;
  }

  try {
    return <Component data={node.data} />;
  } catch (error) {
    console.error(`[SDUI Engine] Error rendering component: "${node.type}" (ID: ${node.id}):`, error);
    return null;
  }
});
