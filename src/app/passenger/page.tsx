import { useState } from 'react';
import { CardContainer, CardHeader, CardBody } from '@/components/Card';
import Callout from '@/components/Callout';
import {
  Field,
  Label,
  Input,
  Description,
  RadioGroup,
  Select,
} from '@/components/Form';
import { PushPinIcon, BusIcon } from '@/components/Icons';
import Button from '@/components/Button';

import { PassengerTypesRadios, PaymentMethodRadios } from './Radios';

import type { PassengerType, PaymentMethodType } from '@/type';
import {
  PassengerTypes,
  Destinations,
  SeatNumber,
  PaymentMethod,
} from '@/data';

import { formatPassengerType } from '@/lib/misc';

const Passenger = () => {
  const [passengerType, setPassengerType] = useState<PassengerType | string>(
    ''
  );
  const [paymentMethod, setPaymentMethod] = useState<
    PaymentMethodType | string
  >('');
  const [destination, setDestination] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passengerType || !paymentMethod || !destination) {
      alert('Please fill out all required fields.');
    } else {
      console.log('Submitted with:', {
        passengerType,
        paymentMethod,
        destination,
        name: (e.target as HTMLFormElement).nameInput.value,
        contact: (e.target as HTMLFormElement).contactInput.value,
        seat: (e.target as HTMLFormElement).seatNumberInput.value,
      });
    }
  };

  return (
    <div className="bg-background m-0 flex min-h-screen min-w-screen items-start justify-center p-0 sm:p-5 md:p-10">
      <CardContainer className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5">
        <CardHeader className="flex flex-col items-center justify-center py-6 sm:py-8 md:py-10">
          <h1 className="text-2xl font-bold">Passenger Details</h1>
          <p className="text-primary-light text-sm">
            Fill-up your trip information.
          </p>
        </CardHeader>
        <CardBody>
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

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <Field>
              <Label htmlFor="nameInput" required>
                Full Name
              </Label>
              <Input
                type="text"
                id="nameInput"
                placeholder="Enter your full name"
                required
              />
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
                required
              />
            </Field>
            <Field>
              <Label required>Passenger Type</Label>
              <RadioGroup
                value={passengerType}
                onChange={setPassengerType}
                className="grid grid-cols-2 gap-2"
              >
                {PassengerTypes.map((type, index) => (
                  <PassengerTypesRadios
                    key={index}
                    value={type}
                    passengerType={type}
                    isSelected={passengerType === type}
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
                required
                id="destinationInput"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
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
            {passengerType && destination && (
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
              <Select required id="seatNumberInput">
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
                value={paymentMethod}
                onChange={setPaymentMethod}
                className="grid grid-cols-2 gap-2"
              >
                {PaymentMethod.map((method, index) => (
                  <PaymentMethodRadios
                    key={index}
                    value={method.id}
                    paymentMethod={method.id}
                    isSelected={paymentMethod === method.id}
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
        </CardBody>
      </CardContainer>
    </div>
  );
};

export default Passenger;
