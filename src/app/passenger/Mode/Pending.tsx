import Buttons from '../Buttons';
import Container from '@/components/Container';

const Success = () => {
  return (
    <div className="flex flex-col">
      <Container className="mb-4 flex flex-col items-center justify-center gap-4">
        <div className="h-68 w-68 lg:h-80 lg:w-80"></div>
      </Container>
      <Buttons
        hideCallConductorButton
        additionalText="Kindly give your payment to the conductor."
      />
    </div>
  );
};

export default Success;
