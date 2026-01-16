import React from 'react';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import MyText from '../generic/MyText';

import Ionicons from '@expo/vector-icons/Ionicons';

import { useColor } from '@/hooks/use-color';

export function CardTitle({ value }: { value: string }) {
  const color = useColor();
  return (
    <MyText style={[{ fontWeight: 'bold' }, { color: color.text }]}>{value}</MyText>
  );
}

export function CardPerson({ value }: { value: string }) {
  const color = useColor();
  return (
    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
      <Ionicons name="person" size={20} color={color.icon} />
      <MyText style={[{ fontWeight: 'bold' }, { color: color.text }]}>{value}</MyText>
    </View>
  );
}

export function CardDescription({ value }: { value: string }) {
  const color = useColor();
  return (
    <MyText style={[{ color: color.textLighter }]}>{value}</MyText>
  );
}

export function CardToPerson({ value }: { value: string }) {
  const color = useColor();
  return (
    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
      <Ionicons name="person" size={20} color={color.text} />
      <MyText style={[{ fontWeight: 'bold' }, { color: color.text }]}>{value}</MyText>
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
      <MyText style={[{ color: color.text }]}>{formatDate(value)}</MyText>
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
      <MyText style={{ color: color.textLighter }}>{label}</MyText>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item[keyField])}
        style={{ gap: 4 }}
        renderItem={({ item }) => (
          <View >
            {renderItem({ item })}
          </View>
        )}
      />
    </View>
  );
}

type EditableProps =
  | { isEditable: true, editAction: () => void }
  | { isEditable?: false, editAction?: never };

type DeletableProps =
  | { isDeletable: true, deleteAction: () => void }
  | { isDeletable?: false, deleteAction?: never };

type CardProps = {
  children: React.ReactNode
} & EditableProps & DeletableProps;

export function Card({ children, isEditable, editAction, isDeletable, deleteAction }: CardProps) {
  const color = useColor();
  return (
    <View style={[styles.shadowWrapper, { backgroundColor: color.cardBackground }]}>
      <View style={styles.card}>
        <View style={{ flex: 1, gap: 5 }}>
          {children}
        </View>
        {(isEditable || isDeletable) && (
          <View style={styles.cardButtonsOuter}>
            <View style={styles.cardButtons}>
              {isEditable && (
                <Pressable
                  onPress={editAction}
                  style={[
                    styles.pressable,
                    { backgroundColor: color.orange },
                  ]}
                >
                  <Ionicons name="brush" size={20} />
                </Pressable>
              )}
              {isDeletable && (
                <Pressable
                  onPress={deleteAction}
                  style={[
                    styles.pressable,
                    { backgroundColor: color.red },
                  ]}
                >
                  <Ionicons name="trash" size={20} color={color.text} />
                </Pressable>
              )}
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrapper: {
    borderRadius: 25,
    margin: 3,
    // shadowColor: '#000000ff',
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.28,
    // shadowRadius: 14,
    // elevation: 5,
    backgroundColor: 'transparent',
  },
  card: {
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 10,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  cardItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  cardButtonsOuter: {
    position: 'absolute',
    right: 5,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
  },
  cardButtons: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
    maxHeight: 200
  },
  pressable: {
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});