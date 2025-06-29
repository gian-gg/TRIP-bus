type PassengerType = 'regular' | 'student' | 'pwd' | 'senior';
type PaymentMethodType = 'cash' | 'online';
type modeType = 'form' | 'complete' | 'pending' | 'success'; // Combined all mode types

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

interface BusInformationType {
  bus_id: number;
  route_id: string;
  driver_id: number;
  conductor_id: number;
  passenger_count: number;
  curr_location: string;
  status: 'active' | 'inactive' | 'in transit';
}

interface GeneralTripInfoType {
  passengerCount: number;
  contactNumber: string;
  destination: string;
}

interface PassengerDetailsType {
  passenger_category: PassengerType;
  full_name: string;
  seat_number: string;
}

interface passengerDetailsType {
  passengerType: PassengerType;
  paymentMethod: PaymentMethodType;
  destination: string;
  name: string;
  contact: string;
  seat: string;
}

interface TimelineInformationType {
  timestamp: string;
  status_code: number;
}

interface TripInformationType {
  route_id: number;
  bus_id: number;
  conductor_name: string;
  driver_name: string;
  total_passenger: number;
  total_revenue: number;
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
}

interface BusDataType {
  busData: BusInformationType[];
}

export type {
  PassengerType,
  PaymentMethodType,
  modeType,
  SessionResponse,
  GETResponse,
  CurrentBusInfoType,
  BusInformationType,
  GeneralTripInfoType,
  PassengerDetailsType,
  passengerDetailsType,
  TimelineInformationType,
  TripInformationType,
  TicketType,
  PaymentType,
  BusDataType,
};
