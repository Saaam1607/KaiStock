import React, { useState, useEffect } from 'react';

import { useRouter } from 'expo-router';

import { PageContainer } from '@/components/custom/containers/PageContainer';
import { ModalContainer } from '@/components/custom/containers/ModalContainer';
import { HeaderContainer } from '@/components/custom/containers/HeaderContainer';
import { BodyContainer } from '@/components/custom/containers/BodyContainer';

import { productions } from '@/types/productions';
import { SearchBarWithFilters } from '@/components/custom/SearchBarWithFilters';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { MySnackBar } from '@/components/custom/MySnackBar';

import type { Production } from '@/types/Production';
import ProductionCard from '@/components/custom/production/ProductionCard';
import { Header } from '@/components/custom/Header';

export default function Productions() {
  
  const router = useRouter();
  
  const [searchText, setSearchText] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const [productionsToDisplay, setProductionsToDisplay] = useState(productions);

  useEffect(() => {
    setTimeout(() => {
      setProductionsToDisplay(productions.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase())));
    }, 250);
  }, [searchText]);

  function handleSave() {
    setSnackbarVisible(true);
  }

  return (
    <PageContainer>

      {/* Modal */}
      <ModalContainer visible={false}>
        <></>
      </ModalContainer>

      {/* Header */}
      <HeaderContainer>
        <Header
          text="Produzioni"
          leftIconName="chevron-back"
          leftIconPress={() => router.back()}
          rightIconName="add-outline"
          rightIconPress={() => router.push('/(tabs)/warehouse/produce')}
        />
      </HeaderContainer>

      {/* Body */}
      <BodyContainer>
        <SearchBarWithFilters
          placeholder="Cerca prodotto..."
          text={searchText}
          setText={setSearchText}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
        />
        <View
          style={styles.bodyContainer}
        >
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
        </View>
      </BodyContainer>

      {/* Notifications */}
      <MySnackBar
        visible={snackbarVisible}
        setVisible={setSnackbarVisible}
        message="Prodotto salvato con successo"
      />

    </PageContainer>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    gap: 20,
    paddingBottom: 10,
  }
});