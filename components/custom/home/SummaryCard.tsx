import React, { useState } from 'react';

import { View, Pressable } from 'react-native';

import { SummaryCardContainer } from './SummaryCardContainer';

import WeekSummary from './WeekSummary';
import MonthSummary from './MonthSummary';
import YearSummary from './YearSummary';

import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';

import { runOnJS } from 'react-native-reanimated';

export default function SummaryCard() {

  const [screenIndex, setScreenIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);

  const rotation = useSharedValue(0);

  useEffect(() => {
    if (screenIndex === displayIndex) return;

    rotation.value = withTiming(90, { duration: 200 }, () => {
      runOnJS(setDisplayIndex)(screenIndex);

      rotation.value = withTiming(180, { duration: 200 });
    });
  }, [screenIndex]);

  function handlePress() {
    setScreenIndex((screenIndex + 1) % 3);
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${rotation.value}deg` },
    ],
  }));

  rotation.value = withTiming(180, { duration: 200 }, () => {
    rotation.value = 0;
  });

  return (
    <Pressable
      onPress={handlePress}
      style={{
        width: '100%',
      }}
    >
      <SummaryCardContainer>
        
        <View style={{ width: '100%', padding: 10, gap: 10 }}>

          <Animated.View
            style={[
              { width: '100%' },
              animatedStyle,
            ]}
          >
            <View
              style={{
                backfaceVisibility: 'hidden',
              }}
            >
              {displayIndex === 0 && <WeekSummary />}
              {displayIndex === 1 && <MonthSummary />}
              {displayIndex === 2 && <YearSummary />}
            </View>
          </Animated.View>
          
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            <View style={{ width: 13, height: 13, borderRadius: 13, backgroundColor: screenIndex === 0 ? 'white' : 'grey'}} />
            <View style={{ width: 13, height: 13, borderRadius: 13, backgroundColor: screenIndex === 1 ? 'white' : 'grey'}} />
            <View style={{ width: 13, height: 13, borderRadius: 13, backgroundColor: screenIndex === 2 ? 'white' : 'grey'}} />
          </View> 
        </View>

      </SummaryCardContainer>
    </Pressable>
  );
}