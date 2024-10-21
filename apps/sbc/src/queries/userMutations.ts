// queries/userMutations.ts

import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { FormSchema } from '../schemas/userDetailsFormSchema';
import { useToast } from '@hooks';
import { useTranslations } from 'next-intl';

export const useSendCustomerOtpMutation = (
  setStep: React.Dispatch<React.SetStateAction<number>>,
) => {
  const t = useTranslations();
  const { toast } = useToast();
  const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;

  return useMutation({
    mutationFn: async (data: FormSchema) => {
      const body = {
        nin: data?.idNumber,
        mobile: data?.phone,
        fullname: data?.name,
      };
      return axios.post(`${baseURL}api/sendcustomerotp`, body);
    },
    onSuccess: () => {
      setStep(2);
    },
    onError: (error: AxiosError) => {
      // setStep(2);
      console.error(error.response?.data);
      // Handle error (e.g., show a message to the user)

      toast({
        variant: 'destructive',
        title: t('toast.destructive.title'),
        description: t('toast.destructive.description'),
      });
    },
  });
};
