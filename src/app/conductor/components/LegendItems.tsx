import type { LegendItemsProps } from '../type';
import { legendConfig } from '@/app/conductor/type';

const typeLabels: Record<LegendItemsProps, string> = {
  paid: 'Paid',
  unpaid: 'Unpaid',
  pending: 'Unpaid',
  regular: 'Regular',
  student: 'Student',
  senior: 'Senior',
  pwd: 'PWD',
};

const LegendItems = (props: {
  type: 'paid' | 'unpaid' | 'student' | 'senior' | 'pwd' | 'regular';
}) => {
  const { type } = props;

  return (
    <div className="flex w-min items-center gap-2">
      <div
        className={`h-3 w-3 rounded-sm border-1 ${legendConfig[type].border} ${legendConfig[type].bg}`}
      ></div>
      <p className="text-sm text-black/90">{typeLabels[type]}</p>
    </div>
  );
};

export default LegendItems;
