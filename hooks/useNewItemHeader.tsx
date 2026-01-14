import { useEffect } from 'react';

import Header from '@/components/custom/header/Header';

type UseNewItemHeaderProps = {
  navigation: any;
  title: string;
  onSave: () => void;
  onBack: () => void;
};

export function useNewItemHeader({ navigation, title, onSave, onBack }: UseNewItemHeaderProps) {
  
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header 
          title={title}
          rightIconName="save"
          rightIconLabel="Salva"
          rightIconPress={onSave}
        />
      ),
    });
  }, [navigation, onSave, onBack]);
}