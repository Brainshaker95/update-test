import { getTranslationsStoreValue } from '$utils/stores';

export class ApiError extends Error {
  constructor(
    message = getTranslationsStoreValue().TEST || 'An unexpected API error occurred.',
    options?: ErrorOptions,
  ) {
    super(message, options);
  }
}
