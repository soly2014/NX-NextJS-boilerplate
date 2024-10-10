'use client';
import Image from 'next/image';
import UserDetails from '@sbc/components/user-details';
import {
  FullPageError,
  FullPageLoading,
  OutOfWorkingHours,
  SectionContainer,
} from '@ui';
import { useWorkingHoursQueries } from '@sbc/queries/useWorkingHours';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();
  const queries = useWorkingHoursQueries(); // Use the custom hook

  const [gosiPublicQuery, newGosiQuery] = queries;

  // Loading and error states
  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);

  const gosiPublic = gosiPublicQuery?.data?.statues;
  const newGosi = newGosiQuery?.data?.statues;

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
      <div className="mx-auto flex flex-col-reverse flex-wrap justify-between py-8 md:flex-row md:py-16">
        <div className="w-full lg:w-1/2">
          <h2 className="mb-4 mt-4 text-2xl font-bold text-primary md:mt-0 md:text-3xl">
            {t('start_from_here')}
          </h2>
          <UserDetails />
        </div>
        <div className="w-full px-0 md:px-24 lg:w-1/2">
          <h2 className="mb-4 text-2xl font-bold text-primary md:text-3xl">
            {t('virtual_head')}
          </h2>
          <p className="mb-4 text-base text-gray-700">
            {t('service_virtual_visit')}
          </p>

          <Image
            src="/hero.svg"
            alt="Virtual Visit"
            className="mx-auto mt-12 block md:hidden"
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
      </div>
    </SectionContainer>
  );
}
