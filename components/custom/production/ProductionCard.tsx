import React, { useState } from 'react';

import { FlatList, View, StyleSheet, Text } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import type { Production } from '@/types/Production';
import type { Product } from '@/types/Product';

import { Card } from '@/components/custom/containers/Card';

import { products } from '@/types/products';

type ProductEditModalProps = {
  production: Production;

};

export default function ProductionCard({ production }: ProductEditModalProps) {
  function getProduct(product_id: string): Product | undefined {
    return products.find(item => item.id === product_id);
  }

  function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <Card>
      <View>
        <Text style={styles.title}>{production.title}</Text>
        <Text style={styles.text}>{production.notes}</Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="calendar" size={20} color="#888" />
        <Text style={styles.text}>{formatDate(production.date)}</Text>
      </View>

      <View style={{ gap: 10 }}>
        <Text style={styles.sectionTitle}>Prodotti</Text>

        <FlatList
          data={production.body}
          keyExtractor={(item) => item.product_id}
          renderItem={({ item }) => {
            const product = getProduct(item.product_id);

            return (
              <View style={styles.productRow}>
                <View style={styles.quantityBadge}>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                </View>

                <Text style={styles.productName} numberOfLines={1}>
                  {product?.name}
                </Text>
              </View>
            );
          }}
          style={{ gap: 4 }}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: '#E5E7EB',
  },
  text: {
    color: '#D1D5DB',
  },
  sectionTitle: {
    color: '#9CA3AF',
    fontSize: 13,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#272727ff',
  },
  quantityBadge: {
    minWidth: 32,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#1d1d1dff',
    alignItems: 'center',
  },
  quantityText: {
    color: '#E5E7EB',
    fontWeight: '600',
    fontSize: 13,
  },
  productName: {
    flex: 1,
    color: '#D1D5DB',
    fontSize: 14,
  },
});