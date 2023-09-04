import type { Translations } from '$schemas/Translations';
import type { ValueOf } from 'type-fest';

export const translate = (
  translation: ValueOf<Translations>,
  parameters: Record<string, string>,
): string => translation.replace(/{{ (.*?) }}/g, (_, key) => parameters[<string>key] ?? '');

export const t = translate;
