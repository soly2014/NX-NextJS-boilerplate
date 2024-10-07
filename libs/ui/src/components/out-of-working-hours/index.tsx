import { useTranslations } from 'next-intl';
import React from 'react';
import { SectionContainer } from '@ui';

export const OutOfWorkingHours = () => {
  const t = useTranslations();
  return (
    <SectionContainer className="bg-gray-50">
      <div className="flex min-h-[calc(100dvh-10.2rem)] flex-col items-center justify-center px-5 py-10">
        <h1 className="text-center text-4xl font-extrabold tracking-tight text-blue-900 md:text-5xl lg:text-6xl">
          {t('outside_working_hours')}
        </h1>
        <div className="mt-6 text-center text-lg text-gray-700 md:mt-8 md:text-xl lg:text-2xl">
          <p className="mb-2">{t('working_hours_intro')}</p>
          <p className="mb-1 font-normal text-gray-500">
            {t('working_hours_sunday_thursday')}
          </p>
          <p className="mb-1 font-normal text-gray-500">
            {t('working_hours_friday')}
          </p>
          <p className="font-normal text-gray-500">
            {t('working_hours_saturday')}
          </p>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500 md:text-base lg:text-lg">
          <p>{t('service_description')}</p>
          <p>{t('communication_note')}</p>
        </div>
      </div>
    </SectionContainer>
  );
};
