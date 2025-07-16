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

import { GET, PUT } from '@/lib/api';
import type { GETResponse, TicketType } from '@/type';

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
  });

  const [passengerData, setPassengerData] = useState<TicketType[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await GET(
        '/ticket/index.php?bus_id=' + currentBusInfo.busID
      );
      const res = response as GETResponse;

      console.log('Passenger Data:', JSON.stringify(res, null, 2));

      if (res.status !== 'success') {
        toast.error('Invalid Bus ID');
        return;
      }

      if (res.data) {
        setPassengerData(res.data as TicketType[]);
      }
    } catch (error) {
      toast.error(
        'Invalid Bus ID: ' +
          (error instanceof Error ? error.message : 'Unknown error')
      );
      return;
    }
  }, [currentBusInfo.busID]);

  useEffect(() => {
    if (currentBusInfo.busID) {
      fetchData();
    } else {
      setIsSettingsModalOpen(true);
    }
  }, [currentBusInfo.busID, fetchData]);

  const handleSignIn = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const busID = e.currentTarget.busID.value;
      const conductorID = e.currentTarget.conductorID.value;

      try {
        const response = await GET('/bus/index.php?id=' + busID);
        const res = response as GETResponse;

        if (res.status !== 'success') {
          throw new Error('Invalid Bus ID');
        }
      } catch (error) {
        throw new Error(
          'Invalid Bus ID: ' +
            (error instanceof Error ? error.message : 'Unknown error')
        );
      }

      localStorage.setItem('bus_id', busID);
      localStorage.setItem('conductor_id', conductorID);
      setCurrentBusInfo({
        busID: busID,
        conductorID: conductorID,
      });
      setIsSettingsModalOpen(false);
    },
    []
  );

  const handleOpenPassengerModal = useCallback((ticket: TicketType) => {
    if (ticket) {
      setPassengerModal({
        open: true,
        ticket: ticket,
        edit: false,
      });
    }
  }, []);

  const handleSignOut = useCallback(() => {
    localStorage.removeItem('bus_id');
    localStorage.removeItem('conductor_id');

    setCurrentBusInfo({
      busID: '',
      conductorID: '',
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

    try {
      const response = await PUT('/trip/index.php?', {
        bus_id: currentBusInfo.busID,
        status: 'active',
      });
      const res = response as GETResponse;

      console.log('Start Trip Response:', JSON.stringify(res, null, 2));

      if (res.message === '10') {
        // Trip already active
        throw new Error('Trip is already active for this bus ID.');
      }

      const tripId = (res.data as { trip_id?: string })?.trip_id || '';
      localStorage.setItem('trip_id', tripId);
    } catch (error) {
      throw new Error(
        'Error starting trip: ' +
          (error instanceof Error ? error.message : 'Unknown error')
      );
    }
  }, [currentBusInfo.busID]);

  const handleEndTrip = useCallback(async () => {
    if (!currentBusInfo.busID) {
      toast.error('Please set the Bus ID in settings first.');
      return;
    }

    try {
      const response = await PUT('/trip/index.php', {
        bus_id: currentBusInfo.busID,
        status: 'complete',
      });
      const res = response as GETResponse;

      console.log('End Trip Response:', JSON.stringify(res, null, 2));

      if (res.message === '00') {
        // No active trip found
        throw new Error('No active trip found for this bus ID.');
      } else if (res.message === '11') {
        // Cannot end trip bcuz there is still passengers in bus
        throw new Error(
          'Please ensure all passengers have exited the bus before ending the trip.'
        );
      }

      setIsTripSummaryModalOpen(true);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Unknown error');
    }
  }, [currentBusInfo.busID]);

  return (
    <>
      {/* // passenger modal */}
      <PassengerModal
        passengerModal={passengerModal}
        setPassengerModal={setPassengerModal}
        fetchData={fetchData}
      />

      {/* // aisle modal */}
      <AisleModal
        openAisleModal={aisleModal}
        SetOpenAisleModal={setAisleModal}
        setPassengerModal={setPassengerModal}
      />

      {/* Trip summary modal */}
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
                <p className="text-primary-light text-sm">Lorem - Dolor</p>
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
                          toast.warning('Are you Sure?', {
                            action: {
                              label: 'Start Trip',
                              onClick: () =>
                                toast.promise(handleStartTrip, {
                                  loading: 'Starting trip...',
                                  success: () => {
                                    return 'Sucessfully started trip!';
                                  },
                                  error: (err) => err.message,
                                }),
                            },
                            actionButtonStyle: {
                              backgroundColor: '#DC7609',
                              color: '#FEFCF1',
                              padding: '1rem',
                            },
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
                          toast.warning('Are you Sure?', {
                            action: {
                              label: 'End Trip',
                              onClick: () =>
                                toast.promise(handleEndTrip, {
                                  loading: 'Ending trip...',
                                  success: () => {
                                    return 'Sucessfully ended trip!';
                                  },
                                  error: (err) => err.message,
                                }),
                            },
                            actionButtonStyle: {
                              backgroundColor: '#DC7609',
                              color: '#FEFCF1',
                              padding: '1rem',
                            },
                          });
                        }}
                        type="button"
                        variant="outline"
                        className="!border-error w-full"
                      >
                        End Trip
                      </Button>
                      <p className="text-muted mt-1 text-center text-xs">
                        ⚠️ Please ensure Trip is completed before ending. ⚠️
                      </p>
                    </div>
                  </>
                )}
                State2={() => (
                  <form
                    onSubmit={(e) =>
                      toast.promise(handleSignIn(e), {
                        loading: 'Signing in...',
                        success: () => {
                          return 'Successfully signed in!';
                        },
                        error: 'Something went wrong while signing in.',
                      })
                    }
                    className="flex flex-col gap-2"
                  >
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
              {currentBusInfo.busID && (
                <>
                  <AlertsModal />
                  <Button
                    variant="glass"
                    className="flex items-center gap-2"
                    onClick={() => {
                      toast.promise(fetchData(), {
                        loading: 'Refreshing...',
                        success: () => {
                          return {
                            message: `Refreshed passenger data successfully!`,
                          };
                        },
                        error:
                          'Something went wrong while refreshing passenger data.',
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
