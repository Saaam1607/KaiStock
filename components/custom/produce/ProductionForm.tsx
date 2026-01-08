import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import DateInput from '../DateInput';
import { ProductionItemCard } from './ProductionItemCard';

import type { Production } from '@/types/Production';
import type { ProductQuantityItem } from '@/types/ProductQuantityItem';

import type { Product } from '@/types/Product';
import { getProduct } from '@/components/utils/getProduct';

import Ionicons from '@expo/vector-icons/Ionicons';

import { useColor } from '@/hooks/use-color';

import { FormItem } from '../form/FormItem';
import { FormItemDate } from '../form/FromItemDate'; 
import { FormItemGeneric } from '../form/FormItemGeneric';

type ProductionFormProps = {
  production: Production;
  setProduction: (product: Production) => void;
  productionItems: ProductQuantityItem[];
  setProductionItems: (items: ProductQuantityItem[]) => void;
  setShowAddProductModal: (show: boolean) => void;
};

export function ProductionForm({ production, setProduction, productionItems, setProductionItems, setShowAddProductModal }: ProductionFormProps) {
  
  const color = useColor();

  function removeSelectedProductionItem(product_id: string) {
    // setSelectedProductsIds(selectedProductsIds.filter(item => item !== product_id));
    setProductionItems(productionItems.filter(item => item.product_id !== product_id));
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.form} contentContainerStyle={styles.formContent}>
        
        <FormItem
          label="Titolo"
          input={production.title}
          onInputChange={text => setProduction({ ...production, title: text })}
        />

        <FormItem
          label="Note"
          input={production.notes}
          onInputChange={text => setProduction({ ...production, notes: text })}
          inputStyle={{ height: 60 }}
          multiLine
        />

        <FormItemDate
          label="Data"
          input={production.date}
          onInputChange={text => setProduction({ ...production, date: text })}
        />

        <FormItemGeneric label="Prodotti">
          <View style={styles.list}>
            {productionItems.map(item => {
              
              const product = getProduct(item.product_id);
              if (!product) return null;

              return (
                <ProductionItemCard
                  key={product.id}
                  product={product}
                  removeProduct={removeSelectedProductionItem}
                  quantity={item.quantity}
                  setQuantity={quantity => {
                    setProductionItems(productionItems.map(i => {
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
            <Text style={{ color: color.text }}>Aggiungi Prodotto</Text>
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