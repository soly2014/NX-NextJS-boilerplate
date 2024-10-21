'use client';
import Image from 'next/image';
import UserDetails from '@sbc/components/user-details';
import {
  FullPageError,
  FullPageLoading,
  OutOfWorkingHours,
  SectionContainer,
} from '@ui';
import { useWorkingHoursAllQuery } from '@sbc/queries/useWorkingHours';
import { useTranslations } from 'next-intl';

export default function PageContent() {
  const t = useTranslations();
  const { data, isLoading, isError, isFetching } = useWorkingHoursAllQuery(); // Use the new hook

  // Destructure the new API response
  const gosiPublic = data?.['gosi-public'];
  const newGosi = data?.['new-gosi'];
  console.log(isLoading, 'isError', isFetching);
  if (isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageError />;
  }

  if (!gosiPublic && !newGosi) {
    return <OutOfWorkingHours />;
  }

  return (
    <SectionContainer className="bg-[#E5E7EA]">
      <div className="mx-auto flex flex-col flex-wrap justify-between py-8 md:flex-row md:py-16">
        <div className="w-full px-0 md:pe-24 lg:w-1/2">
          <h2 className="mb-4 text-2xl font-bold text-primary md:text-3xl">
            {t('virtual_head')}
          </h2>
          <p className="mb-4 text-base text-gray-700">
            {t('service_virtual_visit')}
          </p>

          <Image
            src="/hero.svg"
            alt="Virtual Visit"
            className="mx-auto mt-4 block md:hidden"
            width={285}
            height={288}
            loading="eager"
          />
          <Image
            src="/hero-desktop.svg"
            alt="Virtual Visit"
            className="mx-auto mt-20 hidden md:block"
            width={463}
            height={325}
            loading="eager"
          />
        </div>

        <div className="w-full lg:w-[44%]">
          <h2 className="mb-4 mt-8 text-2xl font-bold text-primary md:mt-0 md:text-3xl">
            {t('start_from_here')}
          </h2>
          <UserDetails />
        </div>
      </div>
    </SectionContainer>
  );
}
