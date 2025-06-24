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
import Dialog from '@/components/Dialog';
import { Input, Label, Field } from '@/components/Form';

import { GearIcon, SpinnerIcon } from '@/components/Icons';

import { GET, POST } from '@/lib/api';

import type { SessionResponse, GETResponse } from '@/type';

const MAX_SECONDS = 30;
const WIFI_QRCODE_DATA = 'Hello World!';

const QrCode = () => {
  const [currentBusID, setCurrentBusID] = useState(
    () => (localStorage.getItem('bus_id') as string) || ''
  );
  const [sessionURL, setSessionURL] = useState('');

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
        onRefresh();
      }, MAX_SECONDS * 1000);

      return () => clearInterval(interval);
    }
  }, [currentBusID, sessionURL, onRefresh]);

  const handleSettingsChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const busID = e.currentTarget.busID.value;

    try {
      const response = await GET('/bus/index.php/' + busID);
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
        className="text-primary fixed right-10 bottom-10 flex h-12 w-12 items-center justify-center !rounded-full !border-2 bg-white shadow-lg"
        onClick={() => setIsModalOpen(true)}
      >
        <GearIcon />
      </Button>
      <CardContainer className="w-full p-4 md:w-4/5 xl:w-1/2">
        <CardBody className="flex flex-col items-center justify-center gap-4 !px-0">
          <Container className="flex h-full w-full flex-col items-center justify-center gap-4 md:px-16 lg:gap-6">
            <h2 className="text-primary text-lg font-bold">
              Step 1: Scan WiFi QR-Code.
            </h2>
            <div className="bg-base border-outline flex h-full items-center justify-center rounded-md border-2 p-8 shadow-md sm:p-12 lg:p-14">
              {currentBusID ? (
                <QRCodeSVG
                  className="h-68 w-68 lg:h-80 lg:w-80"
                  value={WIFI_QRCODE_DATA}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                />
              ) : (
                <div className="h-68 w-68 lg:h-80 lg:w-80" />
              )}
            </div>
            <h2 className="text-primary mt-4 text-lg font-bold">
              Step 2: Scan Form QR-Code.
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
          </Container>
        </CardBody>
      </CardContainer>
    </PageBody>
  );
};

export default QrCode;
