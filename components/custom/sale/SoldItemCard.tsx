import React from 'react';

import { Pressable, StyleSheet, View } from 'react-native';
import MyText from '../generic/MyText';

import type { SoldProduct } from '@/types/SoldProduct';

import Ionicons from '@expo/vector-icons/Ionicons';

import { getProductFromId } from '@/components/api/productsApi';


import { useColor } from '@/hooks/use-color';

type SoldItemCardProps = {
  sale: SoldProduct;
	removeItem: (id: string) => void;
};

export function SoldItemCard({ sale, removeItem }: SoldItemCardProps) {

  const color = useColor();
  const product = getProductFromId(sale.product_id);

  return (
		<View
			key={sale.product_id}
			style={[styles.input, { backgroundColor: color.cardBackground }]}
		>
			<View style={{ flexDirection: 'row', flexGrow: 1, gap: 10 }}>
				
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
						<MyText style={{ color: color.text }}>{sale.quantity + " x " + product?.name + " (" + sale.weight + " " + sale.uom + ")" }</MyText>
            <MyText style={{ color: color.text }}>{product?.description}</MyText>
						<MyText style={{ color: color.textLighter }}>{sale.unit_price} €/{sale.uom}</MyText>

            <MyText style={{ color: color.textLighter }}>{"Prezzo per articolo: " + sale.weight * sale.unit_price + " €"}</MyText>
            <MyText style={{ color: color.textLighter }}>{"Prezzo totale: " + sale.weight * sale.unit_price * sale.quantity + " €"}</MyText>
					</View>
				</View>

			</View>

			<View >
				<Pressable
					onPress={() => removeItem(sale.product_id)}
					style={{
						position: 'absolute',
						top: -15,
						right: -10,
						backgroundColor: color.red,
						width: 35,
						height: 35,
						borderRadius: 50,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Ionicons
						name="trash-sharp"
						size={20}
						strokeWidth={4}
            color={color.text}
					/>
				</Pressable>
			</View>

		</View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
		flexDirection: 'row',
  },
});