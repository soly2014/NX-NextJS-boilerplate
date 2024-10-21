// schemas/userDetailsFormSchema.ts

import * as z from 'zod';

// Define the schema with better typing and custom error handling
export const userDetailsFormSchema = (t: any) => {
  z.setErrorMap((issue, ctx: any) => {
    const errorMessages: Record<string, string> = {
      invalid_type: t('validation.this_field_is_required', {
        path: ctx?.path?.length ? ctx.path.join('.') : 'unknown path',
      }),
      invalid_string: t('validation.invalid_string', {
        path: ctx?.path?.length ? ctx.path.join('.') : 'unknown path',
      }),
      too_small: t('validation.too_small', {
        path: ctx?.path?.length ? ctx.path.join('.') : 'unknown path',
        min: ctx?.minimum || 'unknown',
      }),
      too_big: t('validation.too_big', {
        path: ctx?.path?.length ? ctx.path.join('.') : 'unknown path',
        max: ctx?.maximum || 'unknown',
      }),
      invalid_enum_value: t('validation.invalid_enum_value', {
        path: ctx?.path?.length ? ctx.path.join('.') : 'unknown path',
      }),
      custom: issue.message || t('validation.default'),
    };

    return { message: errorMessages[issue.code] || t('validation.default') };
  });

  return z
    .object({
      serviceType: z
        .enum(['retirement', 'insurance', 'newSystem', 'none'])
        .refine((value) => value !== 'none', {
          message: t('validation.this_field_is_required'),
        }), // Ensures serviceType is required
      idNumber: z
        .string()
        .min(1, { message: t('validation.this_field_is_required') }) // Ensures idNumber is required
        .regex(/^[0-9]*$/, {
          message: t('validation.idNumber_digits'),
        })
        .length(10, {
          message: t('validation.idNumber_length'),
        }), // Ensures idNumber is numeric and exactly 10 digits
      name: z
        .string()
        .min(1, { message: t('validation.this_field_is_required') }) // Ensures name is required
        .regex(/^[a-zA-Z\u0600-\u06FF\s.]{2,50}$/, {
          // Validates name with 2-50 characters, allowing spaces
          message: t('validation.name_invalid'),
        })
        .refine((val) => val.trim().length >= 2 && val.trim().length <= 50, {
          message: t('validation.name_invalid'), // Ensures name length between 2 and 50 (excluding leading/trailing spaces)
        })
        .transform((val) => val.trim()), // Ensures no leading/trailing spaces
      phone: z
        .string()
        .min(1, { message: t('validation.this_field_is_required') }) // Ensures phone is required
        .regex(/^05\d{8}$/, {
          message: t('validation.phone_invalid'),
        }), // Validates Saudi-style phone numbers starting with 05
      agreement: z.boolean().refine((value) => value === true, {
        message: t('validation.agree_to_terms'),
      }), // Ensures agreement to terms is checked
      signLanguage: z.enum(['yes', 'no']),
      insurance_types: z.enum(['gosi-public', 'new-est']).optional(),
    })
    .superRefine((data, ctx) => {
      if (data.serviceType === 'insurance' && !data.insurance_types) {
        ctx.addIssue({
          path: ['insurance_types'],
          message: t('validation.this_field_is_required'),
          code: 'custom',
        });
      }
    });
};

export type FormSchema = z.infer<ReturnType<typeof userDetailsFormSchema>> & {
  agreement: any;
};
