import React, { useEffect, useState } from 'react';

import { useNavigation, useRouter } from 'expo-router';

import { BodyContainer } from '@/components/custom/containers/BodyContainer';
import { LazyContainer } from '@/components/custom/containers/LazyContainer';
import { ModalContainer } from '@/components/custom/containers/ModalContainer';
import { PageContainer } from '@/components/custom/containers/PageContainer';

import { SearchBarWithFilters } from '@/components/custom/SearchBarWithFilters';
import { FlatList } from 'react-native';

import { getAllSales } from '@/components/api/salesApi';

import SaleCard from '@/components/custom/sale/SaleCard';

import { GestureContainer } from '@/components/custom/GestureContainer';

export default function Sales() {
  
  const router = useRouter();
  const navigation = useNavigation();

  const sales = getAllSales();

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