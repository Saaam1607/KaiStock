import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

type TrendMode = 'allTime' | 'year' | 'month';

type TrendNavigationHeaderTemplateProps = {
  currentValue: string;
  setPrevValue: () => void;
  setNextValue: () => void;
};

function TrendNavigationHeaderTemplate({ currentValue, setPrevValue, setNextValue }: TrendNavigationHeaderTemplateProps) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row', width: 400, justifyContent: 'space-between', alignItems: 'center' }}>
        <Pressable
          onPress={setPrevValue}
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
          {currentValue}
        </Text>
        
        <Pressable
          onPress={setNextValue}
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
    </View>
  );
}

type TrendYearNavigationHeaderProps = {
  currentYear: number;
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
};

export function TrendYearNavigationHeader({ currentYear, setCurrentYear, setCurrentMonth }: TrendYearNavigationHeaderProps) {

  function setPrevYear() {
    setCurrentYear(y => y - 1);
    setCurrentMonth(0);
  };

  function setNextYear() {
    setCurrentYear(y => y + 1);
    setCurrentMonth(0);
  };

  return (
    <TrendNavigationHeaderTemplate
      currentValue={currentYear.toString()}
      setPrevValue={setPrevYear}
      setNextValue={setNextYear}
    />
  );
}

type TrendMonthNavigationHeaderProps = {
  currentMonth: number;
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
};

export function TrendMonthNavigationHeader({ currentMonth, setCurrentMonth, setCurrentYear }: TrendMonthNavigationHeaderProps) {

  function getCurrentMonthLabel(): string {
    const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    return months[currentMonth];
  }

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
    <TrendNavigationHeaderTemplate
      currentValue={getCurrentMonthLabel()}
      setPrevValue={setPrevMonth}
      setNextValue={setNextMonth}
    />
  );
}

