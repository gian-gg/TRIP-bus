import Button from '../../../components/Button';
import type { BusInformationType, TimelineInformationType } from '@/type';
import { CircleIcon } from '@/components/Icons';
import Container from '@/components/Container';

import {
  CardContainer,
  CardHeader,
  CardBody,
  CardFooter,
} from '@/components/Card';

function StatsCard(props: { label: string; value: number | string }) {
  return (
    <Container className="flex w-full flex-col items-center justify-center">
      <h1 className="text-primary text-2xl font-bold sm:text-3xl lg:text-4xl">
        {props.value}
      </h1>
      <p className="text-center text-xs md:text-sm">{props.label}</p>
    </Container>
  );
}

function TimelineCard(props: { TimelineInfo: TimelineInformationType }) {
  const statusCode = props.TimelineInfo['status_code'];

  const statusDescriptions: { [key: typeof statusCode]: string } = {
    1: 'Route started',
    2: 'Loop accomplished',
    3: 'Scheduled Break',
    4: 'Emergency Stop',
    5: 'End of the day',
  };

  return (
    <div className="flex items-center justify-start gap-10 p-2">
      <div className="flex w-1/3 items-center justify-start gap-4">
        <CircleIcon className="bg-primary h-[15px] w-[15px] rounded-full" />
        <p className="text-sm font-medium md:text-lg">
          {props.TimelineInfo['timestamp']}
        </p>
      </div>
      <div className="flex w-1/2 flex-col items-start justify-start">
        <p className="text-sm md:text-lg">{statusDescriptions[statusCode]}</p>
      </div>
    </div>
  );
}

function BusCard(props: {
  BusInfo: BusInformationType;
  OnClick: (data: BusInformationType) => void;
}) {
  const status = props.BusInfo['bus_status'];
  let StatusClass = 'text-black';
  switch (status) {
    case 'active':
      StatusClass = 'text-green-600 font-bold bg-green-100 border-green-300';
      break;
    case 'maintenance':
      StatusClass = 'text-red-600 font-bold bg-red-100 border-red-300';
      break;
    case 'in transit':
      StatusClass = 'text-yellow-500 font-bold bg-yellow-100 border-yellow-300';
      break;
    default:
      StatusClass = 'text-black';
  }

  return (
    <CardContainer className="border-outline flex h-full w-full flex-col border-1">
      <CardHeader className="!bg-neutral flex items-center justify-between !text-black">
        <h1 className="text-[16px] font-extrabold sm:text-[18px] lg:text-2xl">
          Bus #{props.BusInfo['bus_id']}
        </h1>
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${StatusClass} border-1`}
        >
          {props.BusInfo['bus_status']}
        </span>
      </CardHeader>
      <CardBody className="grid h-full grid-cols-2 grid-rows-2 gap-5 p-3 sm:p-5">
        <div>
          <p className="text-sm font-semibold md:text-lg">Route:</p>
          <p className="text-xs md:text-sm">{props.BusInfo['route_id']}</p>
        </div>
        <div>
          <p className="text-sm font-semibold md:text-lg">Bus Driver:</p>
          <p className="text-xs md:text-sm">{props.BusInfo['driver_name']}</p>
        </div>
        <div>
          <p className="text-sm font-semibold md:text-lg">Current Location:</p>
          <p className="text-xs md:text-sm">{props.BusInfo['curr_location']}</p>
        </div>
        <div>
          <p className="text-sm font-semibold md:text-lg">Passenger Count:</p>
          <p className="text-xs md:text-sm">
            {props.BusInfo['passenger_count']}
          </p>
        </div>
      </CardBody>
      <CardFooter>
        <Button
          onClick={() => props.OnClick(props.BusInfo)}
          className="w-full"
          variant="solid"
        >
          <p className="text-xs md:text-sm">View Details</p>
        </Button>
        {/* <Button className="w-full" variant="outline">
          <p className="text-[12px] font-bold text-black sm:text-[14px] lg:text-[16px]">
            Open Map
          </p>
        </Button> */}
      </CardFooter>
    </CardContainer>
  );
}

export { BusCard, StatsCard, TimelineCard };
