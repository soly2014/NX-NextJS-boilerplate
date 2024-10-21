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
import { useLocale } from 'next-intl';
import { AxiosError } from 'axios';
import { useWorkingHoursAllQuery } from '@sbc/queries/useWorkingHours';

const UserDetailsForm = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const t = useTranslations();
  const { setFullname, setServiceType, setNin, setMobile } = useUserStore();
  const locale = useLocale();

  // Fetch all working hours in a single query
  const { data } = useWorkingHoursAllQuery();

  const gosiPublic = data?.['gosi-public'];
  const newGosi = data?.['new-gosi'];
  const gosiSignLanguage = data?.['gosi-signlanguage'];

  const methods = useForm<FormSchema>({
    resolver: zodResolver(userDetailsFormSchema(t)),
    defaultValues: {
      serviceType: undefined,
      idNumber: '',
      name: '',
      phone: '',
      agreement: false,
      signLanguage: 'no',
    },
  });

  const { handleSubmit, control, setError, clearErrors } = methods;
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
          data.insurance_types === 'gosi-public' ? 'gosi-public' : 'new-est';
        break;
      default:
        serviceTypeAsParam = 'gosi-establishment';
    }

    if (data?.signLanguage === 'yes') {
      serviceTypeAsParam = 'gosi-signlanguage';
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
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="serviceType" className="text-end">
                {t('serviceType')}
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    if (value === 'none') {
                      setError('serviceType', {
                        type: 'required',
                        message: t('validation.this_field_is_required'),
                      });
                    } else {
                      clearErrors('serviceType');
                    }
                  }}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('select_service_type')} />
                  </SelectTrigger>
                  <SelectContent>
                    {/* <SelectItem value="none">{t('select_none')}</SelectItem> */}
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
              {/* Display error message for serviceType */}
              <FormMessage>
                {fieldState?.error?.message && (
                  <span className="text-destructive">
                    {fieldState.error.message}
                  </span>
                )}
              </FormMessage>
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
                    <RadioGroupItem value="new-est" />
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
                  maxLength={10}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value);
                    if (/[^0-9]/.test(value)) {
                      setError('idNumber', {
                        type: 'manual',
                        message: t('idNumber_invalid'),
                      });
                    } else {
                      clearErrors('idNumber');
                    }
                  }}
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
              <div className="flex items-center">
                <FormControl>
                  <Input
                    {...field}
                    id="phone"
                    placeholder={t('mobile_placeholder')}
                    value={
                      field.value.startsWith('05')
                        ? field.value
                        : `05${field.value}`
                    }
                    onChange={(e) =>
                      field.onChange(
                        e.target.value.slice(0, 2) === '05'
                          ? e.target.value
                          : `05${e.target.value}`,
                      )
                    }
                    style={{ direction: 'ltr' }}
                    maxLength={10}
                  />
                </FormControl>
              </div>
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

        <div className="flex items-center justify-end">
          <Button
            size="lg"
            type="submit"
            variant="secondary"
            className="w-[100%] px-16 md:w-auto"
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
