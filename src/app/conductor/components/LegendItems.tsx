const legendConfig: Record<
  'digital' | 'cash_paid' | 'cash_unpaid' | 'student' | 'senior' | 'pwd',
  { bg: string; border: string }
> = {
  digital: { bg: 'bg-primary-light', border: 'border-primary' },
  cash_paid: { bg: 'bg-secondary-light', border: 'border-secondary' },
  cash_unpaid: { bg: 'bg-red-200', border: 'border-red-400' },
  student: { bg: 'bg-type-student-light', border: 'border-type-student' },
  senior: { bg: 'bg-black-200', border: 'border-black-400' },
  pwd: { bg: 'bg-type-pwd-light', border: 'border-type-pwd' },
};

const typeLabels: Record<
  'digital' | 'cash_paid' | 'cash_unpaid' | 'student' | 'senior' | 'pwd',
  string
> = {
  digital: 'Digital',
  cash_paid: 'Cash - Paid',
  cash_unpaid: 'Cash - Unpaid',
  student: 'Student',
  senior: 'Senior',
  pwd: 'PWD',
};

const LegendItems = (props: {
  type: 'digital' | 'cash_paid' | 'cash_unpaid' | 'student' | 'senior' | 'pwd';
}) => {
  const { type } = props;
  const config = legendConfig[type];
  const label = typeLabels[type];

  return (
    <div className="flex h-full items-center gap-2">
      <div
        className={`h-3 w-3 rounded-sm border-1 ${config.border} ${config.bg}`}
      ></div>
      <p className="text-sm text-black/90">{label}</p>
    </div>
  );
};

export default LegendItems;
