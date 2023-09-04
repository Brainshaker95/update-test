import { toast as svelteToast } from '@zerodevx/svelte-toast';
import { ZodError } from 'zod';

import { ApiError } from '$utils/errors/ApiError';

export const toast = (messageOrError: unknown, fallbackMessageForProd?: string): void => {
  if (typeof messageOrError === 'string' && messageOrError.length) {
    svelteToast.push(messageOrError);
  } else if (messageOrError instanceof ApiError && messageOrError.message.length) {
    svelteToast.push(messageOrError.message);
  } else if (import.meta.env.DEV) {
    /* eslint-disable no-console */
    console.log('Dev only message:');

    if (messageOrError instanceof ZodError) {
      console.log(JSON.parse(messageOrError.message));
    } else {
      console.log(messageOrError);
    }
    /* eslint-enable no-console */

    svelteToast.push('Dev only message, see console for details.');
  } else if (fallbackMessageForProd) {
    svelteToast.push(fallbackMessageForProd);
  }
};
