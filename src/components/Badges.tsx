import type { PassengerDetailsType } from '@/type';

import { formatPassengerType } from '@/lib/misc';

const typeBgClass: Record<string, string> = {
  student: 'bg-type-student-light',
  senior: 'bg-type-senior-light',
  regular: 'bg-type-regular-light',
  pwd: 'bg-type-pwd-light',
};

const Badges = (props: { type: PassengerDetailsType['category'] }) => {
  const bgClass = typeBgClass[props.type] || 'bg-type-regular-light';
  return (
    <span
      className={`${bgClass} border-outline rounded-full border-1 px-2 py-1 text-sm text-black`}
    >
      {formatPassengerType(props.type)}
    </span>
  );
};

export default Badges;
