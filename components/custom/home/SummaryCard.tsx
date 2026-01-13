import React, { useState } from 'react';

import { CardContainer } from './CardContainer'

import WeekSummary from './WeekSummary';
import MonthSummary from './MonthSummary';
import YearSummary from './YearSummary';

import FlipCard from './FlipCard';

export default function SummaryCard() {

  const [displayIndex, setDisplayIndex] = useState(0);

  return (
    <FlipCard index={displayIndex} setIndex={setDisplayIndex}>
      <CardContainer index={displayIndex} numberOfCards={3} >
        <WeekSummary />
      </CardContainer>
      <CardContainer index={displayIndex} numberOfCards={3} >
        <MonthSummary />
      </CardContainer>
      <CardContainer index={displayIndex} numberOfCards={3} >
        <YearSummary />
      </CardContainer>
    </FlipCard>
  );
}