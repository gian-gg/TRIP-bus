const MAX_PASSENGERS = 10;

import Callout from '@/components/Callout';
import { Field, Label, InputWithIcon, Select } from '@/components/Form';
import Button from '@/components/Button';
import { ClockIcon, PushPinIcon } from '@/components/Icons';

import { formatTimeDate } from '@/lib/misc';

import type { CurrentBusInfoType, GeneralTripInfoType, StopType } from '@/type';

const Form1 = (props: {
  generalTripInfo: GeneralTripInfoType;
  currentBusInfo: CurrentBusInfoType;
  OnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleNextButton: () => void;
  stops: StopType[];
}) => {
  return (
    <>
      <Callout
        mode="primary"
        className="mx-4 mb-4 flex items-center justify-start gap-4 p-8"
      >
        <PushPinIcon className="text-2xl" />
        <div>
          <p className="text-xs font-medium">BOARDING POINT</p>
          <h2 className="text-primary my-1 text-xl font-bold">
            {props.currentBusInfo['current_stop']}
          </h2>
          <p className="text-xs">
            <ClockIcon /> {formatTimeDate(props.currentBusInfo['timestamp'])}
          </p>
        </div>
      </Callout>
      <form className="flex flex-col gap-4" onSubmit={props.OnSubmit}>
        <Field>
          <Label htmlFor="passengersCount" required>
            How many passengers?
          </Label>
          <Select
            id="passengersCount"
            name="passengersCount"
            defaultValue={props.generalTripInfo.passengerCount}
            required
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
            name="destinationInput"
            defaultValue={
              !props.generalTripInfo.destination
                ? ''
                : props.generalTripInfo.destination
            }
            required
          >
            <option value="" disabled defaultChecked>
              Select destination
            </option>
            {props.stops.map((stop, index) => (
              <option key={index} value={stop.stop_id}>
                {stop.stop_name}
              </option>
            ))}
          </Select>
        </Field>
        <Field>
          <Label htmlFor="contactInput" required>
            Contact Number
          </Label>
          <InputWithIcon
            type="text"
            id="contactInput"
            placeholder="Enter your contact number"
            name="contactInput"
            defaultValue={props.generalTripInfo.contactNumber}
            required
          >
            <h1 className="text-muted">+63</h1>
          </InputWithIcon>
        </Field>

        <Button variant="solid" className="mt-4 w-full p-3" type="submit">
          Next
        </Button>
      </form>
    </>
  );
};

export default Form1;
