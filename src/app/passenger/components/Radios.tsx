import { Radio } from '@/components/Form';

import type { RadioProps } from '@headlessui/react';
import type { PassengerType, PaymentMethodType } from '@/type';

const PassengerTypesRadios = (
  props: RadioProps & {
    children?: React.ReactNode;
    passengerType: PassengerType;
    isSelected: boolean;
  }
) => {
  const { children, passengerType, isSelected, ...rest } = props;

  switch (passengerType) {
    case 'regular':
      return (
        <Radio
          {...rest}
          className={
            isSelected
              ? 'border-type-regular text-type-regular bg-type-regular-light'
              : ''
          }
        >
          {children}
        </Radio>
      );
    case 'student':
      return (
        <Radio
          {...rest}
          className={
            isSelected
              ? 'border-type-student text-type-student bg-type-student-light'
              : ''
          }
        >
          {children}
        </Radio>
      );
    case 'senior':
      return (
        <Radio
          {...rest}
          className={
            isSelected
              ? 'border-type-senior text-type-senior bg-type-senior-light'
              : ''
          }
        >
          {children}
        </Radio>
      );
    case 'pwd':
      return (
        <Radio
          {...rest}
          className={
            isSelected ? 'border-type-pwd text-type-pwd bg-type-pwd-light' : ''
          }
        >
          {children}
        </Radio>
      );
  }
};

function PaymentMethodRadios(
  props: RadioProps & {
    children?: React.ReactNode;
    paymentMethod: PaymentMethodType;
    isSelected: boolean;
  }
) {
  const { children, isSelected, paymentMethod, ...rest } = props;

  switch (paymentMethod) {
    case 'cash':
      return (
        <Radio
          {...rest}
          className={`p-4 text-left ${
            isSelected
              ? 'border-type-cash text-type-cash bg-type-cash-light'
              : ''
          }`}
        >
          {children}
        </Radio>
      );
    case 'online':
      return (
        <Radio
          {...rest}
          className={`p-4 text-left ${
            isSelected
              ? 'border-type-online text-type-online bg-type-online-light'
              : ''
          }`}
        >
          {children}
        </Radio>
      );
  }
}

export { PassengerTypesRadios, PaymentMethodRadios };
