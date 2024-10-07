import { cn } from '@utils';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

export const CameraMicToggle: React.FC<{
  className: string;
  selectedCameraId: string;
  selectedMicId: string;
}> = ({ className, selectedCameraId, selectedMicId }) => {
  const t = useTranslations();
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const setupMedia = async () => {
      try {
        const constraints = {
          video: isCameraOn
            ? {
                deviceId: selectedCameraId
                  ? { exact: selectedCameraId }
                  : undefined,
              }
            : false,
          audio: isMicOn
            ? { deviceId: selectedMicId ? { exact: selectedMicId } : undefined }
            : false,
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        mediaStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        console.log('Media turned on with selected devices');
      } catch (error: any) {
        console.error('Error accessing media devices:', error);
        alert(
          'Could not access media devices. Please check device permissions.',
        );
      }
    };

    if (isCameraOn || isMicOn) {
      setupMedia();
    } else {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      console.log('Media turned off');
    }

    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCameraOn, isMicOn, selectedCameraId, selectedMicId]);

  const handleCameraToggle = () => {
    setIsCameraOn((prev) => !prev);
  };

  const handleMicToggle = () => {
    setIsMicOn((prev) => !prev);
  };

  return (
    <div
      className={cn(
        'relative flex h-[345px] w-full items-center justify-center rounded-2xl bg-[#FAFAFA]',
        className,
      )}
    >
      {!isCameraOn && !isMicOn ? (
        <div className="flex flex-col items-center justify-center">
          <p className="-mt-5 text-center text-xl text-gray-400">
            {t('activate_mic_camera')}
          </p>
        </div>
      ) : (
        <video
          ref={videoRef}
          className="flex h-full w-full rounded-2xl border-4 border-cyan-700"
          autoPlay
          playsInline
          muted={!isMicOn}
        />
      )}

      <div
        className={cn(
          'absolute bottom-1 flex gap-8 rounded-xl bg-transparent p-4',
          (isCameraOn || isMicOn) && 'bottom-3 bg-white',
        )}
      >
        <button
          onClick={handleCameraToggle}
          className="flex flex-col items-center justify-center rounded-full"
          aria-label={t('alt_camera')}
        >
          <Image
            src={isCameraOn ? '/cam.svg' : '/cam-off.svg'}
            alt={t('alt_camera')}
            width={24}
            height={24}
          />
          <p className="text-sm">{t('camera')}</p>
        </button>
        <button
          onClick={handleMicToggle}
          className="flex flex-col items-center justify-center rounded-full"
          aria-label={t('alt_microphone')}
        >
          <Image
            src={isMicOn ? '/mic.svg' : '/mic-off.svg'}
            alt={t('alt_microphone')}
            width={24}
            height={24}
          />
          <p className="text-sm">{t('microphone')}</p>
        </button>
      </div>
    </div>
  );
};
