import React, { useState, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import DateInput from '../DateInput';
import { QuantityEditor } from '../QuantityEditor';
import { ProductionItemCard } from './ProductionItemCard';

import type { Production, ProductionBodyItem } from '@/types/Production';

import type { Product } from '@/types/Product';

import { products } from '@/types/products';
import Ionicons from '@expo/vector-icons/Ionicons';

type ProductionFormProps = {
  production: Production;
  setProduction: (product: Production) => void;
  productionItems: ProductionBodyItem[];
  setProductionItems: (items: ProductionBodyItem[]) => void;
  setShowAddProductModal: (show: boolean) => void;
};

export function ProductionForm({ production, setProduction, productionItems, setProductionItems, setShowAddProductModal }: ProductionFormProps) {
  
  function removeSelectedProductionItem(product_id: string) {
    // setSelectedProductsIds(selectedProductsIds.filter(item => item !== product_id));
    setProductionItems(productionItems.filter(item => item.product_id !== product_id));
  }

  function getProduct(product_id: string): Product | undefined {
    return products.find(item => item.id === product_id);
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.form} contentContainerStyle={styles.formContent}>
        
        <View>
          <Text style={styles.label}>Titolo</Text>
          <TextInput
            style={styles.input}
            value={production.title}
            onChangeText={text => setProduction({ ...production, title: text })}
          />
        </View>

        <View>
          <Text style={styles.label}>Note</Text>
          <TextInput
            style={[styles.input, { height: 60 }]}
            value={production.notes}
            onChangeText={text => setProduction({ ...production, notes: text })}
            multiline
          />
        </View>

        <DateInput
          date={production.date}
          setDate={date => setProduction({ ...production, date })}
        />

        <View>
          <Text style={styles.label}>Prodotti</Text>
          <View style={styles.list}>
            {productionItems.map(item => {
              
              const product = getProduct(item.product_id);
              
              if (!product) {
                return null;
              }

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
        </View>
        

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
            <Ionicons name="add-circle" size={25} />
            <Text>Aggiungi Prodotto</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 10, // padding interno se vuoi
    overflow: 'hidden',
  },
  form: {
    // backgroundColor: 'rgba(185, 117, 117, 1)',
    // padding: 10,
    // flex: 1,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  formContent: {
    // backgroundColor: 'rgba(117, 133, 185, 1)',
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
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',    
  },
});