import React, { createContext, useContext, useState } from 'react';

import { MySnackBar } from './custom/MySnackBar';

type SnackbarContextType = {
  showSnackbar: (message: string) => void;
};

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: '',
  });

  const showSnackbar = (message: string) => {
    setSnackbar({ visible: true, message });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      <MySnackBar
        visible={snackbar.visible}
        setVisible={(v) => setSnackbar(s => ({ ...s, visible: v }))}
        message={snackbar.message}
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const ctx = useContext(SnackbarContext);
  if (!ctx) throw new Error('useSnackbar must be used inside SnackbarProvider');
  return ctx;
};