import React, { useEffect, useState } from 'react';

import { useRouter } from 'expo-router';

import { FlatList, StyleSheet, TouchableHighlight, View, Pressable, Text } from 'react-native';
import { Snackbar } from 'react-native-paper';

import { PageContainer } from '@/components/custom/containers/PageContainer';
import { ModalContainer } from '@/components/custom/containers/ModalContainer';
import { HeaderContainer } from '@/components/custom/containers/HeaderContainer';
import { BodyContainer } from '@/components/custom/containers/BodyContainer';

import type { Product } from '@/types/Product';
import { initProduct } from '@/types/Product';
import type { Production } from '@/types/Production';
import { initProduction } from '@/types/Production';

import { SearchBar } from '@/components/custom/SearchBar';
import { SearchBarWithFilters } from '@/components/custom/SearchBarWithFilters';
import { Header } from '@/components/custom/Header';

import { ProductionAddProductModal } from '@/components/custom/produce/ProductionAddProductModal';
import { ProductionForm } from '@/components/custom/produce/ProductionForm';

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

  const [showAddProductModal, setShowAddProductModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setProductsToDisplay(products.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())));
    }, 250);
  }, [searchText]);

  return (
    <PageContainer>
    
      {/* Modal */}
      <ModalContainer visible={showAddProductModal}>
        <ProductionAddProductModal
          modalVisible={showAddProductModal}
          setModalVisible={setShowAddProductModal}
          selectedIds={[]}
          onSave={(selectedIds) => {
            setSnackbarVisible(true);
          }}
        />
      </ModalContainer>

      {/* Header */}
      <HeaderContainer>
        <Header
          text="Produci"
          leftIconName="chevron-back-circle-outline"
          leftIconPress={() => router.back()}
          rightIconName="add-circle-outline"
          rightIconPress={() => router.back()}
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
          <ProductionForm production={newProduction} setProduction={setNewProduction} />
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
  )
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    gap: 20,
  }
});