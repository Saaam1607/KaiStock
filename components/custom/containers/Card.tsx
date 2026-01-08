import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { useColor } from '@/hooks/use-color';

export function CardTitle({ value }: { value: string }) {
  const color = useColor();
  return (
    <Text style={[{ fontWeight: 'bold' }, { color: color.text }]}>{value}</Text>
  );
}

export function CardDescription({ value }: { value: string }) {
  const color = useColor();
  return (
    <Text style={[{ color: color.textLighter }]}>{value}</Text>
  );
}

export function CardToPerson({ value }: { value: string }) {
  const color = useColor();
  return (
    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
      <Ionicons name="person" size={20} color={color.text} />
      <Text style={[{ fontWeight: 'bold' }, { color: color.text }]}>{value}</Text>
    </View>
  );
}

export function CardDate({ value }: { value: Date }) {
  const color = useColor();
  
  function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
      <Ionicons name="calendar" size={20} color={color.icon} />
      <Text style={[{ color: color.text }]}>{formatDate(value)}</Text>
    </View>
  );
}

type CardListProps<T> = {
  label: string;
  data: T[];
  keyField: keyof T;
  renderItem: ({ item }: { item: T }) => React.ReactElement;
};
export function CardList<T>({ label, data, keyField, renderItem }: CardListProps<T>) {
  const color = useColor();

  return (
    <View>
      <Text style={{ color: color.textLighter }}>{label}</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => String(item[keyField])}
        style={{ gap: 4 }}
        renderItem={({ item }) => (
          <View style={[styles.cardItemRow, { backgroundColor: color.cardItem }]}>
            {renderItem({ item })}
          </View>
        )}
      />
    </View>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  const color = useColor();
  return (
    <View style={[styles.shadowWrapper, { backgroundColor: color.cardBackground }]}>
      <View style={styles.card}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrapper: {
    borderRadius: 25,
    margin: 3,
    shadowColor: '#000000ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 5,
    backgroundColor: 'transparent',
  },
  card: {
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 12,
    overflow: 'hidden',
  },
  cardItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
});