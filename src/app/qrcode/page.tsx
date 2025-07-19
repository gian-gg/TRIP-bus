import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';
import { nanoid } from 'nanoid';
import { CardContainer, CardBody } from '@/components/Card';
import Button from '@/components/Button';
import PageBody from '@/components/PageBody';
import Container from '@/components/Container';
import { Input, Label, Field } from '@/components/Form';
import SettingsModal from '@/components/Settings';

import { SpinnerIcon } from '@/components/Icons';

import APICall from '@/lib/api';

const MAX_SECONDS = 30;

const QrCode = () => {
  const [startTrip, setStartTrip] = useState(false);
  const [sessionURL, setSessionURL] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [wifiSettings, setWifiSettings] = useState({
    ssid: localStorage.getItem('wifi_ssid') || '',
    password: localStorage.getItem('wifi_password') || '',
  });

  const onRefresh = useCallback(async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        await APICall<{ token: string }>({
          type: 'POST',
          url: '/session/index.php',
          body: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          consoleLabel: 'Create Session',
          success: (data) => {
            const sessionID = nanoid(10);
            setSessionURL(
              `${import.meta.env.VITE_URL}/passenger/${sessionID}-${data.token}`
            );
            setStartTrip(true);
          },
          error: (error) => {
            setStartTrip(false);
            throw new Error(
              error instanceof Error ? error.message : 'Unknown error'
            );
          },
        });
      },
      (error) => {
        throw new Error(
          error instanceof Error ? error.message : 'Geolocation not available'
        );
      }
    );
  }, []);

  const handleSettings = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const wifiSSID = e.currentTarget.wifiSSID.value;
      const wifiPassword = e.currentTarget.wifiPassword.value;

      localStorage.setItem('wifi_ssid', wifiSSID);
      localStorage.setItem('wifi_password', wifiPassword);

      setWifiSettings({
        ssid: wifiSSID,
        password: wifiPassword,
      });

      toast.success('Successfully saved settings');
      setIsModalOpen(false);
    },
    [setWifiSettings]
  );

  const handleSettingsReset = useCallback(() => {
    localStorage.removeItem('qr_trip_id');
    localStorage.removeItem('wifi_password');
    localStorage.removeItem('wifi_ssid');

    setStartTrip(false);
    setSessionURL('');

    setWifiSettings({
      ssid: '',
      password: '',
    });

    toast.success('Settings reset successfully');
  }, []);

  const wifiQR = useCallback((): string => {
    const wifiSSID = localStorage.getItem('wifi_ssid') || '';
    const wifiPassword = localStorage.getItem('wifi_password') || '';

    // Dynamically generate WiFi QR code data in the standard format
    return `WIFI:T:WPA;S:${wifiSSID};P:${wifiPassword};;`;
  }, []);

  useEffect(() => {
    if (wifiSettings.ssid && wifiSettings.password) {
      onRefresh();
    } else {
      setIsModalOpen(true);
    }
  }, [onRefresh, setIsModalOpen, wifiSettings]);

  useEffect(() => {
    const interval = setInterval(() => {
      onRefresh();
    }, MAX_SECONDS * 1000);

    return () => clearInterval(interval);
  }, [sessionURL, onRefresh]);

  return (
    <>
      <SettingsModal
        buttonVariant="float"
        modalTitle="Bus Settings"
        handleSettingsModalState={setIsModalOpen}
        settingsModalState={isModalOpen}
        state={wifiSettings.ssid && wifiSettings.password ? true : false}
        State1={() => (
          <Button
            type="button"
            onClick={handleSettingsReset}
            variant="solid"
            className="!bg-error w-full"
          >
            Reset Settings
          </Button>
        )}
        State2={() => (
          <form onSubmit={handleSettings} className="flex flex-col gap-2">
            <Field>
              <Label htmlFor="wifiSSID" required>
                Bus WiFi SSID
              </Label>
              <Input
                id="wifiSSID"
                name="wifiSSID"
                type="text"
                placeholder="Enter WiFi SSID"
                required
              />
            </Field>
            <Field>
              <Label htmlFor="wifiPassword" required>
                Bus WiFi Password
              </Label>
              <Input
                id="wifiPassword"
                name="wifiPassword"
                type="text"
                placeholder="Enter WiFi Password"
                required
              />
            </Field>

            <Button type="submit" variant="solid" className="mt-4 w-full">
              Save Bus Settings
            </Button>
          </form>
        )}
      />

      {startTrip ? (
        <PageBody>
          <CardContainer className="w-full p-4 md:w-4/5 xl:w-1/2">
            <CardBody className="flex flex-col items-center justify-center gap-4 !px-0">
              <Container className="flex h-full w-full flex-col items-center justify-center gap-4 md:px-16 lg:gap-6">
                <h2 className="text-primary text-lg font-bold">
                  Step 1: Scan WiFi QR-Code.
                </h2>
                <div className="bg-base border-outline flex h-full items-center justify-center rounded-md border-2 p-8 shadow-md sm:p-12 lg:p-14">
                  {startTrip ? (
                    <QRCodeSVG
                      className="h-68 w-68 lg:h-80 lg:w-80"
                      value={wifiQR()}
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
                  {sessionURL ? (
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
                  )}
                </div>
              </Container>
            </CardBody>
          </CardContainer>
        </PageBody>
      ) : (
        <PageBody>
          <h1 className="text-primary text-lg font-bold">
            No Active Trip Found.
          </h1>
        </PageBody>
      )}
    </>
  );
};

export default QrCode;
