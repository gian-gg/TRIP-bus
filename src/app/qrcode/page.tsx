import { QRCodeSVG } from 'qrcode.react';
import { CardContainer, CardHeader, CardBody } from '@/components/Card';
import PageBody from '@/components/PageBody';
import Container from '@/components/Container';
import Callout from '@/components/Callout';

import { ClockIcon, PhoneIcon } from '@/components/Icons';

const QrCode = () => {
  return (
    <PageBody>
      <CardContainer className="m-4 w-full p-4 md:w-4/5 xl:w-1/2">
        <CardHeader className="flex items-start justify-between rounded-b-md !p-4">
          <div>
            <p className="text-primary-light text-sm font-bold">CURRENT STOP</p>
            <h1 className="text-2xl font-bold">Lorem Station</h1>
            <p className="text-primary-light text-xs">
              <ClockIcon className="text-md" /> Thursday, May 15, 2025 at
              2:30:58 PM
            </p>
          </div>
          <p className="rounded-md bg-white/10 p-2 text-sm">
            Will reload in 30s
          </p>
        </CardHeader>
        <CardBody className="flex flex-col items-center justify-center gap-4 !px-4">
          <Container className="flex h-full w-full flex-col items-center justify-center gap-4 md:px-16 lg:gap-6">
            <h2 className="text-primary text-xl font-bold">
              Your Trip QR Code
            </h2>
            <div className="bg-base border-outline flex h-full items-center justify-center rounded-md border-2 p-8 shadow-md sm:p-12 lg:p-14">
              <QRCodeSVG
                className="h-68 w-68 lg:h-80 lg:w-80"
                value="http://trip.dcism.org/passenger" // temporary link
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
              />
            </div>
            <p className="md:text-md text-sm text-black/80">
              Scan this QR code to enter trip details.
            </p>
          </Container>
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
        </CardBody>
      </CardContainer>
    </PageBody>
  );
};

export default QrCode;
