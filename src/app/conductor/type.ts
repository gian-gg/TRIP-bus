type LegendItemsProps =
  | 'paid'
  | 'pending'
  | 'unpaid'
  | 'student'
  | 'senior'
  | 'pwd'
  | 'regular';

const legendConfig: Record<LegendItemsProps, { bg: string; border: string }> = {
  paid: { bg: 'bg-primary-light', border: 'border-primary' },
  unpaid: { bg: 'bg-secondary-light', border: 'border-secondary' },
  pending: { bg: 'bg-secondary-light', border: 'border-secondary' },
  student: { bg: 'bg-type-student-light', border: 'border-type-student' },
  senior: { bg: 'bg-gray-200', border: 'border-gray-400' },
  pwd: { bg: 'bg-type-pwd-light', border: 'border-type-pwd' },
  regular: { bg: 'bg-gray-400', border: 'border-gray-600' },
};

export type { LegendItemsProps };
export { legendConfig };
