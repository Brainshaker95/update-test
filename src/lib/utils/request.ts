import type { Maybe } from '$types/core';

const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_PORT = 42069;

export const request = async (path: string, requestInit?: RequestInit): Promise<Response> => {
  const host = <Maybe<string>>import.meta.env.APP_HOST ?? DEFAULT_HOST;
  const port = <Maybe<string>>import.meta.env.APP_PORT ?? DEFAULT_PORT;
  const url = `http://${host}:${port}`;

  return fetch(`${url}${path}`, {
    ...requestInit,
    headers: {
      'Access-Control-Allow-Origin': url,
      ...requestInit?.headers,
    },
  });
};
