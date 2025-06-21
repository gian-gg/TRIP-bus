import { Link } from 'react-router-dom';

import {
  CardContainer,
  CardHeader,
  CardBody,
  CardFooter,
} from '@/components/Card';
import Button from '@/components/Button';
import PageBody from '@/components/PageBody';

const NotFound = () => {
  return (
    <PageBody>
      <CardContainer className="border-primary-light border-2">
        <CardHeader className="!bg-error">
          <h1 className="text-center text-2xl font-bold">Error 404</h1>
          <p className="text-primary-light text-center text-sm">
            Request Resource Not Found
          </p>
        </CardHeader>
        <CardBody className="flex flex-col items-center justify-center gap-4 !px-4">
          <Link to="/" className="w-full">
            <Button variant="solid" className="!bg-error w-full">
              Go to Home
            </Button>
          </Link>
        </CardBody>
        <CardFooter className="!justify-center">
          CIS2104: Information Management II
        </CardFooter>
      </CardContainer>
    </PageBody>
  );
};

export default NotFound;
