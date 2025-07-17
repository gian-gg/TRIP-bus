import React from 'react';
import clsx from 'clsx';

const PushPinIcon = React.memo(
  (props: React.HTMLAttributes<HTMLSpanElement>) => {
    return <span {...props}>📍</span>;
  }
);

const BusIcon = React.memo((props: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span {...props}>🚌</span>;
});

const ClockIcon = React.memo((props: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span {...props}>⏱️</span>;
});

const PhoneIcon = React.memo((props: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span {...props}>📱</span>;
});

const GearIcon = React.memo((props: React.HTMLAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      {...props}
      className={clsx('h-6 w-6', props.className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
});

const SpinnerIcon = React.memo(
  (props: React.HTMLAttributes<HTMLOrSVGElement>) => {
    return (
      <svg
        {...props}
        className={clsx('h-6 w-6', props.className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    );
  }
);

const RefreshIcon = React.memo(
  (props: React.HTMLAttributes<HTMLOrSVGElement>) => {
    return (
      <svg
        {...props}
        className={clsx('h-6 w-6', props.className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
        <path d="M16 16h5v5" />
      </svg>
    );
  }
);

const AlertIcon = React.memo(
  (props: React.HTMLAttributes<HTMLOrSVGElement>) => {
    return (
      <svg
        {...props}
        className={clsx('h-6 w-6', props.className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.268 21a2 2 0 0 0 3.464 0" />
        <path d="M22 8c0-2.3-.8-4.3-2-6" />
        <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
        <path d="M4 2C2.8 3.7 2 5.7 2 8" />
      </svg>
    );
  }
);

const RightArrow = React.memo(
  (props: React.HTMLAttributes<HTMLOrSVGElement>) => {
    return (
      <svg
        {...props}
        className={clsx('h-6 w-6', props.className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 8L22 12L18 16" />
        <path d="M2 12H22" />
      </svg>
    );
  }
);

const CloseIcon = React.memo(
  (props: React.HTMLAttributes<HTMLOrSVGElement>) => {
    return (
      <svg
        {...props}
        className={clsx('h-6 w-6', props.className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    );
  }
);

const CircleIcon = React.memo(
  (props: React.HTMLAttributes<HTMLOrSVGElement>) => {
    return (
      <svg
        {...props}
        className={clsx('h-6 w-6', props.className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="0"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="6" />
      </svg>
    );
  }
);

const HandIcon = React.memo((props: React.HTMLAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      {...props}
      className={clsx('h-6 w-6', props.className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
      <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  );
});

const UsersIcon = React.memo(
  (props: React.HTMLAttributes<HTMLOrSVGElement>) => {
    return (
      <svg
        {...props}
        className={clsx('h-6 w-6', props.className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <path d="M16 3.128a4 4 0 0 1 0 7.744" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    );
  }
);

const DownIcon = React.memo((props: React.HTMLAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      {...props}
      className={clsx('h-6 w-6', props.className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
});

const CheckIcon = React.memo(
  (props: React.HTMLAttributes<HTMLOrSVGElement>) => {
    return (
      <svg
        {...props}
        className={clsx('h-6 w-6', props.className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  }
);

const MailCheckIcon = React.memo(
  (props: React.HTMLAttributes<HTMLOrSVGElement>) => {
    return (
      <svg
        {...props}
        className={clsx('h-6 w-6', props.className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        <path d="m16 19 2 2 4-4" />
      </svg>
    );
  }
);

export {
  PushPinIcon,
  BusIcon,
  ClockIcon,
  PhoneIcon,
  GearIcon,
  SpinnerIcon,
  RefreshIcon,
  AlertIcon,
  RightArrow,
  CloseIcon,
  CircleIcon,
  HandIcon,
  UsersIcon,
  DownIcon,
  CheckIcon,
  MailCheckIcon,
};
