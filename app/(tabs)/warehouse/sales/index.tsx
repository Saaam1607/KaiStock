import React, { useCallback, useState } from "react";

import { useFocusEffect } from "@react-navigation/native";

import { BodyContainer } from "@/components/custom/containers/BodyContainer";
import { LazyContainer } from "@/components/custom/containers/LazyContainer";
import { ModalContainer } from "@/components/custom/containers/ModalContainer";
import { PageContainer } from "@/components/custom/containers/PageContainer";

import { SaleForm } from "@/components/custom/sale/SaleForm";

import { getSortedItemsToDisplay } from "@/components/custom/sale/salesSort";

import { FlatList } from "react-native";

import { getAllSales, deleteSale, editSale } from "@/components/api/salesApi";

import type { Sale } from "@/types/Sale";

import SaleCard from "@/components/custom/sale/SaleCard";
import { useCrudActions } from "@/hooks/useCrudActions";
import { ItemEditModal } from "@/components/custom/ItemEditModal";
import { BodyContainerWithSearchAndFilters } from "@/components/custom/containers/BodyContainerWithSearchAndFilters";

import { SalesOrdering } from "@/components/custom/sale/SalesOrdering";

export default function Sales() {

  const [sales, setSales] = useState<Sale[]>(getAllSales());
  const [salesToDisplay, setSalesToDisplay] = useState<Sale[]>(sales);

  const [saleToEdit, setSaleToEdit] = useState<Sale | null>(null);

  const { updateItem, deleteItemWithConfirm } = useCrudActions<Sale>({
    setItems: setSales,
    updateApi: editSale,
    deleteApi: deleteSale,
    messages: {
      updateSuccess: "Vendita modificata",
      deleteSuccess: "Vendita eliminata",
      error: "Si è verificato un errore",
      deleteConfirm: (label) => `Sei sicuro di voler eliminare la vendita "${label}"?`,
    },
  });

  useFocusEffect(
    useCallback(() => {
      const all = getAllSales();
      setSales([...all]);
    }, []),
  );
      
  return (
    <PageContainer>

      {saleToEdit && (
        <ItemEditModal<Sale>
          item={saleToEdit}
          formComponent={SaleForm}
          onSave={(updatedSale) => {
            updateItem(updatedSale);
            setSaleToEdit(null);
          }}
          onClose={() => setSaleToEdit(null)}
        />
      )}

      <BodyContainerWithSearchAndFilters<Sale>
        items={sales}
        setItemsToDisplay={setSalesToDisplay}
        getSortedItems={getSortedItemsToDisplay}
        searchingField="title"
        orderingComponent={SalesOrdering}
      >
        <LazyContainer>
          <FlatList
            data={salesToDisplay}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SaleCard
                sale={item}
                startEditingItem={() => setSaleToEdit(item)}
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
