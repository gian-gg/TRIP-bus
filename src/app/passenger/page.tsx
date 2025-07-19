import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { nanoid } from 'nanoid';

import { CardContainer, CardHeader, CardBody } from '@/components/Card';
import PageBody from '@/components/PageBody';
import Loading from '@/components/Loading';

import Form from './Form';
import Complete from './Pages/Complete';

import APICall from '@/lib/api';

import type {
  GeneralTripInfoType,
  PassengerDetailsType,
  modeType,
  PassengerType,
  CurrentBusInfoType,
  GETResponse,
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
      total_fare?: number;
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

    await APICall<ResponseGETReponseType['data']>({
      type: 'POST',
      url: '/session/index.php',
      body: {
        id: tokenRest,
        payment_id: localStorage.getItem('id')?.slice(-10),
      },
      consoleLabel: 'Session Data',
      success: (data) => {
        switch (data.passenger_details.state) {
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
            setPassengerDetails(data.passenger_details.passengers);
            break;
          case 'paid':
            setMode('complete');
            setPassengerDetails(data.passenger_details.passengers);
            break;
          default:
            console.error(
              'Unexpected passenger status:',
              data.passenger_details.state
            );
            return;
        }

        setCurrentBusInfo(data.trip_details);
        setStops(data.trip_details.stops as StopType[]);

        if (data.passenger_details.passengers) {
          setGeneralTripInfo({
            passengerCount: data.passenger_details.passengers.length,
            contactNumber:
              data.passenger_details.passengers[0].contact_info ?? '',
            trip_id: data.trip_details.trip_id,
            destination: Number(
              data.passenger_details.passengers[0].destination_stop_id
            ) as StopType['stop_id'],
            fare_amount: data.passenger_details.total_fare,
          });
        }
      },
      error: (error) => {
        toast.warning(error instanceof Error ? error.message : 'Unknown error');
      },
    });
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
      throw new Error('Please fill out all required fields.');
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
        payment_status: 'pending',
      },
    };

    console.log(
      'Booking ticket with details:',
      JSON.stringify(ticket, null, 2)
    );

    await APICall({
      type: 'POST',
      url: '/ticket/index.php',
      body: ticket,
      consoleLabel: 'Booking Ticket',
      success: async () => {
        await fetchData(); // Refresh data after booking
      },
      error: (error) => {
        throw new Error(
          error instanceof Error ? error.message : 'Unknown error'
        );
      },
    });
  }, [currentBusInfo, passengerDetails, generalTripInfo, fetchData]);

  if (!currentBusInfo) return <Loading />;

  return (
    <>
      <PageBody className="!items-start">
        <CardContainer className="w-full sm:w-4/5 lg:w-3/5 xl:w-2/5">
          <CardHeader className="flex flex-col items-center justify-center py-6 sm:py-8 md:py-10">
            <h1 className="text-center text-2xl font-bold">
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
    </>
  );
};

export default Passenger;
