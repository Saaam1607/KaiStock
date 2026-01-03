import React, { useEffect, useState } from 'react';

import { useRouter } from 'expo-router';

import { FlatList, StyleSheet, View } from 'react-native';

import type { Product } from '@/types/Product';
import { initProduct } from '@/types/Product';

import { PageContainer } from '@/components/custom/containers/PageContainer';
import { ModalContainer } from '@/components/custom/containers/ModalContainer';
import { HeaderContainer } from '@/components/custom/containers/HeaderContainer';
import { BodyContainer } from '@/components/custom/containers/BodyContainer';
import { MySnackBar } from '@/components/custom/MySnackBar';

import { ProductCard } from '@/components/custom/product/ProductCard';
import { ProductCreateModal } from '@/components/custom/product/ProductCreateModal';
import { ProductEditModal } from '@/components/custom/product/ProductEditModal';
import { SearchBarWithFilters } from '@/components/custom/SearchBarWithFilters';
import { Header } from '@/components/custom/Header';

import { products } from '@/types/products';

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
      <ModalContainer visible={itemCreateModalVisible}>
        <ProductCreateModal
          modalVisible={itemCreateModalVisible}
          setModalVisible={setItemCreateModalVisible}
          product={product}
          onSave={(updatedProduct: Product) => {
            setSnackbarVisible(true);
          }}
        />
      </ModalContainer>

      {/* Editing Modal */}
      <ModalContainer visible={itemEditModalVisible && product !== null}>
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
      </ModalContainer>

      {/* Header */}
      <HeaderContainer>
        <Header
          text="Prodotti"
          leftIconName="chevron-back"
          leftIconPress={() => router.back()}
          rightIconName="add"
          rightIconPress={() => startCreatingNewItem()}
        />
      </HeaderContainer>

      {/* Body */}
      <BodyContainer>

        <SearchBarWithFilters
          placeholder="Cerca prodotto..."
          text={searchText}
          setText={setSearchText}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
        />

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
      <MySnackBar
        visible={snackbarVisible}
        setVisible={setSnackbarVisible}
        message="Prodotto salvato con successo"
      />

    </PageContainer>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    gap: 20,
  }
});