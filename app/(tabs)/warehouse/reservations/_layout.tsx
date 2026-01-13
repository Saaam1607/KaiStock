import { useRouter } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HeaderBtn from '@/components/custom/header/HeaderBtn';
import HeaderBtnWithText from '@/components/custom/header/HeaderBtnWithText';

import Reservations from './index';
import NewReservation from './newReservation';

const Stack = createNativeStackNavigator();

export default function ReservationsLayout() {

  const router = useRouter();

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="reservations"
        component={Reservations}
        options={{
          title: 'Prenotazioni',
          headerLeft: () => <HeaderBtn action = {router.back} />,
          headerRight: () => <HeaderBtnWithText text="Nuovo" iconName="create" action={() => router.push('/warehouse/reservations/newReservation')} />,
        }}
      />

      <Stack.Screen
        name="newReservation"
        component={NewReservation}
        options={{
          title: 'Nuova Prenotazione',
        }}
      />

    </Stack.Navigator>
  );
}