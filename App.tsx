import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './src/context/ThemeContext';
import { SDUIFeedRenderer } from './src/engine/SDUIFeedRenderer';
import { CampaignOverlay } from './src/overlays/CampaignOverlay';
import { useCartStore } from './src/store/useCartStore';
import {
  DEFAULT_PAYLOAD,
  BACK_TO_SCHOOL_PAYLOAD,
  SUMMER_PLAYHOUSE_PAYLOAD,
  MYSTERY_GIFT_PAYLOAD,
} from './src/api/mockData';
import { SDUIPayload } from './src/types/sdui.types';

export default function App() {
  const [activeCampaignName, setActiveCampaignName] = useState<'default' | 'school' | 'summer' | 'mystery'>('default');

  const currentPayload = useMemo<SDUIPayload>(() => {
    switch (activeCampaignName) {
      case 'school':
        return BACK_TO_SCHOOL_PAYLOAD;
      case 'summer':
        return SUMMER_PLAYHOUSE_PAYLOAD;
      case 'mystery':
        return MYSTERY_GIFT_PAYLOAD;
      case 'default':
      default:
        return DEFAULT_PAYLOAD;
    }
  }, [activeCampaignName]);

  const cartTotalItems = useCartStore((state) => {
    return Object.values(state.cart).reduce((sum, qty) => sum + qty, 0);
  });

  const clearCart = () => {
    useCartStore.getState().clearCart();
  };

  const activeTheme = currentPayload.theme;

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={activeTheme}>
        <SafeAreaView style={[styles.safeArea, { backgroundColor: activeTheme?.background || '#FFFFFF' }]}>
          <StatusBar style={activeCampaignName === 'default' ? 'dark' : 'light'} />

          <View style={[styles.brandingHeader, { borderBottomColor: activeTheme?.primary + '20' }]}>
            <View>
              <Text style={[styles.brandLogo, { color: activeTheme?.primary || '#FF6B6B' }]}>Kiddo</Text>
              <Text style={styles.brandTagline}>delivered in minutes</Text>
            </View>
            {cartTotalItems > 0 && (
              <View style={[styles.cartBadge, { backgroundColor: activeTheme?.primary || '#FF6B6B' }]}>
                <Text style={styles.cartBadgeText}>🛒 {cartTotalItems}</Text>
              </View>
            )}
          </View>

          <View style={styles.feedContainer}>
            <SDUIFeedRenderer payload={currentPayload} />
          </View>

          <View style={styles.devConsole}>
            <View style={styles.consoleHeader}>
              <Text style={styles.consoleTitle}>⚙️ DEVELOPER TELEMETRY & CAMPAIGNS</Text>
              {cartTotalItems > 0 && (
                <TouchableOpacity onPress={clearCart} style={styles.clearButton}>
                  <Text style={styles.clearButtonText}>Reset Cart</Text>
                </TouchableOpacity>
              )}
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.consoleScroll}>
              <TouchableOpacity
                onPress={() => setActiveCampaignName('default')}
                style={[
                  styles.consolePill,
                  activeCampaignName === 'default' && [
                    styles.consolePillActive,
                    { backgroundColor: activeTheme?.primary || '#FF6B6B' },
                  ],
                ]}
              >
                <Text style={[styles.pillText, activeCampaignName === 'default' && styles.pillTextActive]}>
                  Default Feed
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveCampaignName('school')}
                style={[
                  styles.consolePill,
                  activeCampaignName === 'school' && [
                    styles.consolePillActive,
                    { backgroundColor: activeTheme?.primary || '#0052CC' },
                  ],
                ]}
              >
                <Text style={[styles.pillText, activeCampaignName === 'school' && styles.pillTextActive]}>
                  🎒 Back to School
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveCampaignName('summer')}
                style={[
                  styles.consolePill,
                  activeCampaignName === 'summer' && [
                    styles.consolePillActive,
                    { backgroundColor: activeTheme?.primary || '#00A3C4' },
                  ],
                ]}
              >
                <Text style={[styles.pillText, activeCampaignName === 'summer' && styles.pillTextActive]}>
                  🌊 Summer Playhouse
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveCampaignName('mystery')}
                style={[
                  styles.consolePill,
                  activeCampaignName === 'mystery' && [
                    styles.consolePillActive,
                    { backgroundColor: activeTheme?.primary || '#E53E3E' },
                  ],
                ]}
              >
                <Text style={[styles.pillText, activeCampaignName === 'mystery' && styles.pillTextActive]}>
                  🎁 Mystery Gift
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <CampaignOverlay overlayNode={currentPayload.overlay} />
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  brandingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  brandLogo: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -1,
  },
  brandTagline: {
    fontSize: 9,
    fontWeight: '700',
    color: '#A0AEC0',
    marginTop: -2,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  cartBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },
  feedContainer: {
    flex: 1,
  },
  devConsole: {
    backgroundColor: '#1A202C',
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    borderTopWidth: 1,
    borderTopColor: '#2D3748',
  },
  consoleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  consoleTitle: {
    color: '#A0AEC0',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  clearButton: {
    backgroundColor: '#E53E3E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  consoleScroll: {
    paddingHorizontal: 16,
  },
  consolePill: {
    backgroundColor: '#2D3748',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#4A5568',
  },
  consolePillActive: {
    borderColor: 'transparent',
  },
  pillText: {
    color: '#A0AEC0',
    fontSize: 12,
    fontWeight: '700',
  },
  pillTextActive: {
    color: '#FFFFFF',
  },
});
