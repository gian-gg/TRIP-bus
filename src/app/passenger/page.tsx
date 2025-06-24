import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { CardContainer, CardHeader, CardBody } from '@/components/Card';
import Callout from '@/components/Callout';
import { PushPinIcon, ClockIcon } from '@/components/Icons';
import PageBody from '@/components/PageBody';

import Form from './Mode/Form';
import Success from './Mode/Success';

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
        const response = await GET('/session/index.php?id=' + token);
        const res = response as GETResponse;
        if (res.status !== 'success') {
          toast.error('Invalid token. Call the conductor for help.');
          return;
        }

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
    const name = (e.target as HTMLFormElement).howManyPassengersInput.value;
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

      setMode('complete');

      toast.success('Form submitted successfully!');
    }
  };

  return (
    <PageBody className="!items-start">
      <CardContainer className="w-full sm:w-4/5 lg:w-3/5 xl:w-2/5">
        <CardHeader className="flex flex-col items-center justify-center py-6 sm:py-8 md:py-10">
          <h1 className="text-2xl font-bold">
            {mode === 'form'
              ? 'Trip Details'
              : 'Ticket has been booked successfully!'}
          </h1>
          <p className="text-primary-light text-sm">
            {mode === 'form'
              ? 'Please fill out the form below to proceed with your trip.'
              : 'Thank you for choosing our services. Enjoy your trip!'}
          </p>
        </CardHeader>
        <CardBody className="!px-4 md:!px-8">
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
          ) : (
            <Success data={passengerDetails} />
          )}
        </CardBody>
      </CardContainer>
    </PageBody>
  );
};

export default Passenger;
