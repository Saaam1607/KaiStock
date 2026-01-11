import React, { createContext, useContext, useState } from 'react';

import { MySnackBar } from './custom/MySnackBar';

interface SnackbarMessage {
  id: string;
  text: string;
}

interface SnackbarContextType {
  showSnackbar: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<SnackbarMessage[]>([]);

  const showSnackbar = (text: string) => {
    const id = Date.now().toString();
    setMessages(prev => [...prev, { id, text }]);
  };

  const removeSnackbar = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      {/* renderizza tutti i messaggi attivi */}
      {messages.map(msg => (
        <MySnackBar
          key={msg.id}
          visible={true}
          setVisible={() => removeSnackbar(msg.id)}
          message={msg.text}
        />
      ))}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const ctx = useContext(SnackbarContext);
  if (!ctx) throw new Error('useSnackbar must be used inside SnackbarProvider');
  return ctx;
};