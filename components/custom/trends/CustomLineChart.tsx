import React from 'react';
import { Dimensions, View } from 'react-native';

import { useColor } from '@/hooks/use-color';
import { LineChart } from 'react-native-chart-kit';

type CustomLineChartProps = {
  title: string;
  data: number[];
  labels: string[];
  graphColor: string;
};

export function CustomLineChart({ title, data, labels, graphColor }: CustomLineChartProps) {
  
  const color = useColor();

  return (
    <LineChart
      data={{
        labels: labels,
        datasets: [{ data: data }],
        legend: [title],
      }}
      fromZero
      verticalLabelRotation={270}
      width={Dimensions.get("window").width - 20}
      height={300}
      yAxisLabel=""
      withVerticalLines={false}
      yAxisSuffix=" €"
      segments={5}
      yAxisInterval={100}
      yLabelsOffset={15}
      formatYLabel={(label) =>  {
        const value = Number(label);
        if (value >= 1000) {
          const rounded = Math.round(value / 1000);
          return `${rounded}k`;
        }
        return `${value}`;
      }}
      chartConfig={{
        backgroundGradientFrom: color.background,
        backgroundGradientTo: color.background,
        decimalPlaces: 0,
        color: (opacity, index) => graphColor,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: { borderRadius: 16, borderColor: 'red', borderWidth: 3 },
        propsForDots: {  r: "4", strokeWidth: "0" }
      }}
      getDotColor={(dataPoint, dataPointIndex) => {
        if (data[dataPointIndex] < 0) {
          return 'red';
        }
        return graphColor;
      }}
      bezier
      style={{ marginVertical: 0, borderRadius: 20 }}
    />
  );
}