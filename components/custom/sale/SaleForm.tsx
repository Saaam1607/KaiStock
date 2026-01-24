import React, { useState, useEffect } from 'react';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { StyleSheet, View } from 'react-native';
import MyText from '../generic/MyText';

import type { Sale } from '@/types/Sale';
import type { SoldProduct } from '@/types/SoldProduct';

import { getProductFromId } from '@/components/api/productsApi';

import { useColor } from '@/hooks/use-color';

import { FormCheck } from '../form/FormCheck';
import { FormItem } from '../form/FormItem';
import { FormItemGeneric } from '../form/FormItemGeneric';
import { FormItemDate } from '../form/FromItemDate';

import AddProductModal from '../modals/AddProductModal';

import uuid from 'react-native-uuid';
import { ModalContainer } from '../containers/ModalContainer';
import { AddButton } from '../AddButton';

import { cloneSaleItem } from '@/utils/cloneFunctions';

import QuantityWeightCard from '../cards/QuantityWeightCard';

type SaleFormProps = {
  item: Sale;
  setItem: React.Dispatch<React.SetStateAction<Sale>>;
  showMandatoryBorders?: boolean;
  oldItem?: Sale | null;
};

export function SaleForm({ item, setItem, showMandatoryBorders = false, oldItem }: SaleFormProps) {

  const color = useColor();

  const [showAddProductModal, setShowAddProductModal] = useState(false);

  function removeSaleItem(id: string) {
    setItem({
      ...item,
      body: item.body.filter((item) => item.id !== id),
    });
  }

  function handleSaleItemChange( item: SoldProduct, field: keyof SoldProduct, value: number ) {
    setItem((prev) => ({
      ...prev,
      body: prev.body.map((i) =>
        i.id === item.id ? { ...i, [field]: value } : i,
      ),
    }));
  }

  function addItemToSale(productId: string) {
    const product = getProductFromId(productId);
    if (!product) return;
    
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
            unit_price: product.price,
            uom: product.uom,
          },
        ],
      };
    });
  }
  
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = item.body.reduce((acc, item) => acc + item.quantity * item.unit_price * item.weight, 0);
    const newTotalPrice = total;
    setTotalPrice(newTotalPrice);
  }, [item]);

  return (
    <View style={{ width: "100%", gap: 10, marginTop: 10 }}>

      <ModalContainer visible={showAddProductModal}>
        <AddProductModal
          modalVisible={showAddProductModal}
          setModalVisible={setShowAddProductModal}
          onSave={addItemToSale}
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
          onInputChange={text => setItem({ ...item, title: text })}
        />
        <FormItem
          label="Note"
          input={item.notes}
          onInputChange={text => setItem({ ...item, notes: text })}
          inputStyle={{ height: 60 }}
          multiLine
        />
        <FormItem
          label="Prenotato da"
          input={item.to}
          onInputChange={text => setItem({ ...item, to: text })}
          showMandatoryBorders={showMandatoryBorders && item.to === ''}
        />
        <FormCheck
          label="Pagato"
          input={item.paid}
          onInputChange={text => setItem({ ...item, paid: text })}
          labelOnRight
        />
        <FormCheck
          label="Consegnato"
          input={item.delivered}
          onInputChange={text => setItem({ ...item, delivered: text })}
          labelOnRight
        />
        <FormItemDate
          label="Data"
          input={item.date}
          onInputChange={text => setItem({ ...item, date: text })}
        />
        <FormItem
          label={`Prezzo totale (€)`}
          input={totalPrice.toString()}
        />


        
        <FormItem
          label={`Sconto (€)`}
          input={item.deltaDiscount.toString()}
          onInputChange={text => setItem({ ...item, deltaDiscount: parseFloat(text) })}
        />
        <FormItemGeneric label="Articoli">
          <View style={styles.list}>
            {item.body.map(item => {
              
              const product = getProductFromId(item.product_id);
              if (!product) return null;

              return (
                <QuantityWeightCard
                  key={item.id}
                  product={product}
                  itemId={item.id}
                  remove={removeSaleItem}
                  clone={(id: string) => cloneSaleItem(id, setItem)}
                  quantity={item.quantity}
                  setQuantity={(quantity: number) => {
                    handleSaleItemChange(item, "quantity", quantity);
                  }}
                  weight={item.weight}
                  setWeight={(weight: number) => {
                    handleSaleItemChange(item, "weight", weight);
                  }}
                >
                  <MyText style={{ color: color.textLighter }}>{"Prezzo per articolo: " + item.weight * item.unit_price + " €"}</MyText>
                  <MyText style={{ color: color.textLighter }}>{"Prezzo totale: " + item.weight * item.unit_price * item.quantity + " €"}</MyText>
                </QuantityWeightCard>
              )
            })}
          </View>
        </FormItemGeneric>

        <View style={{ alignItems: 'flex-end' }}>
          <AddButton
            text="Aggiungi Prodotto"
            action={() => setShowAddProductModal(true)}
          />
        </View>
        <MyText style={{ color: color.textLighter, marginTop: 20, fontSize: 12 }}>* Campo Obbligatorio </MyText>

      </KeyboardAwareScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  form: {
  },
  formContent: {
    gap: 10,
  },
  list: {
    gap: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',    
  },
});