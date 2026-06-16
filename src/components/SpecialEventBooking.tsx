import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Image } from 'expo-image';
import { SpecialEventBookingData } from '../types/sdui.types';
import { useTheme } from '../context/ThemeContext';
import { handleAction } from '../engine/ActionDispatcher';

interface SpecialEventBookingProps {
  data: SpecialEventBookingData;
}

export const SpecialEventBooking: React.FC<SpecialEventBookingProps> = React.memo(({ data }) => {
  const theme = useTheme();

  const renderCount = useRef(0);
  renderCount.current += 1;

  const handleBookPress = () => {
    if (data.action) {
      handleAction(data.action);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground, borderColor: theme.primary + '30' }]}>
      <View style={styles.renderBadge}>
        <Text style={styles.renderBadgeText}>Event Renders: {renderCount.current}</Text>
      </View>

      <Image
        source={{ uri: data.imageUrl }}
        style={styles.image}
        contentFit="cover"
        transition={300}
      />

      <View style={styles.body}>
        <Text style={[styles.title, { color: theme.text }]}>{data.title}</Text>
        {data.subtitle && <Text style={styles.subtitle}>{data.subtitle}</Text>}

        <View style={styles.footer}>
          <View>
            <Text style={styles.priceLabel}>TICKETS FROM</Text>
            <Text style={[styles.priceValue, { color: theme.text }]}>₹{data.price}</Text>
          </View>

          <TouchableOpacity
            style={[styles.bookButton, { backgroundColor: theme.primary }]}
            onPress={handleBookPress}
            activeOpacity={0.8}
          >
            <Text style={styles.bookButtonText}>BOOK NOW</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  renderBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    zIndex: 10,
  },
  renderBadgeText: {
    color: '#00FFFF', // Cyan for custom components
    fontSize: 8,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  image: {
    width: '100%',
    height: 160,
  },
  body: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 12,
    color: '#718096',
    marginTop: 4,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 12,
  },
  priceLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#A0AEC0',
    letterSpacing: 0.5,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  bookButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
