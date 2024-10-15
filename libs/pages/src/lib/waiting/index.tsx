/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { SectionContainer } from '@ui';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@navigation';

export const WaitingPage: React.FC<{
  isCallAdmitted: boolean;
}> = ({ isCallAdmitted }) => {
  const t = useTranslations();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isCallVisible, setisCallVisible] = React.useState(false);
  const searchParams = useSearchParams();
  const userToken = searchParams.get('userToken');
  const userId = searchParams.get('userId');
  const meetingId = searchParams.get('meetingId');
  const meetingLink = searchParams.get('meetingLink');
  const fullName = searchParams.get('fullName');
  const serviceType = searchParams.get('serviceType');
  const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;

  const fetchWaitingStatus = async () => {
    if (!meetingId || !serviceType) throw new Error('Missing query parameters');

    const response = await axios.get(
      `${baseURL}api/customer/${meetingId}/waiting/${serviceType}`,
    );
    return response.data;
  };

  const { data: waitingStatus, isLoading } = useQuery({
    queryKey: ['waitingStatus', meetingId, serviceType],
    queryFn: fetchWaitingStatus,
    enabled: !!meetingId && !!serviceType,
    refetchInterval: 3000, // Polling every 1 second
    retry: false, // Disable retries to avoid duplicate polling
  });

  // 30 minutes in milliseconds
  const THIRTY_MINUTES = 30 * 60 * 1000;
  useEffect(() => {
    // Set a timer to redirect the user after 5 minutes (300,000 ms)
    const timer = setTimeout(() => {
      if (!isCallAdmitted) {
        router.push('/timeout'); // Redirect to a page of your choice
      }
    }, THIRTY_MINUTES); // 300,000 ms = 5 minutes

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [router, isCallAdmitted]);

  useEffect(() => {
    if (isCallAdmitted) {
      // router.replace(
      //   `/call?meetingLink=${meetingLink}&meetingId=${meetingId}&serviceType=${serviceType}&fullName=${fullName}&userToken=${userToken}&userId=${userId}`,
      // );

      queryClient.cancelQueries({
        queryKey: ['waitingStatus', meetingId, serviceType],
      });
      setisCallVisible(true);
    }

    // Cleanup function to stop query when component unmounts
    return () => {
      queryClient.cancelQueries({
        queryKey: ['waitingStatus', meetingId, serviceType],
      });
    };
  }, [
    waitingStatus,
    router,
    meetingId,
    meetingLink,
    serviceType,
    fullName,
    queryClient,
    isCallAdmitted,
    isCallVisible,
  ]);

  if (isCallVisible) {
    return null;
  }

  return (
    <SectionContainer>
      <div className="flex flex-col items-center justify-center py-8 text-center md:py-16">
        <h1 className="mb-2 text-2xl font-bold text-blue-900">
          {t('waiting_room_title')}
        </h1>
        <p className="mb-8 text-gray-500">{t('waiting_room_description')}</p>

        <div className="relative mb-8 h-64 w-64">
          <Image
            src="/waiting.svg"
            alt="Virtual Visit"
            className="mx-auto mt-4"
            width={285}
            height={288}
          />
        </div>

        <p className="text-lg text-gray-700">
          {t('waiting_queue_message')}{' '}
          <span className="font-bold text-blue-900">
            {isLoading
              ? '...'
              : waitingStatus?.count == 0
                ? 1
                : (waitingStatus?.count ?? 'N/A')}
          </span>{' '}
        </p>

        <button
          className="mt-6 text-lg font-semibold text-red-500"
          onClick={() => router.replace(`/reject-call?meetingId=${meetingId}`)}
        >
          {t('exit')}
        </button>
      </div>
    </SectionContainer>
  );
};
