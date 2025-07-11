import React from 'react';
import clsx from 'clsx';

import type { LegendItemsProps } from '@/app/conductor/type';
import { typeLabels, legendConfig } from '@/app/conductor/type';

const Badge = (
  props: React.HTMLAttributes<HTMLSpanElement> & { children: React.ReactNode }
) => {
  const { children, className, ...rest } = props;

  return (
    <span
      className={clsx('rounded-md border p-1 px-2 font-bold', className)}
      {...rest}
    >
      {children}
    </span>
  );
};

const PassengerBadge = (props: { type: LegendItemsProps }) => {
  const colorClass = legendConfig[props.type];

  return (
    <Badge className={`${colorClass.bg} ${colorClass.border}`}>
      <p
        className="text-xs font-bold"
        style={{ color: colorClass.borderColor }}
      >
        {typeLabels[props.type].toUpperCase()}
      </p>
    </Badge>
  );
};

export { Badge, PassengerBadge };
