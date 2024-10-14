// schemas/userDetailsFormSchema.ts

import * as z from 'zod';

// Define the schema with better typing and custom error handling
export const userDetailsFormSchema = (t: any) => {
  z.setErrorMap((issue, ctx: any) => {
    const errorMessages: Record<string, string> = {
      invalid_type: t('validation.invalid_type', { path: ctx.path.join('.') }),
      invalid_string: t('validation.invalid_string', {
        path: ctx.path.join('.'),
      }),
      too_small: t('validation.too_small', {
        path: ctx.path.join('.'),
        min: ctx.minimum,
      }),
      too_big: t('validation.too_big', {
        path: ctx.path.join('.'),
        max: ctx.maximum,
      }),
      invalid_enum_value: t('validation.invalid_enum_value', {
        path: ctx.path.join('.'),
      }),
      custom: issue.message || t('validation.default'),
    };

    return { message: errorMessages[issue.code] || t('validation.default') };
  });

  return z
    .object({
      serviceType: z
        .enum(['retirement', 'insurance', 'newSystem'])
        .refine((value) => value !== undefined, {
          message: t('validation.serviceType_required'),
        }),
      idNumber: z
        .string()
        .length(10, {
          message: t('validation.idNumber_length'),
        })
        .regex(/^\d+$/, {
          message: t('validation.idNumber_digits'),
        }),
      name: z.string().min(1, { message: t('validation.name_required') }),
      phone: z.string().regex(/^05\d{8}$/, {
        message: t('validation.phone_invalid'),
      }),
      agreement: z.boolean().refine((value) => value === true, {
        message: t('validation.agreement_required'),
      }),
      signLanguage: z.enum(['yes', 'no']),
      insurance_types: z.enum(['gosi-public', 'new-est']).optional(),
    })
    .superRefine((data, ctx) => {
      if (data.serviceType === 'insurance' && !data.insurance_types) {
        ctx.addIssue({
          path: ['insurance_types'],
          message: t('validation.insurance_types_required'),
          code: 'custom',
        });
      }
    });
};

export type FormSchema = z.infer<ReturnType<typeof userDetailsFormSchema>> & {
  agreement: any;
};
