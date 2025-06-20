import {
  Input as HeadlessInput,
  Field as HeadlessField,
  Label as HeadlessLabel,
} from '@headlessui/react';

function Label(props: { required?: boolean; label: string }) {
  return (
    <HeadlessLabel className="text-sm text-black">
      {props.label}
      <span className="ml-1 text-red-700">{props.required ? '*' : ''}</span>
    </HeadlessLabel>
  );
}

function Field(props: { children: React.ReactNode }) {
  return (
    <HeadlessField className="flex h-full w-full flex-col gap-2">
      {props.children}
    </HeadlessField>
  );
}

function Input() {
  return (
    <HeadlessInput
      name="full_name"
      type="text"
      className="border-outline bg-base active:border-primary focus:border-primary hover:outline-primary h-full w-full cursor-pointer rounded-md border-1 p-2 text-black outline-0 outline-transparent focus:ring-0"
    />
  );
}

export { Input, Label, Field };
