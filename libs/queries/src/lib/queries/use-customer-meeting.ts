import { useToast } from '@hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useTranslations } from 'next-intl';

export const useTokenQuery = (token: string | null, baseCallingURL: string) => {
  return useQuery({
    queryKey: ['token'],
    queryFn: async () => {
      const config = { headers: { api_token: token || '' } };
      const response = await axios.get(`${baseCallingURL}token`, config);
      return response.data;
    },
    enabled: false,
    retry: 1,
  });
};

export const useCustomerMeetingMutation = (
  token: string | null,
  fullName: string | null,
  serviceType: string | null,
  mobileNumber: string | null,
  nin: string | null,
  baseCallingURL: string,
  router: any,
  tokenData: any,
) => {
  const t = useTranslations();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      const config = { headers: { api_token: token || '' } };
      const requestBody = {
        fullName,
        serviceType,
        mobileNumber,
        nin,
      };
      return axios.post(
        `${baseCallingURL}api/customer-meeting`,
        requestBody,
        config,
      );
    },
    onSuccess: (response) => {
      const meetingID: string = response.data.id;
      const meetingLink: string = response.data.meetingLink;
      const userToken = tokenData?.token;
      const userId = tokenData?.user.communicationUserId;

      const dummyText =
        'https://gosivvwebapp-as.azurewebsites.net?meetingLink=';
      const dummyTextTwo = 'https://gosi-uat.endak-masdrksa.com/?meetingLink=';
      const dummyTextThree =
        'https://moi-endak-frontend-test.azurewebsites.net/?meetingLink=';
      const dummyTextFour = 'https://visit.gosi.gov.sa/?meetingLink=';
      router.replace(
        `/waiting?meetingId=${meetingID}&serviceType=${serviceType}&meetingLink=${meetingLink.replace(dummyText, '').replace(dummyTextTwo, '').replace(dummyTextFour, '').replace(dummyTextThree, '')}&fullName=${fullName}&userToken=${userToken}&userId=${userId}`,
      );
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: t('toast.destructive.title'),
        description: t('toast.destructive.description'),
      });
      console.error(error);
    },
  });
};
