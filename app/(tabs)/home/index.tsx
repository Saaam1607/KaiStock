import React, { useState } from 'react';

import MyText from '@/components/custom/generic/MyText';
import { ScrollView, View } from 'react-native';

import { useRouter } from 'expo-router';

import { BodyContainer } from '@/components/custom/containers/BodyContainer';
import { PageContainer } from '@/components/custom/containers/PageContainer';

import SummaryCarousel from '@/components/custom/home/SummaryCarousel';

import UndeliveredSales from '@/components/custom/home/UndeliveredSale';
import UnpaidSales from '@/components/custom/home/UnpaidSales';

import { useColor } from '@/hooks/use-color';
import { Ionicons } from '@expo/vector-icons';

import { SectionButtons } from '@/components/custom/home/SectionButtons';


export default function HomeScreen() {

  const router = useRouter();

  const color = useColor();

  const today = new Date(); 

  const [visibleSection, setVisibleSection] = useState(0);

  return (
    <PageContainer>
      <BodyContainer>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <MyText style={{ fontSize: 25, color: color.text, paddingHorizontal: 10 }} >
            {today.getDate()}/{today.getMonth() + 1}/{today.getFullYear()}
          </MyText>
          <Ionicons name="settings-sharp" size={30} color={color.icon} />
        </View>

        <ScrollView contentContainerStyle={{ gap: 30, paddingBottom: 20 }} >

          <SummaryCarousel />

          <View style={{ width: '100%', flexDirection: 'column', gap: 10 }} >
            <SectionButtons 
              buttons={[
                {
                  label: 'Da consegnare',
                  isSelected: visibleSection === 0,
                  action: () => setVisibleSection(0),
                },
                {
                  label: 'Da incassare',
                  isSelected: visibleSection === 1,
                  action: () => setVisibleSection(1),
                },
              ]}
            />
            { visibleSection === 0 && <UndeliveredSales /> }
            { visibleSection === 1 && <UnpaidSales /> }
          </View>
        </ScrollView>

      </BodyContainer>
    </PageContainer> 
  );
}