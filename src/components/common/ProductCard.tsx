import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Image } from 'expo-image';
import { SDUIProduct } from '../../types/sdui.types';
import { useTheme } from '../../context/ThemeContext';
import { useCartStore } from '../../store/useCartStore';

interface ProductCardProps {
  product: SDUIProduct;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(({ product }) => {
  const theme = useTheme();

  const renderCount = useRef(0);
  renderCount.current += 1;

  const quantity = useCartStore(
    (state) => state.cart[product.id] || 0
  );

  const handleAdd = () => {
    useCartStore.getState().addToCart(product.id);
  };

  const handleRemove = () => {
    useCartStore.getState().removeFromCart(product.id);
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <View style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.primary + '20' }]}>
      <View style={styles.renderBadge}>
        <Text style={styles.renderBadgeText}>Renders: {renderCount.current}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.imageUrl }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        {product.badge && (
          <View style={[styles.badge, { backgroundColor: theme.primary }]}>
            <Text style={styles.badgeText}>{product.badge}</Text>
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.categoryText, { color: theme.primary }]} numberOfLines={1}>
          {product.category || 'Essential'}
        </Text>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
          {product.title}
        </Text>

        <View style={styles.priceRow}>
          <Text style={[styles.price, { color: theme.text }]}>₹{product.price}</Text>
          {hasDiscount && (
            <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
          )}
        </View>

        {hasDiscount && (
          <Text style={styles.discountText}>{discountPercent}% OFF</Text>
        )}

        <View style={styles.actionRow}>
          {quantity === 0 ? (
            <TouchableOpacity
              onPress={handleAdd}
              activeOpacity={0.8}
              style={[styles.addButton, { backgroundColor: theme.primary }]}
            >
              <Text style={styles.addButtonText}>ADD TO CART</Text>
            </TouchableOpacity>
          ) : (
            <View style={[styles.quantitySelector, { borderColor: theme.primary }]}>
              <TouchableOpacity
                onPress={handleRemove}
                style={[styles.qtyButton, { backgroundColor: theme.primary + '15' }]}
              >
                <Text style={[styles.qtyButtonText, { color: theme.primary }]}>-</Text>
              </TouchableOpacity>
              <Text style={[styles.qtyText, { color: theme.text }]}>{quantity}</Text>
              <TouchableOpacity
                onPress={handleAdd}
                style={[styles.qtyButton, { backgroundColor: theme.primary + '15' }]}
              >
                <Text style={[styles.qtyButtonText, { color: theme.primary }]}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
  },
  renderBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    zIndex: 10,
  },
  renderBadgeText: {
    color: '#39FF14', // Neon Green for readability
    fontSize: 8,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#F3F4F6',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  infoContainer: {
    marginTop: 8,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
    height: 36,
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
  },
  originalPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: '#A0AEC0',
    marginLeft: 6,
  },
  discountText: {
    fontSize: 10,
    color: '#38A169',
    fontWeight: '700',
    marginTop: 2,
  },
  actionRow: {
    marginTop: 8,
    height: 36,
  },
  addButton: {
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    height: '100%',
    overflow: 'hidden',
  },
  qtyButton: {
    width: 32,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  qtyText: {
    fontSize: 13,
    fontWeight: '800',
  },
});
