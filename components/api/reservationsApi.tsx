import { reservations } from '@/types/reservations';

export function getAllReservations() {
  return reservations;
}

export function getReservationFromId(id: string) {
  return reservations.find((reservation) => reservation.id === id);
}