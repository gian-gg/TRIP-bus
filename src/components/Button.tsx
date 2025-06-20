import React from 'react';
import clsx from 'clsx';

import { Button as HeadlessButton } from '@headlessui/react';

import type { ButtonProps } from '@headlessui/react';

const Button = (
  props: ButtonProps & {
    children?: React.ReactNode;
    variant: 'solid' | 'outline' | 'glass';
  }
) => {
  const { children, variant, className, ...rest } = props;

  let variantClass = '';

  switch (variant) {
    case 'solid':
      variantClass =
        'border-primary-light bg-primary text-inverse font-semibold hover:opacity-80';
      break;
    case 'outline':
      variantClass =
        'border-outline bg-transparent text-black hover:opacity-50';
      break;
    case 'glass':
      variantClass =
        'border-[#ffffff79] text-neutral bg-[#ffffff28] backdrop-blur-md hover:opacity-70';
      break;
  }

  return (
    <HeadlessButton
      {...rest}
      className={clsx(
        'cursor-pointer rounded-md border-1 p-2 transition-opacity duration-200',
        variantClass,
        className
      )}
    >
      {children}
    </HeadlessButton>
  );
};

export default Button;
