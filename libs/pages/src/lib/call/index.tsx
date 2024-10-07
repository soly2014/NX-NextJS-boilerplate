'use client';
import React, { useMemo } from 'react';
import { FullPageLoading } from '@ui';
import { useRouter } from '@navigation';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useDeviceSettingsStore } from '@hooks';
import { cn } from '@utils';

// Dynamically import the TeamsCallChat component with a loading fallback
const TeamsCallChat = dynamic(
  () => import('@teams-call-chat').then((mod) => mod.TeamsCallChat),
  {
    loading: () => <FullPageLoading />,
    ssr: false, // Disable SSR for this component if it's client-side only
  },
);

// Memoized Call component
export const Call = React.memo(function Call({
  locale,
  setIsCallAdmitted,
  isCallAdmitted,
}: {
  locale: string;
  setIsCallAdmitted: any;
  isCallAdmitted: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { camera, microphone, speaker } = useDeviceSettingsStore();

  // Memoizing the essential values to avoid unnecessary re-renders
  const endpointURL = useMemo(
    () => process.env.NEXT_PUBLIC_ENDPOINT_URL as string,
    [],
  );
  const userToken = searchParams.get('userToken');
  const userId = searchParams.get('userId');
  const meetingLink = searchParams.get('meetingLink');
  const meetingId = searchParams.get('meetingId');
  const fullName = searchParams.get('fullName');

  const handleCallEnd = () => {
    router.replace(`/feedback?meetingId=${meetingId}`);
  };

  // Avoid unnecessary re-renders by memoizing the TeamsCallChat component
  const renderedTeamsCallChat = useMemo(() => {
    if (
      meetingLink &&
      fullName &&
      endpointURL &&
      userId &&
      userToken &&
      meetingId
    ) {
      return (
        <TeamsCallChat
          userId={userId}
          setIsCallAdmitted={setIsCallAdmitted}
          userToken={userToken}
          endpointURL={endpointURL}
          meetingLink={meetingLink}
          fullName={fullName}
          cameraId={camera}
          microphoneId={microphone}
          meetingId={meetingId}
          speakerId={speaker}
          rtl={locale === 'ar'}
          onCallEnded={handleCallEnd}
        />
      );
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    meetingLink,
    fullName,
    endpointURL,
    userId,
    userToken,
    meetingId,
    camera,
    microphone,
    speaker,
    locale,
    setIsCallAdmitted,
  ]);

  return (
    <div className={cn('bg-white', isCallAdmitted ? 'visible' : 'invisible')}>
      {renderedTeamsCallChat}
    </div>
  );
});
