import { useRouter } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HeaderBtn from '@/components/custom/header/HeaderBtn';
import HeaderBtnWithText from '@/components/custom/header/HeaderBtnWithText';

import Reservations from './index';
import NewReservation from './newReservation';
import Header from '@/components/custom/header/Header';

const Stack = createNativeStackNavigator();

export default function ReservationsLayout() {

  const router = useRouter();

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="reservations"
        component={Reservations}
        options={{
          header: () => (
            <Header 
              title="Prenotazioni"
              rightIconName="create"
              rightIconLabel="Nuova"
              rightIconPress={() => router.push('/warehouse/reservations/newReservation')}
            />
          ),
        }}
      />

      <Stack.Screen
        name="newReservation"
        component={NewReservation}
      />

    </Stack.Navigator>
  );
}