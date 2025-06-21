import React from 'react';

const Container = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`bg-neutral border-outline rounded-md border-1 p-4 ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Container;
