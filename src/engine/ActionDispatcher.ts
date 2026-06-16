import { Alert, ToastAndroid, Platform } from 'react-native';
import { SDUIAction } from '../types/sdui.types';
import { useCartStore } from '../store/useCartStore';

export const handleAction = (action: SDUIAction): void => {
  console.log('[SDUI Action Dispatcher] Executing:', action.type, action.payload);

  switch (action.type) {
    case 'ADD_TO_CART': {
      const { id } = action.payload;
      if (!id) {
        console.warn('[ActionDispatcher] Missing product id for ADD_TO_CART');
        return;
      }
      useCartStore.getState().addToCart(id);

      const message = `Added ${id} to Cart!`;
      if (Platform.OS === 'android') {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      } else {
        console.log(`[Toast] ${message}`);
      }
      break;
    }

    case 'DEEP_LINK': {
      const { url } = action.payload;
      if (!url) {
        console.warn('[ActionDispatcher] Missing url for DEEP_LINK');
        return;
      }
      Alert.alert(
        'Navigation Triggered',
        `Deep Link Action dispatched: Routing to target path "${url}"`,
        [{ text: 'OK', style: 'default' }]
      );
      break;
    }

    case 'APPLY_MYSTERY_GIFT_COUPON': {
      const { couponCode } = action.payload;
      if (!couponCode) {
        console.warn('[ActionDispatcher] Missing couponCode for APPLY_MYSTERY_GIFT_COUPON');
        return;
      }
      Alert.alert(
        'Mystery Coupon Applied! 🎉',
        `Congratulations! The code "${couponCode}" was applied successfully.\n\nYou have unlocked a flat 20% discount on all checkout totals during this campaign session.`,
        [{ text: 'Woohoo!', style: 'default' }]
      );
      break;
    }

    default:
      console.warn(`[ActionDispatcher] Unrecognized action type: ${(action as any).type}`);
  }
};
