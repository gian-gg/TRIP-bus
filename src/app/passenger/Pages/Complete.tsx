import { useState } from 'react';
import { toast } from 'sonner';

import Button from '@/components/Button';
import Dialog from '@/components/Dialog';
import { CloseIcon, RefreshIcon } from '@/components/Icons';
import {
  CardContainer,
  CardBody,
  CardHeader,
  CardFooter,
} from '@/components/Card';
import { Field, Label, RadioGroup, Description } from '@/components/Form';
import { PaymentMethodRadios } from '../components/Radios';
import PassengerDetails from '../components/PassengerDetails';
import FloatingButton from '@/components/FloatingButton';

import { PaymentMethod } from '@/data';
import APICall from '@/lib/api';

import type {
  GeneralTripInfoType,
  PassengerDetailsType,
  CurrentBusInfoType,
  PaymentMethodType,
  modeType,
} from '@/type';

const Success = (props: {
  currentBusInfo: CurrentBusInfoType;
  generalTripInfo: GeneralTripInfoType;
  passengerDetails: PassengerDetailsType[];
  mode: modeType;
}) => {
  const [isConductorModalOpen, setIsConductorModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType | null>(
    null
  );

  const alertConductor = async (
    mode: 'stop-bus' | 'call-conductor' | 'pay-cash' | 'pay-online'
  ) => {
    let message = '';
    switch (mode) {
      case 'stop-bus':
        message = `${props.passengerDetails[0].full_name} at ${props.passengerDetails[0].seat_number} is requesting to stop the bus.`;
        break;
      case 'call-conductor':
        message = `${props.passengerDetails[0].full_name} at ${props.passengerDetails[0].seat_number} is calling the conductor.`;
        break;
      case 'pay-cash':
        message = `${props.passengerDetails[0].full_name} at ${props.passengerDetails[0].seat_number} wants to pay by cash.`;
        break;
      case 'pay-online':
        message = `${props.passengerDetails[0].full_name} at ${props.passengerDetails[0].seat_number} wants to pay online.`;
        break;
      default:
        message = 'Unknown action.';
    }

    await APICall({
      type: 'POST',
      url: `/alert/index.php?bus_id=${props.currentBusInfo.bus_id}&trip_id=${props.currentBusInfo.trip_id}`,
      body: {
        message: message,
      },
      success: () => {},
      error: (error) => {
        throw new Error(
          error instanceof Error ? error.message : 'Unknown error'
        );
      },
    });

    setIsConductorModalOpen(false);
    return message;
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      toast.error('Please select a payment method.');
      return;
    }

    toast.promise(alertConductor(`pay-${paymentMethod}`), {
      loading: 'Calling conductor...',
      success: (msg) => msg,
      error: (err) => err.message,
    });
    setIsPaymentModalOpen(false);
  };

  return (
    <>
      <FloatingButton onClick={() => window.location.reload()}>
        <RefreshIcon className="!h-5 !w-5 hover:animate-spin" />
      </FloatingButton>

      {/* bus actions modal */}
      <Dialog
        open={isConductorModalOpen}
        as="div"
        onClose={() => setIsConductorModalOpen(false)}
        className="w-96"
      >
        <CardContainer>
          <CardHeader className="flex h-full w-full items-start justify-between">
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
            <p className="mt-2 text-center text-sm/6">
              Are you sure you want to call the bus conductor
              {props.mode !== 'pending' && ' or stop the bus'}? Please confirm
              your action.
            </p>
          </CardBody>
          <CardFooter className="flex flex-col">
            <Button
              variant={props.mode === 'pending' ? 'solid' : 'outline'}
              className="w-full"
              onClick={() => {
                if (props.mode === 'pending') {
                  toast.promise(alertConductor('call-conductor'), {
                    loading: 'Calling conductor...',
                    success: (msg) => msg,
                    error: (err) => err.message,
                  });
                  return;
                }

                setIsConductorModalOpen(false);
                toast.warning('Are you Sure?', {
                  action: {
                    label: 'Call Conductor',
                    onClick: () =>
                      toast.promise(alertConductor('call-conductor'), {
                        loading: 'Calling conductor...',
                        success: (msg) => msg,
                        error: (err) => err.message,
                      }),
                  },
                  actionButtonStyle: {
                    backgroundColor: '#DC7609',
                    color: '#FEFCF1',
                    padding: '1rem',
                  },
                });
              }}
            >
              Call Conductor
            </Button>
            {props.mode !== 'pending' && (
              <Button
                variant="solid"
                className="!bg-error w-full"
                onClick={() => {
                  setIsConductorModalOpen(false);
                  toast.error('Are you Sure?', {
                    action: {
                      label: 'Stop Bus',
                      onClick: () =>
                        toast.promise(alertConductor('stop-bus'), {
                          loading: 'Loading...',
                          success: (msg) => msg,
                          error: (err) => err.message,
                        }),
                    },
                    actionButtonStyle: {
                      backgroundColor: '#E60100',
                      color: '#FFF0F0',
                      padding: '1rem',
                    },
                  });
                }}
              >
                Stop Bus
              </Button>
            )}
          </CardFooter>
        </CardContainer>
      </Dialog>

      {/* payment modal */}
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
          Trip Details
        </h2>
        <PassengerDetails
          generalTripInfo={props.generalTripInfo}
          currentBusInfo={props.currentBusInfo}
          passengerDetails={props.passengerDetails}
        />
        <div className="mt-4 flex w-full flex-col items-center gap-2">
          <Button
            variant={props.mode !== 'pending' ? 'solid' : 'outline'}
            className="w-full"
            onClick={() => setIsConductorModalOpen(true)}
          >
            Call Bus Conductor {props.mode !== 'pending' && '/ Stop Bus'}
          </Button>
          {props.mode === 'pending' && (
            <Button
              variant="solid"
              className="w-full"
              onClick={() => setIsPaymentModalOpen(true)}
            >
              Pay Now
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Success;
