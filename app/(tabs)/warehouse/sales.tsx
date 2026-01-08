import React, { useEffect, useState } from 'react';

import { useNavigation, useRouter } from 'expo-router';

import { BodyContainer } from '@/components/custom/containers/BodyContainer';
import { ModalContainer } from '@/components/custom/containers/ModalContainer';
import { PageContainer } from '@/components/custom/containers/PageContainer';
import { LazyContainer } from '@/components/custom/containers/LazyContainer';

import { SearchBarWithFilters } from '@/components/custom/SearchBarWithFilters';
import { sales } from '@/types/sales';
import { FlatList } from 'react-native';

import SaleCard from '@/components/custom/sale/SaleCard';

import { GestureContainer } from '@/components/custom/GestureContainer';

export default function Sales() {
  
  const router = useRouter();
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const [reservationsToDisplay, setSalesToDisplay] = useState(sales);

  useEffect(() => {
    setTimeout(() => {
      setSalesToDisplay(sales.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase())));
    }, 250);
  }, [searchText]);

  return (
    <GestureContainer
      // leftAction={() => router.push('/(tabs)/warehouse/produce')}
      // rightAction={() => navigation.goBack()}
    >
      <PageContainer>

        {/* Modal */}
        <ModalContainer visible={false}>
          <></>
        </ModalContainer>

        {/* Body */}
        <BodyContainer>
          <SearchBarWithFilters
            placeholder="Cerca vendita..."
            text={searchText}
            setText={setSearchText}
            showFilter={showFilter}
            setShowFilter={setShowFilter}
          />
          <LazyContainer>
            <FlatList
              data={reservationsToDisplay}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <SaleCard
                  sale={item}
                />
              )}
              contentContainerStyle={{
                gap: 10,
              }}
            />
          </LazyContainer>
        </BodyContainer>

      </PageContainer>
    </GestureContainer>
  );
}