import {
  Input as HeadlessInput,
  Field as HeadlessField,
  Label as HeadlessLabel,
  Description as HeadlessDescription,
  RadioGroup,
  Radio as HeadlessRadio,
  Select as HeadlessSelect,
} from '@headlessui/react';
import clsx from 'clsx';

import type { RadioProps } from '@headlessui/react';

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <HeadlessSelect
      {...props}
      className="border-outline bg-base active:border-primary focus:border-primary hover:outline-primary h-full w-full cursor-pointer rounded-md border-1 p-3 px-4 text-black outline-0 outline-transparent focus:ring-0"
    />
  );
}

function Description(props: { children: React.ReactNode; className?: string }) {
  return (
    <HeadlessDescription
      className={clsx('text-muted text-xs', props.className)}
    >
      {props.children}
    </HeadlessDescription>
  );
}

function Label(props: {
  required?: boolean;
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <HeadlessLabel
      htmlFor={props.htmlFor}
      className="text-sm font-semibold text-black"
    >
      {props.children}
      <span className="text-error ml-1">{props.required ? '*' : ''}</span>
    </HeadlessLabel>
  );
}

function Field(props: { children: React.ReactNode; className?: string }) {
  return (
    <HeadlessField
      className={clsx('flex h-full w-full flex-col gap-2', props.className)}
    >
      {props.children}
    </HeadlessField>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <HeadlessInput
      {...props}
      className="border-outline bg-base active:border-primary focus:border-primary hover:outline-primary h-full w-full cursor-pointer rounded-md border-1 p-3 px-4 text-black outline-0 outline-transparent focus:ring-0"
    />
  );
}

function Radio(props: RadioProps & { children?: React.ReactNode }) {
  const { children, className, ...rest } = props;

  return (
    <HeadlessRadio
      {...rest}
      className={clsx(
        'border-outline bg-base h-full w-full cursor-pointer rounded-md border-1 p-2 text-center text-black outline-0 outline-transparent focus:ring-0',
        className
      )}
    >
      {children}
    </HeadlessRadio>
  );
}

export { Input, Label, Field, Description, RadioGroup, Radio, Select };
