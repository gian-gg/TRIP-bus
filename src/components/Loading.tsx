import PageBody from '@/components/PageBody';
import { SpinnerIcon } from '@/components/Icons';

const Loading = () => {
  return (
    <PageBody>
      <SpinnerIcon className="text-primary h-8 w-8 animate-spin" />
    </PageBody>
  );
};

export default Loading;
