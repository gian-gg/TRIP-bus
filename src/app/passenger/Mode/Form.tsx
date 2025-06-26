const NUMBER_OF_PAGES = 3;
const MAX_PASSENGERS = 10;

import React, { useState } from 'react';
import { toast } from 'sonner';
import Callout from '@/components/Callout';
import { Field, Label, Input, Description, Select } from '@/components/Form';
import Button from '@/components/Button';
import Container from '@/components/Container';
import Badges from '@/components/Badges';

import { PassengerTypes, Destinations, SeatNumber } from '@/data';

import { ClockIcon, PushPinIcon, RightArrow } from '@/components/Icons';

import { formatPassengerType, formatTimeDate } from '@/lib/misc';

import type {
  GeneralTripInfoType,
  PassengerDetailsType,
  CurrentBusInfoType,
  PassengerType,
} from '@/type';

const Passenger = (props: {
  handleSubmit: (e: React.FormEvent) => void;
  currentBusInfo: CurrentBusInfoType;
  generalTripInfo: GeneralTripInfoType;
  setGeneralTripInfo: React.Dispatch<React.SetStateAction<GeneralTripInfoType>>;
  passengerDetails: PassengerDetailsType[];
  setPassengerDetails: React.Dispatch<
    React.SetStateAction<PassengerDetailsType[]>
  >;
}) => {
  const [currentFormPage, setCurrentFormPage] = useState(1);

  const {
    generalTripInfo,
    setGeneralTripInfo,
    passengerDetails,
    setPassengerDetails,
  } = props;

  const handleNextPage = () => {
    if (currentFormPage === 1) {
      if (!generalTripInfo.destination || !generalTripInfo.contactNumber) {
        toast.error('Please fill in all required fields.');
        return;
      }
    }

    if (currentFormPage === 2) {
      if (
        passengerDetails.some(
          (detail) => !detail.name || !detail.seat || !detail.category
        )
      ) {
        toast.error('Please fill in all passenger details.');
        return;
      }
    }

    setCurrentFormPage((prev) => prev + 1);
  };

  return (
    <form onSubmit={props.handleSubmit} className="mt-8 flex flex-col gap-4">
      {currentFormPage === 1 && (
        <>
          <Callout
            mode="primary"
            className="mx-4 mb-4 flex items-center justify-start gap-4 p-8"
          >
            <PushPinIcon className="text-2xl" />
            <div>
              <p className="text-xs font-medium">BOARDING POINT</p>
              <h2 className="text-primary my-1 text-xl font-bold">
                {props.currentBusInfo.current_stop}
              </h2>
              <p className="text-xs">
                <ClockIcon /> {formatTimeDate(props.currentBusInfo.timestamp)}
              </p>
            </div>
          </Callout>
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
                  value={passengerDetails[idx]?.name || ''}
                  onChange={(e) => {
                    const updated = [...passengerDetails];
                    updated[idx] = {
                      ...updated[idx],
                      name: e.target.value,
                    };
                    setPassengerDetails(updated);
                  }}
                />
              </Field>
              <div className="mt-2 flex gap-8">
                <Field>
                  <Label htmlFor={`seatNumberInput-${idx}`} required>
                    Seat Number
                  </Label>
                  <Select
                    id={`seatNumberInput-${idx}`}
                    value={passengerDetails[idx]?.seat || ''}
                    onChange={(e) => {
                      const updated = [...passengerDetails];
                      updated[idx] = {
                        ...updated[idx],
                        seat: (e.target as HTMLSelectElement).value,
                      };
                      setPassengerDetails(updated);
                    }}
                  >
                    <option value="" disabled>
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
                  <Select
                    id={`categoryInput-${idx}`}
                    value={passengerDetails[idx]?.category || ''}
                    onChange={(e) => {
                      const updated = [...passengerDetails];
                      updated[idx] = {
                        ...updated[idx],
                        category: (e.target as HTMLSelectElement)
                          .value as PassengerType,
                      };
                      setPassengerDetails(updated);
                    }}
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
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
          <h2 className="text-primary text-center text-2xl font-bold">
            Review Trip Info
          </h2>
          <Callout
            mode="primary"
            className="mx-4 mb-4 flex items-center justify-between gap-4 p-6 md:p-8"
          >
            <h2 className="text-primary my-1 text-xl font-bold">
              {props.currentBusInfo.current_stop}
            </h2>
            <RightArrow className="text-primary" />
            <h2 className="text-primary text-md my-1 text-center font-bold md:text-lg">
              {generalTripInfo.destination}
            </h2>
          </Callout>
          {passengerDetails.map((detail, idx) => (
            <Container
              key={idx}
              className="flex items-center justify-between p-4 px-8"
            >
              <div>
                <p>
                  <strong>Name:</strong> {detail.name}
                </p>
                <p>
                  <strong>Type:</strong>{' '}
                  <Badges
                    type={detail.category as PassengerDetailsType['category']}
                  />
                </p>
                <p>
                  <strong>Seat:</strong> {detail.seat}
                </p>
              </div>
              <p className="text-primary text-xl font-bold">₱20</p>
            </Container>
          ))}
          <Callout
            mode="primary"
            className="mx-4 mb-4 flex justify-between p-4"
          >
            <div>
              <h3 className="text-primary text-sm font-bold">FARE TOTAL</h3>
              <p className="text-xs">Regular (₱25) - 20% Discount (₱5)</p>
            </div>
            <span className="text-primary text-4xl font-bold">
              ₱{20 * generalTripInfo.passengerCount}
            </span>
          </Callout>
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
            Submit Form
          </Button>
        )}
      </div>
      {currentFormPage === NUMBER_OF_PAGES && (
        <p className="text-muted mt-2 text-center text-xs">
          Payment will be available after submitting.
        </p>
      )}
    </form>
  );
};

export default Passenger;
