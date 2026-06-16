import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import LottieView from 'lottie-react-native';
import { Image } from 'expo-image';
import { SDUIComponentNode, FullScreenOverlayData } from '../types/sdui.types';

interface CampaignOverlayProps {
  overlayNode?: SDUIComponentNode;
}

export const CampaignOverlay: React.FC<CampaignOverlayProps> = React.memo(({ overlayNode }) => {
  if (!overlayNode || overlayNode.type !== 'FULL_SCREEN_OVERLAY') {
    return null;
  }

  const data = overlayNode.data as FullScreenOverlayData;
  if (!data || !data.animation_url) {
    return null;
  }

  return (
    // Crucial: pointerEvents="none" makes this overlay click-through!
    // Users can click buttons underneath the animation without any lag or occlusion.
    <View style={styles.overlayContainer} pointerEvents="none">
      {data.animation_type === 'LOTTIE' ? (
        <LottieView
          source={{ uri: data.animation_url }}
          autoPlay
          loop
          style={styles.fullScreenAnimation}
          resizeMode="cover"
          onAnimationFailure={(error) => {
            console.warn('[SDUI Overlay] Lottie animation loading failed:', error);
          }}
        />
      ) : (
        <Image
          source={{ uri: data.animation_url }}
          style={styles.fullScreenAnimation}
          contentFit="cover"
          // Automatically leverages expo-image disk and memory caching pipelines
          cachePolicy="disk"
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 100, // float above everything
  },
  fullScreenAnimation: {
    width: '100%',
    height: '100%',
    opacity: 0.85, // subtle opacity to not blind the customer
  },
});
