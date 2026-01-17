import React from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import MyText from './generic/MyText';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

import { useColor } from '@/hooks/use-color';
import { Ionicons } from '@expo/vector-icons';

type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  orderingComponent?: React.ReactNode;
  filteringComponent?: React.ReactNode;
};

export function BottomSheet({ visible, onClose, orderingComponent, filteringComponent }: BottomSheetProps) {
  
  const color = useColor();

  return (
    <>
      {visible && (
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: 0 }} >
          <Pressable style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',}} onPress={onClose} >
          </Pressable>
          <Animated.View
            entering={SlideInDown.duration(300)}
            exiting={SlideOutDown.duration(300)}
            style={[styles.sheet, {backgroundColor: '#16191d'}]}
          >

            {orderingComponent && (
              <View style={{ gap: 10 }} >
                <View style={{ width: '100%', alignItems: 'flex-end' }} >
                  <Ionicons name="close" size={28} color={color.icon} onPress={onClose} />
                </View>
                <View style={{ alignItems: 'center' }} >
                  <MyText style={{ color: color.text }}>Ordinamento</MyText>
                </View>

                <View style={{ flex: 1 }} >
                  {orderingComponent}
                </View>

              </View>
            )}

            {filteringComponent && (
              <View style={{ gap: 10 }} >
                <View style={{ alignItems: 'center' }} >
                  <MyText style={{ color: color.text }}>Filtri</MyText>
                </View>
                {filteringComponent}
              </View>
            )}

          </Animated.View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  sheet: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    position: 'absolute',
    bottom: 0,
    minHeight: 600,
    maxHeight: '85%',
    gap: 10,
  }
});