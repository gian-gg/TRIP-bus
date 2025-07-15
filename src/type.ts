type PassengerType = 'regular' | 'student' | 'pwd' | 'senior';
type PaymentMethodType = 'cash' | 'online';
type modeType = 'form' | 'complete' | 'pending' | 'success';

interface SessionResponse {
  status: string;
  stop_name: string;
  data: {
    token: string;
    trip_id: number;
    stop_name: string;
    conflicting_seats?: string[];
  };
  message?: string;
}

interface GETResponse {
  status: string;
  data: object;
  message?: string;
}

interface PassengerDetailsType {
  passenger_category: PassengerType;
  paymentMethod?: PaymentMethodType;
  full_name: string;
  seat_number: string;
  contact_info?: string;
  destination_stop_id?: StopType['stop_id'];
  fare_amount?: number;
}

interface PaymentType {
  payment_id: number;
  payment_mode: PaymentMethodType;
  payment_platform: string | undefined;
  fare_amount: number;
  payment_timestamp: string;
  payment_status: 'paid' | 'pending';
}

interface TicketType {
  ticket_id: number;
  bus_id: number;
  origin_stop_id: number;
  destination_stop_id: number;
  full_name: string;
  seat_number: string;
  passenger_category: PassengerType;
  passenger_status: 'left_bus' | 'onboard';
  boarding_time: string;
  arrival_time: string | undefined;
  ticket_timestamp: string;
  payment: PaymentType;
  contact_info?: string;
  destination_stop_name?: string;
  origin_stop_name?: string;
  fare_amount?: number;
}

interface GeneralTripInfoType {
  passengerCount: number;
  contactNumber: string;
  destination: StopType['stop_id'] | undefined;
  trip_id: number;
  fare_amount?: number;
}

interface StopType {
  stop_id: number;
  stop_name: string;
}

interface CurrentBusInfoType {
  timestamp: string;
  current_stop: string;
  bus_id: number;
  trip_id: number;
  stops?: StopType[];
  current_stop_id?: string;
}

export type {
  PassengerType,
  PaymentMethodType,
  modeType,
  SessionResponse,
  GETResponse,
  CurrentBusInfoType,
  GeneralTripInfoType,
  PassengerDetailsType,
  TicketType,
  PaymentType,
  StopType,
};
