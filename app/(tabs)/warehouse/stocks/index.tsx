import React, { useCallback, useState } from "react";

import { useFocusEffect } from "@react-navigation/native";

import { FlatList, View } from "react-native";

import type { Product } from "@/types/Product";

import { BodyContainerWithSearchAndFilters } from "@/components/custom/containers/BodyContainerWithSearchAndFilters";
import { LazyContainer } from "@/components/custom/containers/LazyContainer";
import { PageContainer } from "@/components/custom/containers/PageContainer";

import { StockCard } from "@/components/custom/stocks/StockCard";

import { getSortedItemsToDisplay } from "@/components/custom/product/productsSort";

import { getAllProducts } from "@/components/api/productsApi";

import { ProductsOrdering } from "@/components/custom/product/ProductsOrdering";


export default function Stocks() {

  const [products, setProducts] = useState<Product[]>(getAllProducts());
  const [productsToDisplay, setProductsToDisplay] = useState<Product[]>(products);
  
  useFocusEffect(
    useCallback(() => {
      const all = getAllProducts();
      setProducts([...all]);
    }, []),
  );

  return (
    <PageContainer>
    
      <BodyContainerWithSearchAndFilters
        items={products}
        setItemsToDisplay={setProductsToDisplay}
        getSortedItems={getSortedItemsToDisplay}
        searchingField="name"
        orderingComponent={ProductsOrdering}
      >
        <LazyContainer>
          <FlatList
            data={productsToDisplay}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <StockCard
                product={item}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        </LazyContainer>
      </BodyContainerWithSearchAndFilters>
    </PageContainer>
  );
}