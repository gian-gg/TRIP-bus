import { useState } from 'react';
import { toast } from 'sonner';

import Button from '@/components/Button';
import Dialog from '@/components/Dialog';
import Container from '@/components/Container';

import {
  CardContainer,
  CardBody,
  CardHeader,
  CardFooter,
} from '@/components/Card';

import type { passengerDetailsType } from '@/type';

const Success = (props: { data: passengerDetailsType }) => {
  const [isModalOpen, setisModalOpen] = useState(false);

  const handlePayNow = () => {
    toast.success('hehe mony');
  };

  const handleCallConductor = () => {
    toast.success('Bus conductor has been notified.');
  };

  const handleStopBus = () => {
    toast.warning('Bus driver has been notified to stop the bus.');
    setisModalOpen(false);
  };

  return (
    <>
      <Dialog
        open={isModalOpen}
        as="div"
        onClose={() => setisModalOpen(false)}
        className="w-96"
      >
        <CardContainer className="h-full w-full">
          <CardHeader className="!bg-error">
            <h1 className="text-lg font-semibold text-white">Confirm Stop</h1>
          </CardHeader>
          <CardBody>
            <p className="mt-2 text-sm/6">
              Are you sure you want to stop the bus?
            </p>
          </CardBody>
          <CardFooter>
            <Button
              className="!border-error !text-error"
              variant="outline"
              onClick={() => setisModalOpen(false)}
            >
              Close
            </Button>
            <Button
              variant="solid"
              onClick={handleStopBus}
              className="!bg-error"
            >
              Confirm Stop
            </Button>
          </CardFooter>
        </CardContainer>
      </Dialog>
      <div className="flex flex-col">
        <h2 className="text-center text-xl font-bold">Ticket Details:</h2>
        <Container className="mt-4">
          <ul>
            <li className="text-sm">
              <strong>Name:</strong> {props.data.name}
            </li>
            <li className="text-sm">
              <strong>Contact:</strong> {props.data.contact}
            </li>
            <li className="text-sm">
              <strong>Seat:</strong> {props.data.seat}
            </li>
            <li className="text-sm">
              <strong>Passenger Type:</strong> {props.data.passengerType}
            </li>
            <li className="text-sm">
              <strong>Entry Point:</strong> Lorem Ipsum Station @ 2:30 PM
            </li>
            <li className="text-sm">
              <strong>Destination:</strong> {props.data.destination}
            </li>
          </ul>
        </Container>
        <div className="mt-4 flex w-full flex-col items-center gap-2">
          <Button variant="outline" className="w-full" onClick={handlePayNow}>
            Pay Now
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleCallConductor}
          >
            Call Bus Conductor
          </Button>
          <Button
            variant="solid"
            className="!bg-error mt-2 w-full"
            onClick={() => setisModalOpen(true)}
          >
            Stop Bus
          </Button>
        </div>
      </div>
    </>
  );
};

export default Success;
