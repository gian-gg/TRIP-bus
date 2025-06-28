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
import { GearIcon } from '@/components/Icons';
import Loading from '@/components/Loading';
import Container from '@/components/Container';

import { BusIcon, RefreshIcon } from '@/components/Icons';

import { GET } from '@/lib/api';

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
      console.log('Fetched data:', res.data);
    } catch (error) {
      toast.error(
        'Invalid Bus ID: ' +
          (error instanceof Error ? error.message : 'Unknown error')
      );
      return;
    }

    toast.success('Data fetched successfully!');
  }, [currentBusID]);

  useEffect(() => {
    if (currentBusID) {
      fetchData();
    }
  }, [currentBusID, fetchData]);

  const handleSettingsChange = async (e: React.FormEvent<HTMLFormElement>) => {
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
  };

  const handleRenderPassengerModal = useCallback((ticket: TicketType) => {
    setPassengerModal({
      open: true,
      ticket: ticket,
    });
  }, []);

  return (
    <>
      {/* // settings modal */}
      <Dialog
        open={isSettingsModalOpen}
        as="div"
        onClose={() => setIsSettingsModalOpen(false)}
        className="w-96"
      >
        <CardContainer className="h-full w-full">
          <CardHeader>
            <h1 className="text-lg font-semibold text-white">Settings</h1>
          </CardHeader>
          <form onSubmit={handleSettingsChange}>
            <CardBody>
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
            </CardBody>
            <CardFooter className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsSettingsModalOpen(false)}
                className="px-4"
              >
                Close
              </Button>
              <Button
                type="submit"
                variant="solid"
                className="!bg-primary px-4"
              >
                Save
              </Button>
            </CardFooter>
          </form>
        </CardContainer>
      </Dialog>
      <Button
        variant="solid"
        className="text-primary fixed right-10 bottom-10 flex h-12 w-12 items-center justify-center !rounded-full !border-2 bg-white shadow-lg"
        onClick={() => setIsSettingsModalOpen(true)}
      >
        <GearIcon />
      </Button>

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

      <PageBody className="!items-start">
        <CardContainer className="w-full sm:w-4/5 lg:w-3/5 xl:w-2/5">
          <CardHeader className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                <BusIcon /> CERES LINERS
              </h1>
              <p className="text-primary-light text-sm">Route: Lorem - Dolor</p>
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
    </>
  );
};

export default Conductor;
