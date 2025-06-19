import React from 'react';

import { Button as HeadlessButton } from '@headlessui/react';

const Button = (props: {
  label: string;
  variant: 'solid' | 'outline' | 'glass';
  style?: React.CSSProperties;
  className?: string;
}) => {
  let variantClass = '';

  switch (props.variant) {
    case 'solid':
      variantClass =
        'border-primary-light bg-primary text-inverse font-semibold hover:opacity-80';
      break;
    case 'outline':
      variantClass =
        'border-neutral bg-transparent text-black hover:opacity-50';
      break;
    case 'glass':
      variantClass =
        'border-[#ffffff79] text-neutral bg-[#ffffff28] backdrop-blur-md hover:opacity-70';
      break;
  }

  return (
    <HeadlessButton
      className={`${props.className} cursor-pointer rounded-md border-1 p-2 transition-opacity duration-200 ${variantClass}`}
      style={props.style}
    >
      {props.label}
    </HeadlessButton>
  );
};

export default Button;
