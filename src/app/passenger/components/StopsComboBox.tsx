import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { CheckIcon, DownIcon } from '@/components/Icons';
import clsx from 'clsx';
import { useState } from 'react';
import type { StopType } from '@/type';

function ComboBox(props: {
  data: StopType[];
  selected: {
    value: StopType | null;
    set: React.Dispatch<React.SetStateAction<StopType | null>>;
  };
}) {
  const [query, setQuery] = useState('');

  const filteredStops =
    query === ''
      ? props.data
      : props.data.filter((stop) => {
          return stop.stop_name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="w-full">
      <Combobox
        value={props.selected.value}
        onChange={(value) => props.selected.set(value)}
        onClose={() => setQuery('')}
      >
        <div className="relative">
          <ComboboxInput
            className="border-outline bg-base active:border-primary focus:border-primary hover:outline-primary h-full w-full cursor-pointer rounded-md border-1 p-3 px-4 text-black outline-0 outline-transparent focus:ring-0"
            displayValue={(stop: StopType | null) => stop?.stop_name ?? ''}
            placeholder="Enter destination"
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <DownIcon className="size-4 fill-white/60 group-data-hover:fill-white" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            'w-(--input-width) [--anchor-gap:--spacing(1)] empty:invisible',
            'transition duration-100 ease-in data-leave:data-closed:opacity-0',
            'border-outline rounded-md border bg-[#E7E6E6]/90 p-1 shadow-lg backdrop-blur-lg'
          )}
        >
          {filteredStops.map((stop) => (
            <ComboboxOption
              key={stop.stop_id}
              value={stop}
              className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
            >
              <CheckIcon className="text-primary invisible size-4 group-data-selected:visible" />
              <div className="text-sm/6 text-black">{stop.stop_name}</div>
            </ComboboxOption>
          ))}
          {filteredStops.length === 0 && (
            <ComboboxOption
              value={null}
              className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
            >
              <div className="text-sm/6 text-black">No destinations found.</div>
            </ComboboxOption>
          )}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}

export default ComboBox;
