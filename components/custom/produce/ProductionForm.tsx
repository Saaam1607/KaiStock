import React, { useState, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import DateInput from '../DateInput';
import { QuantityEditor } from '../QuantityEditor';

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
        <Text style={styles.label}>Titolo</Text>
        <TextInput
          style={styles.input}
          value={production.title}
          onChangeText={text => setProduction({ ...production, title: text })}
        />

        <Text style={styles.label}>Note</Text>
        <TextInput
          style={[styles.input, { height: 60 }]}
          value={production.notes}
          onChangeText={text => setProduction({ ...production, notes: text })}
          multiline
        />

        <DateInput
          date={production.date}
          setDate={date => setProduction({ ...production, date })}
        />

        <Text style={styles.label}>Prodotti</Text>
        <View style={styles.list}>
          {productionItems.map(item => {
            
            const product = getProduct(item.product_id);
            
            if (!product) {
              return null;
            }

            return (
              <View
                key={product.id}
                style={styles.input}
              >
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ alignItems: 'center'}}>
                    <View style={{ alignItems: 'center' }}>
                      <QuantityEditor
                          quantity={item.quantity}
                          setQuantity={quantity => {
                            // setSelectedProductionItems(selectedProductionItems.map(i => {
                            //   if (i.product_id === product.id) {
                            //     return { ...i, quantity };
                            //   }
                            //   return i;
                            // }));
                          }}
                        />
                    </View>
                  </View>
                  <View>
                    <Text>{ product.name}</Text>
                    <Text>{ product.description}</Text>
                    <Text>{ product.price} €/{  product.uom}</Text>
                  </View>
                </View>

                <View >
                  <Pressable
                    onPress={() => removeSelectedProductionItem(product.id)}
                    style={{
                      position: 'absolute',
                      top: -15,
                      right: -10,
                    }}
                  >
                    <Ionicons
                      name="close-circle"
                      size={40}
                      color="rgba(126, 46, 46, 1)"
                    />
                  </Pressable>
                </View>

              </View>
            )
            
          })}
        </View>

        <Pressable
          onPress={() => setShowAddProductModal(true)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            borderColor: 'rgb(46, 126, 90)',
            backgroundColor: 'rgba(190, 229, 190, 1)',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 6,
            marginTop: 10,
            width: 300,
            justifyContent: 'center',
          }}
        >
          <Ionicons name="add" size={25} color="rgb(46, 126, 90)" />
          <Text>Aggiungi Prodotto</Text>
        </Pressable>
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
  },
  list: {
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