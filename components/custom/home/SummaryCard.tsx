import React, { useState } from 'react';

import { SummaryCardContainer } from './SummaryCardContainer';

import WeekSummary from './WeekSummary';
import MonthSummary from './MonthSummary';
import YearSummary from './YearSummary';

import FlipCard from './FlipCard';
import { View } from 'react-native';

export default function SummaryCard() {

  const [displayIndex, setDisplayIndex] = useState(0);

  return (
    <FlipCard index={displayIndex} setIndex={setDisplayIndex}>
      <SummaryCardContainer index={displayIndex} numberOfCards={3} >
        <WeekSummary />
      </SummaryCardContainer>
      <SummaryCardContainer index={displayIndex} numberOfCards={3} >
        <MonthSummary />
      </SummaryCardContainer>
      <SummaryCardContainer index={displayIndex} numberOfCards={3} >
        <YearSummary />
      </SummaryCardContainer>
    </FlipCard>
  );
}