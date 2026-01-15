import React from 'react';

import { Pressable, StyleSheet, View } from 'react-native';
import MyText from '../generic/MyText';

import { QuantityEditor } from '../QuantityEditor';

import type { Product } from '@/types/Product';

import Ionicons from '@expo/vector-icons/Ionicons';

import { useColor } from '@/hooks/use-color';

type ProductionItemCardProps = {
  product: Product;
	removeProduct: (id: string) => void;
	quantity: number;
	setQuantity: (quantity: number) => void;
};

export function ProductionItemCard({ product, removeProduct, quantity, setQuantity }: ProductionItemCardProps) {

  const color = useColor();

  return (
		<View
			key={product.id}
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
						<MyText style={{ color: color.text }}>{product.name}</MyText>
						<MyText style={{ color: color.textLighter }}>{product.description}</MyText>
						<MyText style={{ color: color.textLighter }}>{product.price} €/{product.uom}</MyText>
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