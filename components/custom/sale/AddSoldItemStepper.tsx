import React, { useEffect, useState } from "react";

import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import MyText from "../generic/MyText";

import { useColor } from "@/hooks/use-color";

import Ionicons from "@expo/vector-icons/Ionicons";

import { Button } from "../Button";
import { SearchBar } from "../searching/SearchBar";
import { Stepper } from "../Stepper";

import type { Product } from "@/types/Product";

import { getAllProducts } from "@/components/api/productsApi";

import { CardDescription, CardTitle } from "../containers/Card";
import { FormItem } from "../form/FormItem";

type AddSoldItemStepperProps = {
  handleSubmit: (product: Product, weight: number, quantity: number) => void;
};

export function AddSoldItemStepper({ handleSubmit }: AddSoldItemStepperProps) {
  const color = useColor();
  const products = getAllProducts();
  const [productsToDisplay, setProductsToDisplay] =
    useState<Product[]>(products);

  const [step, setStep] = useState<number>(0);

  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined,
  );
  const [weightText, setWeightText] = useState("0");
  const [quantityText, setQuantityText] = useState("0");

  const [pricePerItem, setPricePerItem] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setProductsToDisplay(
        products.filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    }, 250);
  }, [searchText]);

  useEffect(() => {
    const weight = Number(weightText);
    const quantity = Number(quantityText);
    const price = selectedProduct?.price ?? 0;
    const total = weight * quantity * price;
    setPricePerItem(price);
    setTotalPrice(total);
  }, [weightText, quantityText]);

  function handleNextStep() {
    if (step < maxStep) {
      setStep(step + 1);
    }
  }

  function handlePreviousStep() {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  function getProduct(product_id: string): Product | undefined {
    return products.find((item) => item.id === product_id);
  }

  function handleProductSelect(id: string) {
    const product = getProduct(id);
    setSelectedProduct(product);
    handleNextStep();
  }

  function hadleItemSubmit() {
    if (selectedProduct && quantityText !== "0" && weightText !== "0") {
      handleSubmit(selectedProduct, Number(weightText), Number(quantityText));
    }
  }

  const content = [
    <>
      <View style={{ gap: 5, flex: 1 }}>
        <SearchBar
          placeholder="Cerca prodotto..."
          text={searchText}
          setText={setSearchText}
        />
        <FlatList
          data={productsToDisplay}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={{
                padding: 10,
                borderRadius: 50,
                borderWidth: 1,
                backgroundColor: color.cardBackground,
                borderColor: color.cardBackground,
                minHeight: 80,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => handleProductSelect(item.id)}
            >
              <View style={{ flexDirection: "row", gap: 10 }}>
                <View style={{ justifyContent: "center" }}>
                  <View
                    style={{
                      backgroundColor: color.cardImageBackground,
                      width: 60,
                      height: 60,
                      borderRadius: 40,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons
                      name={"images"}
                      size={20}
                      color={color.cardImage}
                    />
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <MyText style={{ fontWeight: "bold", color: color.text }}>
                    {item.name}
                  </MyText>
                  <MyText style={{ fontSize: 12, color: color.textLighter }}>
                    {item.description}
                  </MyText>
                </View>
              </View>
            </Pressable>
          )}
          contentContainerStyle={{
            gap: 5,
          }}
        />
      </View>
    </>,
    <>
      <View style={{ gap: 10, flexDirection: "column", flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          {selectedProduct && (
            <View style={{ gap: 10 }}>
              <CardTitle value={selectedProduct.name} />
              <CardDescription
                value={
                  selectedProduct.price.toString() + " €/" + selectedProduct.uom
                }
              />
              <FormItem
                label={`Peso (${selectedProduct.uom})`}
                input={weightText}
                onInputChange={(text) => {
                  if (/^[0-9]*\.?[0-9]*$/.test(text)) {
                    setWeightText(text);
                  }
                }}
                keyboardType="decimal-pad"
              />
              <FormItem
                label={`Numero di articoli`}
                input={quantityText}
                onInputChange={(text) => {
                  if (/^[0-9]*\.?[0-9]*$/.test(text)) {
                    setQuantityText(text);
                  }
                }}
                keyboardType="decimal-pad"
              />
              <FormItem
                label={`Prezzo per articolo (€)`}
                input={pricePerItem.toString()}
              />
              <FormItem
                label={`Prezzo totale (€)`}
                input={totalPrice.toString()}
              />
            </View>
          )}
        </ScrollView>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Button text="Completa" onPress={hadleItemSubmit} />
        </View>
      </View>
    </>,
  ];

  const maxStep = content.length - 1;

  return <Stepper content={content} step={step} setStep={setStep}></Stepper>;
}

const styles = StyleSheet.create({});
