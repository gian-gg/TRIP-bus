import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

import { CardContainer, CardHeader, CardBody } from '@/components/Card';
import Button from '@/components/Button';
import PageBody from '@/components/PageBody';
import { Input, Label, Field } from '@/components/Form';
import Container from '@/components/Container';
import SettingsModal from '@/components/Settings';
import { BusIcon, RefreshIcon } from '@/components/Icons';

import SeatingGrid from './components/SeatingGrid';
import LegendItems from './components/LegendItems';
import PassengerModal from './components/PassengerModal';
import AisleModal from './components/AisleModal';
import TripSummaryModal from './components/TripSummaryModal';
import AlertsModal from './components/AlertsModal';
import ConfirmToast from '@/components/ConfirmToast';

import APICall from '@/lib/api';
import type { TicketType } from '@/type';

const Conductor = () => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isTripSummaryModalOpen, setIsTripSummaryModalOpen] = useState(false);
  const [passengerModal, setPassengerModal] = useState({
    open: false,
    edit: false,
    ticket: undefined as TicketType | undefined,
  });
  const [aisleModal, setAisleModal] = useState({
    open: false,
    tickets: undefined as TicketType[] | undefined,
  });

  const [currentBusInfo, setCurrentBusInfo] = useState({
    busID: localStorage.getItem('bus_id') || '',
    conductorID: localStorage.getItem('conductor_id') || '',
    tripID: localStorage.getItem('trip_id') || '',
  });

  const [passengerData, setPassengerData] = useState<TicketType[]>([]);

  const fetchData = useCallback(async () => {
    await APICall<TicketType[]>({
      type: 'GET',
      url: `/ticket/index.php?bus_id=${currentBusInfo.busID}&trip_id=${currentBusInfo.tripID}&passenger_status=on_bus`,
      consoleLabel: 'Get Passenger By Bus ID',
      success: (data) => {
        setPassengerData(data);
      },
      error: (error) => {
        toast.error(error instanceof Error ? error.message : 'Unknown error');
      },
    });
  }, [currentBusInfo.busID, currentBusInfo.tripID]);

  const handleSignIn = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const busID = e.currentTarget.busID.value;
      const conductorID = e.currentTarget.conductorID.value;

      toast.promise(
        async () => {
          await APICall({
            type: 'GET',
            url: '/bus/index.php?id=' + busID,
            consoleLabel: 'Get Passenger By Bus ID',
            success: () => {
              localStorage.setItem('bus_id', busID);
              localStorage.setItem('conductor_id', conductorID);
              setCurrentBusInfo({
                ...currentBusInfo,
                busID: busID,
                conductorID: conductorID,
              });
              setIsSettingsModalOpen(false);
            },
            error: (error) => {
              throw new Error(
                error instanceof Error ? error.message : 'Unknown error'
              );
            },
          });
        },
        {
          loading: 'Signing In...',
          success: 'Successfully signed in!',
          error: (err) => err.message,
        }
      );
    },
    [currentBusInfo]
  );

  const handleSignOut = useCallback(() => {
    localStorage.removeItem('bus_id');
    localStorage.removeItem('conductor_id');
    // localStorage.removeItem('trip_id');

    setCurrentBusInfo({
      busID: '',
      conductorID: '',
      tripID: '',
    });

    toast.success('Signed out Succesfully!');

    setPassengerData([]);
    setPassengerModal({ open: false, ticket: undefined, edit: false });
    setIsSettingsModalOpen(true);
  }, []);

  const handleStartTrip = useCallback(async () => {
    if (!currentBusInfo.busID) {
      toast.error('Please set the Bus ID in settings first.');
      return;
    }

    toast.promise(
      APICall<{ trip_id: string }>({
        type: 'PUT',
        url: '/trip/index.php',
        consoleLabel: 'handleStartTrip',
        body: {
          bus_id: currentBusInfo.busID,
          status: 'active',
        },
        success: (data) => {
          const tripId = data.trip_id;
          localStorage.setItem('trip_id', tripId);
          setCurrentBusInfo({ ...currentBusInfo, tripID: tripId });
        },
        error: (error) => {
          throw new Error(
            error instanceof Error ? error.message : 'Unknown error'
          );
        },
      }),
      {
        loading: 'Loading...',
        success: 'Successfully started trip!',
        error: (err) => err.message,
      }
    );
  }, [currentBusInfo]);

  const handleEndTrip = useCallback(async () => {
    if (!currentBusInfo.busID) {
      toast.error('Please set the Bus ID in settings first.');
      return;
    }

    toast.promise(
      APICall({
        type: 'PUT',
        url: '/trip/index.php',
        consoleLabel: 'Get Passenger By Bus ID',
        body: {
          bus_id: currentBusInfo.busID,
          status: 'complete',
        },
        success: () => setIsTripSummaryModalOpen(true),
        error: (error) => {
          throw new Error(
            error instanceof Error ? error.message : 'Unknown error'
          );
        },
      }),
      {
        loading: 'Loading...',
        success: 'Successfully ended trip!',
        error: (err) => err.message,
      }
    );
  }, [currentBusInfo.busID]);

  useEffect(() => {
    if (!currentBusInfo.busID) {
      setIsSettingsModalOpen(true);
    }

    if (currentBusInfo.tripID === localStorage.getItem('trip_id')) {
      fetchData();
    }
  }, [currentBusInfo.busID, currentBusInfo.tripID, fetchData]);

  const handleOpenPassengerModal = useCallback((ticket: TicketType) => {
    if (ticket) {
      setPassengerModal({
        open: true,
        ticket: ticket,
        edit: false,
      });
    }
  }, []);

  return (
    <>
      <PassengerModal
        passengerModal={passengerModal}
        setPassengerModal={setPassengerModal}
        fetchData={fetchData}
      />

      <AisleModal
        openAisleModal={aisleModal}
        SetOpenAisleModal={setAisleModal}
        setPassengerModal={setPassengerModal}
      />

      <TripSummaryModal
        isOpen={isTripSummaryModalOpen}
        setIsOpen={setIsTripSummaryModalOpen}
      />

      <PageBody className="!items-start">
        <CardContainer className="h-full w-full sm:w-4/5 lg:w-3/5 xl:w-2/5">
          <CardHeader
            className={`flex flex-col items-start justify-between gap-4 ${!currentBusInfo.busID && '!bg-background'}`}
          >
            {currentBusInfo.busID && (
              <div className="flex w-full items-center justify-between gap-2">
                <h1 className="text-2xl font-bold">
                  <BusIcon /> Bus #{currentBusInfo.busID}
                </h1>
                <p className="text-primary-light text-sm">
                  {currentBusInfo.tripID &&
                    `Active Trip ID: ${currentBusInfo.tripID}`}
                </p>
              </div>
            )}
            <div className="flex w-full items-center justify-between gap-2">
              <SettingsModal
                buttonVariant="fixed"
                modalTitle="Bus Settings"
                handleSettingsModalState={setIsSettingsModalOpen}
                settingsModalState={isSettingsModalOpen}
                state={!!currentBusInfo.busID}
                State1={() => (
                  <>
                    <Button
                      type="button"
                      onClick={handleSignOut}
                      variant="outline"
                      className="w-full"
                    >
                      Sign Out
                    </Button>
                    <hr className="border-outline my-4 border-1" />
                    <div className="flex flex-col items-center gap-2">
                      <Button
                        onClick={() => {
                          setIsSettingsModalOpen(false);
                          ConfirmToast({
                            handleFunc: handleStartTrip,
                            label: 'Start Trip',
                            loading: 'Starting trip...',
                          });
                        }}
                        type="button"
                        variant="solid"
                        className="!bg-error w-full"
                      >
                        Start Trip
                      </Button>
                      <Button
                        onClick={() => {
                          setIsSettingsModalOpen(false);
                          ConfirmToast({
                            handleFunc: handleEndTrip,
                            label: 'End Trip',
                            loading: 'Ending trip...',
                          });
                        }}
                        type="button"
                        variant="outline"
                        className="!border-error w-full"
                      >
                        End Trip
                      </Button>
                    </div>
                  </>
                )}
                State2={() => (
                  <form onSubmit={handleSignIn} className="flex flex-col gap-2">
                    <Field>
                      <Label htmlFor="busID" required>
                        Bus ID
                      </Label>
                      <Input
                        id="busID"
                        name="busID"
                        type="text"
                        placeholder="Enter Bus ID"
                        required
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="conductorID" required>
                        Conductor ID
                      </Label>
                      <Input
                        id="conductorID"
                        name="conductorID"
                        type="text"
                        placeholder="Enter Conductor ID"
                        required
                      />
                    </Field>
                    <Button
                      type="submit"
                      variant="solid"
                      className="mt-2 w-full"
                    >
                      Sign In
                    </Button>
                  </form>
                )}
              />
              {currentBusInfo.tripID && (
                <>
                  <AlertsModal
                    currentData={{
                      busID: currentBusInfo.busID,
                      tripID: currentBusInfo.tripID,
                    }}
                  />
                  <Button
                    variant="glass"
                    className="flex items-center gap-2"
                    onClick={() => {
                      toast.promise(fetchData(), {
                        loading: 'Refreshing...',
                        success: 'Refreshed passenger data successfully!',
                        error: (err) => err.message,
                      });
                    }}
                  >
                    <RefreshIcon className="!h-4 !w-4" />{' '}
                    <p className="text-xs md:text-sm">Refresh</p>
                  </Button>
                </>
              )}
            </div>
          </CardHeader>
          {currentBusInfo.busID && (
            <CardBody className="flex flex-col items-center justify-center gap-4 !px-4">
              <Container className="flex w-full flex-wrap items-center justify-center gap-4">
                <LegendItems type="paid" />
                <LegendItems type="unpaid" />
                <LegendItems type="regular" />
                <LegendItems type="student" />
                <LegendItems type="senior" />
                <LegendItems type="pwd" />
              </Container>
              <SeatingGrid
                passengerData={passengerData}
                handleClick={handleOpenPassengerModal}
                handleAisleClick={setAisleModal}
              />
            </CardBody>
          )}
        </CardContainer>
      </PageBody>
    </>
  );
};

export default Conductor;
