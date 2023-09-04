import z from 'zod';

import { TranslationsSchema } from '$schemas/Translations';

import type { ZodApi } from '$utils/zod';

export const GetTranslationsSchema = <const>{
  req: z.object({
    locale: z.string().nonempty().nullable(),
  }).strict(),
  res: TranslationsSchema,
} satisfies ZodApi;

export type GetTranslations = typeof GetTranslationsSchema;
