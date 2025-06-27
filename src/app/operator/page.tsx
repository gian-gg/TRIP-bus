import {
  CardContainer,
  CardHeader,
  CardBody,
  CardFooter,
} from '@/components/Card';
import {
  GearIcon,
  CloseIcon,
  AlertIcon,
  RefreshIcon,
} from '@/components/Icons';
import type {
  BusInformationType,
  StatsInformationType,
  TimelineInformationType,
} from '@/type';
import {
  BusCard,
  StatsCard,
  TimelineCard,
  DetailsCard,
} from './components/BusInfoContainer';
import { useState } from 'react';
import Button from '@/components/Button';

import Dialog from '@/components/Dialog';

const StatsData: StatsInformationType[] = [
  {
    bus_active: 3,
    bus_maintenance: 12,
    on_time_performance: 89,
    total_passenger_count: 1234,
  },
];

const TimelineData: { bus_id: number; timeline: TimelineInformationType[] }[] =
  [
    {
      bus_id: 1,
      timeline: [
        { timestamp: '8:00 A.M', status_code: 1 },
        { timestamp: '9:30 A.M', status_code: 2 },
        { timestamp: '11:30 A.M', status_code: 3 },
      ],
    },
    {
      bus_id: 2,
      timeline: [
        { timestamp: '12:00 P.M', status_code: 1 },
        { timestamp: '12:30 SP.M', status_code: 5 },
        { timestamp: '1:30 P.M', status_code: 2 },
      ],
    },
    {
      bus_id: 3,
      timeline: [
        { timestamp: '12:00 P.M', status_code: 1 },
        { timestamp: '12:30 P.M', status_code: 2 },
        { timestamp: '1:30 P.M', status_code: 5 },
      ],
    },
    {
      bus_id: 4,
      timeline: [
        { timestamp: '12:00 P.M', status_code: 1 },
        { timestamp: '12:30 P.M', status_code: 3 },
        { timestamp: '1:30 P.M', status_code: 4 },
      ],
    },
    {
      bus_id: 5,
      timeline: [
        { timestamp: '12:00 P.M', status_code: 1 },
        { timestamp: '12:30 P.M', status_code: 2 },
        { timestamp: '1:30 P.M', status_code: 4 },
      ],
    },
    {
      bus_id: 6,
      timeline: [
        { timestamp: '12:00 P.M', status_code: 1 },
        { timestamp: '12:30 P.M', status_code: 2 },
        { timestamp: '1:30 P.M', status_code: 2 },
      ],
    },
    {
      bus_id: 7,
      timeline: [
        { timestamp: '12:00 P.M', status_code: 1 },
        { timestamp: '12:30 P.M', status_code: 4 },
        { timestamp: '1:30 P.M', status_code: 2 },
      ],
    },
    {
      bus_id: 8,
      timeline: [
        { timestamp: '12:00 P.M', status_code: 1 },
        { timestamp: '12:30 P.M', status_code: 3 },
        { timestamp: '1:30 P.M', status_code: 4 },
      ],
    },
  ];

const BusData: BusInformationType[] = [
  {
    bus_id: 1,
    route_id: 'Route 42',
    driver_name: 'Geri',
    conductor_name: 'Emman',
    passenger_count: 0,
    curr_location: 'University of San Carlos North Campus',
    bus_status: 'active',
  },
  {
    bus_id: 2,
    route_id: 'Route 23',
    driver_name: 'Gian',
    conductor_name: 'Emmanuel',
    passenger_count: 1000,
    curr_location: 'University of San Carlos Talamban Campus',
    bus_status: 'active',
  },
  {
    bus_id: 3,
    route_id: 'Route 43',
    driver_name: 'Epanto',
    conductor_name: 'Czachary',
    passenger_count: 2,
    curr_location: 'University of San Carlos DownTown Campus',
    bus_status: 'maintenance',
  },
  {
    bus_id: 4,
    route_id: 'Route 69',
    driver_name: 'Czachary',
    conductor_name: 'Xavier',
    passenger_count: 999,
    curr_location: 'University of the Philippines',
    bus_status: 'maintenance',
  },
  {
    bus_id: 5,
    route_id: 'Route 69',
    driver_name: 'Xavier',
    conductor_name: 'Bruce',
    passenger_count: 999,
    curr_location: 'University of the Philippines Cebu Campus',
    bus_status: 'active',
  },
  {
    bus_id: 6,
    route_id: 'Route 62',
    driver_name: 'Emmanuel',
    conductor_name: 'Felicia',
    passenger_count: 9234,
    curr_location: 'University of the Philippines Diliman Campus',
    bus_status: 'in transit',
  },
  {
    bus_id: 7,
    route_id: 'Route 69',
    driver_name: 'Xavier',
    conductor_name: 'Peter',
    passenger_count: 999,
    curr_location: 'University of the Philippines Cebu Campus',
    bus_status: 'in transit',
  },
  {
    bus_id: 8,
    route_id: 'Route 62',
    driver_name: 'Emmanuel',
    conductor_name: 'Clark',
    passenger_count: 9234,
    curr_location: 'University of the Philippines Diliman Campus',
    bus_status: 'in transit',
  },
];

const Operator = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBusId, setSelectedBusId] = useState<number | null>(null);
  const selectedBus = BusData.find((bus) => bus.bus_id === selectedBusId);

  return (
    <CardContainer className="border-primary-light z-1000 border-10">
      <Dialog
        open={isModalOpen}
        as="div"
        onClose={() => setIsModalOpen(false)}
        className="sm:6/10 w-9/10"
      >
        <CardContainer className="h-full w-full">
          <CardHeader className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-white">Bus Details</h1>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="px-4"
            >
              <CloseIcon className="text-white" />
            </Button>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col items-start justify-around gap-4 sm:flex-col lg:flex-row">
              <div className="w-full p-3">
                <div className="bg-neutral border-outline border-1 p-3">
                  <h1 className="text-primary text-[18px] font-bold sm:text-[20px] lg:text-2xl">
                    Bus Information
                  </h1>
                </div>
                <div className="border-outline border-1">
                  <DetailsCard label="Bus ID" value={'#' + selectedBusId} />
                  <DetailsCard label="Status" value={selectedBus?.bus_status} />
                  <DetailsCard label="Route" value={selectedBus?.route_id} />
                  <DetailsCard
                    label="Current Driver"
                    value={selectedBus?.driver_name}
                  />
                  <DetailsCard
                    label="Current Conductor"
                    value={selectedBus?.conductor_name}
                  />
                  <DetailsCard
                    label="Passenger Count"
                    value={selectedBus?.passenger_count + '/60'}
                  />
                </div>
              </div>

              <div className="w-full p-3">
                <div className="bg-neutral border-outline border-1 p-3">
                  <h1 className="text-primary text-[18px] font-bold sm:text-[20px] lg:text-2xl">
                    Timeline
                  </h1>
                </div>
                <div className="border-outline border-1">
                  {TimelineData.filter((t) => t.bus_id === selectedBusId).map(
                    (timelineObj) =>
                      timelineObj.timeline.map((data, index) => (
                        <TimelineCard key={index} TimelineInfo={data} />
                      ))
                  )}
                </div>
              </div>
            </div>
          </CardBody>
        </CardContainer>
      </Dialog>

      <CardHeader className="flex items-start justify-between">
        <div>
          <h1 className="text-start text-2xl font-bold">Operator Dashboard</h1>
          <p className="text-primary-light text-start text-sm">
            Metro Transit Corporation
          </p>
        </div>
        <div className="flex gap-4">
          <Button className="flex gap-2" variant="glass">
            <RefreshIcon className="h-[18px] w-[18px]" />
            <p className="hidden font-semibold sm:block">Refresh Data</p>
          </Button>
          <Button className="flex gap-2" variant="glass">
            <AlertIcon className="h-[18px] w-[18px]" />
            <p className="hidden font-semibold sm:block">Alerts</p>
          </Button>
        </div>
      </CardHeader>
      <CardBody className="flex w-full flex-col gap-4">
        <div className="border-neutral grid h-1/2 w-full grid-cols-2 grid-rows-2 justify-items-center border-1 sm:mt-3 sm:mb-3 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1">
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
        <div className="grid grid-cols-1 items-start justify-items-center gap-5 sm:mt-1 sm:mb-1 sm:grid-cols-2 sm:gap-0 lg:mt-3 lg:mb-3 lg:grid-cols-3">
          {BusData.map((data, index) => (
            <BusCard
              key={index}
              BusInfo={data}
              OnClick={() => {
                setSelectedBusId(data.bus_id);
                setIsModalOpen(true);
              }}
            />
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
