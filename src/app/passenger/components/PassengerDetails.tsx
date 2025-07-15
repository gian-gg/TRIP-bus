import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import Callout from '@/components/Callout';
import Container from '@/components/Container';
import Badges from '@/components/Badges';

import { RightArrow, SpinnerIcon } from '@/components/Icons';

import { GET } from '@/lib/api';

import type {
  GeneralTripInfoType,
  PassengerDetailsType,
  CurrentBusInfoType,
  GETResponse,
  StopType,
} from '@/type';

interface ResponseGETReponseType extends GETResponse {
  data: StopType;
}

const PassengerDetails = React.memo(
  (props: {
    generalTripInfo: GeneralTripInfoType;
    passengerDetails: PassengerDetailsType[];
    currentBusInfo: CurrentBusInfoType;
  }) => {
    const [destinationName, setDestinationName] = useState<string>('');

    const fetchDestinationName = useCallback(async () => {
      try {
        const response = await GET(
          '/stop/index.php?id=' + props.generalTripInfo.destination
        );

        const res = response as ResponseGETReponseType;

        setDestinationName(res.data.stop_name);

        if (res.status !== 'success') {
          toast.error('Failed to fetch destination name.');
          return;
        }
      } catch (error) {
        toast.error(
          `Error: ${error instanceof Error ? error.message : 'Unknown error'}. Call the conductor for help.`
        );
      }
    }, [props.generalTripInfo.destination]);

    useEffect(() => {
      fetchDestinationName();
    }, [fetchDestinationName]);

    if (!destinationName) {
      return (
        <div className="flex h-20 items-center justify-center">
          <SpinnerIcon className="text-primary animate-spin text-9xl" />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4">
        <Callout
          mode="primary"
          className="mx-4 mb-4 flex items-center justify-between gap-4 p-6 md:p-8"
        >
          <h2 className="text-primary my-1 text-xl font-bold">
            {props.currentBusInfo.current_stop}
          </h2>
          <RightArrow className="text-primary" />
          <h2 className="text-primary text-md my-1 text-center font-bold md:text-lg">
            {destinationName}
          </h2>
        </Callout>
        {props.passengerDetails.map((detail, idx) => (
          <Container
            key={idx}
            className="flex items-center justify-between p-4 px-8"
          >
            <div>
              <p>
                <strong>Name:</strong> {detail.full_name}
              </p>
              <p>
                <strong>Type:</strong>{' '}
                <Badges
                  type={
                    detail.passenger_category as PassengerDetailsType['passenger_category']
                  }
                />
              </p>
              <p>
                <strong>Seat:</strong> {detail.seat_number}
              </p>
            </div>
            <p className="text-primary text-xl font-bold">
              ₱{detail.fare_amount}
            </p>
          </Container>
        ))}
        <Callout mode="primary" className="mx-4 mb-4 flex justify-between p-4">
          <div>
            <h3 className="text-primary text-sm font-bold">FARE TOTAL</h3>
            <p className="text-xs">Regular (₱25) - 20% Discount (₱5)</p>
          </div>
          <span className="text-primary text-4xl font-bold">
            ₱{props.generalTripInfo.fare_amount}
          </span>
        </Callout>
      </div>
    );
  }
);

export default PassengerDetails;
