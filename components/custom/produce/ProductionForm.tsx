import React from "react";

import { Pressable, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MyText from "../generic/MyText";

import { ProductionItemCard } from "./ProductionItemCard";

import type { Production } from "@/types/Production";

import { getProductFromId } from "@/components/api/productsApi";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useColor } from "@/hooks/use-color";

import { FormItem } from "../form/FormItem";
import { FormItemGeneric } from "../form/FormItemGeneric";
import { FormItemDate } from "../form/FromItemDate";

import uuid from 'react-native-uuid';

type ProductionFormProps = {
  production: Production;
  setProduction: React.Dispatch<React.SetStateAction<Production>>;
  setShowAddProductModal: (show: boolean) => void;
};

export function ProductionForm({
  production,
  setProduction,
  setShowAddProductModal,
}: ProductionFormProps) {
  const color = useColor();

  function removeProductionItem(id: string) {
    setProduction({
      ...production,
      body: production.body.filter((item) => item.id !== id),
    });
  }

  function handleItemClone(id: string) {

    const index = production.body.findIndex(item => item.id === id);
    if (index === -1) return;

    const item = production.body[index];

    const clonedItem = {
      ...item,
      id: uuid.v4().toString(),
    };

    const newBody = [...production.body];
    newBody.splice(index + 1, 0, clonedItem);

    setProduction({
      ...production,
      body: newBody,
    });
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.form}
        contentContainerStyle={styles.formContent}
        enableOnAndroid={true}
        extraScrollHeight={200}
        keyboardShouldPersistTaps="handled"
        enableAutomaticScroll={true}
      >
        <FormItem
          label="Titolo"
          input={production.title}
          onInputChange={(text) =>
            setProduction({ ...production, title: text })
          }
        />

        <FormItem
          label="Note"
          input={production.notes}
          onInputChange={(text) =>
            setProduction({ ...production, notes: text })
          }
          inputStyle={{ height: 60 }}
          multiLine
        />

        <FormItemDate
          label="Data"
          input={production.date}
          onInputChange={(text) => setProduction({ ...production, date: text })}
        />

        <FormItemGeneric label="Prodotti">
          <View style={styles.list}>
            {production.body.map((item) => {
              const product = getProductFromId(item.product_id);
              if (!product) return null;

              return (
                <ProductionItemCard
                  key={item.id}
                  product={product}
                  itemId={item.id}
                  remove={removeProductionItem}
                  clone={handleItemClone}
                  quantity={item.quantity}
                  setQuantity={(quantity) => {
                    setProduction(prev => ({
                      ...prev,
                      body: prev.body.map(i =>
                        i.id === item.id ? { ...i, quantity } : i
                      ),
                    }));
                  }}
                  weight={item.weight}
                  setWeight={(weight) => {
                    setProduction(prev => ({
                      ...prev,
                      body: prev.body.map(i =>
                        i.id === item.id ? { ...i, weight } : i
                      ),
                    }));
                  }}
                />
              );
            })}
          </View>
        </FormItemGeneric>

        <View style={{ alignItems: "center" }}>
          <Pressable
            onPress={() => setShowAddProductModal(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              backgroundColor: "rgb(46, 126, 90)",
              borderWidth: 1,
              borderRadius: 50,
              paddingHorizontal: 10,
              paddingVertical: 6,
              width: 225,
              height: 50,
              justifyContent: "center",
            }}
          >
            <Ionicons name="add-circle" size={25} color={color.text} />
            <MyText style={{ color: color.text }}>Aggiungi Prodotto</MyText>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    flex: 1,
  },
  form: {},
  formContent: {
    gap: 10,
  },
  list: {
    gap: 10,
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
  },
});
