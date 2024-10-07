import * as React from 'react';
import { Button } from '@ui';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@ui';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@ui';

import { useDeviceType } from '@hooks';
import {
  CameraIcon,
  SpeakerLoudIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from '@radix-ui/react-icons'; // Radix UI icons

import { useTranslations } from 'next-intl';

interface CamMicPermissionAlertProps {
  isOpen: boolean;
  onClose: () => void; // A callback for when the modal or drawer closes
}

export function CamMicPermissionAlert({
  isOpen,
  onClose,
}: CamMicPermissionAlertProps) {
  const [open, setOpen] = React.useState(isOpen);
  const [guideOpen, setGuideOpen] = React.useState(false);
  const deviceType = useDeviceType();
  const t = useTranslations('CamMicPermissionAlert');

  // Sync the open state with the isOpen prop
  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleGuide = () => {
    setGuideOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setGuideOpen(false);
    onClose(); // Call onClose to inform the parent component
  };

  const GuideContent = () => (
    <>
      <DialogHeader className="flex items-center justify-center space-x-2">
        <InfoCircledIcon className="mt-4 h-6 w-6 text-blue-600" />
        <DialogTitle className="text-center text-lg font-bold">
          {t('howToAllowTitle')}
        </DialogTitle>
      </DialogHeader>
      <div className="mt-4">
        <p className="text-sm text-gray-700">{t('guideMessage')}</p>
        <ul className="mt-4 list-inside list-disc text-sm text-gray-700">
          <li>{t('step1')}</li>
          <li>{t('step2')}</li>
          <li>{t('step3')}</li>
        </ul>
      </div>
      <div className="mt-6 flex justify-center">
        <Button variant="secondary" onClick={() => setGuideOpen(false)}>
          {t('ok')}
        </Button>
      </div>
    </>
  );

  if (deviceType === 'desktop') {
    return (
      <>
        <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
          <DialogContent className="p-6 sm:max-w-[400px]">
            <DialogHeader className="flex items-center justify-center space-x-2">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              <DialogTitle className="text-center">
                {t('permissionNeeded')}
              </DialogTitle>
            </DialogHeader>
            <PermissionAlert />
            <div className="mt-6 flex justify-center gap-2 space-x-2">
              <Button variant="outline" onClick={handleClose}>
                {t('deny')}
              </Button>
              <Button variant="secondary" onClick={handleGuide}>
                {t('allow')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Guide Dialog */}
        <Dialog open={guideOpen} onOpenChange={setGuideOpen}>
          <DialogContent className="rounded-lg bg-white p-6 shadow-lg sm:max-w-[500px]">
            <GuideContent />
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <Drawer open={open} onOpenChange={(val) => setOpen(val)}>
        <DrawerContent>
          <DrawerHeader className="flex flex-col items-center space-y-2">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            <h2 className="text-center text-lg font-semibold">
              {t('permissionNeeded')}
            </h2>
          </DrawerHeader>
          <PermissionAlert />
          <DrawerFooter className="flex justify-center space-x-2 pt-4">
            <DrawerClose asChild>
              <Button variant="outline" onClick={handleClose}>
                {t('deny')}
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="secondary" onClick={handleGuide}>
                {t('allow')}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Guide Drawer for mobile */}
      <Drawer open={guideOpen} onOpenChange={setGuideOpen}>
        <DrawerContent className="bg-white p-6">
          <GuideContent />
        </DrawerContent>
      </Drawer>
    </>
  );
}

function PermissionAlert() {
  const t = useTranslations('CamMicPermissionAlert');

  return (
    <div
      className="mt-4 flex flex-col items-center space-y-2 px-2 text-center"
      aria-live="polite"
    >
      <div className="flex items-center gap-2 space-x-2">
        <CameraIcon className="h-6 w-6 text-blue-500" />
        <SpeakerLoudIcon className="h-6 w-6 text-green-500" />
      </div>
      <p className="text-sm">{t('message')}</p>
    </div>
  );
}
