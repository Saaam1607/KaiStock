import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { View } from "react-native";

import type { Production } from "@/types/Production";

import { getProductFromId } from "@/components/api/productsApi";

import { FormItem } from "../form/FormItem";
import { FormItemGeneric } from "../form/FormItemGeneric";
import { FormItemDate } from "../form/FromItemDate";

import { AddButton } from "../AddButton";

import { ProductQuantityItem } from "@/types/ProductQuantityItem";
import uuid from "react-native-uuid";
import { ModalContainer } from "../containers/ModalContainer";

import AddProductModal from "../modals/AddProductModal";

import { cloneProductionItem } from "@/utils/cloneFunctions";

import QuantityWeightCard from "../cards/QuantityWeightCard";

type ProductionFormProps = {
  item: Production;
  setItem: React.Dispatch<React.SetStateAction<Production>>;
  showMandatoryBorders?: boolean;
  oldItem?: Production | null;
};

export function ProductionForm({
  item,
  setItem,
  showMandatoryBorders = false,
  oldItem,
}: ProductionFormProps) {
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  function removeProductionItem(id: string) {
    setItem({
      ...item,
      body: item.body.filter((item) => item.id !== id),
    });
  }

  function handleProductionItemChange(
    item: ProductQuantityItem,
    field: keyof ProductQuantityItem,
    value: number,
  ) {
    setItem((prev) => ({
      ...prev,
      body: prev.body.map((i) =>
        i.id === item.id ? { ...i, [field]: value } : i,
      ),
    }));
  }

  function addItemToProduction(productId: string) {
    setItem((prev) => {
      return {
        ...prev,
        body: [
          ...prev.body,
          {
            id: uuid.v4().toString(),
            product_id: productId,
            quantity: 0,
            weight: 0,
          },
        ],
      };
    });
  }

  return (
    <View style={{ width: "100%", gap: 10, marginTop: 10 }}>
      <ModalContainer visible={showAddProductModal}>
        <AddProductModal
          modalVisible={showAddProductModal}
          setModalVisible={setShowAddProductModal}
          onSave={addItemToProduction}
        />
      </ModalContainer>

      <KeyboardAwareScrollView
        contentContainerStyle={{ gap: 10 }}
        enableOnAndroid={true}
        extraScrollHeight={200}
        keyboardShouldPersistTaps="handled"
        enableAutomaticScroll={true}
      >
        <FormItem
          label="Titolo"
          input={item.title}
          onInputChange={(text) => setItem({ ...item, title: text })}
        />

        <FormItem
          label="Note"
          input={item.notes}
          onInputChange={(text) => setItem({ ...item, notes: text })}
          inputStyle={{ height: 60 }}
          multiLine
        />

        <FormItemDate
          label="Data"
          input={item.date}
          onInputChange={(text) => setItem({ ...item, date: text })}
        />

        <FormItemGeneric label="Prodotti">
          <View style={{ gap: 10 }}>
            {item.body.map((item) => {
              const product = getProductFromId(item.product_id);
              if (!product) return null;

              return (
                <QuantityWeightCard
                  key={item.id}
                  product={product}
                  itemId={item.id}
                  remove={removeProductionItem}
                  clone={(id: string) => cloneProductionItem(id, setItem)}
                  quantity={item.quantity}
                  setQuantity={(quantity: number) => {
                    handleProductionItemChange(item, "quantity", quantity);
                  }}
                  weight={item.weight}
                  setWeight={(weight: number) => {
                    handleProductionItemChange(item, "weight", weight);
                  }}
                />
              );
            })}
          </View>
        </FormItemGeneric>

        <View style={{ alignItems: "flex-end" }}>
          <AddButton
            text="Aggiungi Prodotto"
            action={() => setShowAddProductModal(true)}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}