import React, { useCallback } from 'react';
import clsx from 'clsx';

import { CardContainer, CardHeader, CardBody } from '@/components/Card';
import Button from '@/components/Button';
import Dialog from '@/components/Dialog';
import Callout from '@/components/Callout';
import { CloseIcon } from '@/components/Icons';

import { PassengerBadge } from './Badges';

import {
  legendConfig,
  type AisleModalType,
  type PassengerModalType,
} from '../type';
import type { TicketType } from '@/type';

const PassengerButton = (props: {
  ticket: TicketType;
  handleClick: () => void;
}) => {
  return (
    <Button
      variant="outline"
      className={clsx(
        'flex h-16 w-full items-center justify-between !border-2 px-4 font-extrabold'
      )}
      style={{
        backgroundColor:
          legendConfig[props.ticket.payment.payment_status].bgColor,
        borderColor:
          legendConfig[props.ticket.payment.payment_status].borderColor,
      }}
      onClick={props.handleClick}
    >
      <h1>{props.ticket.full_name}</h1>
      <PassengerBadge type={props.ticket.passenger_category} />
    </Button>
  );
};

const AisleModal = (props: {
  openAisleModal: AisleModalType;
  SetOpenAisleModal: (arg: AisleModalType) => void;
  setPassengerModal: (arg: PassengerModalType) => void;
}) => {
  const { openAisleModal, SetOpenAisleModal, setPassengerModal } = props;
  const handleClose = useCallback(() => {
    SetOpenAisleModal({
      ...openAisleModal,
      open: false,
    });
  }, [SetOpenAisleModal, openAisleModal]);

  const handleClick = useCallback(
    (ticket: TicketType) => {
      handleClose();
      setPassengerModal({
        open: true,
        edit: false,
        ticket: ticket,
      });
    },
    [setPassengerModal, handleClose]
  );

  return (
    <Dialog
      open={props.openAisleModal.open}
      as="div"
      onClose={handleClose}
      className="w-[90%] lg:w-2/5"
    >
      <CardContainer className="h-full w-full">
        <CardHeader className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-white">
            Aisle Passengers ({openAisleModal.tickets?.length})
          </h1>
          <Button type="button" variant="outline" onClick={handleClose}>
            <CloseIcon className="text-white" />
          </Button>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 !p-6 !text-sm">
          {openAisleModal.tickets?.length ? (
            openAisleModal.tickets.map((ticket, idx) => (
              <PassengerButton
                key={idx}
                ticket={ticket}
                handleClick={() => handleClick(ticket)}
              />
            ))
          ) : (
            <Callout className="!text-center">
              No passengers in this aisle.
            </Callout>
          )}
        </CardBody>
      </CardContainer>
    </Dialog>
  );
};

export default React.memo(AisleModal);
