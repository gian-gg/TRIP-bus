import { useState } from 'react';
import { toast } from 'sonner';

import Container from '@/components/Container';
import Button from '@/components/Button';
import Dialog from '@/components/Dialog';

import {
  CardContainer,
  CardBody,
  CardHeader,
  CardFooter,
} from '@/components/Card';

import type { passengerDetailsType } from '@/type';

const Success = (props: { data: passengerDetailsType }) => {
  const [isStopModalOpen, setIsStopModalOpen] = useState(false);

  const handleCallConductor = () => {
    toast.success('Bus conductor has been notified.');
  };

  const handleStopBus = () => {
    toast.success('Bus driver has been notified to stop the bus.');
    setIsStopModalOpen(false);
  };

  return (
    <>
      <Dialog
        open={isStopModalOpen}
        as="div"
        onClose={() => setIsStopModalOpen(false)}
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
              onClick={() => setIsStopModalOpen(false)}
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
              <strong>Destination:</strong> {props.data.destination}
            </li>
          </ul>
        </Container>
        <Button
          variant="outline"
          className="mt-4"
          onClick={handleCallConductor}
        >
          Call Bus Conductor
        </Button>
        <Button
          variant="solid"
          className="!bg-error mt-2"
          onClick={() => setIsStopModalOpen(true)}
        >
          Stop Bus
        </Button>

        <p className="text-muted mt-4 text-center text-xs">
          Dev Note: Clear browser local storage to reset form. (Not yet
          connected to backend)
        </p>
      </div>
    </>
  );
};

export default Success;
