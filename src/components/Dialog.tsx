import React from 'react';
import { Dialog as HeadlessDialog, DialogPanel } from '@headlessui/react';

import type { DialogProps } from '@headlessui/react';

const Dialog = (
  props: DialogProps & {
    children?: React.ReactNode;
  }
) => {
  const { children, className, ...rest } = props;

  return (
    <HeadlessDialog {...rest}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel className={className}>{children}</DialogPanel>
        </div>
      </div>
    </HeadlessDialog>
  );
};

export default Dialog;
