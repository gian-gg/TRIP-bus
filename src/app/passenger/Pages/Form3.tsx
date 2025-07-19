import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import Button from '@/components/Button';
import PassengerDetails from '../components/PassengerDetails';

import APICall from '@/lib/api';

import type {
  GeneralTripInfoType,
  PassengerDetailsType,
  CurrentBusInfoType,
} from '@/type';

const Form3 = (props: {
  generalTripInfo: GeneralTripInfoType;
  passengerDetails: PassengerDetailsType[];
  currentBusInfo: CurrentBusInfoType;
  OnSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleBackButton: () => void;
  handleNextButton: () => void;
}) => {
  const [basePrice, setBasePrice] = useState(0);

  useEffect(() => {
    const fetchPrice = async () => {
      await APICall<{ fare_amount: string }>({
        type: 'GET',
        url: `/amount/index.php?origin_id=${props.currentBusInfo.current_stop_id}&destination_id=${props.generalTripInfo.destination}`,
        success: (data) => {
          setBasePrice(Number(data.fare_amount));
        },
        error: (error) => {
          throw new Error(
            error instanceof Error ? error.message : 'Unknown error'
          );
        },
      });
    };

    fetchPrice();
  }, [props.generalTripInfo, props.currentBusInfo]);
  return (
    <form
      onSubmit={(e) =>
        toast.promise(props.OnSubmit(e), {
          loading: 'Submitting trip details...',
          success: 'Trip details submitted successfully!',
          error: (error) => error.message,
        })
      }
      className="flex flex-col gap-4"
    >
      <h2 className="text-primary text-center text-2xl font-bold">
        Review Trip Info
      </h2>

      <PassengerDetails
        generalTripInfo={props.generalTripInfo}
        passengerDetails={props.passengerDetails}
        currentBusInfo={props.currentBusInfo}
        basePrice={basePrice}
      />

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
          Submit
        </Button>
      </div>
      <p className="text-muted text-center text-xs md:text-sm">
        Payment will be available after submitting.
      </p>
    </form>
  );
};

export default Form3;
