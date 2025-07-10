import type { LegendItemsProps } from '@/app/conductor/type';
import { typeLabels, legendConfig } from '@/app/conductor/type';
import clsx from 'clsx';

const PassengerModalBadge = (props: { passengerType: LegendItemsProps }) => {
  const colorClass =
    legendConfig[props.passengerType] ||
    'bg-primary-light text-primary border-primary/90';
  return (
    <span
      className={clsx(
        'rounded-md border-1 px-2 py-1 text-xs',
        `${colorClass.bg}`,
        `${colorClass.border}`
      )}
    >
      <p
        className="text-sm font-bold"
        style={{ color: colorClass.borderColor }}
      >
        {typeLabels[props.passengerType].toUpperCase()}
      </p>
    </span>
  );
};

export default PassengerModalBadge;
