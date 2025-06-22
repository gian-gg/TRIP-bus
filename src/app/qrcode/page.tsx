import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';
import {
  CardContainer,
  CardHeader,
  CardBody,
  CardFooter,
} from '@/components/Card';
import Button from '@/components/Button';
import PageBody from '@/components/PageBody';
import Container from '@/components/Container';
import Callout from '@/components/Callout';
import Dialog from '@/components/Dialog';
import { Input, Label, Field } from '@/components/Form';

import {
  ClockIcon,
  PhoneIcon,
  GearIcon,
  SpinnerIcon,
} from '@/components/Icons';

import { GET, POST } from '@/lib/api';
import { getCurrentTimeDate } from '@/lib/misc';

import type { SessionResponse, GETResponse } from '@/type';

const MAX_SECONDS = 30;

const QrCode = () => {
  const [seconds, setSeconds] = useState(MAX_SECONDS);

  const [currentBusID, setCurrentBusID] = useState(
    () => (localStorage.getItem('bus_id') as string) || ''
  );
  const [sessionURL, setSessionURL] = useState('');
  const [currentStop, setCurrentStop] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onRefresh = useCallback(async () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        POST('/session/', {
          bus_id: currentBusID,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }).then((response) => {
          const res = response as SessionResponse;
          if (res.status === 'success') {
            setSessionURL(`http://trip.dcism.org/passenger/${res.token}`);
            setCurrentStop(res.stop_name);
          } else {
            toast.info('Failed to generate QR code session.');
          }
        });
      },
      (error) => {
        console.error('Error getting location:', error.message);
      }
    );
  }, [currentBusID]);

  useEffect(() => {
    if (currentBusID) {
      onRefresh();
    }
  }, [currentBusID, onRefresh]);

  useEffect(() => {
    if (currentBusID) {
      const interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            onRefresh();
            return MAX_SECONDS;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentBusID, sessionURL, onRefresh]);

  const handleSettingsChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const busID = e.currentTarget.busID.value;

    try {
      const response = await GET('/bus/' + busID);
      const res = response as GETResponse;

      if (res.status !== 'success') {
        toast.error('Invalid Bus ID');
        return;
      }
    } catch (error) {
      toast.error(
        'Invalid Bus ID: ' +
          (error instanceof Error ? error.message : 'Unknown error')
      );
      return;
    }

    localStorage.setItem('bus_id', busID);
    setCurrentBusID(busID);
    toast.success('Successfully linked to bus ID: ' + busID);

    setIsModalOpen(false);
  };

  return (
    <PageBody>
      <Dialog
        open={isModalOpen}
        as="div"
        onClose={() => setIsModalOpen(false)}
        className="w-96"
      >
        <CardContainer className="h-full w-full">
          <CardHeader>
            <h1 className="text-lg font-semibold text-white">Settings</h1>
          </CardHeader>
          <form onSubmit={handleSettingsChange}>
            <CardBody>
              <Field>
                <Label htmlFor="busID" required>
                  Bus ID
                </Label>
                <Input
                  id="busID"
                  name="busID"
                  type="text"
                  placeholder="Enter Bus ID"
                  required
                />
              </Field>
            </CardBody>
            <CardFooter className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="px-4"
              >
                Close
              </Button>
              <Button
                type="submit"
                variant="solid"
                className="!bg-primary px-4"
              >
                Save
              </Button>
            </CardFooter>
          </form>
        </CardContainer>
      </Dialog>
      <Button
        variant="solid"
        className="text-primary absolute right-10 bottom-10 flex h-12 w-12 items-center justify-center !rounded-full !border-2 bg-white shadow-lg"
        onClick={() => setIsModalOpen(true)}
      >
        <GearIcon />
      </Button>
      <CardContainer className="m-4 w-full p-4 md:w-4/5 xl:w-1/2">
        <CardHeader className="flex items-start justify-between rounded-b-md !p-4">
          {currentBusID && currentStop ? (
            <>
              <div>
                <p className="text-primary-light text-sm font-bold">
                  CURRENT STOP
                </p>
                <h1 className="text-2xl font-bold">{currentStop}</h1>
                <p className="text-primary-light flex items-center gap-1 text-xs">
                  <ClockIcon className="text-md" /> {getCurrentTimeDate()}
                </p>
              </div>
              <p className="rounded-md bg-white/10 p-2 text-xs sm:text-sm">
                Reloads in {seconds}s
              </p>
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <h1 className="text-center text-xl font-bold">TRIP QR Code</h1>
              <p className="text-primary-light text-center text-sm">
                QR-Code Generator for Bus Passengers
              </p>
            </div>
          )}
        </CardHeader>
        <CardBody className="flex flex-col items-center justify-center gap-4 !px-0">
          <Container className="flex h-full w-full flex-col items-center justify-center gap-4 md:px-16 lg:gap-6">
            <h2 className="text-primary text-xl font-bold">
              {currentBusID
                ? ' Your Trip QR Code'
                : 'Not yet connected to a bus.'}
            </h2>
            <div className="bg-base border-outline flex h-full items-center justify-center rounded-md border-2 p-8 shadow-md sm:p-12 lg:p-14">
              {currentBusID ? (
                sessionURL ? (
                  <QRCodeSVG
                    className="h-68 w-68 lg:h-80 lg:w-80"
                    value={sessionURL}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="H"
                  />
                ) : (
                  <div className="flex h-68 w-68 items-center justify-center lg:h-80 lg:w-80">
                    <SpinnerIcon className="text-primary animate-spin text-9xl" />
                  </div>
                )
              ) : (
                <div className="h-68 w-68 lg:h-80 lg:w-80" />
              )}
            </div>
            <p className="md:text-md text-center text-sm text-black/80">
              {currentBusID
                ? 'Scan this QR code to enter trip details.'
                : 'Input Bus ID to generate a QR code.'}
            </p>
          </Container>
          {currentBusID && (
            <Callout
              className="flex w-full items-center justify-start gap-6 px-10 py-4"
              mode="secondary"
            >
              <PhoneIcon className="text-xl" />
              <div className="flex flex-col">
                <p className="text-md md:text-lg">
                  <span className="font-medium">
                    Use mobile data or bus Wi-Fi
                  </span>
                  . <i>Bus Wi-Fi available for cash payments only.</i>
                </p>
              </div>
            </Callout>
          )}
        </CardBody>
      </CardContainer>
    </PageBody>
  );
};

export default QrCode;
