'use client';
import React from 'react';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import { Alert, AlertDescription, AlertTitle } from '@ui';
import { useTranslations } from 'next-intl';

type Props = {
  children: React.ReactNode;
};

export function AlertError({ children }: Props) {
  const t = useTranslations();
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>{t('validation.Error')}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
