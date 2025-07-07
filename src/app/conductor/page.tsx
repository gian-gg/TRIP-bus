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

import { BusIcon, RefreshIcon } from '@/components/Icons';

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

  const handleRenderPassengerModal = useCallback((ticket: TicketType) => {
    setPassengerModal({
      open: true,
      ticket: ticket,
    });
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

      console.log('Trip ended successfully:', res);

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

    // Logic to start the trip can be added here
    toast.info('Trip started successfully for Bus ID: ' + currentBusID);
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
        className="w-2/5"
      >
        {passengerModal.ticket && (
          <CardContainer className="h-full w-full">
            <CardHeader>
              <h1 className="text-lg font-semibold text-white">
                {passengerModal.ticket['full_name']}
              </h1>
            </CardHeader>
            <CardBody className="!p-6 !text-sm">
              <Container>
                <code className="rounded-md whitespace-pre-wrap">
                  {JSON.stringify(passengerModal.ticket, null, 4)}
                </code>
              </Container>
            </CardBody>
            <CardFooter className="flex justify-end">
              <Button
                variant="outline"
                onClick={() =>
                  setPassengerModal({
                    ...passengerModal,
                    open: false,
                  })
                }
                className="px-4"
              >
                Close
              </Button>
            </CardFooter>
          </CardContainer>
        )}
      </Dialog>

      {currentBusID && (
        <PageBody className="!items-start">
          <CardContainer className="w-full sm:w-4/5 lg:w-3/5 xl:w-2/5">
            <CardHeader className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold">
                  <BusIcon /> CERES LINERS
                </h1>
                <p className="text-primary-light text-sm">
                  Route: Lorem - Dolor
                </p>
                <p className="text-primary-light text-sm">
                  {new Date().toLocaleString()}
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
                <div className="w-full">
                  <h2 className="mb-4 text-lg font-semibold">Passenger List</h2>
                  <ul className="space-y-2">
                    {passengerData.map((ticket: TicketType) => (
                      <li
                        key={ticket.ticket_id}
                        className="flex items-center justify-between border-b border-gray-200 p-2"
                      >
                        <span>{ticket.full_name || 'Unknown Passenger'}</span>
                        <span>
                          {ticket.seat_number
                            ? `Seat: ${ticket.seat_number}`
                            : ''}
                        </span>
                        <Button
                          variant="outline"
                          onClick={() => handleRenderPassengerModal(ticket)}
                        >
                          Click
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : !currentBusID ? (
                <p>
                  Please set the Bus ID in settings to view passenger details.
                </p>
              ) : (
                <Loading />
              )}
              <p className="text-muted text-xs">
                Dev Note: Still in development, chill brav
              </p>
            </CardBody>
          </CardContainer>
        </PageBody>
      )}
    </>
  );
};

export default Conductor;
