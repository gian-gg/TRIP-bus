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
  'Seat #1',
  'Seat #2',
  'Seat #3',
  'Seat #4',
  'Seat #5',
  'Seat #6',
  'Seat #7',
  'Seat #8',
  'Seat #9',
  'Seat #10',
  'Seat #11',
  'Seat #12',
  'Seat #13',
  'Seat #14',
  'Seat #15',
  'Seat #16',
  'Seat #17',
  'Seat #18',
  'Seat #19',
  'Seat #20',
  'Seat #21',
  'Seat #22',
  'Seat #23',
  'Seat #24',
  'Seat #25',
  'Seat #26',
  'Seat #27',
  'Seat #28',
  'Seat #29',
  'Seat #30',
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
