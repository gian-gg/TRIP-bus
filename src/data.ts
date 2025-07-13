import type { PassengerType, PaymentMethodType } from '@/type';

const PassengerTypes: PassengerType[] = ['regular', 'student', 'pwd', 'senior'];

const SeatInfo = {
  row: 11,
  cols: ['A', 'B', 'C', 'D', 'E'],
  seats: [
    'Aisle',
    'A1',
    'A2',
    'A3',
    'A4',
    'A5',
    'A6',
    'A7',
    'A8',
    'A9',
    'A10',
    'A11',
    'B1',
    'B2',
    'B3',
    'B4',
    'B5',
    'B6',
    'B7',
    'B8',
    'B9',
    'B10',
    'B11',
    'C11',
    'D1',
    'D2',
    'D3',
    'D4',
    'D5',
    'D6',
    'D7',
    'D8',
    'D9',
    'D10',
    'D11',
    'E1',
    'E2',
    'E3',
    'E4',
    'E5',
    'E6',
    'E7',
    'E8',
    'E9',
    'E10',
    'E11',
  ],
};

const PaymentMethod = [
  {
    id: 'online' as PaymentMethodType,
    label: 'Online Payment',
    description: 'Scan QR to pay.',
  },
  {
    id: 'cash' as PaymentMethodType,
    label: 'Cash Payment',
    description: 'Pay the conductor.',
  },
];

export { PassengerTypes, SeatInfo, PaymentMethod };
