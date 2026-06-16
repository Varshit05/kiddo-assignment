import React, { useRef } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { ProductGrid2x2Data } from '../types/sdui.types';
import { ProductCard } from './common/ProductCard';
import { SectionHeader } from './common/SectionHeader';

interface ProductGrid2x2Props {
  data: ProductGrid2x2Data;
}

export const ProductGrid2x2: React.FC<ProductGrid2x2Props> = React.memo(({ data }) => {
  // Track grid-level renders
  const renderCount = useRef(0);
  renderCount.current += 1;

  const productsToRender = React.useMemo(() => {
    return data.products.slice(0, 4);
  }, [data.products]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <SectionHeader title={data.title} />
        <View style={styles.renderBadge}>
          <Text style={styles.renderBadgeText}>Grid Renders: {renderCount.current}</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {productsToRender.map((product) => (
          <View key={product.id} style={styles.gridCell}>
            <ProductCard product={product} />
          </View>
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    position: 'relative',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  renderBadge: {
    marginRight: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  renderBadgeText: {
    color: '#FF007F', // Vivid pink for grid-level render trackers
    fontSize: 8,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  gridCell: {
    width: '50%',
    padding: 6,
  },
});
