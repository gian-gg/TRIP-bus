import type { PassengerType, PaymentMethodType } from '@/type';

const PassengerTypes: PassengerType[] = ['regular', 'student', 'pwd', 'senior'];

const Destinations = [
  'Lorem Ipsum Station',
  'Dolor Sit Amet Station',
  'Consectetur Adipiscing Station',
  'Elit Sed Do Station',
  'Eiusmod Tempor Station',
  'Incididunt Ut Labore Station',
];

const SeatNumber = [
  'Aisle',
  '1A',
  '1B',
  '1C',
  '1D',
  '2A',
  '2B',
  '2C',
  '2D',
  '3A',
  '3B',
  '3C',
  '3D',
  '4A',
  '4B',
  '4C',
  '4D',
  '5A',
  '5B',
  '5C',
  '5D',
  '6A',
  '6B',
  '6C',
  '6D',
  '7A',
  '7B',
  '7C',
  '7D',
  '8A',
  '8B',
  '8C',
  '8D',
];

const PaymentMethod = [
  {
    id: 'online' as PaymentMethodType,
    label: 'Online Payment',
    description: 'Use e-wallet or card.',
  },
  {
    id: 'cash' as PaymentMethodType,
    label: 'Cash Payment',
    description: 'Pay the conductor.',
  },
];

export { PassengerTypes, Destinations, SeatNumber, PaymentMethod };
