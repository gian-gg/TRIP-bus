import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

import { CardContainer, CardHeader, CardBody } from '@/components/Card';
import Button from '@/components/Button';
import PageBody from '@/components/PageBody';
import Container from '@/components/Container';
import SettingsModal from '@/components/Settings';
import { BusIcon, RefreshIcon } from '@/components/Icons';
import { Field, Label, Input } from '@/components/Form';
import ConfirmToast from '@/components/ConfirmToast';

import SeatingGrid from './components/SeatingGrid';
import LegendItems from './components/LegendItems';
import PassengerModal from './components/PassengerModal';
import AisleModal from './components/AisleModal';
import TripSummaryModal from './components/TripSummaryModal';
import AlertsModal from './components/AlertsModal';
import DepartingPassengers from './components/DepartingPassengers';

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

  const [currentTrip, setCurrentTrip] = useState({
    routeID: localStorage.getItem('conductor_route_id') || '',
    tripID: localStorage.getItem('conductor_trip_id') || '',
  });

  const [passengerData, setPassengerData] = useState<TicketType[]>([]);

  const fetchData = useCallback(async () => {
    await APICall<TicketType[]>({
      type: 'GET',
      url: `/ticket/index.php?&trip_id=${currentTrip.tripID}&passenger_status=on_bus`,
      consoleLabel: 'Get Passenger By Trip ID',
      success: (data) => {
        setPassengerData(data);
      },
      error: (error) => {
        toast.error(error instanceof Error ? error.message : 'Unknown error');
      },
    });
  }, [currentTrip.tripID]);

  const handleStartTrip = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const routeID = formData.get('routeID') as string;

      toast.promise(
        APICall<{ trip_id: string }>({
          type: 'GET',
          url: '/trip/index.php?route_id=' + routeID,
          consoleLabel: 'handleStartTrip',
          success: (data) => {
            localStorage.setItem('conductor_route_id', routeID);
            localStorage.setItem('conductor_trip_id', data.trip_id);
            setCurrentTrip({
              routeID: routeID,
              tripID: data.trip_id,
            });

            setIsSettingsModalOpen(false);
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
    },
    [setCurrentTrip]
  );

  const handleEndTrip = useCallback(async () => {
    if (!currentTrip.tripID) {
      toast.error('No active trip to end.');
      return;
    }

    toast.promise(
      APICall({
        type: 'GET',
        url: '/trip/index.php?route_id=' + currentTrip.routeID,
        consoleLabel: 'handleEndTrip',
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
  }, [currentTrip.tripID, currentTrip.routeID]);

  useEffect(() => {
    if (currentTrip.tripID && currentTrip.routeID) {
      fetchData();
    } else {
      setIsSettingsModalOpen(true);
    }
  }, [currentTrip, fetchData]);

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
            className={`flex flex-col items-start justify-between gap-4 ${!currentTrip.tripID && '!bg-background'}`}
          >
            {currentTrip.tripID && (
              <div className="flex w-full items-center justify-between gap-2">
                <h1 className="text-2xl font-bold">
                  <BusIcon /> Route ID: {currentTrip.routeID}
                </h1>
                <p className="text-primary-light text-sm">
                  {currentTrip.tripID &&
                    `Active Trip ID: ${currentTrip.tripID}`}
                </p>
              </div>
            )}
            <div className="flex w-full items-center justify-between gap-2">
              <SettingsModal
                buttonVariant="fixed"
                modalTitle="Bus Settings"
                handleSettingsModalState={setIsSettingsModalOpen}
                settingsModalState={isSettingsModalOpen}
                state={!!currentTrip.tripID}
                State1={() => (
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
                    variant="solid"
                    className="!bg-error w-full"
                  >
                    End Trip
                  </Button>
                )}
                State2={() => (
                  <form
                    onSubmit={handleStartTrip}
                    className="flex w-full flex-col gap-2"
                  >
                    <Field>
                      <Label htmlFor="routeID" required>
                        Route ID
                      </Label>
                      <Input
                        id="routeID"
                        name="routeID"
                        type="text"
                        placeholder="Enter Route ID"
                        required
                      />
                    </Field>
                    <Button type="submit" variant="solid" className="w-full">
                      Start Trip
                    </Button>
                  </form>
                )}
              />
              {currentTrip.tripID && (
                <>
                  <DepartingPassengers fetchData={fetchData} />
                  <AlertsModal tripID={currentTrip.tripID} />
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
                    <p className="hidden md:block md:text-sm">Refresh</p>
                  </Button>
                </>
              )}
            </div>
          </CardHeader>
          {currentTrip.tripID && (
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
