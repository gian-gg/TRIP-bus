import React from 'react';
import clsx from 'clsx';

const CardContainer = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        'bg-base flex flex-col justify-between rounded-md',
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

const CardHeader = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        'bg-primary text-inverse h-auto w-full rounded-t-md px-8 py-4',
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

const CardBody = (props: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={clsx('flex-1 px-8 py-4', props.className)}>
      {props.children}
    </div>
  );
};

const CardFooter = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        'bg-neutral flex h-auto w-full justify-end gap-4 rounded-b-md px-8 py-4 text-sm',
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export { CardContainer, CardHeader, CardBody, CardFooter };
