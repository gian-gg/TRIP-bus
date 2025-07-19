import React from 'react';
import { CloseIcon, GearIcon } from '@/components/Icons';
import Button from '@/components/Button';
import FloatingButton from '@/components/FloatingButton';

import { CardContainer, CardHeader, CardBody } from '@/components/Card';
import Dialog from '@/components/Dialog';

const SettingsModal = React.memo(
  (props: {
    handleSettingsModalState: (arg: boolean) => void;
    settingsModalState: boolean;
    state: boolean;
    State1: React.ElementType;
    State2: React.ElementType;
    modalTitle: string;
    buttonVariant: 'float' | 'fixed';
  }) => {
    return (
      <>
        <Dialog
          open={props.settingsModalState}
          as="div"
          onClose={() => props.state && props.handleSettingsModalState(false)}
          className="w-96"
        >
          <CardContainer className="h-full w-full">
            <CardHeader className="flex items-center justify-between">
              <h1 className="text-lg font-semibold text-white">
                {props.modalTitle}
              </h1>
              {props.state && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => props.handleSettingsModalState(false)}
                >
                  <CloseIcon className="text-white" />
                </Button>
              )}
            </CardHeader>
            <CardBody>
              {props.state ? <props.State1 /> : <props.State2 />}
            </CardBody>
          </CardContainer>
        </Dialog>
        {props.state &&
          (props.buttonVariant === 'float' ? (
            <FloatingButton
              onClick={() => props.handleSettingsModalState(true)}
            >
              <GearIcon />
            </FloatingButton>
          ) : (
            <Button
              variant="glass"
              className="flex items-center gap-2 px-2"
              onClick={() => props.handleSettingsModalState(true)}
            >
              <GearIcon className="!h-4 !w-4" />{' '}
              <p className="hidden md:block md:text-sm">Settings</p>
            </Button>
          ))}
      </>
    );
  }
);

export default SettingsModal;
