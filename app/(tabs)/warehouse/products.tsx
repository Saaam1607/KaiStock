import React, { useEffect, useState } from 'react';

import { useNavigation, useRouter } from 'expo-router';

import { FlatList } from 'react-native';

import type { Product } from '@/types/Product';
import { initProduct } from '@/types/Product';

import { PageContainer } from '@/components/custom/containers/PageContainer';
import { ModalContainer } from '@/components/custom/containers/ModalContainer';
import { BodyContainer } from '@/components/custom/containers/BodyContainer';

import { ProductCard } from '@/components/custom/product/ProductCard';
import { ProductEditModal } from '@/components/custom/product/ProductEditModal';
import { SearchBarWithFilters } from '@/components/custom/SearchBarWithFilters';

import { products } from '@/types/products';

import { GestureContainer } from '@/components/custom/GestureContainer';
import { useSnackbar } from '@/components/SnackbarProvider';

export default function Products() {
  
  const router = useRouter();
  const navigation = useNavigation();
    
  const { showSnackbar } = useSnackbar();

  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [itemEditModalVisible, setItemEditModalVisible] = useState(false);

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

  return (
    <GestureContainer
      leftAction={() => router.push('/(tabs)/warehouse/newProduct')}
      rightAction={() => navigation.goBack()}
    >
      <PageContainer>

        {/* Editing Modal */}
        <ModalContainer visible={itemEditModalVisible && product !== null}>
          <ProductEditModal
            modalVisible={itemEditModalVisible}
            setModalVisible={setItemEditModalVisible}
            product={product}
            onSave={(updatedProduct: Product) => {
              showSnackbar('Articolo modificato');
            }}
            onDiscard={() => {
              stopEditing();
            }}
          />
        </ModalContainer>

        {/* Body */}
        <BodyContainer>
          <SearchBarWithFilters
            placeholder="Cerca articolo..."
            text={searchText}
            setText={setSearchText}
            showFilter={showFilter}
            setShowFilter={setShowFilter}
          />
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
        </BodyContainer>

      </PageContainer>
    </GestureContainer>
  );
}