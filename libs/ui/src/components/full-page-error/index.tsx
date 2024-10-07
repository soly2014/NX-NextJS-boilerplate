'use client';
import React from 'react';
import { Button } from '@ui';
import { Link } from '@navigation';
import { useTranslations } from 'next-intl';
import {
  ExclamationTriangleIcon,
  HomeIcon,
  ReloadIcon,
} from '@radix-ui/react-icons';

export function FullPageError() {
  const t = useTranslations('Error');

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 md:py-16">
      <div className="space-y-4 text-center">
        <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="text-4xl font-bold text-gray-800">{t('title')}</h1>
        <p className="text-lg text-gray-600">{t('message')}</p>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">{t('description')}</p>
          <p className="text-sm text-gray-500">{t('suggestion')}</p>
        </div>
        <div className="mt-6 flex flex-col justify-center gap-3 space-x-4 md:flex-row">
          <Link href={'/'}>
            <Button
              variant="outline"
              className="flex w-full items-center gap-2 space-x-2 bg-white md:w-auto"
            >
              <HomeIcon className="h-5 w-5" />
              <span className="mx-2">{t('button')}</span>
            </Button>
          </Link>
          <Button
            variant="outline"
            className="flex w-full items-center gap-2 space-x-2 bg-white md:w-auto"
            onClick={() => window.location.reload()}
          >
            <ReloadIcon className="h-5 w-5" />
            <span className="mx-2">{t('refresh')}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
