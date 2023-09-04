import fsp from 'fs/promises';

import { GetTranslationsSchema } from '$schemas/api/GetTranslations';
import { translationsStore } from '$utils/stores';
import { zodServer } from '$utils/zod';

import type { Translations } from '$schemas/Translations';
import type { Maybe } from '$types/core';
import type { RequestHandler } from '@sveltejs/kit';

const translationsMap: Record<string, Maybe<Translations>> = {};

const readTranslationFile = async (lang: string): Promise<string> => fsp
  .readFile(`resources/app/translations/${lang}.json`, 'utf-8');

const loadTranslations = async (locale: string): Promise<Translations> => {
  let translations: Translations;
  let enTranslations: Translations;

  try {
    enTranslations = <Translations>JSON.parse(await readTranslationFile('en'));
  } catch (e) {
    throw new Error('Translations for locale "en" could not be loaded');
  }

  try {
    translations = <Translations>JSON.parse(await readTranslationFile(locale));
  } catch (e) {
    translations = enTranslations;
  }

  return {
    ...enTranslations,
    ...translations,
  };
};

export const GET: RequestHandler = async ({ request }) => {
  let { locale } = await zodServer.receiveRequest(request, GetTranslationsSchema, 'query');

  locale ??= 'en';

  if (import.meta.env.DEV) {
    translationsMap[locale] = await loadTranslations(locale);
  } else {
    translationsMap[locale] ??= await loadTranslations(locale);
  }

  const entry = translationsMap[locale] ?? null;

  if (entry) {
    translationsStore.set(entry);
  }

  return zodServer.sendResponse(entry ?? {}, GetTranslationsSchema);
};
