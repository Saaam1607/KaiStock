import React from 'react';

import { Pressable, StyleSheet, View } from 'react-native';
import MyText from '../generic/MyText';
import MyTextInput from '../generic/MyTextInput';

import { Card } from '../containers/Card';

import { QuantityEditor } from '../QuantityEditor';
import { WeightEditor } from '../WeightEditor';

import type { Product } from '@/types/Product';

import Ionicons from '@expo/vector-icons/Ionicons';

import { useColor } from '@/hooks/use-color';
import { useAlert } from '@/components/providers/AlertProvider';

type ProductionItemCardProps = {
  product: Product;
  itemId: string; 
	remove: (id: string) => void;
  clone: (id: string) => void;
	quantity: number;
	setQuantity: (quantity: number) => void;
  weight: number;
  setWeight: (weight: number) => void;
};

export function ProductionItemCard({ product, itemId, remove, clone, quantity, setQuantity, weight, setWeight }: ProductionItemCardProps) {

  const color = useColor();
  const { showAlert } = useAlert();

  function handleDelete() {
    showAlert({
      title: 'Conferma eliminazione',
      message: `Sei sicuro di voler eliminare ${product.name} dalla produzione?`,
      okText: 'Elimina',
      notOkText: 'Annulla',
      onOk: () => remove(itemId),
      onNotOk: () => {},
    });
  }

  return (
    <Card
      isDeletable={true}
      deleteAction={handleDelete}
      isDuplicable={true}
      duplicateAction={() => clone(itemId)}
    >
      <View key={product.id} style={{ flexDirection: 'row', flexGrow: 1, gap: 10, }}>
        
        <View style={{
          backgroundColor: color.cardImageBackground,
          width: 60,
          height: 60,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Ionicons name={"images"} size={30} color={color.cardImage} />
        </View>

        <View style={{ flexDirection: 'column', gap: 10, flex: 1 }}>

          <View style={{ gap: 10 }}>
            <MyText style={{ color: color.text }}>{product.name}</MyText>
            <MyText style={{ color: color.textLighter }}>{product.description}</MyText>
            <MyText style={{ color: color.textLighter }}>{product.price} €/{product.uom}</MyText>
          </View>
          <View>
            <MyText style={{ color: color.textLighter }}>Peso</MyText>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <WeightEditor
                weight={weight}
                setWeight={setWeight}
              />
              <MyText style={{ color: color.textLighter }}>{product.uom}</MyText>
            </View>
          </View>
          <View>
            <MyText style={{ color: color.textLighter }}>Numero di articoli</MyText>
            <QuantityEditor
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </View>
          
        </View>

      </View>
  </Card>
  );
}