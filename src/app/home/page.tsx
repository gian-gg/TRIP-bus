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

import { Fetch } from '@/lib/api';

const Home = () => {
  const handleConnectionTest = async () => {
    try {
      const response = await Fetch.get('/test.php');
      if (response.status === 200) {
        toast.success('Backend connection successful!');
      } else {
        toast.error('Failed to connect to the backend.');
      }
    } catch (error) {
      toast.error('Error connecting to the backend.');
    }
  };

  return (
    <PageBody>
      <CardContainer className="border-primary-light border-2">
        <CardHeader>
          <h1 className="text-center text-2xl font-bold">TRIP</h1>
          <p className="text-primary-light text-center text-sm">
            Transit Routing & Integrated Payments
          </p>
        </CardHeader>
        <CardBody className="flex flex-col items-center justify-center gap-4 !px-4">
          <Link to="/qrcode" className="w-full">
            <Button variant="outline" className="w-full">
              QR Code
            </Button>
          </Link>
          <Link to="/passenger" className="w-full">
            <Button variant="outline" className="w-full">
              Passenger Form
            </Button>
          </Link>
          <Link to="/conductor" className="w-full">
            <Button variant="outline" className="w-full">
              Conductor Dashboard
            </Button>
          </Link>
          <Link to="/operator" className="w-full">
            <Button variant="outline" className="w-full">
              Operator Dashboard
            </Button>
          </Link>
          <Link to="/404" className="w-full">
            <Button variant="outline" className="w-full">
              404 Page
            </Button>
          </Link>

          <Button
            variant="solid"
            className="w-full"
            onClick={handleConnectionTest}
          >
            Backend Connection Test
          </Button>
        </CardBody>
        <CardFooter className="!justify-center">
          CIS2104: Information Management II
        </CardFooter>
      </CardContainer>
    </PageBody>
  );
};

export default Home;
