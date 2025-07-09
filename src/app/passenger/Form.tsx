const NUMBER_OF_PAGES = 3;

import React, { useState } from 'react';

import Form1 from './Pages/Form1';
import Form2 from './Pages/Form2';
import Form3 from './Pages/Form3';

import type {
  GeneralTripInfoType,
  PassengerDetailsType,
  CurrentBusInfoType,
  PassengerType,
  StopType,
} from '@/type';

const Passenger = (props: {
  handleSubmit: () => void;
  currentBusInfo: CurrentBusInfoType;
  generalTripInfo: GeneralTripInfoType;
  setGeneralTripInfo: React.Dispatch<React.SetStateAction<GeneralTripInfoType>>;
  passengerDetails: PassengerDetailsType[];
  setPassengerDetails: React.Dispatch<
    React.SetStateAction<PassengerDetailsType[]>
  >;
  stops: StopType[];
}) => {
  const [currentFormPage, setCurrentFormPage] = useState(1);

  const {
    currentBusInfo,
    generalTripInfo,
    setGeneralTripInfo,
    passengerDetails,
    setPassengerDetails,
    handleSubmit,
    stops,
  } = props;

  const handleForm1Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const passengersCount = formData.get('passengersCount') as string;
    const destination = Number(
      formData.get('destinationInput')
    ) as StopType['stop_id'];
    const contact = formData.get('contactInput') as string;

    setGeneralTripInfo({
      passengerCount: parseInt(passengersCount, 10),
      destination: destination,
      contactNumber: contact,
      trip_id: currentBusInfo.trip_id,
    });

    setPassengerDetails((prevDetails) => {
      const newCount = parseInt(passengersCount, 10);
      if (prevDetails.length >= newCount) {
        return prevDetails.slice(0, newCount);
      }
      const additional = Array.from(
        { length: newCount - prevDetails.length },
        () => ({
          passenger_category: '' as PassengerType,
          full_name: '',
          seat_number: '',
        })
      );
      return [...prevDetails, ...additional];
    });

    setCurrentFormPage((prev) => prev + 1);
  };

  const handleForm2Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    passengerDetails.forEach((_, idx) => {
      const fullName = formData.get(`nameInput-${idx}`) as string;
      const category = formData.get(`categoryInput-${idx}`) as PassengerType;
      const seat = formData.get(`seatNumberInput-${idx}`) as string;

      setPassengerDetails((prevDetails) => {
        const updatedDetails = [...prevDetails];
        updatedDetails[idx] = {
          passenger_category: category,
          full_name: fullName,
          seat_number: seat,
        };
        return updatedDetails;
      });
    });

    setCurrentFormPage((prev) => prev + 1);
  };

  const handleBackButton = () => {
    if (currentFormPage > 1) {
      setCurrentFormPage((prev) => prev - 1);
    }
  };

  const handleNextButton = () => {
    if (currentFormPage < NUMBER_OF_PAGES) {
      setCurrentFormPage((prev) => prev + 1);
    }
  };

  return (
    <div className="pt-8">
      {(() => {
        switch (currentFormPage) {
          case 1:
            return (
              <Form1
                generalTripInfo={generalTripInfo}
                currentBusInfo={currentBusInfo}
                OnSubmit={handleForm1Submit}
                handleNextButton={handleNextButton}
                stops={stops}
              />
            );
          case 2:
            return (
              <Form2
                generalTripInfo={generalTripInfo}
                passengerDetails={passengerDetails}
                OnSubmit={handleForm2Submit}
                handleBackButton={handleBackButton}
                handleNextButton={handleNextButton}
              />
            );
          case NUMBER_OF_PAGES:
            return (
              <Form3
                generalTripInfo={generalTripInfo}
                passengerDetails={passengerDetails}
                currentBusInfo={currentBusInfo}
                handleBackButton={handleBackButton}
                handleNextButton={handleNextButton}
                OnSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              />
            );
          default:
            return null;
        }
      })()}
    </div>
  );
};

export default Passenger;
