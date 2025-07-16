import React, { useState } from 'react';
import Button from '@/components/Button';
import { AlertIcon, CloseIcon } from '@/components/Icons';
import Dialog from '@/components/Dialog';
import { CardContainer, CardBody, CardHeader } from '@/components/Card';

const AlertsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        variant="glass"
        className="flex w-full items-center justify-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <AlertIcon className="!h-4 !w-4" />{' '}
        <p className="text-xs md:text-sm">Alerts (2)</p>
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        as="div"
        className="w-[90%] lg:w-2/5"
      >
        <CardContainer>
          <CardHeader className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Alerts</h1>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon className="text-white" />
            </Button>
          </CardHeader>
          <CardBody>
            <ul>
              <li>Aryan</li>
              <li>Bryan</li>
              <li>Cryan</li>
              <li>Dryan</li>
              <li>Eryan</li>
            </ul>
          </CardBody>
        </CardContainer>
      </Dialog>
    </>
  );
};

export default React.memo(AlertsModal);
