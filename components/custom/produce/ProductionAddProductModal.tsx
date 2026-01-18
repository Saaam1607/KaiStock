import React, { useEffect, useState } from 'react';

import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import MyText from '../generic/MyText';

import { useColor } from '@/hooks/use-color';

import { ItemModal } from '../ItemModal';

import { SearchBar } from '../SearchBar';

import type { Product } from '@/types/Product';

import { getAllProducts } from '@/components/api/productsApi';

import Ionicons from '@expo/vector-icons/Ionicons';

type ProductionAddProductModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onSave: (selectedId: string) => void;
};

export function ProductionAddProductModal({ modalVisible, setModalVisible, onSave }: ProductionAddProductModalProps) {
  
  const color = useColor();
  
  const products = getAllProducts();

  const [productsToDisplay, setProductsToDisplay] = useState<Product[]>(products);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setProductsToDisplay(products.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())));
    }, 250);
  }, [searchText]);

  function managePress(id: string) {
    onSave(id);
    setModalVisible(false);
  }

  return (
    <ItemModal
      modalVisible={modalVisible}
      modalTitle="Aggiungi articolo"
    >
      <View style={styles.bodyContainer} >

        <SearchBar
          placeholder="Cerca prodotto..."
          text={searchText}
          setText={setSearchText}
        />

        <View style={{ flex: 1 }}>
          <FlatList
            data={productsToDisplay}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 5 }}
            renderItem={({ item }) => (
              <Pressable
                style={{
                  padding: 10,
                  borderRadius: 50,
                  borderWidth: 1,
                  backgroundColor: color.cardBackground,
                  borderColor: color.cardBackground,
                  minHeight: 80,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => managePress(item.id)}
              >
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <View style={{ justifyContent: 'center'}}>
                    <View style={{
                      backgroundColor: color.cardImageBackground,
                      width: 60,
                      height: 60,
                      borderRadius: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <Ionicons name={"images"} size={20} color={color.cardImage} />
                    </View>
                  </View>
                  <View style={{ flex: 1 }}>
                    <MyText style={{ fontWeight: 'bold', color: color.text }}>
                      {item.name}
                    </MyText>
                    <MyText style={{ fontSize: 12, color: color.textLighter }}>
                      {item.description}
                    </MyText>  
                  </View>
                </View>

              </Pressable>
            )}
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