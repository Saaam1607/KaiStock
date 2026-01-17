import React, { useEffect, useState } from 'react';

import { FlatList } from 'react-native';

import type { Product } from '@/types/Product';
import { initProduct } from '@/types/Product';

import { BodyContainer } from '@/components/custom/containers/BodyContainer';
import { LazyContainer } from '@/components/custom/containers/LazyContainer';
import { PageContainer } from '@/components/custom/containers/PageContainer';

import { StockCard } from '@/components/custom/stocks/StockCard';
import { SearchBarWithFilters } from '@/components/custom/SearchBarWithFilters';

import { getAllProducts } from '@/components/api/productsApi';

import { useSnackbar } from '@/components/SnackbarProvider';

export default function Stocks() {
  
  const { showSnackbar } = useSnackbar();

  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [itemEditModalVisible, setItemEditModalVisible] = useState(false);

  const products = getAllProducts();

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
    <PageContainer>

      {/* Body */}
      <BodyContainer>
        <SearchBarWithFilters
          placeholder="Cerca articolo..."
          text={searchText}
          setText={setSearchText}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
        />
        <LazyContainer>
          <FlatList
            data={productsToDisplay}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <StockCard
                product={item}
                startEditingItem={startEditingItem}
              />
            )}
            contentContainerStyle={{
              gap: 10
            }}
          />
        </LazyContainer>

      </BodyContainer>

    </PageContainer>
  );
}