'use client';
import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Button,
  Checkbox,
  Textarea,
  FormField,
} from '@ui';
import { useRouter } from '@navigation';
import { useToast } from '@hooks';

const feedbackFormSchema = (t: any) => {
  return z
    .object({
      reason: z
        .array(z.string())
        .nonempty({ message: t('validation.select_reason') }),
      otherReason: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.reason.includes('other') && !data.otherReason?.trim()) {
        ctx.addIssue({
          code: 'custom',
          path: ['otherReason'],
          message: t('validation.enter_other_reason'),
        });
      }
    });
};

type FeedbackFormSchema = z.infer<ReturnType<typeof feedbackFormSchema>>;

export const RejectCallForm: React.FC = () => {
  const t = useTranslations();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const meetingId = searchParams.get('meetingId');
  const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL as string;

  const methods = useForm<FeedbackFormSchema>({
    resolver: zodResolver(feedbackFormSchema(t)),
    defaultValues: {
      reason: [],
      otherReason: '',
    },
  });

  const { handleSubmit, control, watch, setValue, getValues } = methods;
  const selectedReasons = watch('reason');

  const handleCheckboxChange = (value: string) => {
    const currentValues = getValues('reason') || [];
    if (currentValues.includes(value)) {
      setValue(
        'reason',
        currentValues.filter((item: string) => item !== value) as any,
      );
    } else {
      setValue('reason', [...currentValues, value]);
    }
  };

  const isOtherSelected = selectedReasons.includes('other');

  const mutation = useMutation({
    mutationFn: async (data: FeedbackFormSchema) => {
      return axios.post(
        `${baseURL}api/customer-meeting/feedback/${meetingId}`,
        {
          serviceRatings: '0',
          comments: '',
          LeavingLobbyReason: [
            ...data.reason,
            isOtherSelected ? data.otherReason : false,
          ]
            .filter(Boolean)
            .join(', ')
            .split('_')
            .join(' ')
            .replace('other,', ''),
        },
      );
    },
    onSuccess: (response) => {
      console.log('Feedback submitted successfully', response);
      router.replace('/thankyou');
    },
    onError: (error) => {
      console.error('Failed to submit feedback', error);
      toast({
        variant: 'destructive',
        title: t('toast.destructive.title'),
        description: t('toast.destructive.description'),
      });
    },
  });

  const onSubmit = (data: FeedbackFormSchema) => {
    mutation.mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-7 py-8 md:py-16"
      >
        <div className="mb-4 text-start">
          <h2 className="text-lg font-bold text-gray-800">
            {t('please_provide_other_reason')}
          </h2>
          {/* <p className="text-gray-600">{t('participation_note')}</p> */}
        </div>

        <div className="mb-4">
          <FormField
            name="reason"
            control={control}
            render={() => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center">
                      <Checkbox
                        onChange={() => handleCheckboxChange('long_wait_time')}
                        checked={selectedReasons.includes('long_wait_time')}
                      />
                      <span className="ms-2 text-gray-700">
                        {t('long_wait_time')}
                      </span>
                    </label>
                    <label className="flex items-center">
                      <Checkbox
                        onChange={() => handleCheckboxChange('technical_issue')}
                        checked={selectedReasons.includes('technical_issue')}
                      />
                      <span className="ms-2 text-gray-700">
                        {t('technical_issue')}
                      </span>
                    </label>
                    <label className="flex items-center">
                      <Checkbox
                        onChange={() => handleCheckboxChange('other')}
                        checked={selectedReasons.includes('other')}
                      />
                      <span className="ms-2 text-gray-700">{t('other')}</span>
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isOtherSelected && (
          <div className="mb-4 w-full max-w-sm">
            <FormField
              name="otherReason"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="otherReason" className="text-gray-800">
                    {t('please_provide_reason')}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      id="otherReason"
                      placeholder={t('please_specify')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <div>
          <Button
            type="submit"
            variant="secondary"
            size={'lg'}
            className="w-full px-20 md:w-auto"
            isLoading={mutation.isPending}
          >
            {t('continue')}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
