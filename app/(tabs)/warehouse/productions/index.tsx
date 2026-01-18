import React, { useCallback, useState } from "react";

import { useFocusEffect } from "@react-navigation/native";

import type { Production } from "@/types/Production";

import { LazyContainer } from "@/components/custom/containers/LazyContainer";
import { PageContainer } from "@/components/custom/containers/PageContainer";

import { ProductionForm } from "@/components/custom/production/ProductionForm";

import { getSortedItemsToDisplay } from "@/components/custom/production/productionsSort";

import { FlatList, View } from "react-native";

import { deleteProduction, editProduction, getAllProductions } from "@/components/api/productionsApi";

import ProductionCard from "@/components/custom/production/ProductionCard";
import { useCrudActions } from "@/hooks/useCrudActions";
import { ItemEditModal } from "@/components/custom/ItemEditModal";
import { BodyContainerWithSearchAndFilters } from "@/components/custom/containers/BodyContainerWithSearchAndFilters";

import { ProductionsOrdering } from "@/components/custom/production/ProductionsOrdering";

export default function Productions() {
  
  const [productions, setProductions] = useState<Production[]>(getAllProductions());
  const [productionsToDisplay, setProductionsToDisplay] = useState<Production[]>(productions);

  const [productionToEdit, setProductionToEdit] = useState<Production | null>(null);
  
  const { updateItem, deleteItemWithConfirm } = useCrudActions<Production>({
    setItems: setProductions,
    updateApi: editProduction,
    deleteApi: deleteProduction,
    messages: {
      updateSuccess: "Produzione modificata",
      deleteSuccess: "Produzione eliminata",
      error: "Si è verificato un errore",
      deleteConfirm: (label) => `Sei sicuro di voler eliminare la produzione "${label}"?`,
    },
  });

  useFocusEffect(
    useCallback(() => {
      const all = getAllProductions();
      setProductions([...all]);
    }, []),
  );

  return (
    <PageContainer>

      {productionToEdit && (
        <ItemEditModal<Production>
          item={productionToEdit}
          formComponent={ProductionForm}
          onSave={(updatedProduction) => {
            updateItem(updatedProduction);
            setProductionToEdit(null);
          }}
          onClose={() => setProductionToEdit(null)}
        />
      )}
            
      <BodyContainerWithSearchAndFilters<Production>
        items={productions}
        setItemsToDisplay={setProductionsToDisplay}
        getSortedItems={getSortedItemsToDisplay}
        searchingField="title"
        orderingComponent={ProductionsOrdering}
      >
        <LazyContainer>
          <FlatList
            data={productionsToDisplay}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductionCard
                production={item}
                startEditingItem={() => setProductionToEdit(item)}
                deleteItem={deleteItemWithConfirm}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        </LazyContainer>
      </BodyContainerWithSearchAndFilters>
    </PageContainer>
  );
}
