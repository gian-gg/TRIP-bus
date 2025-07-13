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

import { GET, POST } from '@/lib/api';

import type { SessionResponse, GETResponse } from '@/type';

const MAX_SECONDS = 30;

const QrCode = () => {
  const [currentBusID, setCurrentBusID] = useState(
    () => (localStorage.getItem('bus_id') as string) || ''
  );
  const [sessionURL, setSessionURL] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tripState, setTripState] = useState<'active' | 'inactive'>('inactive');

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
            const sessionID = nanoid(10);
            setSessionURL(
              `${import.meta.env.VITE_URL}/passenger/${sessionID}-${res.data.token}`
            );
            setTripState('active');
          } else if (res.status === 'error') {
            toast.warning('No active trip found for this bus ID.');
            setTripState('inactive');
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
    } else {
      setIsModalOpen(true);
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

  const handleSettingsChange = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const busID = e.currentTarget.busID.value;
      const wifiSSID = e.currentTarget.wifiSSID.value;
      const wifiPassword = e.currentTarget.wifiPassword.value;

      try {
        const response = await GET('/bus/index.php?id=' + busID);
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
      localStorage.setItem('wifi_ssid', wifiSSID);
      localStorage.setItem('wifi_password', wifiPassword);

      setCurrentBusID(busID);

      toast.success('Successfully saved settings: ' + busID);

      setIsModalOpen(false);
    },
    []
  );

  const handleBusSettingsReset = useCallback(() => {
    localStorage.removeItem('bus_id');
    localStorage.removeItem('wifi_password');
    localStorage.removeItem('wifi_ssid');

    setCurrentBusID('');
    setSessionURL('');
    setTripState('inactive');

    toast.success('Successfully detached bus ID.');
  }, []);

  const handleWifiSettings = useCallback((): string => {
    const wifiSSID = localStorage.getItem('wifi_ssid') || '';
    const wifiPassword = localStorage.getItem('wifi_password') || '';

    // Dynamically generate WiFi QR code data in the standard format
    return `WIFI:T:WPA;S:${wifiSSID};P:${wifiPassword};;`;
  }, []);

  return (
    <>
      <SettingsModal
        buttonVariant="float"
        modalTitle="Bus Settings"
        handleSettingsModalState={setIsModalOpen}
        settingsModalState={isModalOpen}
        state={!!currentBusID}
        State1={() => (
          <Button
            type="button"
            onClick={handleBusSettingsReset}
            variant="outline"
            className="w-full"
          >
            Reset Settings
          </Button>
        )}
        State2={() => (
          <form onSubmit={handleSettingsChange} className="flex flex-col gap-2">
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
            <Field>
              <Label htmlFor="wifiSSID" required>
                Bus WiFi SSID
              </Label>
              <Input
                id="wifiSSID"
                name="wifiSSID"
                type="text"
                placeholder="Enter Bus ID"
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
                placeholder="Enter Bus ID"
                required
              />
            </Field>

            <Button type="submit" variant="solid" className="mt-4 w-full">
              Save Bus Settings
            </Button>
          </form>
        )}
      />

      {currentBusID && (
        <PageBody>
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
                      value={handleWifiSettings()}
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
                  {tripState === 'active' ? (
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
                    <div className="flex h-68 w-68 items-center justify-center lg:h-80 lg:w-80">
                      <p>No active trips for bus ID: {currentBusID}</p>
                    </div>
                  )}
                </div>
              </Container>
            </CardBody>
          </CardContainer>
        </PageBody>
      )}
    </>
  );
};

export default QrCode;
