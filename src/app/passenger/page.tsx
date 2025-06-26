import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { CardContainer, CardHeader, CardBody } from '@/components/Card';
import PageBody from '@/components/PageBody';

import Form from './Mode/Form';
import Success from './Mode/Complete';

import { GET } from '@/lib/api';

import type {
  GeneralTripInfoType,
  PassengerDetailsType,
  modeType,
  PassengerType,
  CurrentBusInfoType,
  GETResponse,
} from '@/type';

const Passenger = () => {
  const { token } = useParams();

  const [mode, setMode] = useState<modeType>(
    () => (localStorage.getItem('passengerMode') as modeType) || 'form'
  );

  const [currentBusInfo, setCurrentBusInfo] = useState<CurrentBusInfoType>();

  const [generalTripInfo, setGeneralTripInfo] = useState<GeneralTripInfoType>({
    passengerCount: 1,
    contactNumber: '',
    destination: '',
  });

  const [passengerDetails, setPassengerDetails] = useState<
    PassengerDetailsType[]
  >(
    Array.from({ length: generalTripInfo.passengerCount }, () => ({
      category: '' as PassengerType,
      name: '',
      seat: '',
    }))
  );

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

    const hasEmptyFields = passengerDetails.some(
      (detail) =>
        !detail.name ||
        !detail.seat ||
        !detail.category ||
        !generalTripInfo.contactNumber ||
        !generalTripInfo.passengerCount ||
        !generalTripInfo.destination
    );

    if (hasEmptyFields) {
      toast.error('Please fill out all required fields.');
      return;
    }

    toast.success('Form submitted successfully!');
    setMode('complete');
  };

  if (!currentBusInfo) {
    return (
      <PageBody className="!items-start">
        <CardContainer className="w-full sm:w-4/5 lg:w-3/5 xl:w-2/5">
          <CardHeader className="flex flex-col items-center justify-center py-6 sm:py-8 md:py-10">
            <h1 className="text-2xl font-bold">Loading...</h1>
            <p className="text-primary-light text-sm">
              Please wait while we fetch the bus information.
            </p>
          </CardHeader>
        </CardContainer>
      </PageBody>
    );
  }

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
          {mode === 'form' ? (
            <Form
              handleSubmit={handleSubmit}
              currentBusInfo={currentBusInfo}
              generalTripInfo={generalTripInfo}
              setGeneralTripInfo={setGeneralTripInfo}
              passengerDetails={passengerDetails}
              setPassengerDetails={setPassengerDetails}
            />
          ) : (
            <Success
              currentBusInfo={currentBusInfo}
              generalTripInfo={generalTripInfo}
              passengerDetails={passengerDetails}
            />
          )}
        </CardBody>
      </CardContainer>
    </PageBody>
  );
};

export default Passenger;
