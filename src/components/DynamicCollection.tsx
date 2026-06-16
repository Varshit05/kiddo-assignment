import React, { useRef } from 'react';
import { View, FlatList, StyleSheet, Text, Platform } from 'react-native';
import { DynamicCollectionData } from '../types/sdui.types';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { ProductCard } from './common/ProductCard';
import { SectionHeader } from './common/SectionHeader';

interface DynamicCollectionProps {
  data: DynamicCollectionData;
}

const DynamicCollectionContent: React.FC<DynamicCollectionProps> = React.memo(({ data }) => {
  const theme = useTheme();

  // Track carousel-level renders
  const renderCount = useRef(0);
  renderCount.current += 1;

  const renderItem = React.useCallback(({ item }: any) => {
    return (
      <View style={styles.cardWrapper}>
        <ProductCard product={item} />
      </View>
    );
  }, []);

  const keyExtractor = React.useCallback((item: any) => item.id, []);

  return (
    <View style={[styles.container, { backgroundColor: data.theme ? theme.background : 'transparent' }]}>
      <View style={styles.headerRow}>
        <SectionHeader title={data.title} subtitle={data.subtitle} />
        <View style={[styles.renderBadge, { backgroundColor: theme.primary + '30' }]}>
          <Text style={[styles.renderBadgeText, { color: theme.primary }]}>Carousel Renders: {renderCount.current}</Text>
        </View>
      </View>

      <FlatList
        horizontal
        data={data.products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={172} // cardWrapper width (160) + marginRight (12)
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum={true}
        nestedScrollEnabled={true} // critical for android nested lists
        removeClippedSubviews={Platform.OS === 'android'} // optimized virtualization boundaries
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={3}
      />
    </View>
  );
});

export const DynamicCollection: React.FC<DynamicCollectionProps> = React.memo(({ data }) => {
  if (data.theme) {
    return (
      <ThemeProvider theme={data.theme}>
        <DynamicCollectionContent data={data} />
      </ThemeProvider>
    );
  }

  return <DynamicCollectionContent data={data} />;
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  renderBadge: {
    marginRight: 16,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  renderBadgeText: {
    fontSize: 8,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  cardWrapper: {
    width: 160,
    marginRight: 12,
  },
});
