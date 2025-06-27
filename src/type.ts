import Passenger from './app/passenger/page';

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

interface TimelineInformationType {
  timestamp: string;
  status_code: number;
}

interface BusInformationType {
  bus_id: number;
  route_id: string;
  driver_name: string;
  conductor_name: string;
  passenger_count: number;
  curr_location: string;
  bus_status: 'active' | 'maintenance' | 'in transit';
  timeline?: TimelineInformationType[];
}

interface StatsInformationType {
  bus_active: number;
  bus_maintenance: number;
  on_time_performance: number;
  total_passenger_count: number;
}

interface TripInformationType {
  route_id: number;
  bus_id: number;
  conductor_name: string;
  driver_name: string;
  total_passenger: number;
  total_revenue: number;
}

export type {
  PassengerType,
  PaymentMethodType,
  passengerDetailsType,
  modeType,
  SessionResponse,
  GETResponse,
  CurrentBusInfoType,
  BusInformationType,
  StatsInformationType,
  TimelineInformationType,
  TripInformationType,
};
