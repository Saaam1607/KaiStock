import React, { useEffect, useState } from 'react';

import { useRouter } from 'expo-router';

import { FlatList, StyleSheet, TouchableHighlight, View } from 'react-native';
import { Snackbar } from 'react-native-paper';

import type { Product } from '@/types/Product';
import { initProduct } from '@/types/Product';

import { PageContainer } from '@/components/custom/containers/PageContainer';
import { HeaderContainer } from '@/components/custom/containers/HeaderContainer';
import { BodyContainer } from '@/components/custom/containers/BodyContainer';

import { ProductCard } from '@/components/custom/product/ProductCard';
import { ProductCreateModal } from '@/components/custom/product/ProductCreateModal';
import { ProductEditModal } from '@/components/custom/product/ProductEditModal';
import { SearchBar } from '@/components/custom/SearchBar';
import { Header } from '@/components/custom/Header';

import { products } from '@/types/products';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Products() {
  
  const router = useRouter();

  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [itemEditModalVisible, setItemEditModalVisible] = useState(false);
  const [itemCreateModalVisible, setItemCreateModalVisible] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const [product, setProduct] = useState<Product>(products.find(item => item.id === editingItemId) ?? initProduct);

  const [productsToDisplay, setProductsToDisplay] = useState<Product[]>(products);
  const [searchText, setSearchText] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setProductsToDisplay(products.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())));
    }, 250);
  }, [searchText]);
  
  function startEditingItem(itemId: string) {
    setProduct(productsToDisplay.find(item => item.id === itemId) ?? initProduct);
    setEditingItemId(itemId);
    setItemEditModalVisible(true);
  }

  function stopEditing() {
    setEditingItemId(null);
  }

  function startCreatingNewItem() {
    setProduct(initProduct);
    setItemCreateModalVisible(true);
  }

  return (
    <PageContainer>

      {/* Creation Modal */}
      {itemCreateModalVisible && (
        <>
          <View style={styles.overlay} />

          <ProductCreateModal
            modalVisible={itemCreateModalVisible}
            setModalVisible={setItemCreateModalVisible}
            product={product}
            onSave={(updatedProduct: Product) => {
              setSnackbarVisible(true);
            }}
          />
        </>
      )}

      {/* Editing Modal */}
      {itemEditModalVisible && product && (
        <>
          <View style={styles.overlay} />

          <ProductEditModal
            modalVisible={itemEditModalVisible}
            setModalVisible={setItemEditModalVisible}
            product={product}
            onSave={(updatedProduct: Product) => {
              setSnackbarVisible(true);
            }}
            onDiscard={() => {
              stopEditing();
            }}
          />
        </>
      )}

      {/* Header */}
      <HeaderContainer>
        <Header
          text="Prodotti"
          leftIconName="chevron-back-circle-outline"
          leftIconPress={() => router.back()}
          rightIconName="add-circle-outline"
          rightIconPress={() => startCreatingNewItem()}
        />
      </HeaderContainer>

      {/* Body */}
      <BodyContainer>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
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
          <FlatList
            data={productsToDisplay}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                startEditingItem={startEditingItem}
              />
            )}
            contentContainerStyle={{
              gap: 10
            }}
          />
        </View>
      </BodyContainer>

      {/* Notifications */}
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

    </PageContainer>
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
  bodyContainer: {
    flex: 1,
    gap: 20,
  }
});