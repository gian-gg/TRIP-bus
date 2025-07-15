import React, { useCallback, useState } from 'react';
import { toast } from 'sonner';

import Button from '@/components/Button';
import Dialog from '@/components/Dialog';
import {
  CardContainer,
  CardBody,
  CardHeader,
  CardFooter,
} from '@/components/Card';
import { Label, Field, Input, Select, Description } from '@/components/Form';
import { HandIcon } from '@/components/Icons';
import FloatingButton from '@/components/FloatingButton';

import { SeatInfo } from '@/data';

const CallConductor = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const name = formData.get('name') as string;
      const seat = formData.get('seat') as string;

      if (!name || !seat) {
        return;
      }

      toast.info(
        `Calling the conductor for ${name} at ${seat === 'Aisle' ? 'the aisle' : `seat ${seat}`}.`
      );

      setIsOpen(false);
    },
    []
  );

  return (
    <>
      <FloatingButton onClick={() => setIsOpen(true)}>
        <HandIcon />
      </FloatingButton>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        as="div"
        className="w-96"
      >
        <CardContainer>
          <CardHeader>
            <h1 className="text-lg font-bold">Call Conductor</h1>
            <p className="text-primary-light text-sm">
              Notify the conductor for any assistance.
            </p>
          </CardHeader>
          <CardBody>
            <form
              onSubmit={handleSubmit}
              id="form"
              className="flex flex-col gap-4"
            >
              <Field>
                <Label htmlFor="name" required>
                  Name:
                </Label>
                <Description>
                  Enter name for the conductor to identify you.
                </Description>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter Name"
                  required
                />
              </Field>
              <Field>
                <Label htmlFor="seat" required>
                  Seat Number
                </Label>
                <Description>Select current Seat.</Description>
                <Select name="seat" defaultValue="null" required>
                  <option value="null" disabled>
                    Select Seat Number
                  </option>
                  {SeatInfo.seats.map((seat, index) => (
                    <option key={index} value={seat}>
                      {seat}
                    </option>
                  ))}
                </Select>
              </Field>
            </form>
          </CardBody>
          <CardFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="px-4"
            >
              Close
            </Button>
            <Button variant="solid" type="submit" form="form" className="px-4">
              Call Conductor
            </Button>
          </CardFooter>
        </CardContainer>
      </Dialog>
    </>
  );
};

export default React.memo(CallConductor);
