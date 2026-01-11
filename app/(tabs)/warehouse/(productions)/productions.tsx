import React, { useEffect, useState } from 'react';

import { useNavigation, useRouter } from 'expo-router';

import { BodyContainer } from '@/components/custom/containers/BodyContainer';
import { LazyContainer } from '@/components/custom/containers/LazyContainer';
import { ModalContainer } from '@/components/custom/containers/ModalContainer';
import { PageContainer } from '@/components/custom/containers/PageContainer';

import { SearchBarWithFilters } from '@/components/custom/SearchBarWithFilters';
import { FlatList } from 'react-native';

import { getAllProductions } from '@/components/api/productionsApi';

import ProductionCard from '@/components/custom/production/ProductionCard';

import { GestureContainer } from '@/components/custom/GestureContainer';

export default function Productions() {
  
  const router = useRouter();
  const navigation = useNavigation();

  const productions = getAllProductions();

  const [searchText, setSearchText] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const [productionsToDisplay, setProductionsToDisplay] = useState(productions);

  useEffect(() => {
    setTimeout(() => {
      setProductionsToDisplay(productions.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase())));
    }, 250);
  }, [searchText]);

  return (
    <GestureContainer
      leftAction={() => router.push('/(tabs)/warehouse/produce')}
      rightAction={() => navigation.goBack()}
    >
      <PageContainer>

        {/* Modal */}
        <ModalContainer visible={false}>
          <></>
        </ModalContainer>

        {/* Body */}
        <BodyContainer>
          <SearchBarWithFilters
            placeholder="Cerca produzione..."
            text={searchText}
            setText={setSearchText}
            showFilter={showFilter}
            setShowFilter={setShowFilter}
          />
          <LazyContainer>
            <FlatList
              data={productionsToDisplay}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ProductionCard
                  production={item}
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