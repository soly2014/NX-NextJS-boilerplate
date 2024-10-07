import * as React from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
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
  RadioGroup,
  RadioGroupItem,
  Checkbox,
  Input,
} from '@ui';
import { useUserStore } from '@sbc/store/useUserStore';

import {
  userDetailsFormSchema,
  FormSchema,
} from '@sbc/schemas/userDetailsFormSchema';
import { useSendCustomerOtpMutation } from '@sbc/queries/userMutations';
import { AlertError } from '@ui';
import { useLocale } from 'next-intl';
import { AxiosError } from 'axios';
import { useWorkingHoursQueries } from '@sbc/queries/useWorkingHours';

const UserDetailsForm = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const t = useTranslations();
  const { setFullname, setServiceType, setNin, setMobile } = useUserStore();
  const locale = useLocale();
  const queries = useWorkingHoursQueries(); // Use the custom hook

  const [gosiPublicQuery, gosiSignLanguageQuery, newGosiQuery] = queries;

  const gosiPublic = gosiPublicQuery?.data?.statues;
  const newGosi = newGosiQuery?.data?.statues;
  const gosiSignLanguage = gosiSignLanguageQuery?.data?.statues;

  const methods = useForm<FormSchema>({
    resolver: zodResolver(userDetailsFormSchema(t)),
    defaultValues: {
      serviceType: 'retirement',
      idNumber: '',
      name: '',
      phone: '',
      agreement: false,
      signLanguage: 'no',
    },
  });

  const { handleSubmit, control } = methods;
  const serviceType = useWatch({ control, name: 'serviceType' });

  const sendCustomerOtpMutation = useSendCustomerOtpMutation(setStep);

  const onSubmit = (data: FormSchema) => {
    let serviceTypeAsParam = 'gosi-establishment';

    switch (data.serviceType) {
      case 'newSystem':
        serviceTypeAsParam = 'new-gosi';
        break;
      case 'retirement':
        serviceTypeAsParam = 'gosi-ppa';
        break;
      case 'insurance':
        serviceTypeAsParam =
          data.insurance_types === 'gosi-public'
            ? 'gosi-public'
            : 'new-est-main';
        break;
      default:
        serviceTypeAsParam = 'gosi-establishment';
    }

    setFullname(data.name);
    setNin(data.idNumber);
    setMobile(data.phone);
    setServiceType(serviceTypeAsParam as any);

    // Trigger the mutation
    sendCustomerOtpMutation.mutate(data);
  };

  const errorResponse = sendCustomerOtpMutation.error as AxiosError | undefined;
  const errorData = errorResponse?.response?.data as
    | { description: string }
    | undefined;

  let errorText: any;
  if (errorData?.description && typeof errorData.description === 'string') {
    errorText = errorData.description;
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-4 flex flex-col gap-8 rounded pb-8 pe-2 pt-6 md:pe-8"
      >
        <FormField
          name="serviceType"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="serviceType" className="text-end">
                {t('serviceType')}
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('select_service_type')} />
                  </SelectTrigger>
                  <SelectContent>
                    {newGosi && (
                      <SelectItem value="newSystem">
                        {t('new_system')}
                      </SelectItem>
                    )}
                    {gosiPublic && (
                      <>
                        <SelectItem value="retirement">
                          {t('retirement_systems')}
                        </SelectItem>
                        <SelectItem value="insurance">
                          {t('insurance_system')}
                        </SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {serviceType === 'insurance' && (
          <FormField
            name="insurance_types"
            control={control}
            render={({ field }) => (
              <FormItem>
                <RadioGroup {...field} className="flex gap-4">
                  <div className="flex items-center">
                    <RadioGroupItem value="gosi-public" />
                    <label htmlFor="Individuals" className="ms-2 text-gray-700">
                      {t('individuals')}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="new-est-main" />
                    <label
                      htmlFor="Establishments"
                      className="ms-2 text-gray-700"
                    >
                      {t('business_own')}
                    </label>
                  </div>
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          name="idNumber"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="idNumber">{t('nin_residence')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="idNumber"
                  placeholder={t('nin_residence_placeholder')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">{t('name')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="name"
                  placeholder={t('name_placeholder')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="phone"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="phone">{t('mobile')}</FormLabel>
              <FormControl className="mt-0">
                <Input
                  {...field}
                  id="phone"
                  placeholder={t('mobile_placeholder')}
                  className="mt-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {gosiSignLanguage && (
          <FormField
            name="signLanguage"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="signLanguage">
                  {t('sign_lang_label')}
                </FormLabel>
                <RadioGroup {...field} className="flex gap-4">
                  <div className="flex items-center">
                    <RadioGroupItem value="no" />
                    <label htmlFor="no" className="ms-2 text-gray-700">
                      {t('no')}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="yes" />
                    <label htmlFor="yes" className="ms-2 text-gray-700">
                      {t('yes')}
                    </label>
                  </div>
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          name="agreement"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox {...field} />
              </FormControl>
              <FormLabel htmlFor="agreement" className="ps-3">
                {t('confirmation_text')}
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        {sendCustomerOtpMutation.isError && (
          <AlertError>
            {errorText
              ? JSON.parse(errorText.slice(1, -1).replace(/\\"/g, '"'))
                  ?.message[locale === 'ar' ? 'arabic' : 'english']
              : t('Error.message')}
          </AlertError>
        )}
        <div className="flex items-center justify-between">
          <Button
            size="lg"
            type="submit"
            variant="secondary"
            className="w-[100%] md:w-auto"
            isLoading={sendCustomerOtpMutation.isPending}
          >
            {t('submit_btn')}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default UserDetailsForm;
