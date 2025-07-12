import { useState } from 'react';

import { Field, Label, Input, Description, Select } from '@/components/Form';
import Button from '@/components/Button';
import Container from '@/components/Container';

import { PassengerTypes, SeatInfo } from '@/data';

import { formatPassengerType } from '@/lib/misc';

import type { GeneralTripInfoType, PassengerDetailsType } from '@/type';

const Form2 = (props: {
  generalTripInfo: GeneralTripInfoType;
  passengerDetails: PassengerDetailsType[];
  OnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleBackButton: () => void;
  handleNextButton: () => void;
}) => {
  const [passengerSeats, setPassengerSeats] = useState<string[]>([]);

  return (
    <form className="flex flex-col gap-4" onSubmit={props.OnSubmit}>
      {Array.from(
        { length: props.generalTripInfo.passengerCount },
        (_, idx) => (
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
                name={`nameInput-${idx}`}
                placeholder="Enter your full name"
                className="w-full"
                required
                defaultValue={props.passengerDetails[idx].full_name}
              />
            </Field>
            <div className="mt-2 flex gap-8">
              <Field>
                <Label htmlFor={`seatNumberInput-${idx}`} required>
                  Seat Number
                </Label>
                <Select
                  id={`seatNumberInput-${idx}`}
                  name={`seatNumberInput-${idx}`}
                  required
                  defaultValue={props.passengerDetails[idx].seat_number}
                  onChange={(e) => {
                    const newSeats = [...passengerSeats];
                    newSeats[idx] = e.target.value;
                    setPassengerSeats(newSeats);
                  }}
                >
                  <option value="" disabled>
                    Select Seat Number
                  </option>
                  {SeatInfo.seats.map((seat, index) => {
                    if (
                      seat !== 'Aisle' &&
                      passengerSeats.includes(seat) &&
                      passengerSeats[idx] !== seat
                    ) {
                      return null;
                    }
                    return (
                      <option key={index} value={seat}>
                        {seat}
                      </option>
                    );
                  })}
                </Select>
              </Field>
              <Field>
                <Label htmlFor={`categoryInput-${idx}`} required>
                  Select Category
                </Label>
                <Select
                  id={`categoryInput-${idx}`}
                  name={`categoryInput-${idx}`}
                  required
                  defaultValue={props.passengerDetails[idx].passenger_category}
                >
                  {PassengerTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {formatPassengerType(type)}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
          </Container>
        )
      )}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          className="mt-4 w-full p-3"
          type="button"
          onClick={props.handleBackButton}
        >
          Back
        </Button>
        <Button variant="solid" className="mt-4 w-full p-3" type="submit">
          Next
        </Button>
      </div>
    </form>
  );
};

export default Form2;
