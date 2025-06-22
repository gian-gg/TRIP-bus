type PassengerType = 'regular' | 'student' | 'pwd' | 'senior';
type PaymentMethodType = 'cash' | 'online';
type modeType = 'form' | 'success' | 'pending';

interface passengerDetailsType {
  passengerType: PassengerType;
  paymentMethod: PaymentMethodType;
  destination: string;
  name: string;
  contact: string;
  seat: string;
}

export type {
  PassengerType,
  PaymentMethodType,
  passengerDetailsType,
  modeType,
};
