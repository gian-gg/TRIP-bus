import React, { useCallback } from 'react';
import { toast } from 'sonner';

import {
  CardContainer,
  CardHeader,
  CardBody,
  CardFooter,
} from '@/components/Card';
import Button from '@/components/Button';
import Dialog from '@/components/Dialog';
import Container from '@/components/Container';
import Callout from '@/components/Callout';

import { Select, Field, Label } from '@/components/Form';

import { Badge, PassengerBadge } from './Badges';

import { CloseIcon, RightArrow } from '@/components/Icons';

import type { GETResponse } from '@/type';

import { PassengerTypes, SeatInfo } from '@/data';

import { formatTimeTo12Hour } from '@/lib/misc';
import { typeLabels, type PassengerModalType } from '../type';

import { PUT } from '@/lib/api';

const PassengerModal = (props: {
  passengerModal: PassengerModalType;
  setPassengerModal: (arg: PassengerModalType) => void;
  fetchData: () => Promise<void>;
}) => {
  const { passengerModal, setPassengerModal, fetchData } = props;

  const handleClose = () => {
    setPassengerModal({
      ...passengerModal,
      open: false,
      edit: false,
    });
  };

  const handleEdit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.currentTarget;
      const formData = new FormData(form);
      const passengerType = formData.get('passengerType') as string;
      const seat = formData.get('seat') as string;
      const paymentStatus = formData.get('paymentStatus') as string | undefined;

      const ticket = {
        passenger_category:
          passengerType === passengerModal.ticket?.passenger_category
            ? null
            : passengerType,
        seat_number: seat === passengerModal.ticket?.seat_number ? null : seat,
        payment_status: paymentStatus === 'unpaid' ? null : paymentStatus,
      };

      if (
        !ticket.passenger_category &&
        !ticket.seat_number &&
        !ticket.payment_status
      ) {
        throw new Error('No changes made to the passenger details.');
      }

      try {
        const response = await PUT(
          '/ticket/index.php?ticket_id=' + passengerModal.ticket?.ticket_id,
          ticket
        );

        const res = response as GETResponse;

        if (res.message === 'Occupied') {
          throw new Error('Selected Seat is already occupied.');
        }

        if (res.status !== 'success') {
          throw new Error('Error in editing passenger, try again.');
        }

        await fetchData();

        setPassengerModal({
          ...passengerModal,
          edit: false,
          open: false,
        });
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : 'Unknown error'
        );
      }
    },
    [passengerModal, setPassengerModal, fetchData]
  );

  return (
    <Dialog
      open={passengerModal.open}
      as="div"
      onClose={handleClose}
      className="w-[90%] lg:w-2/5"
    >
      {passengerModal.ticket && (
        <CardContainer className="h-full w-full">
          <CardHeader className="flex items-center justify-between">
            <div className="flex w-full flex-1 flex-col gap-2">
              <h1 className="text-lg font-semibold text-white">Passenger</h1>

              <p className="text-primary-light text-xs">
                Ticket Reference: {passengerModal.ticket['ticket_id']}-
                {passengerModal.ticket.payment['payment_id']}
              </p>
            </div>
            <Button type="button" variant="outline" onClick={handleClose}>
              <CloseIcon className="text-white" />
            </Button>
          </CardHeader>
          <CardBody className="flex flex-col gap-4 !p-6 !text-sm">
            <Callout
              mode="primary"
              className="mx-4 flex items-center justify-between gap-4 p-6 md:p-8"
            >
              <div>
                <h2 className="text-primary my-1 text-xl font-bold">
                  {passengerModal.ticket['origin_stop_name']}
                </h2>
                <p className="text-xs">
                  {formatTimeTo12Hour(
                    passengerModal.ticket['boarding_time'].split(' ')[1]
                  )}
                </p>
              </div>
              <RightArrow className="text-primary" />
              <h2 className="text-primary text-md my-1 text-center font-bold md:text-lg">
                {passengerModal.ticket['destination_stop_name']}
              </h2>
            </Callout>
            <Container className="flex flex-col gap-2 !p-6">
              <p>
                <strong>Name:</strong> {passengerModal.ticket['full_name']}
              </p>
              <p>
                <strong>Contact:</strong>{' '}
                {passengerModal.ticket['contact_info']}
              </p>
              <div className="flex w-full items-center gap-2">
                <strong>Type:</strong>
                <PassengerBadge
                  type={passengerModal.ticket['passenger_category']}
                />
              </div>
              <div className="flex w-full items-center gap-2">
                <strong>Seat:</strong>
                <Badge className="border-gray-400 bg-gray-200">
                  {passengerModal.ticket['seat_number']}
                </Badge>
              </div>
              <div className="flex w-full items-center gap-2">
                <strong>Payment Status:</strong>
                <PassengerBadge
                  type={passengerModal.ticket.payment['payment_status']}
                />
              </div>
              <hr className="border-black/50" />
            </Container>
            <Callout
              mode="primary"
              className="mx-4 flex items-center justify-between gap-4 p-6 md:p-8"
            >
              <div>
                <h1 className="font-bold">FARE AMOUNT</h1>
                <p className="text-xs">20% off for Students, PWDs, & Seniors</p>
              </div>
              <span className="text-primary text-2xl font-extrabold">
                ₱{passengerModal.ticket['fare_amount']}
              </span>
            </Callout>
            {passengerModal.ticket.associate_ticket['seat_number'].length >
              0 && (
              <p className="text-muted text-center text-xs md:text-sm">
                Associated with:{' '}
                {passengerModal.ticket.associate_ticket['seat_number'].join(
                  ', '
                )}{' '}
                (Total: ₱
                {passengerModal.ticket.associate_ticket['total_fare_amount']})
              </p>
            )}

            {passengerModal.edit && (
              <Container>
                <h1 className="text-primary mb-2 text-lg font-bold">
                  Edit Passenger
                </h1>
                <form
                  id="editPassengerForm"
                  onSubmit={(e) =>
                    toast.promise(handleEdit(e), {
                      loading: 'Editing passenger...',
                      success: () => {
                        return 'Passenger details updated successfully.';
                      },
                      error: (error) => {
                        return error.message;
                      },
                    })
                  }
                  className="flex justify-between gap-2"
                >
                  {passengerModal.ticket.payment['payment_status'] ===
                    'pending' && (
                    <Field>
                      <Label htmlFor="passengerType" required>
                        Type:
                      </Label>
                      <Select
                        id="passengerType"
                        name="passengerType"
                        defaultValue={
                          passengerModal.ticket['passenger_category']
                        }
                        required
                      >
                        {PassengerTypes.map((type) => (
                          <option key={type} value={type}>
                            {typeLabels[type]}
                          </option>
                        ))}
                      </Select>
                    </Field>
                  )}

                  <Field>
                    <Label htmlFor="seat" required>
                      Seat:
                    </Label>
                    <Select
                      id="seat"
                      name="seat"
                      defaultValue={passengerModal.ticket['seat_number']}
                      required
                    >
                      {SeatInfo.seats.map((seat) => (
                        <option key={seat} value={seat}>
                          {seat}
                        </option>
                      ))}
                    </Select>
                  </Field>
                  {passengerModal.ticket.payment['payment_status'] ===
                    'pending' && (
                    <Field>
                      <Label htmlFor="paymentStatus" required>
                        Payment:
                      </Label>
                      <Select
                        id="paymentStatus"
                        name="paymentStatus"
                        defaultValue={
                          passengerModal.ticket.payment['payment_status']
                        }
                        required
                      >
                        <option value="unpaid">Unpaid</option>
                        <option value="paid">Paid</option>
                      </Select>
                    </Field>
                  )}
                </form>
              </Container>
            )}
          </CardBody>
          <CardFooter>
            {!passengerModal.edit ? (
              <Button
                variant="solid"
                className="w-full"
                onClick={() => {
                  setPassengerModal({
                    ...passengerModal,
                    edit: true,
                  });
                }}
              >
                Edit Passenger
              </Button>
            ) : (
              <div className="flex w-full justify-between gap-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setPassengerModal({
                      ...passengerModal,
                      edit: false,
                    });
                  }}
                >
                  Discard Edit
                </Button>
                <Button
                  variant="solid"
                  className="w-full"
                  type="submit"
                  form="editPassengerForm"
                >
                  Edit Passenger
                </Button>
              </div>
            )}
          </CardFooter>
        </CardContainer>
      )}
    </Dialog>
  );
};

export default React.memo(PassengerModal);
