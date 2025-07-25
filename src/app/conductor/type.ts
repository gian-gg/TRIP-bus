import type { GETResponse } from '@/type';
import type { TicketType } from '@/type';

type LegendItemsProps =
  | 'paid'
  | 'pending'
  | 'unpaid'
  | 'student'
  | 'senior'
  | 'pwd'
  | 'regular';

const legendConfig: Record<
  LegendItemsProps,
  { bg: string; border: string; bgColor?: string; borderColor?: string }
> = {
  paid: {
    bg: 'bg-primary-light',
    border: 'border-primary',
    bgColor: 'var(--color-primary-light)',
    borderColor: 'var(--color-primary)',
  },
  unpaid: {
    bg: 'bg-secondary-light',
    border: 'border-secondary',
    bgColor: 'var(--color-secondary-light)',
    borderColor: 'var(--color-secondary)',
  },
  pending: {
    bg: 'bg-secondary-light',
    border: 'border-secondary',
    bgColor: 'var(--color-secondary-light)',
    borderColor: 'var(--color-secondary)',
  },
  student: {
    bg: 'bg-type-student-light',
    border: 'border-type-student',
    bgColor: 'var(--color-type-student-light)',
    borderColor: 'var(--color-type-student)',
  },
  senior: {
    bg: 'bg-red-200',
    border: 'border-red-400',
    bgColor: 'var(--color-red-200)',
    borderColor: 'var(--color-red-400)',
  },
  pwd: {
    bg: 'bg-type-pwd-light',
    border: 'border-type-pwd',
    bgColor: 'var(--color-type-pwd-light)',
    borderColor: 'var(--color-type-pwd)',
  },
  regular: {
    bg: 'bg-gray-200',
    border: 'border-gray-400',
    bgColor: 'var(--color-gray-200)',
    borderColor: 'var(--color-gray-800)',
  },
};

const typeLabels: Record<LegendItemsProps, string> = {
  paid: 'Paid',
  unpaid: 'Unpaid',
  pending: 'Unpaid',
  regular: 'Regular',
  student: 'Student',
  senior: 'Senior',
  pwd: 'PWD',
};

interface AisleModalType {
  open: boolean;
  tickets: TicketType[] | undefined;
}

interface PassengerModalType {
  open: boolean;
  edit: boolean;
  ticket: TicketType | undefined;
}

interface TicketSummaryType {
  ticket_id: string;
  passenger_category: 'regular' | 'student' | 'senior' | 'pwd';
  fare_amount: number;
  payment_mode: 'cash' | 'online';
}

interface TripSummaryType extends GETResponse {
  trip_details: {
    route_id: string;
    bus_id: string;
    driver_id: string;
    conductor_id: string;
    boarding_time: string;
    arrival_time: string;
    total_passengers: number;
    total_revenue: string;
  };
  tickets: TicketSummaryType[];
}

interface AlertType {
  id: number;
  message: string;
  has_read: boolean;
  created_at: string;
}

export type {
  LegendItemsProps,
  AisleModalType,
  PassengerModalType,
  TripSummaryType,
  AlertType,
};
export { legendConfig, typeLabels };
