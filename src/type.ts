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

interface SessionResponse {
  status: string;
  token: string;
  stop_name: string;
}

interface GETResponse {
  status: string;
  data: object;
}

interface CurrentBusInfoType {
  timestamp: string;
  current_stop: string;
  bus_id: number;
}

export type {
  PassengerType,
  PaymentMethodType,
  passengerDetailsType,
  modeType,
  SessionResponse,
  GETResponse,
  CurrentBusInfoType,
};
