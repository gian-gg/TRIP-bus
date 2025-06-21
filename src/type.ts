type PassengerType = 'regular' | 'student' | 'pwd' | 'senior';
type PaymentMethodType = 'cash' | 'online';
type modeType = 'form' | 'success';

interface passengerDetailsType {
  passengerType: PassengerType | string;
  paymentMethod: PaymentMethodType | string;
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
