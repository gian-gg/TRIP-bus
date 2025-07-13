import React from 'react';
import clsx from 'clsx';
import Button from '@/components/Button';

import type { ButtonProps } from '@headlessui/react';

const FloatingButton = React.memo(
  (
    props: ButtonProps & {
      children: React.ReactNode;
    }
  ) => {
    const { children, className, ...rest } = props;
    return (
      <Button
        {...rest}
        variant="solid"
        className={clsx(
          'text-primary fixed bottom-10 left-10 z-10 flex h-12 w-12 items-center justify-center !rounded-full !border-2 bg-white shadow-lg',
          className
        )}
      >
        {children}
      </Button>
    );
  }
);

export default FloatingButton;
