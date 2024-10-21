'use client';
import React from 'react';
import { ConfigPage } from '@pages';
import { FullPageLoading, OutOfWorkingHours } from '@ui';
import { useWorkingHoursAllQuery } from '@gosi/queries/useWorkingHours';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const { data, isSuccess, isLoading } = useWorkingHoursAllQuery(); // Use the new hook
  const searchParams = useSearchParams();

  const serviceType = searchParams.get('serviceType');

  // Ensure that we render nothing until the data is loaded
  if (isLoading) {
    return <FullPageLoading />; // or a loading indicator if preferred
  }

  if (isSuccess && serviceType && !data[serviceType]) {
    return <OutOfWorkingHours />;
  }

  return <ConfigPage />;
};

export default Page;
