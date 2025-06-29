import { useState, useEffect } from 'react';

import { toast } from 'sonner';
import {
  CardContainer,
  CardHeader,
  CardBody,
  CardFooter,
} from '@/components/Card';
import { CloseIcon, RefreshIcon, BusIcon } from '@/components/Icons';
import type {
  BusInformationType,
  StatsInformationType,
  TimelineInformationType,
} from '@/type';
import {
  BusCard,
  StatsCard,
  TimelineCard,
} from './components/BusInfoContainer';
import Button from '@/components/Button';
import { Input, Label, Field } from '@/components/Form';
import Dialog from '@/components/Dialog';

const StatsData: StatsInformationType = {
  bus_active: 3,
  bus_maintenance: 12,
  on_time_performance: 89,
  total_passenger_count: 1234,
};

const TimelineData: { bus_id: number; timeline: TimelineInformationType[] }[] =
  [
    {
      bus_id: 1,
      timeline: [
        { timestamp: '8:00 AM', status_code: 1 },
        { timestamp: '9:30 AM', status_code: 2 },
        { timestamp: '11:30 AM', status_code: 3 },
      ],
    },
    {
      bus_id: 2,
      timeline: [
        { timestamp: '12:00 PM', status_code: 1 },
        { timestamp: '12:30 PM', status_code: 5 },
        { timestamp: '1:30 PM', status_code: 2 },
      ],
    },
    {
      bus_id: 3,
      timeline: [
        { timestamp: '12:00 PM', status_code: 1 },
        { timestamp: '12:30 PM', status_code: 2 },
        { timestamp: '1:30 PM', status_code: 5 },
      ],
    },
    {
      bus_id: 4,
      timeline: [
        { timestamp: '12:00 PM', status_code: 1 },
        { timestamp: '12:30 PM', status_code: 3 },
        { timestamp: '1:30 PM', status_code: 4 },
      ],
    },
    {
      bus_id: 5,
      timeline: [
        { timestamp: '12:00 PM', status_code: 1 },
        { timestamp: '12:30 PM', status_code: 2 },
        { timestamp: '1:30 PM', status_code: 4 },
      ],
    },
    {
      bus_id: 6,
      timeline: [
        { timestamp: '12:00 PM', status_code: 1 },
        { timestamp: '12:30 PM', status_code: 2 },
        { timestamp: '1:30 PM', status_code: 2 },
      ],
    },
    {
      bus_id: 7,
      timeline: [
        { timestamp: '12:00 PM', status_code: 1 },
        { timestamp: '12:30 PM', status_code: 4 },
        { timestamp: '1:30 PM', status_code: 2 },
      ],
    },
    {
      bus_id: 8,
      timeline: [
        { timestamp: '12:00 PM', status_code: 1 },
        { timestamp: '12:30 PM', status_code: 3 },
        { timestamp: '1:30 PM', status_code: 4 },
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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentBusID, setCurrentBusID] = useState('');
  const [selectedBusId, setSelectedBusId] = useState<number | null>(null);
  const selectedBus = BusData.find((bus) => bus.bus_id === selectedBusId);

  const refreshData = () => {
    toast.success('Data refreshed successfully!');
  };

  useEffect(() => {
    const operatorID = localStorage.getItem('operator_id');

    if (operatorID) {
      setCurrentBusID(operatorID);
      toast.success('Welcome back, Operator ID: ' + operatorID);
    } else {
      setIsAuthModalOpen(true);
    }
  }, [currentBusID]);

  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const operatorID = e.currentTarget.operatorID.value;

    // temp only
    localStorage.setItem('operator_id', operatorID);
    setCurrentBusID(operatorID);
    toast.success('Successfully signed in as : ' + operatorID);

    setIsAuthModalOpen(false);
  };

  return (
    <>
      <Dialog
        open={isAuthModalOpen}
        as="div"
        onClose={() => null}
        className="w-96"
      >
        <CardContainer className="h-full w-full">
          <CardHeader>
            <h1 className="text-lg font-semibold text-white">Sign In</h1>
          </CardHeader>
          <form onSubmit={handleAuth}>
            <CardBody>
              <Field>
                <Label htmlFor="operatorID" required>
                  Operator ID
                </Label>
                <Input
                  id="operatorID"
                  name="operatorID"
                  type="text"
                  placeholder="Enter Operator ID"
                  required
                />
              </Field>
            </CardBody>
            <CardFooter className="flex justify-end">
              <Button
                type="submit"
                variant="solid"
                className="!bg-primary px-4"
              >
                Sign In
              </Button>
            </CardFooter>
          </form>
        </CardContainer>
      </Dialog>
      <Dialog
        open={isModalOpen}
        as="div"
        onClose={() => setIsModalOpen(false)}
        className="w-[90%] sm:w-4/5 md:w-3/5"
      >
        <CardContainer>
          <CardHeader className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-white">Bus Details</h1>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              <CloseIcon className="text-white" />
            </Button>
          </CardHeader>
          <CardBody className="flex flex-col items-start justify-evenly gap-4 !p-4 md:!p-6 xl:flex-row">
            {selectedBus ? (
              <table className="border-outline w-full rounded-md border-2">
                <thead>
                  <tr>
                    <th
                      colSpan={2}
                      className="bg-neutral text-primary border-outline border-2 p-2 text-left sm:text-lg md:p-4 md:text-xl"
                    >
                      Bus Information
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-outline border-b-2">
                    <td className="sm: p-2 text-sm font-semibold md:text-lg">
                      Bus ID
                    </td>
                    <td className="sm: p-2 text-end text-sm md:text-lg">
                      {selectedBus.bus_id}
                    </td>
                  </tr>
                  <tr className="border-outline border-b-2">
                    <td className="sm: p-2 text-sm font-semibold md:text-lg">
                      Route
                    </td>
                    <td className="sm: p-2 text-end text-sm md:text-lg">
                      {selectedBus.route_id}
                    </td>
                  </tr>
                  <tr className="border-outline border-b-2">
                    <td className="sm: p-2 text-sm font-semibold md:text-lg">
                      Driver
                    </td>
                    <td className="sm: p-2 text-end text-sm md:text-lg">
                      {selectedBus.driver_name}
                    </td>
                  </tr>
                  <tr className="border-outline border-b-2">
                    <td className="sm: p-2 text-sm font-semibold md:text-lg">
                      Conductor
                    </td>
                    <td className="sm: p-2 text-end text-sm md:text-lg">
                      {selectedBus.conductor_name}
                    </td>
                  </tr>
                  <tr className="border-outline border-b-2">
                    <td className="sm: p-2 text-sm font-semibold md:text-lg">
                      Passenger Count
                    </td>
                    <td className="sm: p-2 text-end text-sm md:text-lg">
                      {selectedBus.passenger_count}
                    </td>
                  </tr>
                  <tr className="border-outline border-b-2">
                    <td className="sm: p-2 text-sm font-semibold md:text-lg">
                      Current Location
                    </td>
                    <td className="sm: p-2 text-end text-sm md:text-lg">
                      {selectedBus.curr_location}
                    </td>
                  </tr>
                  <tr className="border-outline">
                    <td className="sm: p-2 text-sm font-semibold md:text-lg">
                      Status
                    </td>
                    <td className="sm: p-2 text-end text-sm capitalize md:text-lg">
                      {selectedBus.bus_status}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div className="sm: text-center text-sm text-gray-500 md:text-lg">
                No bus selected.
              </div>
            )}

            <div className="w-full">
              <h1 className="bg-neutral text-primary border-outline border-2 p-2 text-left font-bold sm:text-lg md:p-4 md:text-xl">
                Timeline
              </h1>
              <div className="border-outline border-1">
                {TimelineData.filter((t) => t.bus_id === selectedBusId).map(
                  (timelineObj) =>
                    timelineObj.timeline.map((data, index) => (
                      <TimelineCard key={index} TimelineInfo={data} />
                    ))
                )}
              </div>
            </div>
          </CardBody>
        </CardContainer>
      </Dialog>
      {currentBusID && (
        <CardContainer className="m-auto max-w-[1400px] p-2">
          <CardHeader className="flex items-start justify-between">
            <div>
              <h1 className="flex items-center gap-2 text-2xl font-bold">
                <BusIcon /> Ceres Liners
              </h1>
              <p className="text-primary-light text-start text-sm">
                Bus Operator Dashboard
              </p>
            </div>
            <Button
              className="flex items-center justify-between gap-2"
              variant="glass"
              onClick={refreshData}
            >
              <RefreshIcon className="h-[18px] w-[18px]" />
              <p className="hidden font-semibold sm:block">Refresh</p>
            </Button>
          </CardHeader>
          <CardBody className="flex w-full flex-col gap-4 !px-2 sm:!px-4 lg:!px-6">
            <div className="mx-2 grid w-full grid-cols-2 items-center justify-items-center gap-4 md:grid-cols-4">
              <StatsCard value={StatsData.bus_active} label="Active Buses" />
              <StatsCard
                value={StatsData.bus_maintenance}
                label="In Maintenance"
              />
              <StatsCard
                value={StatsData.on_time_performance + '%'}
                label="On-time Performance"
              />
              <StatsCard
                value={StatsData.total_passenger_count}
                label="Total Passenger Count"
              />
            </div>

            <div className="grid grid-cols-1 items-start justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
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
            <p className="text-sm">
              TRIP: Transit Routing & Integrated Payments
            </p>
          </CardFooter>
        </CardContainer>
      )}
    </>
  );
};

export default Operator;
