import Callout from '@/components/Callout';
import Container from '@/components/Container';
import Badges from '@/components/Badges';

import { RightArrow } from '@/components/Icons';

import type {
  GeneralTripInfoType,
  PassengerDetailsType,
  CurrentBusInfoType,
} from '@/type';

const PassengerDetails = (props: {
  generalTripInfo: GeneralTripInfoType;
  passengerDetails: PassengerDetailsType[];
  currentBusInfo: CurrentBusInfoType;
}) => {
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
          {props.generalTripInfo.destination}
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
          <p className="text-primary text-xl font-bold">₱20</p>
        </Container>
      ))}
      <Callout mode="primary" className="mx-4 mb-4 flex justify-between p-4">
        <div>
          <h3 className="text-primary text-sm font-bold">FARE TOTAL</h3>
          <p className="text-xs">Regular (₱25) - 20% Discount (₱5)</p>
        </div>
        <span className="text-primary text-4xl font-bold">
          ₱{20 * props.generalTripInfo.passengerCount}
        </span>
      </Callout>
    </div>
  );
};

export default PassengerDetails;
