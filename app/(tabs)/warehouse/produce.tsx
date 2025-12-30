import React, { useEffect, useState } from 'react';

import { useRouter } from 'expo-router';

import { FlatList, StyleSheet, TouchableHighlight, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import IconButton from '@/components/custom/IconButton';


import type { Product } from '@/types/Product';
import { initProduct } from '@/types/Product';
import type { Production } from '@/types/Production';
import { initProduction } from '@/types/Production';


import { EditModal } from '@/components/custom/EditModal';
import { ProductCard } from '@/components/custom/product/ProductCard';
import { ProductCreateModal } from '@/components/custom/product/ProductCreateModal';
import { ProductEditModal } from '@/components/custom/product/ProductEditModal';
import { SearchBar } from '@/components/custom/SearchBar';
import { Header } from '@/components/custom/Header';

import ProduceForm from '@/components/custom/produce/ProduceForm';

import { products } from '@/types/products';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Produce() {
  
  const router = useRouter();

  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const [product, setProduct] = useState<Product>(products.find(item => item.id === editingItemId) ?? initProduct);

  const [newProduction, setNewProduction] = useState<Production>(initProduction);

  const [productsToDisplay, setProductsToDisplay] = useState<Product[]>(products);
  const [searchText, setSearchText] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setProductsToDisplay(products.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())));
    }, 250);
  }, [searchText]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, gap: 20, }}>
        <ThemedView style={{ flex: 1 }}>

          <Header
            text="Produci"
            leftIconName="chevron-back-circle-outline"
            leftIconPress={() => router.back()}
            rightIconName="add-circle-outline"
            rightIconPress={() => router.back()}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginHorizontal: 40,
              marginVertical: 15,
            }}
          >
            <SearchBar
              placeholder="Cerca prodotto..."
              text={searchText}
              setText={setSearchText}
            />
            <TouchableHighlight
              onPress={() => setShowFilter(!showFilter)}
              underlayColor="transparent"
              style={{
                backgroundColor: '#f0f0f0',
                width: 50,
                height: 50,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',

              }}
            >
              <View>
                <Ionicons
                  name="filter"
                  size={30}
                  color="#888"
                />
              </View>
            </TouchableHighlight>

          </View>
          

          <View
            style={styles.bodyContainer}
          >
            <ProduceForm production={newProduction} setProduction={setNewProduction} />
          </View>

          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            action={{
              label: 'Ok',
              onPress: () => {
                setSnackbarVisible(false);
              },
            }}
            duration={5000}
            style={{ zIndex: 600 }}
          >
            Prodotto salvato con successo
          </Snackbar>

        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  
  mainContainer: {
    flex: 1,
    gap: 20,
  },
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  bodyContainer: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 20,
  }
});