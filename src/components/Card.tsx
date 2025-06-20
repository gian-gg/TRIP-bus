import React from 'react';
import clsx from 'clsx';

const CardContainer = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        'border-neutral bg-base flex flex-col justify-between rounded-md border-1',
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

const CardHeader = (props: { children: React.ReactNode }) => {
  return (
    <div className="bg-primary text-inverse h-auto w-full rounded-t-md px-8 py-4">
      {props.children}
    </div>
  );
};

const CardBody = (props: { children: React.ReactNode }) => {
  return <div className="flex-1 px-8 py-4">{props.children}</div>;
};

const CardFooter = (props: { children: React.ReactNode }) => {
  return (
    <div className="bg-neutral h-auto w-full rounded-b-md px-8 py-4 text-sm">
      {props.children}
    </div>
  );
};

export { CardContainer, CardHeader, CardBody, CardFooter };
