'use client';
import React from 'react';
import { CallWithChatExperience } from './call-with-chat-experience';
import './style.css';
import { useDeviceType } from '@hooks';

export const TeamsCallChat = ({
  onCallEnded,
  rtl,
  endpointURL,
  meetingLink,
  fullName,
  userId,
  setIsCallAdmitted,
  userToken,
  cameraId,
  microphoneId,
  speakerId,
  meetingId,
}: {
  onCallEnded: () => void;
  rtl: boolean;
  meetingId: string;
  endpointURL: string;
  meetingLink: string;
  fullName: string;
  userId: string;
  userToken: string;
  cameraId?: string;
  microphoneId?: string;
  speakerId?: string;
  setIsCallAdmitted?: any;
}) => {
  const deviceType = useDeviceType();

  return (
    <div className="relative mx-auto">
      <CallWithChatExperience
        onCallEnded={onCallEnded}
        userId={{ communicationUserId: userId }}
        token={userToken}
        endpointUrl={endpointURL}
        displayName={fullName}
        locator={{
          meetingLink: meetingLink,
        }}
        meetingId={meetingId}
        setIsCallAdmitted={setIsCallAdmitted}
        cameraId={cameraId}
        microphoneId={microphoneId}
        speakerId={speakerId}
        formFactor={deviceType === 'desktop' ? 'desktop' : 'mobile'}
        rtl={rtl}
        compositeOptions={{
          callControls: {
            devicesButton: true,
            cameraButton: true,
            chatButton: true,
            displayType: deviceType === 'desktop' ? 'default' : 'compact', // | 'compact'
            dtmfDialerButton: false,
            endCallButton: true,
            exitSpotlightButton: false,
            microphoneButton: true,
            moreButton: false,
            participantsButton: true,
            peopleButton: true,
            raiseHandButton: false,
            reactionButton: true,
            screenShareButton: true,
            teamsMeetingPhoneCallButton: false,
            holdButton: false,
            captionsButton: true,
          },

          surveyOptions: {
            disableSurvey: true,
          },
          localVideoTile: { position: 'grid' },

          // branding: {
          //   logo: {
          //     url: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
          //     alt: 'React Logo',
          //     shape: 'circle',
          //   },
          //   backgroundImage: {
          //     url: 'https://media.istockphoto.com/id/1391163275/photo/restored-salwa-palace-under-twilight-sky.jpg?s=1024x1024&w=is&k=20&c=7j-QTfFa-oCOvtxjGOCOCMgCNKL6z3kj83Y36QrpxEM=',
          //   },
          // },
          //surveyOptions:{}
        }}
      />
    </div>
  );
};
