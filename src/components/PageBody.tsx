import React from 'react';
import clsx from 'clsx';

import type { HtmlHTMLAttributes } from 'react';

const PageBody = (
  props: HtmlHTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    className?: string;
  }
) => {
  return (
    <div
      className={clsx(
        'bg-background m-0 flex min-h-screen min-w-screen items-center justify-center p-0 sm:p-5 md:p-10',
        props.className
      )}
      {...props}
    >
      {props.children}
    </div>
  );
};

export default PageBody;
