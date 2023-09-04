import {
  get,
  writable,
  type Writable,
} from 'svelte/store';

import type { Translations } from '$schemas/Translations';
import type { JsonValue } from 'type-fest';

const memoryStore = <T extends JsonValue>(initial?: T): Writable<T> => writable(initial);

export const translationsStore = memoryStore<Translations>();

export const getTranslationsStoreValue = (): Translations => get(translationsStore);
