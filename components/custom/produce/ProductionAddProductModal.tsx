import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable, TouchableHighlight } from 'react-native';

import { ItemModal } from '../ItemModal';

import { SearchBar } from '../SearchBar';
import { SearchBarWithFilters } from '../SearchBarWithFilters';

import type { Product } from '@/types/Product';

import { products } from '@/types/products';

type ProductionAddProductModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  selectedIds: string[];
  onSave: (selectedIds: string[]) => void;
};

export function ProductionAddProductModal({ modalVisible, setModalVisible, selectedIds, onSave }: ProductionAddProductModalProps) {
  
  const [productsToDisplay, setProductsToDisplay] = useState<Product[]>(products);
  const [tmpSelectedIds, setTmpSelectedIds] = useState<string[]>(selectedIds);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setProductsToDisplay(products.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())));
    }, 250);
  }, [searchText]);

  function selectId(id: string) {
    setTmpSelectedIds(prev => [...prev, id]);
  }

  function unselectId(id: string) {
    setTmpSelectedIds(prev => prev.filter(item => item !== id));
  }

  function managePress(id: string) {
    if (tmpSelectedIds.includes(id)) {
      unselectId(id);
    } else {
      selectId(id);
    }
  }

  function isIdSelected(id: string) {
    return tmpSelectedIds.includes(id);
  }

  const handleSave = () => {
    onSave(selectedIds);
    setModalVisible(false);
  };

  return (
    <ItemModal
      modalVisible={modalVisible}
      modalTitle="Aggiungi articolo"
      okText="Aggiungi"
      notOkText="Annulla"
      onOk={handleSave}
      onNotOk={() => setModalVisible(false)}
    >
      <View
        style={styles.bodyContainer}
      >

        <SearchBar
          placeholder="Cerca prodotto..."
          text={searchText}
          setText={setSearchText}
        />

        <View style={{ flex: 1 }}>
          <FlatList
            data={productsToDisplay}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable
                style={{
                  padding: 10,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: isIdSelected(item.id) ? 'red' : '#ccc',
                }}
                onPress={() => managePress(item.id)}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#666',
                  }}
                >
                  {item.description}
                </Text>
              </Pressable>
            )}
            contentContainerStyle={{
              gap: 10
            }}
          />
        </View>
        
      </View>
    </ItemModal>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    gap: 20,
    flex: 1,
  }
});