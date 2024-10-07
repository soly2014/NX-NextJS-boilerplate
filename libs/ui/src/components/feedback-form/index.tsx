'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
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
  FormField,
  Button,
  Textarea,
} from '@ui';
import { useRouter } from '@navigation';
import { useToast } from '@hooks';

// Define validation schema using Zod
const feedbackFormSchema = (t: any) => {
  return z
    .object({
      ratings: z
        .number()
        .min(1)
        .max(5, { message: t('validation.max_rating') }),
      serviceRatings: z
        .number()
        .min(1)
        .max(5, { message: t('validation.max_rating') }),
      comments: z
        .string()
        .min(1, { message: t('validation.comment_required') }),
      reasonForBadRating: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (
        (data.ratings === 1 || data.serviceRatings === 1) &&
        !data.reasonForBadRating?.trim()
      ) {
        ctx.addIssue({
          code: 'custom',
          path: ['reasonForBadRating'],
          message: t('validation.reason_required'),
        });
      }
    });
};

type FeedbackFormSchema = z.infer<ReturnType<typeof feedbackFormSchema>>;

export const FeedbackForm: React.FC = () => {
  const t = useTranslations();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract meetingId from the URL query parameters
  const meetingId = searchParams.get('meetingId');
  const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL as string;

  // Set up react-hook-form
  const methods = useForm<FeedbackFormSchema>({
    resolver: zodResolver(feedbackFormSchema(t)),
    defaultValues: {
      ratings: 3,
      serviceRatings: 3,
      comments: '',
      reasonForBadRating: '',
    },
  });

  const { handleSubmit, setValue, watch, getValues, control } = methods;

  const ratings = watch('ratings', 3); // Default to 3
  const serviceRatings = watch('serviceRatings', 3); // Default to 3

  // React-query mutation to send the feedback data
  const mutation = useMutation({
    mutationFn: async (data: FeedbackFormSchema) => {
      return axios.post(
        `${baseURL}api/customer-meeting/feedback/${meetingId}`,
        data,
      );
    },
    onSuccess: (response) => {
      console.log('Feedback submitted successfully', response);
      router.replace('/thankyou'); // Navigate to a thank you page or somewhere else
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

  // Handle form submission
  const onSubmit = (data: FeedbackFormSchema) => {
    if (data?.ratings !== 1 && data?.serviceRatings !== 1) {
      delete data.reasonForBadRating;
    }

    const newData: any = {
      ...data,
      ratings: data.ratings.toString(),
      serviceRatings: data.serviceRatings.toString(),
    };

    mutation.mutate(newData); // Submit the data using the mutation
  };

  const handleRatingClick = (
    ratingType: 'ratings' | 'serviceRatings',
    rating: number,
  ) => {
    setValue(ratingType, rating);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-7 py-8 md:py-16"
      >
        <div className="mb-4">
          <p className="#242339 text-xl font-semibold">
            {t('visit_satisfaction')}
          </p>
          <div className="flex items-center space-x-2">
            <div className="mt-4 flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRatingClick('ratings', star)}
                  className="cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={star <= ratings ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth=".7"
                    className={`h-8 w-8 md:h-10 md:w-10 ${
                      star <= ratings ? 'text-secondary' : 'text-secondary'
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                  </svg>
                </span>
              ))}
              <span className="#242339 ps-3 pt-1 text-3xl font-bold">
                {ratings}/5
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="#242339 text-xl font-semibold">
            {t('employee_satisfaction')}
          </p>
          <div className="flex items-center space-x-2">
            <div className="mt-4 flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRatingClick('serviceRatings', star)}
                  className="cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={star <= serviceRatings ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth=".7"
                    className={`h-8 w-8 md:h-10 md:w-10 ${
                      star <= serviceRatings
                        ? 'text-secondary'
                        : 'text-secondary'
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                  </svg>
                </span>
              ))}
            </div>
            <span className="#242339 ps-3 pt-3 text-3xl font-bold">
              {serviceRatings}/5
            </span>
          </div>
        </div>

        {(ratings === 2 || serviceRatings === 2) && (
          <div className="mb-4 w-full max-w-sm">
            <FormField
              name="reasonForBadRating"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="reasonForBadRating"
                    className="#242339 -mb-1 font-semibold"
                  >
                    {t('reason_for_bad_rating_label')}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      id="reasonForBadRating"
                      placeholder={t('reason_for_bad_rating_placeholder')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="mb-4 w-full max-w-sm">
          <FormField
            name="comments"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="comments"
                  className="#242339 -mb-1 font-semibold"
                >
                  {t('comment_label')}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    id="comments"
                    placeholder={t('comment_placeholder')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button
              type="submit"
              variant="secondary"
              size={'lg'}
              className="mt-6 w-full px-20 md:w-auto"
              isLoading={mutation.isPending}
            >
              {t('submit')}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
