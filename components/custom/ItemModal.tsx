import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';


import Ionicons from '@expo/vector-icons/Ionicons';

type ItemModalProps = {
  modalVisible: boolean;
  modalTitle: string;

  okText: string;
  notOkText: string;

  onOk: () => void;
  onNotOk: () => void;

  children?: React.ReactNode;
};

export function ItemModal({ modalVisible, modalTitle, okText, notOkText, onOk, onNotOk, children }: ItemModalProps) {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => onNotOk()}
    >
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <Ionicons
              name="close"
              size={32}
              color="grey"
              onPress={() => onNotOk()}
            />
          </View>

          <View style={styles.modalBody}>
            {children}
          </View>

          <View style={styles.modalButtons}>
            <Pressable style={[styles.button, styles.buttonCancel]} onPress={() => onNotOk()}>
              <Text style={styles.buttonText}>{notOkText}</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.buttonSave]} onPress={() => onOk()}>
              <Text style={styles.buttonText}>{okText}</Text>
            </Pressable>
          </View>

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
    backgroundColor: 'white',
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
  buttonCancel: { backgroundColor: '#d9534f' },
  buttonSave: { backgroundColor: '#5cb85c' },
  buttonText: { color: 'white', fontWeight: 'bold' },
});
