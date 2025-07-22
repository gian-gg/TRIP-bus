import React, { useState, useEffect, useCallback } from 'react';
import Button from '@/components/Button';
import { toast } from 'sonner';
import { CloseIcon, UsersIcon } from '@/components/Icons';
import Dialog from '@/components/Dialog';
import {
  CardContainer,
  CardBody,
  CardHeader,
  CardFooter,
} from '@/components/Card';
import { formatPassengerType } from '@/lib/misc';

import APICall from '@/lib/api';

interface TicketType {
  ticket_id: string;
  full_name: string;
  seat_number: string;
  passenger_category: string;
  payment_status: 'paid' | 'pending';
}

const PassengerItem = (props: { ticket: TicketType }) => {
  return (
    <div className="group !border-outline !bg-background flex h-16 w-full items-center justify-between gap-4 rounded-md border-2 px-4 py-3 text-left sm:h-20 sm:px-6 sm:py-4">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm sm:h-12 sm:w-12 ${props.ticket.payment_status === 'paid' ? 'bg-primary-light text-primary' : 'bg-secondary-light text-yellow-600'}`}
        >
          <span>{props.ticket.seat_number}</span>
        </div>
        <div className="flex flex-col">
          <h1 className="text-sm font-bold text-black sm:text-lg">
            {props.ticket.full_name}
          </h1>
          <p className="text-muted text-xs sm:text-sm">
            {formatPassengerType(props.ticket.passenger_category)}
          </p>
        </div>
      </div>
      <input
        value={props.ticket.ticket_id}
        name="passenger"
        type="checkbox"
        className="form-checkbox text-primary h-5 w-5"
      />
    </div>
  );
};

const DepartingModal = (props: { fetchData: () => Promise<void> }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [passengersInfo, setPassengersInfo] = useState<
    | {
        currentStop: string;
        currentStopPassengers: TicketType[];
        nextStop: string;
        nextStopPassengers: TicketType[];
      }
    | undefined
  >();

  const onRefresh = useCallback(async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        await APICall<{
          current_stop: string;
          tickets_per_stop: {
            destination: string;
            ticket_count: number;
            tickets: TicketType[];
          }[];
        }>({
          type: 'GET',
          url: `/ticket/index.php?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`,
          consoleLabel: 'Get Passengers By Location',
          success: (data) => {
            setPassengersInfo({
              currentStop: data.tickets_per_stop[0].destination,
              currentStopPassengers: data.tickets_per_stop[0].tickets,
              nextStop: data.tickets_per_stop[1].destination,
              nextStopPassengers: data.tickets_per_stop[1].tickets,
            });
          },
          error: (error) => {
            throw new Error(
              error instanceof Error ? error.message : 'Unknown error'
            );
          },
        });
      },
      (error) => {
        throw new Error(
          error instanceof Error ? error.message : 'Geolocation not available'
        );
      }
    );
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const selectedPassengerIds = formData.getAll('passenger');

      if (selectedPassengerIds.length === 0) {
        throw new Error('Please select at least one passenger to depart.');
      }

      await APICall({
        type: 'PUT',
        url: '/ticket/index.php',
        body: selectedPassengerIds,
        consoleLabel: 'Departing Passengers',
        success: async () => {
          await props.fetchData();
          await onRefresh();

          setIsOpen(false);
        },
        error: (error) => {
          throw new Error(
            error instanceof Error ? error.message : 'Unknown error'
          );
        },
      });
    },
    [props, onRefresh]
  );

  const getPassengerLength = useCallback(() => {
    if (
      passengersInfo?.currentStopPassengers &&
      passengersInfo.currentStopPassengers
    ) {
      return (
        passengersInfo.currentStopPassengers.length +
        passengersInfo.nextStopPassengers.length
      );
    }
    return 0;
  }, [passengersInfo]);

  useEffect(() => {
    const interval = setInterval(() => {
      onRefresh();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [onRefresh]);

  return (
    <>
      <Button
        variant="glass"
        className="flex w-full items-center justify-center gap-2"
        onClick={() => passengersInfo?.currentStopPassengers && setIsOpen(true)}
      >
        <UsersIcon className="!h-4 !w-4" />{' '}
        <p className="text-xs md:text-sm">Departing ({getPassengerLength()})</p>
      </Button>
      {passengersInfo?.currentStopPassengers &&
        passengersInfo.currentStopPassengers.length > 0 && (
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            as="div"
            className="w-[90%] lg:w-2/5"
          >
            <CardContainer>
              <CardHeader className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">
                  Departing ({getPassengerLength()})
                </h1>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  <CloseIcon className="text-white" />
                </Button>
              </CardHeader>
              <CardBody className="flex flex-col gap-2 !p-2 !px-4">
                <form
                  id="form"
                  onSubmit={(e) => {
                    e.preventDefault();

                    toast.promise(handleSubmit(e), {
                      loading: 'Loading...',
                      success: 'Successfully departed passenger/s',
                      error: (err) => err.message,
                    });
                  }}
                  className="flex flex-col gap-2"
                >
                  {passengersInfo?.currentStopPassengers.length > 0 && (
                    <>
                      <h2 className="mt-2 ml-4 font-bold">
                        {passengersInfo?.currentStop}
                      </h2>
                      {passengersInfo.currentStopPassengers.map(
                        (passenger, idx) => (
                          <PassengerItem key={idx} ticket={passenger} />
                        )
                      )}
                    </>
                  )}
                  {passengersInfo?.nextStopPassengers.length > 0 && (
                    <>
                      <h2 className="mt-2 ml-4 font-bold">
                        {passengersInfo?.nextStop}
                      </h2>
                      {passengersInfo.nextStopPassengers.map(
                        (passenger, idx) => (
                          <PassengerItem key={idx} ticket={passenger} />
                        )
                      )}
                    </>
                  )}
                </form>
              </CardBody>
              <CardFooter className="flex justify-between">
                <Button
                  variant="solid"
                  className="!px-4"
                  type="submit"
                  form="form"
                >
                  Depart Passengers
                </Button>
              </CardFooter>
            </CardContainer>
          </Dialog>
        )}
    </>
  );
};

export default React.memo(DepartingModal);
