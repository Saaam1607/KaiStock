import React, { createContext, useContext, useState } from 'react';

import { MyAlert } from '@/components/custom/MyAlert';

import { ModalContainer } from '@/components/custom/containers/ModalContainer';

type AlertOptions = {
  title: string;
  message: string;
  okText: string;
  notOkText: string;
  onOk: () => void;
  onNotOk: () => void;
};

type AlertContextType = {
  showAlert: (options: AlertOptions) => void;
};

const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alertOptions, setAlertOptions] = useState<AlertOptions | null>(null);
  const [visible, setVisible] = useState(false);

  const showAlert = (options: AlertOptions) => {
    setAlertOptions(options);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
    setAlertOptions(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alertOptions && (
        <ModalContainer visible={visible}>
          <MyAlert
            alertVisible={visible}
            alertTitle={alertOptions.title}
            alertMessage={alertOptions.message}
            okText={alertOptions.okText ?? 'OK'}
            notOkText={alertOptions.notOkText}
            onOk={() => {
              alertOptions.onOk?.();
              handleClose();
            }}
            onNotOk={() => {
              alertOptions.onNotOk?.();
              handleClose();
            }}
          />
        </ModalContainer>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlert must be used inside AlertProvider');
  return ctx;
};