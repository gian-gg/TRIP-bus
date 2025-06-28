import { useState } from 'react';
import { toast } from 'sonner';

import Button from '@/components/Button';
import Dialog from '@/components/Dialog';
import Container from '@/components/Container';
import Callout from '@/components/Callout';
import { RightArrow, CloseIcon } from '@/components/Icons';
import Badges from '@/components/Badges';
import {
  CardContainer,
  CardBody,
  CardHeader,
  CardFooter,
} from '@/components/Card';
import { Field, Label, RadioGroup, Description } from '@/components/Form';
import { PaymentMethodRadios } from '../components/Radios';

import { PaymentMethod } from '@/data';

import type {
  GeneralTripInfoType,
  PassengerDetailsType,
  CurrentBusInfoType,
  PaymentMethodType,
} from '@/type';

const Success = (props: {
  currentBusInfo: CurrentBusInfoType;
  generalTripInfo: GeneralTripInfoType;
  passengerDetails: PassengerDetailsType[];
}) => {
  const [isConductorModalOpen, setIsConductorModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>();

  const handleCallConductor = () => {
    toast.info('Bus conductor has been notified.');
    setIsConductorModalOpen(false);
  };

  const handleStopBus = () => {
    toast.warning('Bus driver has been notified to stop the bus.');
    setIsConductorModalOpen(false);
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      toast.error('Please select a payment method.');
      return;
    }

    if (paymentMethod === 'online') {
      toast.info('Redirecting to online payment gateway...');
    } else {
      toast.info('Conductor will arrive shortly to collect your fare.');
    }

    setIsPaymentModalOpen(false);
  };

  return (
    <>
      <Dialog
        open={isConductorModalOpen}
        as="div"
        onClose={() => setIsConductorModalOpen(false)}
        className="w-96"
      >
        <CardContainer>
          <CardHeader className="!bg-secondary flex h-full w-full items-start justify-between">
            <h1 className="text-lg font-semibold text-white">
              Call Conductor/Stop Bus
            </h1>
            <Button
              variant="outline"
              className="!h-3 !w-3 !border-0 !p-0 !text-white"
              onClick={() => setIsConductorModalOpen(false)}
            >
              <CloseIcon />
            </Button>
          </CardHeader>
          <CardBody>
            <p className="mt-2 text-sm/6">
              Are you sure you want to call the bus conductor or stop the bus?
              Please confirm your action.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Button
                variant="outline"
                className="!border-secondary !text-secondary w-full"
                onClick={handleCallConductor}
              >
                Call Conductor
              </Button>
              <Button
                variant="solid"
                className="!bg-error w-full"
                onClick={handleStopBus}
              >
                Stop Bus
              </Button>
            </div>
          </CardBody>
        </CardContainer>
      </Dialog>
      <Dialog
        open={isPaymentModalOpen}
        as="div"
        onClose={() => setIsPaymentModalOpen(false)}
        className="w-96"
      >
        <CardContainer>
          <CardHeader className="flex h-full w-full items-start justify-between">
            <h1 className="text-lg font-semibold text-white">Confirm Stop</h1>
            <Button
              variant="outline"
              className="!h-3 !w-3 !border-0 !p-0 !text-white"
              onClick={() => setIsPaymentModalOpen(false)}
            >
              <CloseIcon />
            </Button>
          </CardHeader>
          <CardBody>
            <p className="mt-2 text-sm/6">
              Ready to pay for your trip? Please confirm your payment details
              before proceeding.
            </p>
            <Field className="my-4">
              <Label required>Payment Method</Label>
              <RadioGroup
                value={paymentMethod}
                onChange={(value) => {
                  setPaymentMethod(value);
                }}
                className="grid grid-cols-2 gap-2"
              >
                {PaymentMethod.map((method, index) => (
                  <PaymentMethodRadios
                    key={index}
                    value={method.id}
                    paymentMethod={method.id}
                    isSelected={paymentMethod === method.id}
                  >
                    <h3 className="font-bold">{method.label}</h3>
                    <p className="text-muted text-xs">{method.description}</p>
                  </PaymentMethodRadios>
                ))}
              </RadioGroup>
              <Description>
                Note: Online Payments require an internet connection.
              </Description>
            </Field>
          </CardBody>
          <CardFooter>
            <Button variant="solid" className="w-full" onClick={handlePayment}>
              Proceed to Payment
            </Button>
          </CardFooter>
        </CardContainer>
      </Dialog>
      <div className="flex flex-col">
        <h2 className="text-primary mb-4 text-center text-2xl font-bold">
          Trip Details:
        </h2>
        <Callout
          mode="primary"
          className="mx-4 mb-4 flex items-center justify-between gap-4 p-6 md:p-8"
        >
          <h2 className="text-primary my-1 text-xl font-bold">
            {props.currentBusInfo.current_stop}
          </h2>
          <RightArrow className="text-primary" />
          <h2 className="text-primary text-md my-1 text-center font-bold md:text-lg">
            {props.generalTripInfo.destination}
          </h2>
        </Callout>
        <div className="my-4 flex flex-col gap-2">
          {props.passengerDetails.map((detail, idx) => (
            <Container
              key={idx}
              className="flex items-center justify-between p-4 px-8"
            >
              <div>
                <p>
                  <strong>Name:</strong> {detail.name}
                </p>
                <p>
                  <strong>Type:</strong>{' '}
                  <Badges
                    type={detail.category as PassengerDetailsType['category']}
                  />
                </p>
                <p>
                  <strong>Seat:</strong> {detail.seat}
                </p>
              </div>
              <p className="text-primary text-xl font-bold">₱20</p>
            </Container>
          ))}
        </div>
        <Callout mode="primary" className="mx-4 mb-4 flex justify-between p-4">
          <div>
            <h3 className="text-primary text-sm font-bold">FARE TOTAL</h3>
            <p className="text-xs">Regular (₱25) - 20% Discount (₱5)</p>
          </div>
          <span className="text-primary text-4xl font-bold">
            ₱{20 * props.generalTripInfo.passengerCount}
          </span>
        </Callout>
        <div className="mt-4 flex w-full flex-col items-center gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsConductorModalOpen(true)}
          >
            Call Bus Conductor / Stop Bus
          </Button>
          <Button
            variant="solid"
            className="w-full"
            onClick={() => setIsPaymentModalOpen(true)}
          >
            Pay Now
          </Button>
        </div>
      </div>
    </>
  );
};

export default Success;
