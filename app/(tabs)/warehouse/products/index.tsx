import React, { useCallback, useState } from "react";

import { useFocusEffect } from "@react-navigation/native";

import { FlatList } from "react-native";

import type { Product } from "@/types/Product";
import { initProduct } from "@/types/Product";

import { BodyContainer } from "@/components/custom/containers/BodyContainer";
import { LazyContainer } from "@/components/custom/containers/LazyContainer";
import { ModalContainer } from "@/components/custom/containers/ModalContainer";
import { PageContainer } from "@/components/custom/containers/PageContainer";

import { ProductCard } from "@/components/custom/product/ProductCard";
import { ProductEditModal } from "@/components/custom/product/ProductEditModal";
import { SearchBarWithFilters } from "@/components/custom/searching/SearchBarWithFilters";

import { getAllProducts, editProduct, deleteProduct } from "@/components/api/productsApi";
import { useCrudActions } from "@/hooks/useCrudActions";
import { ItemEditModal } from "@/components/custom/ItemEditModal";

import ProductForm from "@/components/custom/product/ProductForm";
import { BodyContainerWithSearchAndFilters } from "@/components/custom/containers/BodyContainerWithSearchAndFilters";
import { getSortedItemsToDisplay } from "@/components/custom/product/productsSort";
import { ProductsOrdering } from "@/components/custom/product/ProductsOrdering";

export default function Products() {

  const [products, setProducts] = useState<Product[]>(getAllProducts());
  const [productsToDisplay, setProductsToDisplay] = useState<Product[]>(products);

  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  
  const { updateItem, deleteItemWithConfirm } = useCrudActions<Product>({
    setItems: setProducts,
    updateApi: editProduct,
    deleteApi: deleteProduct,
    messages: {
      updateSuccess: "Prodotto modificato",
      deleteSuccess: "Prodotto eliminato",
      error: "Si è verificato un errore",
      deleteConfirm: (label) => `Sei sicuro di voler eliminare il prodotto "${label}"?`,
    },
  });

  useFocusEffect(
    useCallback(() => {
      const all = getAllProducts();
      setProducts([...all]);
    }, []),
  );

  return (
    <PageContainer>

      {productToEdit && (
        <ItemEditModal<Product>
          item={productToEdit}
          formComponent={ProductForm}
          onSave={(updatedSale) => {
            updateItem(updatedSale);
            setProductToEdit(null);
          }}
          onClose={() => setProductToEdit(null)}
        />
      )}

      <BodyContainerWithSearchAndFilters<Product>
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
              <ProductCard
                product={item}
                startEditingItem={() => setProductToEdit(item)}
                deleteItem={deleteItemWithConfirm}
              />
            )}
            contentContainerStyle={{
              gap: 10,
            }}
          />
        </LazyContainer>
      </BodyContainerWithSearchAndFilters>

    </PageContainer>
  );
}
