import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import {
  CardContainer,
  CardHeader,
  CardBody,
  CardFooter,
} from '@/components/Card';
import Button from '@/components/Button';
import PageBody from '@/components/PageBody';

import APICall from '@/lib/api';

const Home = () => {
  const handleConnectionTest = async () => {
    const start = performance.now();
    let ping;
    await APICall({
      type: 'GET',
      url: '/stop/index.php?id=1',
      consoleLabel: 'Connection Test',
      success: () => (ping = Math.round(performance.now() - start)),
      error: (error) => {
        throw new Error(
          error instanceof Error ? error.message : 'Unknown error'
        );
      },
    });
    return ping;
  };

  return (
    <PageBody>
      <div className="mx-auto max-w-3xl space-y-4 px-3 py-6 sm:space-y-6 sm:px-4 sm:py-8">
        <header className="text-center">
          <h1 className="text-2xl font-extrabold sm:text-3xl md:text-4xl">
            TRIP
          </h1>
          <p className="text-primary mt-1 text-sm sm:mt-2">
            Transit Routing & Integrated Payments
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:mt-4 sm:text-sm">
            An integrated transit ticketing and routing system. Explore the
            interfaces below or scan QR codes for seamless passenger boarding.
          </p>
        </header>

        <CardContainer className="p-0">
          <CardHeader>
            <h2 className="text-lg font-semibold">Explore Demo</h2>
            <p className="text-primary-light mt-1 text-xs">
              Try the main interfaces of the TRIP system
            </p>
          </CardHeader>
          <CardBody className="flex flex-col gap-3 p-0 sm:gap-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <Link to="/qrcode" className="group">
                <div className="hover:border-primary-light flex flex-col items-center gap-2 rounded-lg border-2 border-slate-200 p-4 transition-all hover:shadow-md sm:p-6">
                  <div className="text-3xl sm:text-4xl">📱</div>
                  <h3 className="text-sm font-semibold sm:text-base">
                    QR Code Interface
                  </h3>
                  <p className="text-center text-xs text-slate-500">
                    Passenger boarding flow
                  </p>
                </div>
              </Link>
              <Link to="/conductor" className="group">
                <div className="hover:border-primary-light flex flex-col items-center gap-2 rounded-lg border-2 border-slate-200 p-4 transition-all hover:shadow-md sm:p-6">
                  <div className="text-3xl sm:text-4xl">🚌</div>
                  <h3 className="text-sm font-semibold sm:text-base">
                    Conductor Dashboard
                  </h3>
                  <p className="text-center text-xs text-slate-500">
                    Manage seats and trips
                  </p>
                </div>
              </Link>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                toast.promise(handleConnectionTest, {
                  loading: 'Checking backend...',
                  success: (ping) => `Backend reachable — ping ${ping} ms`,
                  error: (err) => err.message,
                });
              }}
            >
              Test Backend Connection
            </Button>
          </CardBody>
          <CardFooter className="!flex-col !items-center !gap-2 sm:!flex-row sm:!justify-between">
            <span className="text-xs sm:text-sm">
              CIS2104: Information Management II
            </span>
            <a
              href="https://trip.dcism.org"
              target="_blank"
              rel="noreferrer"
              className="text-primary text-xs underline sm:text-sm"
            >
              Visit trip.dcism.org
            </a>
          </CardFooter>
        </CardContainer>

        <section>
          <h3 className="text-lg font-semibold">About TRIP</h3>
          <p className="mt-2 text-sm text-slate-600">
            TRIP is a transit routing and integrated payments system designed to
            modernize public transportation. It combines QR-based boarding,
            real-time conductor oversight, and passenger action alerts to create
            a seamless transit experience.
          </p>
        </section>

        <section className="rounded border-l-4 border-yellow-400 bg-yellow-50 p-4">
          <h4 className="font-semibold">Disclaimer</h4>
          <p className="mt-1 text-sm text-slate-700">
            This deployment is a showcase for academic purposes only. The
            project is intended to be deployed locally per bus or vehicle for
            testing and demonstration. Do not rely on this instance for live
            operations or production use. For full documentation and official
            project information, visit{' '}
            <a
              href="https://trip.dcism.org"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline"
            >
              trip.dcism.org
            </a>
            .
          </p>
        </section>

        <section>
          <h4 className="mb-3 font-semibold sm:mb-4 sm:text-lg">
            Main Features
          </h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
              <div className="mb-1 text-xl sm:mb-2 sm:text-2xl">📍</div>
              <h5 className="text-sm font-semibold text-slate-900 sm:text-base">
                Dynamic Form QR-Code
              </h5>
              <p className="mt-1 text-sm text-slate-600">
                A QR code that embeds the current location of the bus and
                automatically inputs it to prevent fare evasion.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
              <div className="mb-1 text-xl sm:mb-2 sm:text-2xl">📝</div>
              <h5 className="text-sm font-semibold text-slate-900 sm:text-base">
                Passenger Form
              </h5>
              <p className="mt-1 text-sm text-slate-600">
                Enables passengers to easily input trip details with consistent
                and accurate fare calculation.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
              <div className="mb-1 text-xl sm:mb-2 sm:text-2xl">🔔</div>
              <h5 className="text-sm font-semibold text-slate-900 sm:text-base">
                Bus Actions & Alerts
              </h5>
              <p className="mt-1 text-sm text-slate-600">
                Real-time conductor alerts and bus stop requests with just a
                click of a button.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
              <div className="mb-1 text-xl sm:mb-2 sm:text-2xl">💺</div>
              <h5 className="text-sm font-semibold text-slate-900 sm:text-base">
                Conductor Dashboard
              </h5>
              <p className="mt-1 text-sm text-slate-600">
                Seat-plan-based arrangement to display passengers, allowing easy
                supervision and monitoring.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:col-span-2 sm:p-4">
              <div className="mb-1 text-xl sm:mb-2 sm:text-2xl">📶</div>
              <h5 className="text-sm font-semibold text-slate-900 sm:text-base">
                Local Connection
              </h5>
              <p className="mt-1 text-sm text-slate-600">
                Designed for local connectivity, allowing seamless access to all
                features even without an internet connection.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageBody>
  );
};

export default Home;
