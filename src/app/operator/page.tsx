import {
  CardContainer,
  CardHeader,
  CardBody,
  CardFooter,
} from '@/components/Card';
import Button from '@/components/Button';
import { RefreshIcon } from '@/components/Icons';
import { AlertIcon } from '@/components/Icons';
import type { BusInformationType } from '@/type';
import { BusCard } from './components/BusInfoContainer';
import { StatsCard } from './components/BusInfoContainer';
import type { StatsInformationType } from '@/type';

const StatsData: StatsInformationType[] = [
  {
    bus_active: 3,
    bus_maintenance: 12,
    on_time_performance: 89,
    total_passenger_count: 1234,
  },
];

const BusData: BusInformationType[] = [
  {
    bus_id: 1,
    route_id: 'Route 42',
    driver_name: 'Geri',
    passenger_count: 0,
    curr_location: 'University of San Carlos North Campus',
    bus_status: 'active',
  },
  {
    bus_id: 2,
    route_id: 'Route 23',
    driver_name: 'Gian',
    passenger_count: 1000,
    curr_location: 'University of San Carlos Talamban Campus',
    bus_status: 'active',
  },
  {
    bus_id: 3,
    route_id: 'Route 43',
    driver_name: 'Epanto',
    passenger_count: 2,
    curr_location: 'University of San Carlos DownTown Campus',
    bus_status: 'maintenance',
  },
  {
    bus_id: 4,
    route_id: 'Route 69',
    driver_name: 'Czachary',
    passenger_count: 999,
    curr_location: 'University of the Philippines',
    bus_status: 'maintenance',
  },
  {
    bus_id: 4,
    route_id: 'Route 69',
    driver_name: 'Xavier',
    passenger_count: 999,
    curr_location: 'University of the Philippines Cebu Campus',
    bus_status: 'active',
  },
  {
    bus_id: 123,
    route_id: 'Route 62',
    driver_name: 'Emmanuel',
    passenger_count: 9234,
    curr_location: 'University of the Philippines Diliman Campus',
    bus_status: 'in transit',
  },
  {
    bus_id: 5,
    route_id: 'Route 69',
    driver_name: 'Xavier',
    passenger_count: 999,
    curr_location: 'University of the Philippines Cebu Campus',
    bus_status: 'in transit',
  },
  {
    bus_id: 126,
    route_id: 'Route 62',
    driver_name: 'Emmanuel',
    passenger_count: 9234,
    curr_location: 'University of the Philippines Diliman Campus',
    bus_status: 'in transit',
  },
];

const Operator = () => {
  return (
    <CardContainer className="border-primary-light z-1000 border-10">
      <CardHeader className="flex items-start justify-between">
        <div>
          <h1 className="text-start text-2xl font-bold">Operator Dashboard</h1>
          <p className="text-primary-light text-start text-sm">
            Metro Transit Corporation
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="flex" variant="glass">
            <RefreshIcon />
            <p className="hidden sm:block">Refresh Data</p>
          </Button>
          <Button className="flex" variant="glass">
            <AlertIcon />
            <p className="hidden sm:block">Alerts</p>
          </Button>
        </div>
      </CardHeader>
      <CardBody className="flex w-full flex-col items-center justify-center gap-4">
        <div className="border-neutral mt-3 mb-3 grid h-1/2 w-full grid-cols-2 grid-rows-2 justify-items-center border-1 sm:grid-cols-4 sm:grid-rows-1">
          <StatsCard value={StatsData[0].bus_active} label="Active Buses" />
          <StatsCard
            value={StatsData[0].bus_maintenance}
            label="In Maintenance"
          />
          <StatsCard
            value={StatsData[0].on_time_performance + '%'}
            label="On-time Performance"
          />
          <StatsCard
            value={StatsData[0].total_passenger_count}
            label="Total Passenger Count"
          />
        </div>
        <div className="mt-3 mb-3 grid grid-cols-1 items-start justify-items-center sm:grid-cols-3">
          {BusData.map((data, index) => (
            <BusCard key={index} BusInfo={data} />
          ))}
        </div>
      </CardBody>
      <CardFooter className="!justify-center">
        CIS2104: Information Management II
      </CardFooter>
    </CardContainer>
  );
};

export default Operator;
