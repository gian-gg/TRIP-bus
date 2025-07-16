import React, { useState } from 'react';
import Button from '@/components/Button';
import { AlertIcon, CloseIcon } from '@/components/Icons';
import Dialog from '@/components/Dialog';
import { CardContainer, CardBody, CardHeader } from '@/components/Card';

const alertsData = [
  {
    id: 1,
    message: 'Gian at Seat 1A has called for assistance.',
    read: false,
  },
  {
    id: 2,
    message: 'Gian at Seat 1B has requested to stop the bus.',
    read: false,
  },
  {
    id: 3,
    message: 'Gian at Seat 1C has called for assistance.',
    read: true,
  },
];

const AlertItem = ({
  alert,
  onMarkAsRead,
}: {
  alert: { id: number; message: string; read: boolean };
  onMarkAsRead?: (id: number) => void;
}) => {
  return (
    <li
      className={`flex w-full items-center justify-between rounded-md !border-1 !p-2 ${
        alert.read
          ? 'bg-secondary-light border-secondary text-yellow-600'
          : 'bg-primary-light border-primary text-primary'
      }`}
      {...(onMarkAsRead && alert.read
        ? {}
        : { onClick: () => onMarkAsRead?.(alert.id) })}
    >
      <p className="text-sm">{alert.message}</p>
      {!alert.read && (
        <Button
          variant="outline"
          className="ml-2 !px-2 !py-1 text-[10px] font-normal"
        >
          Read
        </Button>
      )}
    </li>
  );
};

const AlertsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        variant="glass"
        className="flex w-full items-center justify-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <AlertIcon className="!h-4 !w-4" />{' '}
        <p className="text-xs md:text-sm">
          Alerts ({alertsData.filter((alert) => !alert.read).length})
        </p>
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        as="div"
        className="w-[90%] lg:w-2/5"
      >
        <CardContainer>
          <CardHeader className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Alerts</h1>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon className="text-white" />
            </Button>
          </CardHeader>
          <CardBody>
            <h2 className="mb-2 text-sm font-medium">Unread Alerts:</h2>
            <ul className="flex flex-col gap-2">
              {alertsData.filter((alert) => !alert.read).length > 0 && (
                <>
                  {alertsData
                    .filter((alert) => !alert.read)
                    .map((alert, index) => (
                      <AlertItem
                        key={index}
                        alert={alert}
                        onMarkAsRead={(id) => {
                          console.log(`Marking alert ${id} as read`);
                        }}
                      />
                    ))}
                  <hr className="border-outline my-4" />
                </>
              )}
            </ul>

            {/* Read Alerts */}
            {alertsData
              .filter((alert) => alert.read)
              .map((alert, index) => (
                <AlertItem key={index} alert={alert} />
              ))}
          </CardBody>
        </CardContainer>
      </Dialog>
    </>
  );
};

export default React.memo(AlertsModal);
