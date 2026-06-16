import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Image } from 'expo-image';
import { BannerHeroData } from '../types/sdui.types';
import { useTheme } from '../context/ThemeContext';
import { handleAction } from '../engine/ActionDispatcher';

interface BannerHeroProps {
  data: BannerHeroData;
}

export const BannerHero: React.FC<BannerHeroProps> = React.memo(({ data }) => {
  const theme = useTheme();

  const renderCount = useRef(0);
  renderCount.current += 1;

  const handlePress = () => {
    if (data.action) {
      handleAction(data.action);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      disabled={!data.action}
      style={styles.container}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: data.imageUrl }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
        <View style={styles.renderBadge}>
          <Text style={styles.renderBadgeText}>Renders: {renderCount.current}</Text>
        </View>

        {(data.title || data.subtitle) && (
          <View style={styles.overlay}>
            {data.title && (
              <Text style={styles.title} numberOfLines={1}>
                {data.title}
              </Text>
            )}
            {data.subtitle && (
              <Text style={styles.subtitle} numberOfLines={2}>
                {data.subtitle}
              </Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  imageWrapper: {
    width: '100%',
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#EDF2F7',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  renderBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    zIndex: 10,
  },
  renderBadgeText: {
    color: '#39FF14',
    fontSize: 8,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    color: '#E2E8F0',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
