import Container from '@/components/Container';
import Buttons from '../Buttons';

import type { passengerDetailsType } from '@/type';

const Success = (props: { data: passengerDetailsType }) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-center text-xl font-bold">Ticket Details:</h2>
      <Container className="mt-4">
        <ul>
          <li className="text-sm">
            <strong>Name:</strong> {props.data.name}
          </li>
          <li className="text-sm">
            <strong>Contact:</strong> {props.data.contact}
          </li>
          <li className="text-sm">
            <strong>Seat:</strong> {props.data.seat}
          </li>
          <li className="text-sm">
            <strong>Passenger Type:</strong> {props.data.passengerType}
          </li>
          <li className="text-sm">
            <strong>Entry Point:</strong> Lorem Ipsum Station @ 2:30 PM
          </li>
          <li className="text-sm">
            <strong>Destination:</strong> {props.data.destination}
          </li>
        </ul>
      </Container>
      <Buttons />

      <p className="text-muted mt-4 text-center text-xs">
        Dev Note: Clear browser local storage to reset form. (Not yet connected
        to backend)
      </p>
    </div>
  );
};

export default Success;
