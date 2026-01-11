import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

type TrendMode = 'allTime' | 'year' | 'month';

type TrendNavigationHeaderProps = {
  mode: TrendMode;
  currentYear: number;
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
  currentMonth: number;
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
};

export function TrendNavigationHeader({ mode, currentYear, setCurrentYear, currentMonth, setCurrentMonth }: TrendNavigationHeaderProps) {

  function setPrevYear() {
    setCurrentYear(y => y - 1);
  };

  function setNextYear() {
    setCurrentYear(y => y + 1);
  };

  function setPrevMonth() {
    setCurrentMonth(m => {
      if (m === 0) {
        setCurrentYear(y => y - 1);
        return 11;
      }
      return m - 1;
    });
  };

  function setNextMonth() {
    setCurrentMonth(m => {
      if (m === 11) {
        setCurrentYear(y => y + 1);
        return 0;
      }
      return m + 1;
    });
  };

  return (
    <>
      {mode !== 'allTime' && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12,
            gap: 50,
          }}
        >
          <Pressable
            onPress={mode === 'year' ? setPrevYear : setPrevMonth}
            style={{
              width: 50,
              height: 50,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'silver',
            }}
          >
            <Ionicons
              name="chevron-back"
              size={30}
              color="grey"
            /> 
          </Pressable>
      
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'silver'
            }}
          >
            {mode === 'year' && currentYear}
            {mode === 'month' &&
              `${new Date(currentYear, currentMonth).toLocaleString('it', {
                month: 'long',
              })} ${currentYear}`}
          </Text>
      
          <Pressable
            onPress={mode === 'year' ? setNextYear : setNextMonth}
            style={{
              width: 50,
              height: 50,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'silver',
            }}
          >
            <Ionicons
              name="chevron-forward"
              size={30}
              color="grey"
            /> 
          </Pressable>
        </View>
      )}
    </>
  );
}
