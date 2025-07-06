import { useState, useEffect, useCallback } from 'react';

import { toast } from 'sonner';
import {
  CardContainer,
  CardHeader,
  CardBody,
  CardFooter,
} from '@/components/Card';
import { CloseIcon, RefreshIcon, BusIcon } from '@/components/Icons';
import {
  BusCard,
  StatsCard,
  TimelineCard,
} from './components/BusInfoContainer';
import { DriverCard, ConductorCard } from './components/DriverInfoContainer';
import Button from '@/components/Button';
import { Input, Label, Field } from '@/components/Form';
import Dialog from '@/components/Dialog';
import Loading from '@/components/Loading';

import { GET } from '@/lib/api';
import type {
  GETResponse,
  BusDataType,
  BusInformationType,
  TimelineInformationType,
  DriverInformationType,
  ConductorInformationType,
} from '@/type';

// temp data
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

const mockBusData: BusInformationType[] = [
  {
    bus_id: 1,
    route_id: 'Route 42',
    driver_id: 2,
    conductor_id: 3,
    passenger_count: 12,
    curr_location: 'University of San Carlos North Campus',
    status: 'active',
  },
  {
    bus_id: 2,
    route_id: 'Route 15',
    driver_id: 4,
    conductor_id: 5,
    passenger_count: 8,
    curr_location: 'Ayala Center Cebu',
    status: 'inactive',
  },
];

const mockDriverData: DriverInformationType[] = [
  {
    driver_id: 1,
    full_name: 'Geri Santos',
    license_number: 'D1234567',
    contact_number: '09171234567',
    status: 'active',
    bus_id: 1,
  },
  {
    driver_id: 2,
    full_name: 'Alex Cruz',
    license_number: 'D7654321',
    contact_number: '09179876543',
    status: 'inactive',
    bus_id: 2,
  },
];

const mockConductorData: ConductorInformationType[] = [
  {
    conductor_id: 1,
    full_name: 'Ryan Romero',
    contact_number: '09171234567',
    status: 'active',
    bus_id: 1,
  },
  {
    conductor_id: 1,
    full_name: 'John Cena',
    contact_number: '09179876543',
    status: 'inactive',
    bus_id: 2,
  },
];

const Operator = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [operatorID, setCurrentOperatorID] = useState('');
  const [activeTab, setActiveTab] = useState<
    'buses' | 'drivers' | 'conductors'
  >('buses');
  // const [driverData, setDriverData] =
  //   useState<DriverInformationType[]>(mockDriverData);

  // const [conductorData, setConductorData] =
  //   useState<ConductorInformationType[]>(mockConductorData);

  const [data, setData] = useState<BusDataType>({
    busData: mockBusData,
  });

  const [selectedBusId, setSelectedBusId] = useState<number | null>(null);
  const selectedBus = data
    ? data.busData.find((bus) => bus.bus_id === selectedBusId)
    : null;

  const refreshData = useCallback(async () => {
    // try {
    //   const response = await GET('/bus/index.php');
    //   const res = response as GETResponse;
    //   if (res.status === 'success') {
    //     setData({
    //       busData: res.data as BusInformationType[],
    //     });
    //   }
    // } catch (error) {
    //   toast.error(
    //     'Network Error ' +
    //       (error instanceof Error ? error.message : 'Unknown error')
    //   );
    // }
    // toast.success('Data refreshed successfully!');
    setData({ busData: mockBusData });
    toast.success('Mock data loaded!');
  }, []);

  useEffect(() => {
    const operatorID = localStorage.getItem('operator_id');

    if (operatorID) {
      setCurrentOperatorID(operatorID);

      refreshData();

      toast.success('Welcome back, Operator ID: ' + operatorID);
    } else {
      setIsAuthModalOpen(true);
    }
  }, [operatorID, refreshData]);

  useEffect(() => {
    if (!data) {
      return;
    }
    console.log('Data updated:', data);
  }, [data]);

  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const operatorID = e.currentTarget.operatorID.value;

    // temp only
    localStorage.setItem('operator_id', operatorID);
    setCurrentOperatorID(operatorID);

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
                      {selectedBus.driver_id}
                    </td>
                  </tr>
                  <tr className="border-outline border-b-2">
                    <td className="sm: p-2 text-sm font-semibold md:text-lg">
                      Conductor
                    </td>
                    <td className="sm: p-2 text-end text-sm md:text-lg">
                      {selectedBus.conductor_id}
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
                      {selectedBus.status}
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
      {operatorID && data ? (
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
              <StatsCard
                value={
                  data.busData.filter(
                    (bus: BusInformationType) => bus.status === 'active'
                  ).length
                }
                label="Active Buses"
              />
              <StatsCard
                value={
                  data.busData.filter(
                    (bus: BusInformationType) => bus.status === 'inactive'
                  ).length
                }
                label="In inactive"
              />
              <StatsCard value={0 + '%'} label="On-time Performance" />
              <StatsCard
                value={data.busData.reduce(
                  (sum: number, bus: BusInformationType) =>
                    sum + (bus.passenger_count || 0),
                  0
                )}
                label="Total Passenger Count"
              />
            </div>
            <hr className="border-primary my-2 border-t-2" />
            <div>
              <div className="mb-4 flex gap-2">
                <Button
                  className={`text-primary border-outline w-[120px] border-2 bg-white text-lg font-semibold ${activeTab === 'buses' ? '!bg-primary !text-white' : ''}`}
                  variant="glass"
                  onClick={() => setActiveTab('buses')}
                >
                  Buses
                </Button>
                <Button
                  className={`text-primary border-outline w-[120px] border-2 bg-white text-lg font-semibold ${activeTab === 'drivers' ? '!bg-primary !text-white' : ''}`}
                  variant="glass"
                  onClick={() => setActiveTab('drivers')}
                >
                  Drivers
                </Button>
                <Button
                  className={`text-primary border-outline w-[120px] border-2 bg-white text-lg font-semibold ${activeTab === 'conductors' ? '!bg-primary !text-white' : ''}`}
                  variant="glass"
                  onClick={() => setActiveTab('conductors')}
                >
                  Conductors
                </Button>
              </div>
              {activeTab === 'buses' && (
                <div className="grid grid-cols-1 items-start justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {data.busData.map((data, index) => (
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
              )}
              {activeTab === 'drivers' && (
                <div className="grid grid-cols-1 items-start justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockDriverData.map((data, index) => (
                    <DriverCard key={index} DriverInfo={data} />
                  ))}
                </div>
              )}
              {activeTab === 'conductors' && (
                <div className="grid grid-cols-1 items-start justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockConductorData.map((data, index) => (
                    <ConductorCard key={index} ConductorInfo={data} />
                  ))}
                </div>
              )}
            </div>
          </CardBody>
          <CardFooter className="!justify-center">
            <p className="text-sm">
              TRIP: Transit Routing & Integrated Payments
            </p>
          </CardFooter>
        </CardContainer>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Operator;
