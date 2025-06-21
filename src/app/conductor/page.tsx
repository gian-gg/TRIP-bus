import {
  CardContainer,
  CardHeader,
  CardBody,
  CardFooter,
} from '@/components/Card';
import PageBody from '@/components/PageBody';

const Conductor = () => {
  return (
    <PageBody>
      <CardContainer className="border-primary-light border-2">
        <CardHeader>
          <h1 className="text-center text-2xl font-bold">
            Conductor Dashboard
          </h1>
          <p className="text-primary-light text-center text-sm">
            Manage passenger details and trip information efficiently.
          </p>
        </CardHeader>
        <CardBody className="flex flex-col items-center justify-center gap-4 !px-4">
          <p>CONDUCTOR DASHBOARD PAGE</p>
        </CardBody>
        <CardFooter className="!justify-center">
          CIS2104: Information Management II
        </CardFooter>
      </CardContainer>
    </PageBody>
  );
};

export default Conductor;
