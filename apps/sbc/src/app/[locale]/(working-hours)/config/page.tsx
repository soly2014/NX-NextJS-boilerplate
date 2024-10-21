/* eslint-disable @nx/enforce-module-boundaries */
import React from 'react';
import { ConfigPage } from '@pages';
import { OutOfWorkingHours } from '@ui';
import { useWorkingHoursAllQuery } from '@sbc/queries/useWorkingHours';

const Page = () => {
  const { data } = useWorkingHoursAllQuery(); // Use the new hook

  // get the serviceName from params
  // check if this service type is available or not

  // Destructure the new API response
  const gosiPublic = data?.['gosi-public'];
  const newGosi = data?.['new-gosi'];

  if (!gosiPublic && !newGosi) {
    return <OutOfWorkingHours />;
  }

  return <ConfigPage />;
};

export default Page;
