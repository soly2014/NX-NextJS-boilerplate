import { z } from 'zod';

// Schema generator function
export const verificationFormSchema = (t: any) =>
  z.object({
    verificationCode: z
      .string()
      .min(4, { message: t('validation.verificationCode.min') })
      .max(4, { message: t('validation.verificationCode.max') }),
  });

// Infer the type from the schema instance
export type VerificationFormSchema = z.infer<
  ReturnType<typeof verificationFormSchema>
>;
