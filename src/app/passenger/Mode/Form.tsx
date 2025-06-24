const NUMBER_OF_PAGES = 3;
const MAX_PASSENGERS = 10;

import React, { useState } from 'react';
import { toast } from 'sonner';
import Callout from '@/components/Callout';
import {
  Field,
  Label,
  Input,
  Description,
  RadioGroup,
  Select,
} from '@/components/Form';
import Button from '@/components/Button';
import Container from '@/components/Container';

import { PassengerTypesRadios, PaymentMethodRadios } from '../Radios';

import type { passengerDetailsType } from '@/type';
import {
  PassengerTypes,
  Destinations,
  SeatNumber,
  PaymentMethod,
} from '@/data';

import { formatPassengerType } from '@/lib/misc';

type GeneralTripInfoType = {
  passengerCount: number;
  contactNumber: string;
  destination: string;
};

type PassengerDetailsType = {
  category: string;
  name: string;
  seat: string;
};

const Passenger = (props: {
  handleSubmit: (e: React.FormEvent) => void;
  data: passengerDetailsType;
  onChange: (value: passengerDetailsType) => void;
}) => {
  const [currentFormPage, setCurrentFormPage] = useState(1);

  const [generalTripInfo, setGeneralTripInfo] = useState<GeneralTripInfoType>({
    passengerCount: 1,
    contactNumber: '',
    destination: '',
  });

  const [passengerDetails, setPassengerDetails] = useState<
    PassengerDetailsType[]
  >(
    Array.from({ length: generalTripInfo.passengerCount }, () => ({
      category: '',
      name: '',
      seat: '',
    }))
  );

  const handleNextPage = () => {
    if (currentFormPage === 1) {
      if (!generalTripInfo.destination || !generalTripInfo.contactNumber) {
        toast.error('Please fill in all required fields.');
        return;
      }
    }

    // if (currentFormPage === 2) {
    //   toast.error('Please fill in all required fields.');
    //   return;
    // }

    setCurrentFormPage((prev) => prev + 1);
  };

  return (
    <form onSubmit={props.handleSubmit} className="mt-8 flex flex-col gap-4">
      {currentFormPage === 1 && (
        <>
          <Field>
            <Label htmlFor="passengersCount" required>
              How many passengers?
            </Label>
            <Select
              id="passengersCount"
              value={generalTripInfo.passengerCount}
              onChange={(e) =>
                setGeneralTripInfo({
                  ...generalTripInfo,
                  passengerCount: Number((e.target as HTMLSelectElement).value),
                })
              }
            >
              {Array.from({ length: MAX_PASSENGERS }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} passenger{i + 1 > 1 ? 's' : ''}
                </option>
              ))}
            </Select>
          </Field>
          <Field>
            <Label htmlFor="destinationInput" required>
              Destination
            </Label>
            <Select
              id="destinationInput"
              value={generalTripInfo.destination}
              onChange={(e) =>
                setGeneralTripInfo({
                  ...generalTripInfo,
                  destination: (e.target as HTMLSelectElement).value,
                })
              }
            >
              <option value="" disabled selected>
                Select destination
              </option>
              {Destinations.map((destination, index) => (
                <option key={index} value={destination}>
                  {destination}
                </option>
              ))}
            </Select>
          </Field>
          <Field>
            <Label htmlFor="contactInput" required>
              Contact Number
            </Label>
            <Input
              type="text"
              id="contactInput"
              placeholder="Enter your contact number"
              value={generalTripInfo.contactNumber}
              onChange={(e) =>
                setGeneralTripInfo({
                  ...generalTripInfo,
                  contactNumber: (e.target as HTMLInputElement).value,
                })
              }
            />
          </Field>
        </>
      )}
      {currentFormPage === 2 && (
        <>
          {Array.from({ length: generalTripInfo.passengerCount }, (_, idx) => (
            <Container key={idx}>
              <h3 className="text-md font-bold">Passenger {idx + 1}:</h3>
              <Field className="mt-2">
                <Label htmlFor={`nameInput-${idx}`} required>
                  Full Name
                </Label>
                <Description>Last Name, First Name, M.I.</Description>
                <Input
                  type="text"
                  id={`nameInput-${idx}`}
                  placeholder="Enter your full name"
                  className="w-full"
                />
              </Field>
              <div className="mt-2 flex gap-8">
                <Field>
                  <Label htmlFor={`seatNumberInput-${idx}`} required>
                    Seat Number
                  </Label>
                  <Select id={`seatNumberInput-${idx}`}>
                    <option value="" disabled selected>
                      Select Seat Number
                    </option>
                    {SeatNumber.map((seat, index) => (
                      <option key={index} value={seat}>
                        {seat}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field>
                  <Label htmlFor={`categoryInput-${idx}`} required>
                    Select Category
                  </Label>
                  <Select id={`categoryInput-${idx}`}>
                    {PassengerTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {formatPassengerType(type)}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
            </Container>
          ))}
        </>
      )}
      {currentFormPage === NUMBER_OF_PAGES && (
        <>
          <h2>Review Trip Info</h2>

          <p>
            <strong>Destination:</strong> {generalTripInfo.destination}
          </p>
          <p>
            <strong>Contact Number:</strong> {generalTripInfo.contactNumber}
          </p>
          <p>
            <strong>Total Passengers:</strong> {generalTripInfo.passengerCount}
          </p>
        </>
      )}
      <div className="mt-4 flex gap-4">
        {currentFormPage !== 1 && (
          <Button
            type="button"
            onClick={() => setCurrentFormPage((prev) => prev - 1)}
            variant="outline"
            className="w-full p-3"
          >
            Back
          </Button>
        )}
        {currentFormPage !== NUMBER_OF_PAGES && (
          <Button
            type="button"
            onClick={handleNextPage}
            variant="solid"
            className="w-full p-3"
          >
            Next
          </Button>
        )}
        {currentFormPage === NUMBER_OF_PAGES && (
          <Button type="submit" variant="solid" className="w-full p-3">
            Submit
          </Button>
        )}
      </div>
    </form>
  );
};

export default Passenger;
