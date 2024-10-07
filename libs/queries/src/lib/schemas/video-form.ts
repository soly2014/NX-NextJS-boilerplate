import { z } from 'zod';

// Schema generator function
export const videoFormSchema = (t: any) =>
  z.object({
    camera: z.string().nonempty(t('camera_required')),
    microphone: z.string().nonempty(t('microphone_required')),
    speaker: z.string().optional(), // Speaker is now optional
  });

// Infer the type from the schema instance
export type VideoFormSchema = z.infer<ReturnType<typeof videoFormSchema>>;
