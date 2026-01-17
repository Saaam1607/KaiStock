import React from 'react';

import { PieChart } from 'react-native-chart-kit';

type SalesExpensesPieChartProps = {
  data: {amount: number, color: string}[];
};

export default function SalesExpensesPieChart({ data }: SalesExpensesPieChartProps) {

  const size = 100

  return (
    <PieChart
      data={data}
      width={size}
      height={size}
      hasLegend={false}
      accessor={"amount"}
      backgroundColor={"transparent"}
      paddingLeft={"0"}
      center={[size / 4, 0]}
      chartConfig={{
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
    />
  );
}