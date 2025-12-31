import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, TextInput, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DateInput from '../DateInput';
import { QuantityEditor } from '../QuantityEditor';
import { ItemModal } from '../ItemModal';

import type { Production } from '@/types/Production';
import type { ProductionBodyItem } from '@/types/Production';
import type { Product } from '@/types/Product';

import { products } from '@/types/products';
import Ionicons from '@expo/vector-icons/Ionicons';

type ProduceFormProps = {
  production: Production;
  setProduction: (product: Production) => void;
};

export default function ProduceForm({ production, setProduction }: ProduceFormProps) {
  
  const [selectedProductionItems, setSelectedProductionItems] = useState<ProductionBodyItem[]>([]);

  const [addProductModalVisible, setAddProductModalVisible] = useState(false);


  function addSelectedProductionItem(product_id: string) {
    setSelectedProductionItems([...selectedProductionItems, { product_id, quantity: 1 }]);
  }

  function removeSelectedProductionItem(product_id: string) {
    setSelectedProductionItems(selectedProductionItems.filter(item => item.product_id !== product_id));
  }

  function getProduct(product_id: string): Product | undefined {
    return products.find(item => item.id === product_id);
  }

  return (
    <View style={styles.container}>
      
                {/* {addProductModalVisible && (
                  <>
                    <View style={styles.overlay} />
      
                    <ItemModal

                      modalVisible={addProductModalVisible}
                      modalTitle="Aggiungi Prodotto"

                      item: T;

                      okText: string;
                      notOkText: string;

                      onOk: (updatedItem: T) => void;
                      onNotOk: () => void;

                      children?: React.ReactNode;

                      modalVisible={itemCreateModalVisible}
                      setModalVisible={setItemCreateModalVisible}
                      product={product}
                      onSave={(updatedProduct: Product) => {
                        setSnackbarVisible(true);
                      }}
                    />
                  </>
                )}
       */}
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
          {selectedProductionItems.map(item => {
            
            const product = getProduct(item.product_id);
            
            if (!product) {
              return null;
            }

            return (
              <View
                key={product.id}
                // onPress={() => removeSelectedProductionItem(product.id)}
                style={styles.input}
              >
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ alignItems: 'center'}}>
                    <View style={{ alignItems: 'center' }}>
                      <QuantityEditor
                          quantity={item.quantity}
                          setQuantity={quantity => {
                            setSelectedProductionItems(selectedProductionItems.map(i => {
                              if (i.product_id === product.id) {
                                return { ...i, quantity };
                              }
                              return i;
                            }));
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
          onPress={() => addSelectedProductionItem('')}
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


        {/* <Text style={styles.label}>Prodotti disponibili</Text>
        <View style={styles.list}>
          {products.filter(item => !selectedProductionItems.find(i => i.product_id === item.id)).map(item => (
            <Pressable
              key={item.id}
              onPress={() => addSelectedProductionItem(item.id)}
              style={styles.input}
            >
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>{item.price} €/{item.uom}</Text>
            </Pressable>
          ))}
        </View> */}

      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  container: {
    flex: 1,
    // padding: 10, // padding interno se vuoi
    overflow: 'hidden',
  },
  form: {
    // backgroundColor: 'rgba(185, 117, 117, 1)',
    // padding: 10,
    flex: 1,
  },
  formContent: {
    // backgroundColor: 'rgba(117, 133, 185, 1)',
  },
  list: {},
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