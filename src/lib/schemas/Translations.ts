import z from 'zod';

import type translations from '$resources/translations/en.json';

export const TranslationsSchema = z.record(z.string().nonempty());

export type Translations = typeof translations;
