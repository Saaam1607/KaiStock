import React, { useEffect, useState } from 'react';

import { useNavigation, useRouter } from 'expo-router';

import { BodyContainer } from '@/components/custom/containers/BodyContainer';
import { LazyContainer } from '@/components/custom/containers/LazyContainer';
import { ModalContainer } from '@/components/custom/containers/ModalContainer';
import { PageContainer } from '@/components/custom/containers/PageContainer';

import { SearchBarWithFilters } from '@/components/custom/SearchBarWithFilters';
import { FlatList } from 'react-native';

import { getAllReservations } from '@/components/api/reservationsApi';

import ReservationCard from '@/components/custom/reservation/ReservationCard';

import { GestureContainer } from '@/components/custom/GestureContainer';

export default function Reservations() {
  
  const router = useRouter();
  const navigation = useNavigation();

  const reservations = getAllReservations();

  const [searchText, setSearchText] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const [reservationsToDisplay, setReservationsToDisplay] = useState(reservations);

  useEffect(() => {
    setTimeout(() => {
      setReservationsToDisplay(reservations.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase())));
    }, 250);
  }, [searchText]);

  return (
    <GestureContainer
      leftAction={() => router.push('/(tabs)/warehouse/newReservation')}
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
            placeholder="Cerca prenotazione..."
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
                <ReservationCard
                  reservation={item}
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