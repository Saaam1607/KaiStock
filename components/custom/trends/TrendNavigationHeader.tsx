import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

type TrendNavigationHeaderTemplateProps = {
  currentValue: string;
  setPrevValue: () => void;
  setNextValue: () => void;
};


function Button({ iconName, action}: {iconName: string, action: () => void}) {
  return (
    <Pressable
      onPress={action}
      style={{
        width: 45,
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      }}
    >
      <Ionicons name={iconName as any} size={30} color="grey" /> 
    </Pressable>
  );
}

function TrendNavigationHeaderTemplate({ currentValue, setPrevValue, setNextValue }: TrendNavigationHeaderTemplateProps) {
  return (
    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: '100%', paddingHorizontal: 20, flexDirection: 'row',  justifyContent: 'space-between', alignItems: 'center' }}>
        <Button iconName="chevron-back" action={setPrevValue} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'silver' }} >
          {currentValue}
        </Text>
        <Button iconName="chevron-forward" action={setNextValue} />
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
  currentYear: number;
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
};

export function TrendMonthNavigationHeader({ currentMonth, currentYear, setCurrentMonth, setCurrentYear }: TrendMonthNavigationHeaderProps) {

  function getCurrentMonthLabel(): string {
    const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

    return months[currentMonth] + ' ' + currentYear;
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

