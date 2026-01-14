import React from 'react';

import { ScrollView } from 'react-native';

import WeekSummary from './summaryCards/WeekSummary';
import MonthSummary from './summaryCards/MonthSummary';
import YearSummary from './summaryCards/YearSummary';

export default function SummaryCarousel() {

  return (
    <ScrollView
      horizontal
      style={{ width: '100%' }}
      contentContainerStyle={{ flexDirection: 'row', gap: 20 }}
    >
      <WeekSummary />
      <MonthSummary />
      <YearSummary />
    </ScrollView>
  );
}