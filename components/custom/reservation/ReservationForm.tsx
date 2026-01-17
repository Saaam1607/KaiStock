import React from 'react';

import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import MyText from '../generic/MyText';

import type { Reservation } from '@/types/Reservation';
import type { SoldProduct } from '@/types/SoldProduct';

import { ProductionItemCard } from '../produce/ProductionItemCard';

import { getProductFromId } from '@/components/api/productsApi';

import Ionicons from '@expo/vector-icons/Ionicons';

import { useColor } from '@/hooks/use-color';

import { FormItem } from '../form/FormItem';
import { FormItemGeneric } from '../form/FormItemGeneric';
import { FormItemDate } from '../form/FromItemDate';

type ReservationFormProps = {
  reservation: Reservation;
  setReservation: (product: Reservation) => void;
  soldProductItems: SoldProduct[];
  setSoldProductItems: (items: SoldProduct[]) => void;
  setShowAddProductModal: (show: boolean) => void;
};

export function ReservationForm({ reservation, setReservation, soldProductItems, setSoldProductItems, setShowAddProductModal }: ReservationFormProps) {
  
  const color = useColor();

  function removeSelectedProductionItem(product_id: string) {
    // setSelectedProductsIds(selectedProductsIds.filter(item => item !== product_id));
    setSoldProductItems(soldProductItems.filter(item => item.product_id !== product_id));
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.form} contentContainerStyle={styles.formContent}>
        
        <FormItem
          label="Titolo"
          input={reservation.title}
          onInputChange={text => setReservation({ ...reservation, title: text })}
        />

        <FormItem
          label="Note"
          input={reservation.notes}
          onInputChange={text => setReservation({ ...reservation, notes: text })}
          inputStyle={{ height: 60 }}
          multiLine
        />

        <FormItem
          label="Prenotato da"
          input={reservation.to}
          onInputChange={text => setReservation({ ...reservation, to: text })}
        />

        <FormItemDate
          label="Data"
          input={reservation.date}
          onInputChange={text => setReservation({ ...reservation, date: text })}
        />

        <FormItemGeneric label="Articoli">
          <View style={styles.list}>
            {soldProductItems.map(item => {
              
              const product = getProductFromId(item.product_id);
              if (!product) return null;

              return (
                <ProductionItemCard
                  key={product.id}
                  product={product}
                  removeProduct={removeSelectedProductionItem}
                  quantity={item.quantity}
                  setQuantity={(quantity: number) => {
                    setSoldProductItems(soldProductItems.map(i => {
                      if (i.product_id === product.id) {
                        return { ...i, quantity };
                      }
                      return i;
                    }));
                  }}
                />
              )

            })}
          </View>
        </FormItemGeneric>

        <View style={{ alignItems: 'center' }}>
          <Pressable
            onPress={() => setShowAddProductModal(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'rgb(46, 126, 90)',
              borderWidth: 1,
              borderRadius: 50,
              paddingHorizontal: 10,
              paddingVertical: 6,
              width: 225,
              height: 50,
              justifyContent: 'center',
            }}
          >
            <Ionicons name="add-circle" size={25} color={color.text} />
            <MyText style={{ color: color.text }}>Aggiungi Prodotto</MyText>
          </Pressable>
        </View>
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  form: {
  },
  formContent: {
    gap: 10,
  },
  list: {
    gap: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',    
  },
});