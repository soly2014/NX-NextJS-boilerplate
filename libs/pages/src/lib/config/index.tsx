// components/ConfigPage.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useDeviceSettingsStore } from '@hooks';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@navigation';

// Importing the TenStack Queries and Zod Schema
import { useTokenQuery, useCustomerMeetingMutation } from '@queries';
import { videoFormSchema } from '@queries';

import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SectionContainer,
} from '@ui';
import { CamMicPermissionAlert } from './reject-modal';
import { CameraMicToggle } from './camera-off-placeholder';
import { askDevicePermissions, queryDevices } from '@utils';

interface DevicesState {
  cameras: MediaDeviceInfo[];
  microphones: MediaDeviceInfo[];
  speakers: MediaDeviceInfo[];
}

export const ConfigPage: React.FC = () => {
  const [devices, setDevices] = useState<DevicesState>({
    cameras: [],
    microphones: [],
    speakers: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPermissionDenied, setIsPermissionDenied] = useState(false);

  const { camera, microphone, speaker, setCamera, setMicrophone, setSpeaker } =
    useDeviceSettingsStore();
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();

  const fullName = searchParams.get('fullname');
  const serviceType = searchParams.get('serviceType');
  const mobileNumber = searchParams.get('mobile');
  const nin = searchParams.get('nin');
  const token = searchParams.get('token') || 'true';
  const baseCallingURL = process.env.NEXT_PUBLIC_CALLING_BASE_API_URL as string;

  const methods = useForm<any>({
    resolver: zodResolver(videoFormSchema(t)),
    defaultValues: {
      camera,
      microphone,
      speaker,
    },
  });

  const { handleSubmit, control, setValue } = methods;

  const {
    refetch: fetchTokenData,
    data: tokenData,
    isFetching: isTokenLoading,
  } = useTokenQuery(token, baseCallingURL);

  const customerMeetingMutation = useCustomerMeetingMutation(
    token,
    fullName,
    serviceType,
    mobileNumber,
    nin,
    baseCallingURL,
    router,
    tokenData,
  );

  // 30 minutes in milliseconds
  const THIRTY_MINUTES = 60 * 1000;
  useEffect(() => {
    // Set a timer to redirect the user after 5 minutes (300,000 ms)
    const timer = setTimeout(() => {
      router.push('/timeout'); // Redirect to a page of your choice
    }, THIRTY_MINUTES); // 300,000 ms = 5 minutes

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    async function fetchDevices() {
      const permissionGranted = await askDevicePermissions();
      if (!permissionGranted) {
        setIsPermissionDenied(true);
      } else {
        // Fetch the device list if permission is granted
        const deviceList = await queryDevices();
        setDevices(deviceList);

        // Set default values to the first available device for each category
        if (deviceList.cameras.length > 0) {
          console.log(deviceList.cameras[0], 'deviceList.cameras[0]');
          setValue('camera', deviceList.cameras[0].deviceId);
        }
        if (deviceList.microphones.length > 0) {
          console.log(deviceList.microphones[0], 'deviceList.microphones[0]');
          setValue('microphone', deviceList.microphones[0].deviceId);
        }
        if (deviceList.speakers.length > 0) {
          console.log(deviceList.speakers[0], 'deviceList.speakers[0]');
          setValue('speaker', deviceList.speakers[0].deviceId);
        }
      }
    }

    fetchDevices();
  }, [setValue]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setCamera(data.camera);
    setMicrophone(data.microphone);
    setSpeaker(data.speaker);

    const permissionGranted = await askDevicePermissions();
    if (!permissionGranted) {
      setIsPermissionDenied(true);
      setIsSubmitting(false);
      return;
    }

    const tokenResult = await fetchTokenData();
    if (tokenResult.status === 'success') {
      customerMeetingMutation.mutate();
    } else {
      setIsSubmitting(false);
      console.error('Error fetching token');
    }
  };

  useEffect(() => {
    if (!isTokenLoading && !customerMeetingMutation.isPending) {
      setIsSubmitting(false);
    }
  }, [isTokenLoading, customerMeetingMutation.isPending]);

  return (
    <SectionContainer>
      <div className="w-full px-0 pt-8 md:pt-16 lg:w-1/2">
        <h2 className="mb-4 text-2xl font-bold text-primary md:text-3xl">
          {t('virtual_head')}
        </h2>
        <p className="mb-4 text-base text-gray-700">
          {t('service_virtual_visit')}
        </p>
      </div>

      <CameraMicToggle
        selectedCameraId={camera}
        selectedMicId={microphone}
        className="h-[280px] md:hidden"
      />

      <div className="mt-8 flex flex-col items-center justify-between gap-8 md:flex-row">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-4 md:w-1/3"
          >
            {/* Camera Select Field */}
            <FormField
              name="camera"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="camera">
                    <div className="flex items-center">
                      {t('select_camera')}
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            <div className="flex items-center gap-2">
                              <Image
                                src="/cam.svg"
                                alt={t('alt_camera')}
                                width={24}
                                height={24}
                              />
                              {t('select_camera')}
                            </div>
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {devices.cameras.map((camera, index) => (
                          <SelectItem
                            key={camera.deviceId}
                            value={camera.deviceId || `NO-Camera-Found`}
                          >
                            {camera.label || `${t('camera')} ${index + 1}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Microphone Select Field */}
            <FormField
              name="microphone"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="microphone">
                    <div className="flex items-center">
                      {t('select_microphone')}
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            <div className="flex items-center gap-2">
                              <Image
                                src="/mic.svg"
                                alt={t('alt_microphone')}
                                width={24}
                                height={24}
                              />
                              {t('select_microphone')}
                            </div>
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {devices.microphones.map((microphone, index) => (
                          <SelectItem
                            key={microphone.deviceId}
                            value={microphone.deviceId || `No-Microphone-Found`}
                          >
                            {microphone.label ||
                              `${t('microphone')} ${index + 1}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Speaker Select Field */}
            <FormField
              name="speaker"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="speaker">
                    <div className="flex items-center">
                      {t('select_speaker')}
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            <div className="flex items-center gap-2">
                              <Image
                                src="/speaker.svg"
                                alt={t('alt_speaker')}
                                width={24}
                                height={24}
                              />
                              {t('select_speaker')}
                            </div>
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {devices.speakers.map((speaker, index) => (
                          <SelectItem
                            key={speaker.deviceId}
                            value={speaker.deviceId || `No-Speaker-Found`}
                          >
                            {speaker.label || `${t('speaker')} ${index + 1}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="secondary"
              size={'lg'}
              className="mt-4"
              isLoading={isSubmitting}
            >
              {t('continue')}
            </Button>
          </form>
        </FormProvider>

        <CameraMicToggle
          selectedCameraId={camera}
          selectedMicId={microphone}
          className="hidden md:flex md:w-1/2"
        />
      </div>

      {/* Render the CamMicPermissionAlert with isOpen controlled by permission state */}
      <CamMicPermissionAlert
        isOpen={isPermissionDenied}
        onClose={() => setIsPermissionDenied(false)}
      />
    </SectionContainer>
  );
};
