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
      <div className="flex min-h-[calc(100dvh-15.2rem)] flex-col items-center justify-center px-0 py-10 lg:px-64">
        <h2 className="mb-4 text-3xl font-bold text-gray-800">
          {t('dear_customer')}
        </h2>
        <p className="mb-6 text-center text-xl text-gray-700">
          {t('time_out_message')}
        </p>
        <Button
          variant="secondary"
          size={'lg'}
          onClick={handleHomeRedirect}
          className="px-6 py-2 text-lg"
        >
          {t('go_home')}
        </Button>
      </div>
    </SectionContainer>
  );
};

export default ThankYouPage;
