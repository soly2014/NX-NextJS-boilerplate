'use client';
import * as React from 'react';
import { Button } from '@ui';
import { useTranslations } from 'next-intl';
import { SectionContainer } from '@ui';
import { useRouter } from '@navigation';

export const ThankYouPage: React.FC = async () => {
  const router = useRouter();
  const t = useTranslations(); // Use 'common' namespace for translations

  const handleHomeRedirect = () => {
    // Redirect the user back to the homepage or any other page
    router.push('/');
  };

  return (
    <SectionContainer>
      <div className="flex flex-col items-center justify-center py-10">
        <div className="max-w-md rounded-md p-6 text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            {t('thank_you')}
          </h2>
          <p className="mb-6 text-gray-700">{t('time_out_message')}</p>
          <Button
            variant="secondary"
            onClick={handleHomeRedirect}
            className="px-6 py-2 text-lg"
          >
            {t('go_home')}
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ThankYouPage;
