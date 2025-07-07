import { useState, useEffect, useCallback, useMemo } from 'react';

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

import { SettingsModal } from '@/components/Settings';

import { GET } from '@/lib/api';
import type {
  GETResponse,
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

const Operator = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [operatorID, setCurrentOperatorID] = useState('');
  const [activeTab, setActiveTab] = useState<
    'buses' | 'drivers' | 'conductors'
  >('buses');
  const [driverData, setDriverData] = useState<DriverInformationType[]>();
  const [conductorData, setConductorData] =
    useState<ConductorInformationType[]>();
  const [busData, setBusData] = useState<BusInformationType[]>();
  const [selectedBusId, setSelectedBusId] = useState<number | null>(null);
  const selectedBus = useMemo(
    () =>
      busData ? busData.find((bus) => bus.bus_id === selectedBusId) : null,
    [busData, selectedBusId]
  );

  const refreshData = useCallback(async () => {
    try {
      const busDataResponse = await GET('/bus/index.php');
      const busRes = busDataResponse as GETResponse;

      const driverDataResponse = await GET('/driver/index.php');
      const driverRes = driverDataResponse as GETResponse;

      const conductorDataResponse = await GET('/conductor/index.php');
      const conductorRes = conductorDataResponse as GETResponse;
      if (
        busRes.status !== 'success' ||
        driverRes.status !== 'success' ||
        conductorRes.status !== 'success'
      ) {
        toast.error('Error fetching data');
        return;
      }

      setBusData(busRes.data as BusInformationType[]);
      setDriverData(driverRes.data as DriverInformationType[]);
      setConductorData(conductorRes.data as ConductorInformationType[]);
    } catch (error) {
      toast.error(
        'Network Error ' +
          (error instanceof Error ? error.message : 'Unknown error')
      );
    }
    toast.success('Data refreshed successfully!');
  }, []);

  useEffect(() => {
    const operatorID = localStorage.getItem('operator_id');

    if (operatorID) {
      setCurrentOperatorID(operatorID);

      refreshData();
    } else {
      setIsAuthModalOpen(true);
    }
  }, [operatorID, refreshData]);

  const handleSignIn = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const operatorID = e.currentTarget.operatorID.value;
    const operatorPassword = e.currentTarget.operatorPassword.value;

    console.log('Signed in as:', {
      operator_id: operatorID,
      operator_password: operatorPassword,
    });

    // temp only
    localStorage.setItem('operator_id', operatorID);
    setCurrentOperatorID(operatorID);

    setIsAuthModalOpen(false);
  }, []);

  const handleSignOut = useCallback(() => {
    localStorage.removeItem('operator_id');
    setCurrentOperatorID('');
    setBusData(undefined);
    setDriverData(undefined);
    setConductorData(undefined);
    setSelectedBusId(null);
    setIsAuthModalOpen(true);
    toast.success('Signed out successfully!');
  }, []);

  return (
    <>
      {/* Settings Modal */}
      <SettingsModal
        modalTitle="Operator Settings"
        handleSettingsModalState={setIsAuthModalOpen}
        settingsModalState={isAuthModalOpen}
        state={!!operatorID}
        State1={() => (
          <Button variant="outline" className="w-full" onClick={handleSignOut}>
            Sign out
          </Button>
        )}
        State2={() => (
          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            <Field>
              <Label htmlFor="operatorID" required>
                ID
              </Label>
              <Input
                id="operatorID"
                name="operatorID"
                type="text"
                placeholder="Enter Operator ID"
                required
              />
            </Field>
            <Field>
              <Label htmlFor="operatorPassword" required>
                Password
              </Label>
              <Input
                id="operatorPassword"
                name="operatorPassword"
                type="password"
                placeholder="Enter Password"
                required
              />
            </Field>
            <Button type="submit" variant="solid" className="w-full">
              Sign In
            </Button>
          </form>
        )}
      />

      {/* bus modal */}
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
                      {driverData?.find(
                        (driver) =>
                          String(driver.driver_id) ===
                          String(selectedBus.driver_id)
                      )?.full_name ?? 'NULL'}
                    </td>
                  </tr>
                  <tr className="border-outline border-b-2">
                    <td className="sm: p-2 text-sm font-semibold md:text-lg">
                      Conductor
                    </td>
                    <td className="sm: p-2 text-end text-sm md:text-lg">
                      {conductorData?.find(
                        (conductor) =>
                          String(conductor.conductor_id) ===
                          String(selectedBus.conductor_id)
                      )?.full_name ?? 'NULL'}
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

      {/* page */}
      {operatorID && busData && driverData && conductorData ? (
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
                  busData.filter(
                    (bus: BusInformationType) => bus.status === 'active'
                  ).length
                }
                label="Active Buses"
              />
              <StatsCard
                value={
                  busData.filter(
                    (bus: BusInformationType) => bus.status === 'inactive'
                  ).length
                }
                label="In inactive"
              />
              <StatsCard value={0 + '%'} label="On-time Performance" />
              <StatsCard
                value={busData.reduce(
                  (sum: number, bus: BusInformationType) =>
                    sum + (bus.passenger_count || 0),
                  0
                )}
                label="Total Passenger Count"
              />
            </div>
            <hr className="border-outline my-2 border-t-2" />
            <div>
              <div className="mb-4 flex items-center justify-center gap-2 md:justify-start">
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
              {activeTab === 'buses' && busData && (
                <div className="grid grid-cols-1 items-start justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {busData.map((data, index) => (
                    <BusCard
                      key={index}
                      BusInfo={{
                        ...data,
                        driver_name:
                          driverData.find(
                            (driver) =>
                              String(driver.driver_id) ===
                              String(data.driver_id)
                          )?.full_name ?? 'NULL',
                      }}
                      OnClick={() => {
                        setSelectedBusId(data.bus_id);
                        setIsModalOpen(true);
                      }}
                    />
                  ))}
                </div>
              )}
              {activeTab === 'drivers' && driverData && (
                <div className="grid grid-cols-1 items-start justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {driverData.map((data, index) => (
                    <DriverCard key={index} DriverInfo={data} />
                  ))}
                </div>
              )}
              {activeTab === 'conductors' && conductorData && (
                <div className="grid grid-cols-1 items-start justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {conductorData.map((data, index) => (
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
