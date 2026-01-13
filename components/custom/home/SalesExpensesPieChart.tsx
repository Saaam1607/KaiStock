import React from 'react';

import { useColor } from '@/hooks/use-color';
import { PieChart } from 'react-native-chart-kit';

type SalesExpensesPieChartProps = {
    data: {amount: number, color: string}[];
};

export default function SalesExpensesPieChart({ data }: SalesExpensesPieChartProps) {

  const color = useColor();

  return (
    <PieChart
      data={data}
      width={200}
      height={200}
      hasLegend={false}
      accessor={"amount"}
      backgroundColor={"transparent"}
      paddingLeft={"0"}
      center={[50, 0]}
      chartConfig={{
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
    />
  );
}