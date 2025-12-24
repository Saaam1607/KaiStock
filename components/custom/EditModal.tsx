import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import Ionicons from '@expo/vector-icons/Ionicons';

type EditModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  itemName?: string;
};

export function EditModal({ modalVisible, setModalVisible, itemName = 'nomeArticolo' }: EditModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Attenzione!</Text>
            <Ionicons
              name="close"
              size={32}
              color="grey"
              onPress={() => setModalVisible(false)}
            />
          </View>

          <Text style={styles.modalText}>
            Stai già modificando l'articolo{' '}
            <Text style={{ fontWeight: 'bold' }}>{itemName}</Text>.
          </Text>

          <View style={styles.modalButtons}>
            <Pressable style={[styles.button, styles.buttonCancel]} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancella modifiche</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.buttonSave]} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Salva modifiche</Text>
            </Pressable>
          </View>
        </View>
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
  modalText: {
    textAlign: 'center',
    fontSize: 16,
  },
  modalButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#d9534f',
  },
  buttonSave: {
    backgroundColor: '#5cb85c',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
