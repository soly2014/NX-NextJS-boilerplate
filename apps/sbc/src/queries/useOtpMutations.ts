import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from '@navigation';
import { useTranslations } from 'next-intl';
import { useToast } from '@hooks';

export const useVerifyOtpMutation = (
  nin: string,
  fullname: string,
  serviceType: string,
  mobile: string,
  baseURL: string,
  setStep: React.Dispatch<React.SetStateAction<number>>,
) => {
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations();

  return useMutation({
    mutationFn: async (data: { verificationCode: string }) => {
      const body = {
        otp: data.verificationCode,
        nin: nin,
      };
      const response = await axios.post(`${baseURL}api/verifyotp`, body);
      return response.data;
    },
    onSuccess: (data) => {
      router.replace(
        `/config?token=${data.token}&fullname=${encodeURIComponent(
          fullname,
        )}&serviceType=${encodeURIComponent(serviceType)}&mobile=${encodeURIComponent(
          mobile,
        )}&nin=${encodeURIComponent(nin)}`,
      );
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: 'destructive',
        title: t('toast.destructive.title'),
        description: t('toast.destructive.description'),
      });
    },
  });
};

export const useResendOtpMutation = (
  nin: string,
  mobile: string,
  fullname: string,
  baseURL: string,
  setIsResendDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setCounter: React.Dispatch<React.SetStateAction<number>>,
) => {
  const t = useTranslations();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async () => {
      const body = {
        nin: nin,
        mobile: mobile,
        fullname: fullname,
      };
      return axios.post(`${baseURL}api/sendcustomerotp`, body);
    },
    onSuccess: () => {
      setIsResendDisabled(true);
      setCounter(60); // Restart countdown
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: t('toast.destructive.title'),
        description: t('toast.destructive.description'),
      });
      console.error(error);
      // Handle error (e.g., show a message to the user)
    },
  });
};
