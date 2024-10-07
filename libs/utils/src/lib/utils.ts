import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
// zodErrorMap.ts
import { ZodErrorMap, ZodIssueCode } from 'zod';

export const createZodErrorMap = (
  t: (key: string, options?: any) => string,
): ZodErrorMap => {
  const defaultErrorMap: Record<ZodIssueCode, string | undefined> = {
    [ZodIssueCode.invalid_type]: t('validation.invalid_type'),
    [ZodIssueCode.invalid_string]: t('validation.invalid_string'),
    [ZodIssueCode.too_small]: t('validation.too_small'),
    [ZodIssueCode.too_big]: t('validation.too_big'),
    [ZodIssueCode.custom]: undefined, // Use issue.message if available
    [ZodIssueCode.invalid_union]: t('validation.invalid_union'),
    [ZodIssueCode.invalid_enum_value]: t('validation.invalid_enum_value'),
    [ZodIssueCode.invalid_literal]: t('validation.invalid_literal'),
    [ZodIssueCode.invalid_union_discriminator]: t(
      'validation.invalid_union_discriminator',
    ),
    [ZodIssueCode.unrecognized_keys]: t('validation.unrecognized_keys'),
    [ZodIssueCode.invalid_arguments]: t('validation.invalid_arguments'),
    [ZodIssueCode.invalid_return_type]: t('validation.invalid_return_type'),
    [ZodIssueCode.invalid_date]: t('validation.invalid_date'),
    [ZodIssueCode.invalid_intersection_types]: t(
      'validation.invalid_intersection_types',
    ),
    [ZodIssueCode.not_multiple_of]: t('validation.not_multiple_of'),
    [ZodIssueCode.not_finite]: t('validation.not_finite'),
  };

  return (issue, ctx: any) => {
    const customMessage = issue.message || t('validation.default');
    const pathMessage =
      Array.isArray(ctx?.path) && ctx.path.length
        ? { path: ctx.path.join('.') }
        : {};
    const errorMessage = defaultErrorMap[issue.code] || customMessage;

    return {
      message: errorMessage ? t(errorMessage, pathMessage) : customMessage,
    };
  };
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// lib/locales.ts

export const SUPPORTED_LOCALES = ['en', 'ar']; // Add more locales as needed

export function generateStaticLocaleParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}
