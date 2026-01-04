import React, { useState, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { QuantityEditor } from '../QuantityEditor';

import type { Product } from '@/types/Product';

import Ionicons from '@expo/vector-icons/Ionicons';

type ProductionItemCardProps = {
  product: Product;
	removeProduct: (id: string) => void;
	quantity: number;
	setQuantity: (quantity: number) => void;
};

export function ProductionItemCard({ product, removeProduct, quantity, setQuantity }: ProductionItemCardProps) {

  return (
		<View
			key={product.id}
			style={styles.input}
		>
			<View style={{ flexDirection: 'row', flexGrow: 1, gap: 10 }}>
				
				<View style={{  }}>
					<View style={{
						backgroundColor: 'grey',
						width: 60,
						height: 60,
						borderRadius: 10,
						justifyContent: 'center',
						alignItems: 'center',
					}}>
						<Ionicons name={"images"} size={30} color="silver" />
					</View>
				</View>

				<View style={{ flexDirection: 'column', gap: 10, flex: 1 }}>

					<View style={{ gap: 10 }}>
						<Text>{ product.name}</Text>
						<Text>{ product.description}</Text>
						<Text>{ product.price} €/{product.uom}</Text>
					</View>
					<View style={{ }}>
						<QuantityEditor
								quantity={quantity}
								setQuantity={quantity => {
									// setSelectedProductionItems(selectedProductionItems.map(i => {
									//   if (i.product_id === product.id) {
									//     return { ...i, quantity };
									//   }
									//   return i;
									// }));
								}}
							/>
					</View>
				</View>

			</View>

			<View >
				<Pressable
					onPress={() => removeProduct(product.id)}
					style={{
						position: 'absolute',
						top: -15,
						right: -10,
						backgroundColor: 'rgb(126, 46, 46)',
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
    backgroundColor: 'rgba(31, 31, 31, 1)',
  },
});