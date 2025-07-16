import React, { useState, useEffect, useCallback } from 'react';
import Button from '@/components/Button';
import { AlertIcon, CloseIcon } from '@/components/Icons';
import Dialog from '@/components/Dialog';
import { CardContainer, CardBody, CardHeader } from '@/components/Card';

import { GET, PUT } from '@/lib/api';
import { type GETResponse } from '@/type';

import { type AlertType } from '../type';

const AlertItem = ({
  alert,
  onMarkAsRead,
}: {
  alert: AlertType;
  onMarkAsRead?: (id: number) => void;
}) => {
  return (
    <li
      className={`flex w-full items-center justify-between rounded-md !border-1 !p-2 ${
        alert.has_read
          ? 'bg-secondary-light border-secondary text-yellow-600'
          : 'bg-primary-light border-primary text-primary'
      }`}
      {...(onMarkAsRead && alert.has_read
        ? {}
        : { onClick: () => onMarkAsRead?.(alert.id) })}
    >
      <p className="text-sm">{alert.message}</p>
      {!alert.has_read && (
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

const AlertsModal = (props: {
  currentData: { busID: string; tripID: string };
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertsData, setAlertsData] = useState<AlertType[] | null>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await GET(
          `/alert/index.php?bus_id=${props.currentData.busID}&trip_id=${props.currentData.tripID}`
        );
        const res = response as GETResponse;

        if (res.status !== 'success') {
          throw new Error(res.message);
        }

        setAlertsData(res.data as AlertType[]);
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : 'Unknown error'
        );
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [props.currentData.busID, props.currentData.tripID]);

  const markAlertAsRead = useCallback(async (id: number) => {
    try {
      const response = await PUT(`/alert/index.php?id=${id}`);
      const res = response as GETResponse;

      if (res.status !== 'success') {
        throw new Error(res.message);
      }

      setAlertsData((prev) =>
        prev
          ? prev.map((alert) =>
              alert.id === id ? { ...alert, has_read: true } : alert
            )
          : null
      );
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Unknown error');
    }
  }, []);

  return (
    <>
      <Button
        variant="glass"
        className="flex w-full items-center justify-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <AlertIcon className="!h-4 !w-4" />{' '}
        <p className="text-xs md:text-sm">
          Alerts ({alertsData?.filter((alert) => !alert.has_read).length || 0})
        </p>
      </Button>
      {alertsData && (
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
                {alertsData.filter((alert) => !alert.has_read).length > 0 && (
                  <>
                    {alertsData
                      .filter((alert) => !alert.has_read)
                      .map((alert, index) => (
                        <AlertItem
                          key={index}
                          alert={alert}
                          onMarkAsRead={async (id) => {
                            await markAlertAsRead(id);
                          }}
                        />
                      ))}
                    <hr className="border-outline my-4" />
                  </>
                )}
              </ul>

              {/* Read Alerts */}
              <ul className="flex flex-col gap-2">
                {alertsData
                  .filter((alert) => alert.has_read)
                  .map((alert, index) => (
                    <AlertItem key={index} alert={alert} />
                  ))}
              </ul>
            </CardBody>
          </CardContainer>
        </Dialog>
      )}
    </>
  );
};

export default React.memo(AlertsModal);
