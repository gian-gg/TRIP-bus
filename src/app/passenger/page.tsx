import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { CardContainer, CardHeader, CardBody } from '@/components/Card';
import Callout from '@/components/Callout';
import { PushPinIcon, ClockIcon } from '@/components/Icons';
import PageBody from '@/components/PageBody';

import Form from './Mode/Form';
import Success from './Mode/Success';
import Pending from './Mode/Pending';

import { GET } from '@/lib/api';
import { formatTimeDate } from '@/lib/misc';

import type {
  passengerDetailsType,
  modeType,
  PassengerType,
  PaymentMethodType,
  CurrentBusInfoType,
  GETResponse,
} from '@/type';

const Passenger = () => {
  const { token } = useParams();

  const [mode, setMode] = useState<modeType>(
    () => (localStorage.getItem('passengerMode') as modeType) || 'form'
  );

  const [currentBusInfo, setCurrentBusInfo] = useState<CurrentBusInfoType>();

  const [passengerDetails, setPassengerDetails] =
    useState<passengerDetailsType>({
      passengerType: '' as PassengerType,
      paymentMethod: '' as PaymentMethodType,
      destination: '',
      name: '',
      contact: '',
      seat: '',
    });

  useEffect(() => {
    const onMount = async () => {
      try {
        const response = await GET('/session/' + token);
        const res = response as GETResponse;
        if (res.status !== 'success') {
          toast.error('Invalid token. Call the conductor for help.');
          return;
        }

        console.log('Session Response:', res.data as CurrentBusInfoType);
        setCurrentBusInfo(res.data as CurrentBusInfoType);
      } catch (error) {
        toast.error(
          'Error: ' +
            (error instanceof Error ? error.message : 'Unknown error',
            ' Call the conductor for help. ')
        );
      }
    };

    onMount();
  }, [token]);

  useEffect(() => {
    localStorage.setItem('passengerMode', mode);
  }, [mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = (e.target as HTMLFormElement).nameInput.value;
    const contact = (e.target as HTMLFormElement).contactInput.value;
    const seat = (e.target as HTMLFormElement).seatNumberInput.value;
    const passengerType = passengerDetails.passengerType;
    const paymentMethod = passengerDetails.paymentMethod;
    const destination = passengerDetails.destination;

    if (
      !name ||
      !contact ||
      !seat ||
      !passengerType ||
      !paymentMethod ||
      !destination
    ) {
      toast.error('Please fill out all required fields.');
      return;
    } else {
      setPassengerDetails({
        ...passengerDetails,
        name: name,
        contact: contact,
        seat: seat,
      });

      console.log('Form Data:', {
        name,
        contact,
        seat,
        passengerType,
        paymentMethod,
        destination,
      });

      setMode('pending');
      setTimeout(() => {
        setMode('success');
      }, 5000); // Simulate a delay for the success state

      toast.success('Form submitted successfully!');
    }
  };

  return (
    <PageBody>
      <CardContainer className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5">
        <CardHeader className="flex flex-col items-center justify-center py-6 sm:py-8 md:py-10">
          <h1 className="text-2xl font-bold">
            {mode === 'form'
              ? 'Passenger Details'
              : mode === 'pending'
                ? 'Payment Pending'
                : 'Payment Successful'}
          </h1>
          <p className="text-primary-light text-sm">
            {mode === 'form'
              ? 'Please fill out the form below to proceed with your trip.'
              : mode === 'pending'
                ? 'Conductor will arrive shortly to collect payment.'
                : 'Thank you for choosing our service. Enjoy your trip!'}
          </p>
        </CardHeader>
        <CardBody>
          {mode === 'form' && currentBusInfo && (
            <Callout
              mode="primary"
              className="mx-4 mb-4 flex items-center justify-start gap-4 p-8"
            >
              <PushPinIcon className="text-2xl" />
              <div>
                <p className="text-xs font-medium">BOARDING POINT</p>
                <h2 className="text-primary my-1 text-xl font-bold">
                  {currentBusInfo.current_stop}
                </h2>
                <p className="text-xs">
                  <ClockIcon /> {formatTimeDate(currentBusInfo.timestamp)}
                </p>
              </div>
            </Callout>
          )}

          {mode === 'form' ? (
            <Form
              data={passengerDetails}
              onChange={setPassengerDetails}
              handleSubmit={handleSubmit}
            />
          ) : mode === 'pending' ? (
            <Pending />
          ) : (
            <Success data={passengerDetails} />
          )}
        </CardBody>
      </CardContainer>
    </PageBody>
  );
};

export default Passenger;
