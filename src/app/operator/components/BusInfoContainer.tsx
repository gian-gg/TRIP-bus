import Button from '../../../components/Button';
import type { BusInformationType } from '@/type';

function StatsCard(props: { label: string; value: number | string }) {
  return (
    <div className="flex w-[200px] flex-col items-center justify-center bg-[#f5f5f5] p-5">
      <h1 className="text-primary text-4xl font-semibold">{props.value}</h1>
      <p>{props.label}</p>
    </div>
  );
}

function BusCard(props: { BusInfo: BusInformationType }) {
  const status = props.BusInfo['bus_status'];
  let StatusClass = 'text-black';
  if (status === 'active') StatusClass = 'text-green-600 font-bold';
  if (status === 'maintenance') StatusClass = 'text-red-600 font-bold';
  if (status === 'in transit') StatusClass = 'text-yellow-500 font-bold';

  return (
    <div className="flex h-full w-full flex-col p-3">
      <div className="border-outline bg-neutral flex items-center justify-between border-1 p-5">
        <h1 className="text-2xl font-bold">Bus #{props.BusInfo['bus_id']}</h1>
        <p className={StatusClass}>{props.BusInfo['bus_status']}</p>
      </div>
      <div className="border-outline grid h-full grid-cols-2 grid-rows-2 gap-5 border-1 p-5">
        <div>
          <p>Route</p>
          <p className="font-semibold">{props.BusInfo['route_id']}</p>
        </div>
        <div>
          <p>Driver Name</p>
          <p className="font-semibold">{props.BusInfo['driver_name']}</p>
        </div>
        <div>
          <p>Current Location</p>
          <p className="font-semibold">{props.BusInfo['curr_location']}</p>
        </div>
        <div>
          <p>Passenger Count</p>
          <p className="font-semibold">{props.BusInfo['passenger_count']}</p>
        </div>
      </div>
      <div className="w-1xl border-outline bg-neutral grid grid-cols-2 grid-rows-1 justify-items-center gap-4 border-1 p-3">
        <Button className="w-full" variant="solid">
          <p>View Details</p>
        </Button>
        <Button className="w-full" variant="outline">
          <p className="text-black">TBA</p>
        </Button>
      </div>
    </div>
  );
}

export { BusCard, StatsCard };
