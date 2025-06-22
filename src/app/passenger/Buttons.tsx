import { useState } from 'react';
import { toast } from 'sonner';

import Button from '@/components/Button';
import Dialog from '@/components/Dialog';

import {
  CardContainer,
  CardBody,
  CardHeader,
  CardFooter,
} from '@/components/Card';

const Buttons = (props: {
  additionalText?: string;
  hideCallConductorButton?: boolean;
}) => {
  const [isModalOpen, setisModalOpen] = useState(false);

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
              Are you sure you want to stop the bus? {props.additionalText}
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
      {!props.hideCallConductorButton && (
        <Button
          variant="outline"
          className="mt-4"
          onClick={handleCallConductor}
        >
          Call Bus Conductor
        </Button>
      )}
      <Button
        variant="solid"
        className="!bg-error mt-2"
        onClick={() => setisModalOpen(true)}
      >
        Stop Bus
      </Button>
    </>
  );
};

export default Buttons;
