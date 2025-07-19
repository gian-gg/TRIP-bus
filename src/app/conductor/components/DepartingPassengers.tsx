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

import Callout from '@/components/Callout';

import APICall from '@/lib/api';

import type { TicketType } from '@/type';

const PassengerItem = (props: { ticket: TicketType }) => {
  return (
    <div className="group !border-outline !bg-background flex h-16 w-full items-center justify-between gap-4 rounded-md border-2 px-4 py-3 text-left sm:h-20 sm:px-6 sm:py-4">
      <div className="flex items-center gap-4">
        <div className="text-primary bg-primary-light flex h-10 w-10 items-center justify-center rounded-full text-sm sm:h-12 sm:w-12">
          <span>{props.ticket.seat_number}</span>
        </div>
        <div className="flex flex-col">
          <h1 className="text-sm font-bold text-black sm:text-lg">
            {props.ticket.full_name}
          </h1>
          <p className="text-muted text-xs sm:text-sm">
            {props.ticket.passenger_category}
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
        passengers: TicketType[];
      }
    | undefined
  >();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const selectedPassengerIds = formData.getAll('passenger');

      if (selectedPassengerIds.length === 0) {
        toast.error('Please select at least one passenger to depart.');
        return;
      }

      console.log('Selected Passenger IDs:', selectedPassengerIds);

      toast.promise(
        APICall({
          type: 'PUT',
          url: '/ticket/index.php',
          body: selectedPassengerIds,
          consoleLabel: 'Departing Passengers',
          success: async () => {
            await props.fetchData();
            setIsOpen(false);
          },
          error: (error) => {
            throw new Error(
              error instanceof Error ? error.message : 'Unknown error'
            );
          },
        }),
        {
          loading: 'Departing passengers...',
          success: 'Passengers departed successfully!',
          error: (error) => {
            throw new Error(
              error instanceof Error ? error.message : 'Unknown error'
            );
          },
        }
      );
    },
    [props]
  );

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
          success: (data) => {
            setPassengersInfo({
              currentStop: data.current_stop,
              passengers: data.tickets_per_stop[1].tickets,
            });
            console.log('Passengers Info:', {
              currentStop: data.current_stop,
              passengers: data.tickets_per_stop[1].tickets,
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
        onClick={() => passengersInfo?.passengers && setIsOpen(true)}
      >
        <UsersIcon className="!h-4 !w-4" />{' '}
        <p className="text-xs md:text-sm">
          Departing{' '}
          {passengersInfo?.passengers && (
            <span>({passengersInfo.passengers.length})</span>
          )}
        </p>
      </Button>
      {passengersInfo?.passengers && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          as="div"
          className="w-[90%] lg:w-2/5"
        >
          <CardContainer>
            <CardHeader className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold">
                  Departing ({passengersInfo.passengers.length})
                </h1>
                <p className="text-primary-light text-sm">
                  Current Stop: {passengersInfo.currentStop}
                </p>
              </div>
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
                onSubmit={handleSubmit}
                className="flex flex-col gap-2"
              >
                {passengersInfo.passengers.length ? (
                  passengersInfo.passengers.map((passenger, idx) => (
                    <PassengerItem key={idx} ticket={passenger} />
                  ))
                ) : (
                  <Callout className="!text-center">
                    No passengers in this aisle.
                  </Callout>
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
