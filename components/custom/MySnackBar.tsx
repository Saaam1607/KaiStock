import React from 'react';
import { Snackbar } from 'react-native-paper';

type MySnackBarProps = {
  visible: boolean,
  setVisible: (value: boolean) => void
  message: string;
};

export function MySnackBar({ visible, setVisible, message }: MySnackBarProps) {
  return (
    <Snackbar
      visible={visible}
      onDismiss={() => setVisible(false)}
      action={{
        label: 'Ok',
        onPress: () => {
          setVisible(false);
        },
      }}
      duration={5000}
      style={{ zIndex: 600 }}
    >
      {message}
    </Snackbar>
  );
}