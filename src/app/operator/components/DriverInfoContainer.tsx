import type { DriverInformationType, ConductorInformationType } from '@/type';

import {
  CardContainer,
  CardHeader,
  CardBody,
  CardFooter,
} from '@/components/Card';
import React from 'react';

const DriverCard = React.memo(
  (props: { DriverInfo: DriverInformationType }) => {
    const status = props.DriverInfo['status'];
    let StatusClass = 'text-black';
    switch (status) {
      case 'active':
        StatusClass = 'text-green-600 font-bold bg-green-100 border-green-300';
        break;
      case 'inactive':
        StatusClass = 'text-red-600 font-bold bg-red-100 border-red-300';
        break;
      default:
        StatusClass = 'text-black';
    }

    return (
      <CardContainer className="border-outline flex h-full w-full flex-col border-1">
        <CardHeader className="!bg-neutral flex items-center justify-between !text-black">
          <h1 className="text-[16px] font-extrabold sm:text-[18px] lg:text-2xl">
            Driver #{props.DriverInfo['driver_id']}
          </h1>
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${StatusClass} border-1`}
          >
            {props.DriverInfo['status']}
          </span>
        </CardHeader>
        <CardBody className="grid h-full grid-cols-2 grid-rows-2 gap-5 p-3 sm:p-5">
          <div>
            <p className="text-sm font-semibold md:text-lg">Current bus:</p>
            <p className="text-xs md:text-sm">{props.DriverInfo['bus_id']}</p>
          </div>
          <div>
            <p className="text-sm font-semibold md:text-lg">Name:</p>
            <p className="text-xs md:text-sm">
              {props.DriverInfo['full_name']}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold md:text-lg">Contact Number:</p>
            <p className="text-xs md:text-sm">
              {props.DriverInfo['contact_number']}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold md:text-lg">License Number:</p>
            <p className="text-xs md:text-sm">
              {props.DriverInfo['license_number']}
            </p>
          </div>
        </CardBody>
        <CardFooter>
          <h1></h1>
          {/* <Button
          onClick={() => props.OnClick(props.BusInfo)}
          className="w-full"
          variant="solid"
        >
          <p className="text-xs md:text-sm">View Details</p>
        </Button>
        <Button className="w-full" variant="outline">
          <p className="text-[12px] font-bold text-black sm:text-[14px] lg:text-[16px]">
            Open Map
          </p>
        </Button> */}
        </CardFooter>
      </CardContainer>
    );
  }
);

const ConductorCard = React.memo(
  (props: { ConductorInfo: ConductorInformationType }) => {
    const status = props.ConductorInfo['status'];
    let StatusClass = 'text-black';
    switch (status) {
      case 'active':
        StatusClass = 'text-green-600 font-bold bg-green-100 border-green-300';
        break;
      case 'inactive':
        StatusClass = 'text-red-600 font-bold bg-red-100 border-red-300';
        break;
      default:
        StatusClass = 'text-black';
    }

    return (
      <CardContainer className="border-outline flex h-full w-full flex-col border-1">
        <CardHeader className="!bg-neutral flex items-center justify-between !text-black">
          <h1 className="text-[16px] font-extrabold sm:text-[18px] lg:text-2xl">
            Conductor #{props.ConductorInfo['conductor_id']}
          </h1>
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${StatusClass} border-1`}
          >
            {props.ConductorInfo['status']}
          </span>
        </CardHeader>
        <CardBody className="grid h-full grid-cols-2 grid-rows-2 gap-5 p-3 sm:p-5">
          <div>
            <p className="text-sm font-semibold md:text-lg">Current bus:</p>
            <p className="text-xs md:text-sm">
              {props.ConductorInfo['bus_id']}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold md:text-lg">Name:</p>
            <p className="text-xs md:text-sm">
              {props.ConductorInfo['full_name']}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold md:text-lg">Contact Number:</p>
            <p className="text-xs md:text-sm">
              {props.ConductorInfo['contact_number']}
            </p>
          </div>
        </CardBody>
        <CardFooter>
          <h1></h1>
          {/* <Button
          onClick={() => props.OnClick(props.BusInfo)}
          className="w-full"
          variant="solid"
        >
          <p className="text-xs md:text-sm">View Details</p>
        </Button>
        <Button className="w-full" variant="outline">
          <p className="text-[12px] font-bold text-black sm:text-[14px] lg:text-[16px]">
            Open Map
          </p>
        </Button> */}
        </CardFooter>
      </CardContainer>
    );
  }
);

export { DriverCard, ConductorCard };
