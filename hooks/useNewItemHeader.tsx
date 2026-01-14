import { useEffect } from 'react';

import HeaderBtn from '@/components/custom/header/HeaderBtn';
import HeaderBtnWithText from '@/components/custom/header/HeaderBtnWithText';

type UseNewItemHeaderProps = {
  navigation: any;
  onSave: () => void;
  onBack: () => void;
};

export function useNewItemHeader({ navigation, onSave, onBack }: UseNewItemHeaderProps) {
  
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBtn
          action={onBack}
        />
      ),
      headerRight: () => (
        <HeaderBtnWithText
          text="Salva"
          iconName="save"
          action={onSave}
        />
      ),
    });
  }, [navigation, onSave, onBack]);

}