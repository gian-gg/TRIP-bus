type PassengerType = 'regular' | 'student' | 'pwd' | 'senior';
type PaymentMethodType = 'cash' | 'online';
type modeType = 'form' | 'complete';

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
  driver_name: string;
  passenger_count: number;
  curr_location: string;
  bus_status: 'active' | 'maintenance' | 'in transit';
}

interface StatsInformationType {
  bus_active: number;
  bus_maintenance: number;
  on_time_performance: number;
  total_passenger_count: number;
}

interface GeneralTripInfoType {
  passengerCount: number;
  contactNumber: string;
  destination: string;
}

interface PassengerDetailsType {
  category: PassengerType;
  name: string;
  seat: string;
}

export type {
  PassengerType,
  PaymentMethodType,
  modeType,
  SessionResponse,
  GETResponse,
  CurrentBusInfoType,
  BusInformationType,
  StatsInformationType,
  GeneralTripInfoType,
  PassengerDetailsType,
};
