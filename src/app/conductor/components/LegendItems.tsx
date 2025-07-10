import { legendConfig, typeLabels } from '@/app/conductor/type';

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
