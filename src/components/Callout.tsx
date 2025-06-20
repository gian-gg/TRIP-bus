import React from 'react';
import clsx from 'clsx';

const Callout = (props: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={clsx(
        'from-primary-light to-base text-muted border-primary rounded-md border-l-4 bg-gradient-to-r p-2',
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default Callout;
