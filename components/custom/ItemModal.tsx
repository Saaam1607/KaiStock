import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';


import Ionicons from '@expo/vector-icons/Ionicons';

type ItemModalProps<T> = {
  modalVisible: boolean;
  modalTitle: string;

  item: T;

  okText: string;
  notOkText: string;

  onOk: (updatedItem: T) => void;
  onNotOk: () => void;

  children?: React.ReactNode;
};

export function ItemModal<T>({ modalVisible, modalTitle, item, okText, notOkText, onOk, onNotOk, children }: ItemModalProps<T>) {

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
            <Pressable style={[styles.button, styles.buttonSave]} onPress={() => onOk(item)}>
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
    maxHeight: '98%',
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
    padding: 20,
    gap: 12,
    elevation: 5,
    height: '100%',
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalBody: {
    width: '100%',
    height: 200,
    flex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
    gap: 10,
    marginTop: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 16,
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
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonCancel: { backgroundColor: '#d9534f' },
  buttonSave: { backgroundColor: '#5cb85c' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  inputChanged: {
    borderColor: 'orange',
    borderWidth: 2,
  }
});
