import { toast } from 'sonner';

const ConfirmToast = (props: {
  handleFunc: () => void;
  label: string;
  loading: string;
}) => {
  return toast.warning('Are you Sure?', {
    action: {
      label: props.label,
      onClick: () => props.handleFunc(),
    },
    actionButtonStyle: {
      backgroundColor: '#DC7609',
      color: '#FEFCF1',
      padding: '1rem',
    },
  });
};

export default ConfirmToast;
