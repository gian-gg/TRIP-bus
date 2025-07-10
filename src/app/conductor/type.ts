type LegendItemsProps =
  | 'paid'
  | 'pending'
  | 'unpaid'
  | 'student'
  | 'senior'
  | 'pwd'
  | 'regular';

const legendConfig: Record<
  LegendItemsProps,
  { bg: string; border: string; bgColor?: string; borderColor?: string }
> = {
  paid: {
    bg: 'bg-primary-light',
    border: 'border-primary',
    bgColor: 'var(--color-primary-light)',
    borderColor: 'var(--color-primary)',
  },
  unpaid: {
    bg: 'bg-secondary-light',
    border: 'border-secondary',
    bgColor: 'var(--color-secondary-light)',
    borderColor: 'var(--color-secondary)',
  },
  pending: {
    bg: 'bg-secondary-light',
    border: 'border-secondary',
    bgColor: 'var(--color-secondary-light)',
    borderColor: 'var(--color-secondary)',
  },
  student: {
    bg: 'bg-type-student-light',
    border: 'border-type-student',
    bgColor: 'var(--color-type-student-light)',
    borderColor: 'var(--color-type-student)',
  },
  senior: {
    bg: 'bg-gray-200',
    border: 'border-gray-400',
    bgColor: 'var(--color-gray-200)',
    borderColor: 'var(--color-gray-400)',
  },
  pwd: {
    bg: 'bg-type-pwd-light',
    border: 'border-type-pwd',
    bgColor: 'var(--color-type-pwd-light)',
    borderColor: 'var(--color-type-pwd)',
  },
  regular: {
    bg: 'bg-gray-400',
    border: 'border-gray-600',
    bgColor: 'var(--color-gray-400)',
    borderColor: 'var(--color-gray-600)',
  },
};

const typeLabels: Record<LegendItemsProps, string> = {
  paid: 'Paid',
  unpaid: 'Unpaid',
  pending: 'Unpaid',
  regular: 'Regular',
  student: 'Student',
  senior: 'Senior',
  pwd: 'PWD',
};

export type { LegendItemsProps };
export { legendConfig, typeLabels };
