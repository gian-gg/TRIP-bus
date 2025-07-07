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
import React from 'react';

import type { RadioProps } from '@headlessui/react';

const Select = React.memo(function Select(
  props: React.SelectHTMLAttributes<HTMLSelectElement>
) {
  return (
    <HeadlessSelect
      {...props}
      className="border-outline bg-base active:border-primary focus:border-primary hover:outline-primary h-full w-full cursor-pointer rounded-md border-1 p-3 px-4 text-black outline-0 outline-transparent focus:ring-0"
    />
  );
});

const Description = React.memo(function Description(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <HeadlessDescription
      className={clsx('text-muted text-xs', props.className)}
    >
      {props.children}
    </HeadlessDescription>
  );
});

const Label = React.memo(function Label(props: {
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
});

const Field = React.memo(function Field(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <HeadlessField
      className={clsx('flex h-full w-full flex-col gap-2', props.className)}
    >
      {props.children}
    </HeadlessField>
  );
});

const Input = React.memo(function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <HeadlessInput
      {...props}
      className="border-outline bg-base active:border-primary focus:border-primary hover:outline-primary h-full w-full cursor-pointer rounded-md border-1 p-3 px-4 text-black outline-0 outline-transparent focus:ring-0"
    />
  );
});

const InputWithIcon = React.memo(function InputWithIcon(
  props: React.InputHTMLAttributes<HTMLInputElement> & {
    children?: React.ReactNode;
  }
) {
  const { children, ...rest } = props;
  return (
    <div className="border-outline bg-base flex h-full w-full items-center gap-2 rounded-md border-1 pl-4 text-black">
      {children}
      <HeadlessInput
        {...rest}
        className="active:border-primary focus:border-primary hover:outline-primary h-full w-full p-3 px-4 outline-0 outline-transparent focus:ring-0"
      />
    </div>
  );
});

const Radio = React.memo(function Radio(
  props: RadioProps & { children?: React.ReactNode }
) {
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
});

export {
  Input,
  InputWithIcon,
  Label,
  Field,
  Description,
  RadioGroup,
  Radio,
  Select,
};
