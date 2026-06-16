import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SDUIPayload, SDUIComponentNode } from '../types/sdui.types';
import { SDUIBlockRenderer } from './ComponentRegistry';
import { useTheme } from '../context/ThemeContext';

interface SDUIFeedRendererProps {
  payload: SDUIPayload;
}

export const SDUIFeedRenderer: React.FC<SDUIFeedRendererProps> = React.memo(({ payload }) => {
  const theme = useTheme();

  const renderCount = React.useRef(0);
  renderCount.current += 1;

  const renderItem = React.useCallback(({ item }: { item: SDUIComponentNode }) => {
    return <SDUIBlockRenderer node={item} />;
  }, []);

  const keyExtractor = React.useCallback((item: SDUIComponentNode) => {
    return item.id;
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.statsHeader, { borderBottomColor: theme.primary + '15' }]}>
        <Text style={[styles.statsText, { color: theme.text }]}>
          Vertical Feed Blocks: {payload.components.length}
        </Text>
        <View style={styles.statsBadge}>
          <Text style={styles.statsBadgeText}>Feed Renders: {renderCount.current}</Text>
        </View>
      </View>

      <FlashList
        data={payload.components}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.listContent}
        removeClippedSubviews={Platform.OS === 'android'}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    zIndex: 5,
  },
  statsText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statsBadge: {
    backgroundColor: '#000000',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  statsBadgeText: {
    color: '#00E5FF',
    fontSize: 8,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  listContent: {
    paddingBottom: 40,
  },
});
