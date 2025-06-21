import React from 'react';
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

import { PassengerTypesRadios, PaymentMethodRadios } from './Radios';

import type { passengerDetailsType } from '@/type';
import {
  PassengerTypes,
  Destinations,
  SeatNumber,
  PaymentMethod,
} from '@/data';

import { formatPassengerType } from '@/lib/misc';

const Passenger = (props: {
  handleSubmit: (e: React.FormEvent) => void;
  data: passengerDetailsType;
  onChange: (value: passengerDetailsType) => void;
}) => {
  return (
    <form onSubmit={props.handleSubmit} className="mt-8 flex flex-col gap-4">
      <Field>
        <Label htmlFor="nameInput" required>
          Full Name
        </Label>
        <Input type="text" id="nameInput" placeholder="Enter your full name" />
        <Description>Last Name, First Name, M.I.</Description>
      </Field>
      <Field>
        <Label htmlFor="contactInput" required>
          Contact Number
        </Label>
        <Input
          type="number"
          id="contactInput"
          placeholder="Enter your contact number"
        />
      </Field>
      <Field>
        <Label required>Passenger Type</Label>
        <RadioGroup
          value={props.data.passengerType}
          onChange={(value) => {
            props.onChange({
              ...props.data,
              passengerType: value,
            });
          }}
          className="grid grid-cols-2 gap-2"
        >
          {PassengerTypes.map((type, index) => (
            <PassengerTypesRadios
              key={index}
              value={type}
              passengerType={type}
              isSelected={props.data.passengerType === type}
            >
              {formatPassengerType(type)}
            </PassengerTypesRadios>
          ))}
        </RadioGroup>
        <Description>
          Passenger type will be verified by the conductor after payment.
        </Description>
      </Field>
      <Field>
        <Label htmlFor="destinationInput" required>
          Destination
        </Label>
        <Select
          id="destinationInput"
          value={props.data.destination}
          onChange={(e) =>
            props.onChange({
              ...props.data,
              destination: e.target.value,
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
      {props.data.passengerType && props.data.destination && (
        <Callout className="mx-4 mb-4 flex justify-between p-4">
          <div>
            <h3 className="text-sm font-bold">FARE AMOUNT</h3>
            <p className="text-xs">Regular (₱25) - 20% Discount (₱5)</p>
          </div>
          <span className="text-primary text-xl font-bold">₱20</span>
        </Callout>
      )}
      <Field>
        <Label htmlFor="seatNumberInput" required>
          Seat Number
        </Label>
        <Select id="seatNumberInput">
          <option value="" disabled selected>
            Select seat number
          </option>
          {SeatNumber.map((seat, index) => (
            <option key={index} value={seat}>
              {seat}
            </option>
          ))}
        </Select>
      </Field>
      <Field>
        <Label required>Payment Method</Label>
        <RadioGroup
          value={props.data.paymentMethod}
          onChange={(value) => {
            props.onChange({
              ...props.data,
              paymentMethod: value,
            });
          }}
          className="grid grid-cols-2 gap-2"
        >
          {PaymentMethod.map((method, index) => (
            <PaymentMethodRadios
              key={index}
              value={method.id}
              paymentMethod={method.id}
              isSelected={props.data.paymentMethod === method.id}
            >
              <h3 className="font-bold">{method.label}</h3>
              <p className="text-muted text-xs">{method.description}</p>
            </PaymentMethodRadios>
          ))}
        </RadioGroup>
      </Field>
      <Button type="submit" variant="solid" className="p-3">
        CONTINUE TO PAYMENT
      </Button>
    </form>
  );
};

export default Passenger;
