import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { useColor } from '@/hooks/use-color';

import Ionicons from '@expo/vector-icons/Ionicons';

type ItemModalProps = {
  modalVisible: boolean;
  modalTitle: string;

  okText?: string;
  notOkText?: string;

  onOk?: () => void;
  onNotOk?: () => void;

  children?: React.ReactNode;
};

export function ItemModal({ modalVisible, modalTitle, okText, notOkText, onOk, onNotOk, children }: ItemModalProps) {

  const color = useColor();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() =>  {onNotOk && onNotOk()}}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalView, { backgroundColor: color.modalBackground }]}>
          
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: color.text }]}>{modalTitle}</Text>
            <Ionicons
              name="close"
              size={32}
              color={color.icon}
              onPress={() => {onNotOk && onNotOk()}}
            />
          </View>

          <View style={styles.modalBody}>
            {children}
          </View>

          { (okText !== undefined || notOkText !== undefined) && (
            <View style={styles.modalButtons}>
              <Pressable style={[styles.button, {backgroundColor: color.red}]} onPress={() => {onNotOk && onNotOk()}}>
                <Text style={[styles.buttonText, { color: color.text }]}>{notOkText}</Text>
              </Pressable>
              <Pressable style={[styles.button, {backgroundColor: color.green}]} onPress={() => {onOk && onOk()}}>
                <Text style={[styles.buttonText, { color: color.text }]}>{okText}</Text>
              </Pressable>
            </View>
          )}


        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    maxHeight: '96%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap: 12,
    elevation: 5,
    height: '100%',
    maxHeight: '100%',
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalBody: {
    width: '100%',
    flex: 1,
    height: '100%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: { fontWeight: 'bold' },
});
