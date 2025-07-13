import React, { useState } from 'react';
import Button from '@/components/Button';
import { UsersIcon, CloseIcon } from '@/components/Icons';
import Dialog from '@/components/Dialog';
import { CardContainer, CardBody, CardHeader } from '@/components/Card';

const DepartingPassengersModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        variant="glass"
        className="flex flex-1 items-center justify-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <UsersIcon className="!h-4 !w-4" />{' '}
        <p className="text-xs md:text-sm">Departing Passengers (5)</p>
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        as="div"
        className="w-[90%] lg:w-2/5"
      >
        <CardContainer>
          <CardHeader className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Departing Passengers (5)</h1>
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

export default React.memo(DepartingPassengersModal);
