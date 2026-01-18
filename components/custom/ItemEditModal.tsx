import React, { useEffect, useState } from "react";

import { View, Text } from "react-native";

import { ModalContainer } from "./containers/ModalContainer";

import { ItemModal } from "./ItemModal";

type ItemEditModalProps<T> = {
  item: T;
  formComponent: React.ComponentType<{
    item: T,
    setItem: React.Dispatch<React.SetStateAction<T>>,
    oldItem: T | null,
  }>;
  onSave: (item: T) => void;
  onClose: () => void;
};

export function ItemEditModal<T>({ item, formComponent: FormComponent, onSave, onClose }: ItemEditModalProps<T>) {
  
  const [editedItem, setEditedItem] = useState<T>(item);
  const [oldItem, setOldItem] = useState<T>(item);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(item !== null);
    setEditedItem(item);
    setOldItem(item);
  }, [item]);

  if (!editedItem) return null;

  const handleSave = () => {
    if (editedItem) onSave(editedItem);
    setVisible(false);
    onClose();
  };

  function handleDiscard() {
    setVisible(false);
    onClose();
  }

  return (
    <ModalContainer visible={visible}>
      <ItemModal
        modalVisible={visible}
        modalTitle="Modifica"
        okText="Salva"
        notOkText="Annulla"
        onOk={handleSave}
        onNotOk={handleDiscard}
      >
        {editedItem !== null && (
          <View style={{ width: "100%", gap: 10, marginTop: 10 }}>
            <FormComponent
              item={editedItem}
              setItem={setEditedItem}
              oldItem={oldItem}
            />
          </View>
        )}
      </ItemModal>
    </ModalContainer>
  );
}
