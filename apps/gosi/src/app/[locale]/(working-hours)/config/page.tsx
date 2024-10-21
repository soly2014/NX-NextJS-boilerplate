'use client';
import React from 'react';
import { ConfigPage } from '@pages';
import { OutOfWorkingHours } from '@ui';
import { useWorkingHoursAllQuery } from '@gosi/queries/useWorkingHours';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const { data, isSuccess } = useWorkingHoursAllQuery(); // Use the new hook
  const searchParams = useSearchParams();

  const serviceType = searchParams.get('serviceType');

  if (isSuccess && serviceType && !data[serviceType]) {
    return <OutOfWorkingHours />;
  }

  return <ConfigPage />;
};

export default Page;
