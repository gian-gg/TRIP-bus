import React from 'react';
import { CloseIcon, GearIcon } from '@/components/Icons';
import Button from '@/components/Button';

import { CardContainer, CardHeader, CardBody } from '@/components/Card';
import Dialog from '@/components/Dialog';

const SettingsButton = React.memo(
  (props: { handleOpenSettingsModal: (arg: boolean) => void }) => {
    return (
      <Button
        variant="solid"
        className="text-primary fixed bottom-10 left-10 flex h-12 w-12 items-center justify-center !rounded-full !border-2 bg-white shadow-lg"
        onClick={() => props.handleOpenSettingsModal(true)}
      >
        <GearIcon />
      </Button>
    );
  }
);

const SettingsModal = React.memo(
  (props: {
    handleSettingsModalState: (arg: boolean) => void;
    settingsModalState: boolean;
    state: boolean;
    State1: React.ElementType;
    State2: React.ElementType;
    modalTitle: string;
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
        {props.state && (
          <SettingsButton
            handleOpenSettingsModal={props.handleSettingsModalState}
          />
        )}
      </>
    );
  }
);

export { SettingsModal, SettingsButton };
