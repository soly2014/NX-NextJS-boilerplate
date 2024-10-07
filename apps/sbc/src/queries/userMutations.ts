// queries/userMutations.ts

import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { FormSchema } from '../schemas/userDetailsFormSchema';

export const useSendCustomerOtpMutation = (
  setStep: React.Dispatch<React.SetStateAction<number>>,
) => {
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
      console.error(error.response?.data);
      // Handle error (e.g., show a message to the user)
    },
  });
};
