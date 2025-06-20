import React from 'react';

const PushPinIcon = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <span {...props}>📍</span>;
};

const BusIcon = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <span {...props}>🚌</span>;
};

export { PushPinIcon, BusIcon };
