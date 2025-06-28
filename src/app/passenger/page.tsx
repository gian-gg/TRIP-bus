import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { CardContainer, CardHeader, CardBody } from '@/components/Card';
import PageBody from '@/components/PageBody';
import Loading from '@/components/Loading';

import Form from './Form';
import Complete from './Pages/Complete';

import { GET, POST } from '@/lib/api';

import type {
  GeneralTripInfoType,
  PassengerDetailsType,
  modeType,
  PassengerType,
  CurrentBusInfoType,
  GETResponse,
  SessionResponse,
} from '@/type';

const Passenger = () => {
  const { token } = useParams();
  const [mode, setMode] = useState<modeType>('form');

  const [currentBusInfo, setCurrentBusInfo] = useState<CurrentBusInfoType>();
  const [generalTripInfo, setGeneralTripInfo] = useState<GeneralTripInfoType>({
    passengerCount: 1,
    contactNumber: '',
    destination: '',
  });
  const [passengerDetails, setPassengerDetails] = useState<
    PassengerDetailsType[]
  >([{ category: '' as PassengerType, name: '', seat: '' }]);

  // Fetch current bus information when the component mounts using token
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
          `Error: ${error instanceof Error ? error.message : 'Unknown error'}. Call the
     conductor for help.`
        );
      }
    };

    onMount();
  }, [token]);

  // Handle form submission
  const handleSubmit = async () => {
    if (!currentBusInfo) return;
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

    // temporary only, will implement batch ticket booking
    try {
      for (const detail of passengerDetails) {
        const response = await POST('/ticket/index.php', {
          origin_stop_id: 1,
          destination_stop_id: 10,
          passenger_status: 'on_bus',
          bus_id: currentBusInfo.bus_id,
          full_name: detail.name,
          seat_number: detail.seat,
          passenger_category: detail.category,
          boarding_time: currentBusInfo.timestamp,
          payment: {
            payment_mode: 'cash',
            payment_platform: 'bus',
            fare_amount: 20.34,
            payment_status: 'pending',
          },
        });

        const res = response as SessionResponse;
        if (res.status !== 'success') {
          toast.error('Failed to book ticket. Please try again later.');
        }
        console.log('Ticket booked successfully:', res);
      }
      setMode('pending');
      toast.success('Ticket/s booked successfully!');
    } catch (error) {
      if (
        error &&
        typeof error === 'object' &&
        'response' in error &&
        error.response &&
        typeof error.response === 'object' &&
        'data' in error.response &&
        error.response.data &&
        typeof error.response.data === 'object' &&
        'message' in error.response.data
      ) {
        toast.error('Error: ' + error.response.data.message);
      } else {
        toast.error('Network or server error');
      }
      console.log('Network or server error', error);
    }
  };

  if (!currentBusInfo) return <Loading />;

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
            <Complete
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
