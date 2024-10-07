'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { userDetailsFormSchema } from './components/user-details/user-details-form';

export async function handleSubmitAction(formData: FormData) {
  try {
    if (!(formData instanceof FormData)) {
      return {
        message: 'Invalid form data.',
      };
    }
    const data = Object.fromEntries(formData as any);

    // Validate the form data using Zod schema
    const validatedData = (userDetailsFormSchema as any).parse(data);

    // Simulate a server-side operation, e.g., saving to a database
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Revalidate the cache for the current page (optional)
    revalidatePath('/call');

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Extract error messages from the Zod validation error
      const errors = error.errors.reduce(
        (acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        },
        {} as Record<string, string>,
      );

      return { success: false, errors };
    }

    // Handle unexpected errors
    return { success: false, error: true };
  }
}
