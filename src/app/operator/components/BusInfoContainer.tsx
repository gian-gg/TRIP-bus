import Button from '../../../components/Button';
import type { BusInformationType, TimelineInformationType } from '@/type';
import { CircleIcon } from '@/components/Icons';

function StatsCard(props: { label: string; value: number | string }) {
  return (
    <div className="flex w-[250px] flex-col items-center justify-center bg-[#f5f5f5] p-3">
      <h1 className="text-primary text-2xl font-bold sm:text-3xl lg:text-4xl">
        {props.value}
      </h1>
      <p>{props.label}</p>
    </div>
  );
}

function DetailsCard(props: {
  label: string;
  value: number | string | null | undefined;
}) {
  return (
    <div className="border-outline flex items-center justify-between border-1 p-2">
      <p className="text-[12px] sm:text-[14px] lg:text-[16px]">{props.label}</p>
      <p className="text-[12px] font-bold sm:text-[14px] lg:text-[16px]">
        {props.value}
      </p>
    </div>
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
        <p className="text-[12px] sm:text-[14px] lg:text-[16px]">
          {props.TimelineInfo['timestamp']}
        </p>
      </div>
      <div className="flex w-1/2 flex-col items-start justify-start">
        <p className="text-[12px] font-bold sm:text-[14px] lg:text-[16px]">
          {statusDescriptions[statusCode]}
        </p>
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
      StatusClass = 'text-green-600 font-bold';
      break;
    case 'maintenance':
      StatusClass = 'text-red-600 font-bold';
      break;
    case 'in transit':
      StatusClass = 'text-yellow-500 font-bold';
      break;
    default:
      StatusClass = 'text-black';
  }

  return (
    <div className="flex h-full w-full flex-col sm:p-3">
      <div className="border-outline bg-neutral flex items-center justify-between border-1 p-3 sm:p-4 lg:p-5">
        <h1 className="text-[16px] font-extrabold sm:text-[18px] lg:text-2xl">
          Bus #{props.BusInfo['bus_id']}
        </h1>
        <p className={StatusClass}>{props.BusInfo['bus_status']}</p>
      </div>
      <div className="grid h-full grid-cols-2 grid-rows-2 gap-5 p-3 sm:p-5">
        <div className="">
          <p className="text-[12px] sm:text-[14px] lg:text-[16px]">Route</p>
          <p className="text-[12px] font-bold sm:text-[14px] lg:text-[16px]">
            {props.BusInfo['route_id']}
          </p>
        </div>
        <div className="">
          <p className="text-[12px] sm:text-[14px] lg:text-[16px]">
            Current Driver Name
          </p>
          <p className="text-[12px] font-bold sm:text-[14px] lg:text-[16px]">
            {props.BusInfo['driver_name']}
          </p>
        </div>
        <div className="">
          <p className="text-[12px] sm:text-[14px] lg:text-[16px]">
            Current Location
          </p>
          <p className="text-[12px] font-bold sm:text-[14px] lg:text-[16px]">
            {props.BusInfo['curr_location']}
          </p>
        </div>
        <div className="">
          <p className="text-[12px] sm:text-[14px] lg:text-[16px]">
            Passenger Count
          </p>
          <p className="text-[12px] font-bold sm:text-[14px] lg:text-[16px]">
            {props.BusInfo['passenger_count']}
          </p>
        </div>
      </div>
      <div className="w-1xl border-outline bg-neutral grid grid-cols-2 grid-rows-1 justify-items-center gap-4 border-1 p-3 sm:p-5">
        <Button
          onClick={() => props.OnClick(props.BusInfo)}
          className="w-full"
          variant="solid"
        >
          <p className="text-[12px] font-bold sm:text-[14px] lg:text-[16px]">
            View History
          </p>
        </Button>
        <Button className="w-full" variant="outline">
          <p className="text-[12px] font-bold text-black sm:text-[14px] lg:text-[16px]">
            Open Map
          </p>
        </Button>
      </div>
    </div>
  );
}

export { BusCard, StatsCard, TimelineCard, DetailsCard };
