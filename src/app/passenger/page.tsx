import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { nanoid } from 'nanoid';

import { CardContainer, CardHeader, CardBody } from '@/components/Card';
import PageBody from '@/components/PageBody';
import Loading from '@/components/Loading';

import Form from './Form';
import Complete from './Pages/Complete';

import { POST } from '@/lib/api';

import type {
  GeneralTripInfoType,
  PassengerDetailsType,
  modeType,
  PassengerType,
  CurrentBusInfoType,
  GETResponse,
  SessionResponse,
  StopType,
} from '@/type';

interface ResponseGETReponseType extends GETResponse {
  data: {
    trip_details: CurrentBusInfoType;
    passenger_details: {
      state: 'not_exist' | 'pending' | 'paid';
      destination_id: StopType['stop_id'];
      contact_number: string;
      passengers: PassengerDetailsType[];
    };
  };
}

const Passenger = () => {
  const { token } = useParams();
  const [mode, setMode] = useState<modeType>('form');

  const [currentBusInfo, setCurrentBusInfo] = useState<CurrentBusInfoType>();
  const [generalTripInfo, setGeneralTripInfo] = useState<GeneralTripInfoType>({
    passengerCount: 1,
    contactNumber: '',
    destination: undefined,
    trip_id: 0,
  });
  const [passengerDetails, setPassengerDetails] = useState<
    PassengerDetailsType[]
  >([
    { passenger_category: '' as PassengerType, full_name: '', seat_number: '' },
  ]);
  const [stops, setStops] = useState<StopType[]>([]);

  const fetchData = useCallback(async () => {
    const tokenFirst10Chars = token?.toString().slice(0, 10);
    const tokenRest = token?.toString().slice(11); // start from 11 to skip the hyphen

    if (
      localStorage.getItem('id')?.toString().slice(0, 10) !== tokenFirst10Chars
    ) {
      localStorage.setItem('id', `${tokenFirst10Chars}-${nanoid(10)}`);
    }

    // fetch current bus information
    try {
      const response = await POST('/session/index.php', {
        id: tokenRest,
        payment_id: localStorage.getItem('id')?.slice(-10),
      });

      const res = response as ResponseGETReponseType;

      if (res.status !== 'success') {
        toast.error('Invalid token. Call the conductor for help.');
        return;
      }

      switch (res.data.passenger_details.state) {
        case 'not_exist':
          setMode('form');
          setPassengerDetails([
            {
              passenger_category: '' as PassengerType,
              full_name: '',
              seat_number: '',
            },
          ]);
          break;
        case 'pending':
          setMode('pending');
          setPassengerDetails(res.data.passenger_details.passengers);
          break;
        case 'paid':
          setMode('complete');
          setPassengerDetails(res.data.passenger_details.passengers);
          break;
        default:
          console.error(
            'Unexpected passenger status:',
            res.data.passenger_details.state
          );
          return;
      }

      setCurrentBusInfo(res.data.trip_details);
      setStops(res.data.trip_details.stops as StopType[]);

      if (res.data.passenger_details.passengers) {
        setGeneralTripInfo({
          passengerCount: res.data.passenger_details.passengers.length,
          contactNumber:
            res.data.passenger_details.passengers[0].contact_info ?? '',
          trip_id: res.data.trip_details.trip_id,
          destination: Number(
            res.data.passenger_details.passengers[0].destination_stop_id
          ) as StopType['stop_id'],
        });
      }
    } catch (error) {
      toast.error(
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}. Call the
     conductor for help.`
      );
      console.error(error);
    }
  }, [token]);

  // Fetch current bus information when the component mounts using token
  useEffect(() => {
    fetchData();
  }, [token, fetchData]);

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (!currentBusInfo) return;
    const hasEmptyFields = passengerDetails.some(
      (detail) =>
        !detail.full_name ||
        !detail.seat_number ||
        !detail.passenger_category ||
        !generalTripInfo.contactNumber ||
        !generalTripInfo.passengerCount ||
        !generalTripInfo.destination
    );
    if (hasEmptyFields) {
      toast.error('Please fill out all required fields.');
      return;
    }

    const ticket = {
      trip_id: generalTripInfo.trip_id,
      origin_stop_id: currentBusInfo.current_stop_id,
      destination_stop_id: generalTripInfo.destination,
      bus_id: currentBusInfo.bus_id,
      boarding_time: currentBusInfo.timestamp,
      contact_info: generalTripInfo.contactNumber,
      passengers: passengerDetails,
      payment: {
        payment_id: localStorage.getItem('id')?.slice(-10),
        payment_mode: 'cash',
        payment_platform: null,
        fare_amount: 40.5,
        payment_status: 'pending',
      },
    };

    console.log(
      'Booking ticket with details:',
      JSON.stringify(ticket, null, 2)
    );

    try {
      const response = await POST('/ticket/index.php', ticket);

      const res = response as SessionResponse;
      console.log('Ticket booked successfully:', res);

      if (res.status !== 'success' || !res.status) {
        toast.error('Failed to book ticket(s). Please try again later.');
        return;
      }

      fetchData(); // Refresh data after booking
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
  }, [currentBusInfo, passengerDetails, generalTripInfo, fetchData]);

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
              stops={stops}
            />
          ) : (
            <Complete
              currentBusInfo={currentBusInfo}
              generalTripInfo={generalTripInfo}
              passengerDetails={passengerDetails}
              mode={mode}
            />
          )}
        </CardBody>
      </CardContainer>
    </PageBody>
  );
};

export default Passenger;
