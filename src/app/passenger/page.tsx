import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CardContainer, CardHeader, CardBody } from '@/components/Card';
import Callout from '@/components/Callout';
import Form from './Form';
import Success from './Success';

import { PushPinIcon, BusIcon } from '@/components/Icons';

import type { passengerDetailsType } from '@/type';

type modeType = 'form' | 'success';

const Passenger = () => {
  const [mode, setMode] = useState<modeType>(
    () => (localStorage.getItem('passengerMode') as modeType) || 'form'
  );

  const [passengerDetails, setPassengerDetails] =
    useState<passengerDetailsType>({
      passengerType: '',
      paymentMethod: '',
      destination: '',
      name: '',
      contact: '',
      seat: '',
    });

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

      setMode('success');
      toast.success('Form submitted successfully!');
    }
  };

  return (
    <div className="bg-background m-0 flex min-h-screen min-w-screen items-start justify-center p-0 sm:p-5 md:p-10">
      <CardContainer className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5">
        <CardHeader className="flex flex-col items-center justify-center py-6 sm:py-8 md:py-10">
          <h1 className="text-2xl font-bold">
            {mode === 'form' ? 'Passenger Details' : 'Success'}
          </h1>
          <p className="text-primary-light text-sm">
            {mode === 'form'
              ? 'Please fill out the form below to proceed with your trip.'
              : 'Your trip details have been successfully submitted.'}
          </p>
        </CardHeader>
        <CardBody>
          {mode === 'form' && (
            <Callout className="mx-4 mb-4 flex items-center justify-start gap-4 p-8">
              <PushPinIcon className="text-2xl" />
              <div>
                <p className="text-xs font-medium">BOARDING POINT</p>
                <h2 className="text-primary my-1 text-xl font-bold">
                  Lorem Ipsum Station
                </h2>
                <p className="text-xs">
                  <BusIcon /> Bus Entry: 2:30 PM Today
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
    </div>
  );
};

export default Passenger;
