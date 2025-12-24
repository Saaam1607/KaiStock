import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


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
        <SafeAreaView style={styles.modalView}>
          
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <Ionicons
              name="close"
              size={32}
              color="grey"
              onPress={() => onNotOk()}
            />
          </View>

          {children}

          <View style={styles.modalButtons}>
            <Pressable style={[styles.button, styles.buttonCancel]} onPress={() => onNotOk()}>
              <Text style={styles.buttonText}>{notOkText}</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.buttonSave]} onPress={() => onOk(item)}>
              <Text style={styles.buttonText}>{okText}</Text>
            </Pressable>
          </View>

        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    gap: 12,
    alignItems: 'center',
    elevation: 5,
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
