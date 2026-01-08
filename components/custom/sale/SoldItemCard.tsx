import React, { useState, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { QuantityEditor } from '../QuantityEditor';

import type { Sale } from '@/types/Sale';
import type { SoldProduct } from '@/types/SoldProduct';

import Ionicons from '@expo/vector-icons/Ionicons';

import { getProduct } from '@/components/utils/getProduct';

import { useColor } from '@/hooks/use-color';

type SoldItemCardProps = {
  sale: SoldProduct;
	removeItem: (id: string) => void;
};

export function SoldItemCard({ sale, removeItem }: SoldItemCardProps) {

  const color = useColor();
  const product = getProduct(sale.product_id);

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


            {/* id: string;
            title: string;
            notes: string;
            to: string;
            body: SoldProduct[],
            date: Date;
            deltaDiscount: number;
            delivered: boolean; */}


					<View style={{ gap: 10 }}>
						<Text style={{ color: color.text }}>{product?.name}</Text>
            <Text style={{ color: color.text }}>{product?.description}</Text>
						<Text style={{ color: color.textLighter }}>{sale.unit_price} €/{sale.uom}</Text>

						<Text style={{ color: color.textLighter }}>{sale.quantity + " Articoli"}</Text>
            <Text style={{ color: color.textLighter }}>{sale.weight + " " + sale.uom}</Text>
            <Text style={{ color: color.textLighter }}>{"Prezzo per articolo: " + sale.weight * sale.unit_price + " €"}</Text>
            <Text style={{ color: color.textLighter }}>{"Prezzo totale: " + sale.weight * sale.unit_price * sale.quantity + " €"}</Text>
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