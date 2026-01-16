import React, { useState, useEffect } from 'react';

import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import MyText from '../generic/MyText';

import type { Sale } from '@/types/Sale';
import type { SoldProduct } from '@/types/SoldProduct';

import { SoldItemCard } from './SoldItemCard';

import { getProductFromId } from '@/components/api/productsApi';


import Ionicons from '@expo/vector-icons/Ionicons';

import { useColor } from '@/hooks/use-color';

import { FormCheck } from '../form/FormCheck';
import { FormItem } from '../form/FormItem';
import { FormItemGeneric } from '../form/FormItemGeneric';
import { FormItemDate } from '../form/FromItemDate';

type SaleFormProps = {
  sale: Sale;
  setSale: (sale: Sale) => void;
  soldProductItems: SoldProduct[];
  setSoldProductItems: (items: SoldProduct[]) => void;
  setShowAddProductModal: (show: boolean) => void;
  showMandatoryBorders?: boolean;
};

export function SaleForm({ sale, setSale, soldProductItems, setSoldProductItems, setShowAddProductModal, showMandatoryBorders = false }: SaleFormProps) {
  
  const color = useColor();

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = soldProductItems.reduce((acc, item) => acc + item.quantity * item.unit_price * item.weight, 0);
    const newTotalPrice = total;
    setTotalPrice(newTotalPrice);
  }, [soldProductItems]);

  function removeSelectedProductionItem(product_id: string) {
    // setSelectedProductsIds(selectedProductsIds.filter(item => item !== product_id));
    setSoldProductItems(soldProductItems.filter(item => item.product_id !== product_id));
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.form} contentContainerStyle={styles.formContent}>
        <FormItem
          label="Titolo"
          input={sale.title}
          onInputChange={text => setSale({ ...sale, title: text })}
        />
        <FormItem
          label="Note"
          input={sale.notes}
          onInputChange={text => setSale({ ...sale, notes: text })}
          inputStyle={{ height: 60 }}
          multiLine
        />
        <FormItem
          label="Prenotato da"
          input={sale.to}
          onInputChange={text => setSale({ ...sale, to: text })}
          showMandatoryBorders={showMandatoryBorders && sale.to === ''}
        />
        <FormCheck
          label="Pagato"
          input={sale.paid}
          onInputChange={text => setSale({ ...sale, paid: text })}
        />
        <FormCheck
          label="Consegnato"
          input={sale.delivered}
          onInputChange={text => setSale({ ...sale, delivered: text })}
        />
        <FormItemDate
          label="Data"
          input={sale.date}
          onInputChange={text => setSale({ ...sale, date: text })}
        />
        <FormItem
          label={`Prezzo totale (€)`}
          input={totalPrice.toString()}
        />
        <FormItemGeneric label="Articoli">
          <View style={styles.list}>
            {soldProductItems.map(item => {
              
              const product = getProductFromId(item.product_id);
              if (!product) return null;

              return (
                <SoldItemCard
                  key={product.id + item.weight}
                  sale={item}
                  removeItem={removeSelectedProductionItem}
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
        <MyText style={{ color: color.textLighter, marginTop: 20, fontSize: 12 }}>* Campo Obbligatorio </MyText>

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