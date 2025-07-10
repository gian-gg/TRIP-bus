import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

import {
  CardContainer,
  CardHeader,
  CardBody,
  CardFooter,
} from '@/components/Card';
import Button from '@/components/Button';
import PageBody from '@/components/PageBody';
import Dialog from '@/components/Dialog';
import { Input, Label, Field } from '@/components/Form';
import Loading from '@/components/Loading';
import Container from '@/components/Container';
import { SettingsModal } from '@/components/Settings';
import SeatingGrid from './components/SeatingGrid';
import LegendItems from './components/LegendItems';
import PassengerModalBadge from './components/PassengerModalBadge';
import Callout from '@/components/Callout';

import {
  BusIcon,
  RefreshIcon,
  CloseIcon,
  RightArrow,
} from '@/components/Icons';

import { GET, PUT } from '@/lib/api';

import type { GETResponse, TicketType } from '@/type';

const Conductor = () => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [passengerModal, setPassengerModal] = useState({
    open: false,
    ticket: undefined as TicketType | undefined,
  });

  const [currentBusID, setCurrentBusID] = useState(
    () => (localStorage.getItem('bus_id') as string) || ''
  );

  const [passengerData, setPassengerData] = useState<TicketType[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await GET('/ticket/index.php?busId=' + currentBusID);
      const res = response as GETResponse;

      if (res.status !== 'success') {
        toast.error('Invalid Bus ID');
        return;
      }

      setPassengerData(res.data as TicketType[]);
    } catch (error) {
      toast.error(
        'Invalid Bus ID: ' +
          (error instanceof Error ? error.message : 'Unknown error')
      );
      return;
    }

    toast.info('Passenger data fetched successfully!');
  }, [currentBusID]);

  useEffect(() => {
    if (currentBusID) {
      fetchData();
    } else {
      setIsSettingsModalOpen(true);
    }
  }, [currentBusID, fetchData]);

  const handleSettingsChange = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const busID = e.currentTarget.busID.value;

      try {
        const response = await GET('/bus/index.php?id=' + busID);
        const res = response as GETResponse;

        if (res.status !== 'success') {
          toast.error('Invalid Bus ID');
          return;
        }
      } catch (error) {
        toast.error(
          'Invalid Bus ID: ' +
            (error instanceof Error ? error.message : 'Unknown error')
        );
        return;
      }

      localStorage.setItem('bus_id', busID);
      setCurrentBusID(busID);
      toast.success('Successfully linked to bus ID: ' + busID);

      setIsSettingsModalOpen(false);
    },
    []
  );

  const handleOpenPassengerModal = useCallback((ticket: TicketType) => {
    if (ticket) {
      setPassengerModal({
        open: true,
        ticket: ticket,
      });
    }
  }, []);

  const handleDetachBusID = useCallback(() => {
    localStorage.removeItem('bus_id');
    setCurrentBusID('');
    toast.success('Bus ID detached successfully!');

    setPassengerData([]);
    setPassengerModal({ open: false, ticket: undefined });
    setIsSettingsModalOpen(true);
  }, []);

  const handleStartTrip = useCallback(async () => {
    if (!currentBusID) {
      toast.error('Please set the Bus ID in settings first.');
      return;
    }

    try {
      const response = await PUT('/trip/index.php', {
        bus_id: currentBusID,
        status: 'active',
      });
      const res = response as GETResponse;

      console.log('Start trip response:', res);

      if (res.message === 'Bus is already active') {
        toast.error('Trip is already active for this bus ID.');
        return;
      }
    } catch (error) {
      toast.error(
        'Error starting trip: ' +
          (error instanceof Error ? error.message : 'Unknown error')
      );
      return;
    }

    // Logic to start the trip can be added here
    toast.info('Trip started successfully for Bus ID: ' + currentBusID);
  }, [currentBusID]);

  const handleEndTrip = useCallback(async () => {
    if (!currentBusID) {
      toast.error('Please set the Bus ID in settings first.');
      return;
    }

    try {
      const response = await PUT('/trip/index.php', {
        bus_id: currentBusID,
        status: 'complete',
      });
      const res = response as GETResponse;

      if (res.message === 'No active trip found for the bus') {
        toast.error('No active trip found for this bus ID.');
        return;
      }
    } catch (error) {
      toast.error(
        'Error ending trip: ' +
          (error instanceof Error ? error.message : 'Unknown error')
      );
      return;
    }

    toast.warning('Trip ended successfully for Bus ID: ' + currentBusID);
  }, [currentBusID]);

  return (
    <>
      {/* // settings modal */}

      <SettingsModal
        modalTitle="Bus Settings"
        handleSettingsModalState={setIsSettingsModalOpen}
        settingsModalState={isSettingsModalOpen}
        state={!!currentBusID}
        State1={() => (
          <>
            <Button
              type="button"
              onClick={handleDetachBusID}
              variant="outline"
              className="w-full"
            >
              Detach Bus ID
            </Button>
            <hr className="border-outline my-4 border-1" />
            <div className="flex flex-col items-center gap-2">
              <Button
                onClick={handleStartTrip}
                type="button"
                variant="solid"
                className="!bg-error w-full"
              >
                Start Trip
              </Button>
              <Button
                onClick={handleEndTrip}
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
          <form onSubmit={handleSettingsChange}>
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
            <Button type="submit" variant="solid" className="mt-2 w-full">
              Link to Bus ID
            </Button>
          </form>
        )}
      />

      {/* // passenger modal */}
      <Dialog
        open={passengerModal.open}
        as="div"
        onClose={() =>
          setPassengerModal({
            ...passengerModal,
            open: false,
          })
        }
        className="w-[90%] lg:w-2/5"
      >
        {passengerModal.ticket && (
          <CardContainer className="h-full w-full">
            <CardHeader className="flex items-center justify-between">
              <div className="flex w-full flex-1 flex-col gap-2">
                <div className="flex items-center gap-4">
                  <h1 className="text-lg font-semibold text-white">
                    {passengerModal.ticket['full_name']}
                  </h1>
                  <PassengerModalBadge
                    passengerType={passengerModal.ticket['passenger_category']}
                  />
                </div>
                <p className="text-primary-light text-xs">
                  Reference Number: {passengerModal.ticket['ticket_id']}-
                  {passengerModal.ticket.payment['payment_id']}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setPassengerModal({
                    ...passengerModal,
                    open: false,
                  })
                }
              >
                <CloseIcon className="text-white" />
              </Button>
            </CardHeader>
            <CardBody className="!p-6 !text-sm">
              <Callout
                mode="primary"
                className="mx-4 mb-4 flex items-center justify-between gap-4 p-6 md:p-8"
              >
                <h2 className="text-primary my-1 text-xl font-bold">
                  {passengerModal.ticket['origin_stop_name']}
                </h2>
                <RightArrow className="text-primary" />
                <h2 className="text-primary text-md my-1 text-center font-bold md:text-lg">
                  {passengerModal.ticket['destination_stop_name']}
                </h2>
              </Callout>
              <Container>
                <code className="rounded-md whitespace-pre-wrap">
                  {JSON.stringify(passengerModal.ticket, null, 4)}
                </code>
              </Container>
            </CardBody>
            <CardFooter>
              <Button variant="solid" className="w-full">
                Edit Passenger
              </Button>
            </CardFooter>
          </CardContainer>
        )}
      </Dialog>

      {currentBusID && (
        <PageBody className="!items-start">
          <CardContainer className="h-full w-full sm:w-4/5 lg:w-3/5 xl:w-2/5">
            <CardHeader className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold">
                  <BusIcon /> Bus #{currentBusID}
                </h1>
                <p className="text-primary-light text-sm">
                  Route: Lorem - Dolor
                </p>
              </div>
              <Button
                variant="glass"
                className="flex items-center gap-2"
                onClick={fetchData}
              >
                <RefreshIcon className="!h-4 !w-4" />{' '}
                <p className="hidden text-xs md:block md:text-sm">Refresh</p>
              </Button>
            </CardHeader>
            <CardBody className="flex flex-col items-center justify-center gap-4 !px-4">
              {passengerData.length > 0 ? (
                <>
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
                  />
                </>
              ) : !currentBusID ? (
                <p>
                  Please set the Bus ID in settings to view passenger details.
                </p>
              ) : (
                <Loading />
              )}
            </CardBody>
          </CardContainer>
        </PageBody>
      )}
    </>
  );
};

export default Conductor;
