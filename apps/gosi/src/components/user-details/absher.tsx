'use client';

import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

// Importing the TenStack Queries and Zod Schema
import {
  useVerifyOtpMutation,
  useResendOtpMutation,
} from '@gosi/queries/useOtpMutations';
import { verificationFormSchema } from '@gosi/schemas/verificationFormSchema';

import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
  Button,
  Input,
} from '@ui';
import { useUserStore } from '@gosi/store/useUserStore';

interface AbsherFormProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const AbsherForm: React.FC<AbsherFormProps> = ({ setStep }) => {
  const t = useTranslations();
  const { nin, mobile, fullname, serviceType } = useUserStore();
  const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL as string;

  const methods = useForm({
    resolver: zodResolver(verificationFormSchema(t)),
    defaultValues: {
      verificationCode: '',
    },
  });

  const { handleSubmit, control } = methods;

  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [counter, setCounter] = useState(60);

  const verifyOtpMutation = useVerifyOtpMutation(
    nin,
    fullname,
    serviceType,
    mobile,
    baseURL,
    setStep,
  );

  const resendOtpMutation = useResendOtpMutation(
    nin,
    mobile,
    fullname,
    baseURL,
    setIsResendDisabled,
    setCounter,
  );

  const onSubmit = (data: { verificationCode: string }) => {
    verifyOtpMutation.mutate(data);
  };

  const handleResend = () => {
    resendOtpMutation.mutate();
  };

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [counter]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
        <p className="mt-4 text-start text-gray-600">
          {t('enterVerificationCode')}
        </p>

        <FormField
          name="verificationCode"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="verificationCode"
                className="mt-8 block text-start text-gray-700"
              >
                {t('verificationCode')}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="verificationCode"
                  placeholder={t('enterCode')}
                  className="mt-2 w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-start">
          <Button
            type="button"
            onClick={handleResend}
            variant="link"
            className="px-0 text-sm text-gray-500"
            disabled={isResendDisabled}
            isLoading={resendOtpMutation.isPending}
          >
            {t('resendCode')} {isResendDisabled && `(${counter}s)`}
          </Button>
        </div>

        <div className="flex items-center justify-end">
          <Button
            size="lg"
            type="submit"
            variant="secondary"
            className="mt-5 w-[100%] px-16 md:w-auto"
            isLoading={verifyOtpMutation.isPending}
            disabled={verifyOtpMutation.isPending}
          >
            {t('submit_btn')}
          </Button>
        </div>

        {/* {verifyOtpMutation.isError && (
          <p className="mt-2 text-red-500">
            Error verifying OTP: {verifyOtpMutation.error.message}
          </p>
        )} */}
      </form>
    </FormProvider>
  );
};

export default AbsherForm;
