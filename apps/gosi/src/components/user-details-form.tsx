'use client';

import * as React from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from '@ui';
import { RadioGroup, RadioGroupItem } from '@ui';
import { Checkbox } from '@ui';
import { Input } from '@ui';

// validation.ts
import * as z from 'zod';

export const formSchema = z.object({
  serviceType: z.enum(['retirement', 'insurance']),
  idNumber: z
    .string()
    .min(10, 'Invalid ID number')
    .max(10, 'Invalid ID number'),
  name: z.string().min(1, 'Name is required'),
  phone: z.string().regex(/^05\d{8}$/, 'Invalid mobile number'),
  agreement: z.boolean(),
});

export type FormSchema = z.infer<typeof formSchema> & { agreement: any };

const UserDetailsForm: React.FC = () => {
  const t = useTranslations();

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceType: 'retirement',
      idNumber: '',
      name: '',
      phone: '',
      agreement: false,
    },
  });

  const { handleSubmit, control } = methods;

  const onSubmit = (data: FormSchema) => {
    alert(JSON.stringify(data));
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
      >
        <FormField
          name="serviceType"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="serviceType">{t('service_type')}</FormLabel>
              <RadioGroup {...field}>
                <div className="flex items-center">
                  <RadioGroupItem value="retirement" id="retirement" />
                  <label htmlFor="retirement" className="ms-2 text-gray-700">
                    {t('civil_militiray')}
                  </label>
                </div>
                <div className="mt-2 flex items-center">
                  <RadioGroupItem value="insurance" id="insurance" />
                  <label htmlFor="insurance" className="ms-2 text-gray-700">
                    {t('insurance_sys')}
                  </label>
                </div>
              </RadioGroup>
              <FormMessage />
            </FormItem>
          )}
        />

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
              <FormControl>
                <Input
                  {...field}
                  id="phone"
                  placeholder={t('mobile_placeholder')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="agreement"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox {...field} id="agreement" />
              </FormControl>
              <FormLabel htmlFor="agreement">
                {t('confirmation_text')}
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none"
          >
            {t('submit_btn')}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default UserDetailsForm;
