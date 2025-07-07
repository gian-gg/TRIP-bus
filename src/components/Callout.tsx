import React from 'react';
import clsx from 'clsx';

const Callout = React.memo(
  (props: {
    children: React.ReactNode;
    className?: string;
    mode?: 'primary' | 'secondary';
  }) => {
    if (props.mode === 'primary') {
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
    } else {
      return (
        <div
          className={clsx(
            'from-secondary-light to-base border-secondary rounded-md border-l-4 bg-gradient-to-r p-2 text-[#8D6D5F]',
            props.className
          )}
        >
          {props.children}
        </div>
      );
    }
  }
);

export default Callout;
