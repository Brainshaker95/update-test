import { error } from '@sveltejs/kit';
import { ZodObject, type z, type ZodType } from 'zod';

import { GetTranslationsSchema, type GetTranslations } from '$schemas/api/GetTranslations';
import { ApiError } from '$utils/errors/ApiError';
import { InvalidZodRequestError } from '$utils/errors/InvalidZodRequestError';
import { HTTP } from '$utils/http';
import { objectEntries, objectKeys } from '$utils/object';
import { request } from '$utils/request';
import { getTranslationsStoreValue } from '$utils/stores';
import { toast } from '$utils/toast';

import type { MaybeNullish } from '$types/core';

export interface ZodApi {
  req: ZodType;
  res: ZodType;
}

type ZodReq<T extends ZodApi> = z.infer<T['req']>;
type ZodRes<T extends ZodApi> = z.infer<T['res']>;
type ZodRequestFunction<T extends ZodApi = ZodApi> = (body: ZodReq<T>) => Promise<ZodRes<T>>;
type ZodRequestType = 'json' | 'formData' | 'query';
type ZodResponseType = 'json' | 'blob';

const handleZodRequest = async <T extends ZodApi>(schema: T, options: {
  path: string;
  body: ZodReq<T>;
  method?: 'GET' | 'POST';
  requestType?: ZodRequestType;
  responseType?: ZodResponseType;
}): Promise<ZodRes<T>> => {
  let { path } = options;
  const method = options.method ?? 'POST';
  const requestType = options.requestType ?? 'json';
  const responseType = options.responseType ?? 'json';
  let body: MaybeNullish<BodyInit>;

  if (requestType === 'query' && options.method !== 'GET') {
    throw new InvalidZodRequestError('Zod requests of type query may only use request method GET.');
  }

  if (requestType === 'json') {
    body = JSON.stringify(schema.req.parse(options.body));
  } else if (requestType === 'formData') {
    body = new FormData();

    objectEntries(options.body).forEach(([key, value]) => {
      (<FormData>body).append(String(key), value);
    });
  } else {
    const searchParams = new URLSearchParams();

    objectEntries(schema.req.parse(options.body)).forEach(([key, value]) => {
      searchParams.append(String(key), String(value));
    });

    path += `?${searchParams.toString()}`;
  }

  const res = await request(path, {
    method,
    body,
  });

  const data: unknown = await res[responseType]();

  if (!res.ok) {
    if (res.status < HTTP.INTERNAL_SERVER_ERROR
        && data
        && typeof data === 'object'
        && 'message' in data
        && typeof data.message === 'string') {
      throw new ApiError(data.message);
    }

    throw new ApiError();
  }

  const toastText = res.headers.get('X-Toast');

  if (toastText) {
    toast(toastText);
  }

  return <Promise<ZodRes<T>>>schema.res.parse(data);
};

export const zodServer = <const>{
  receiveRequest: async <T extends ZodApi>(
    req: Request,
    schema: T,
    type: ZodRequestType = 'json',
  ): Promise<ZodReq<T>> => {
    let data: ZodReq<T> = {};

    try {
      if (type === 'query') {
        if (!(schema.req instanceof ZodObject)) {
          throw new InvalidZodRequestError('Zod requests of type query may only use schemas of type ZodObject.');
        }

        const searchParams = new URLSearchParams(new URL(req.url).search);

        objectKeys(schema.req.shape).forEach((key) => {
          data[key] = searchParams.get(String(key));
        });

        data = <ZodReq<T>>schema.req.parse(data);
      } else {
        data = <ZodReq<T>>(await schema.req.parse(await req[type]()));
      }
    } catch {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw error(HTTP.BAD_REQUEST, getTranslationsStoreValue().TEST);
    }

    return <Promise<ZodReq<T>>>data;
  },
  sendResponse: <T extends ZodApi>(
    data: ZodRes<T>,
    schema: T,
    headers?: ResponseInit['headers'],
  ): Response => {
    let responseData;

    // NOTICE: This is a hack to detect blobs in node without importing
    // the buffer library into this shared module.
    if (String(data) === '[object Blob]') {
      responseData = <Blob>schema.res.parse(data);
    } else {
      responseData = JSON.stringify(schema.res.parse(data));
    }

    return new Response(responseData, {
      status: HTTP.OK,
      headers,
    });
  },
};

export const zodClient = {
  getTranslations: async <T extends GetTranslations>(
    body: ZodReq<T>,
  ): Promise<ZodRes<T>> => handleZodRequest<T>(<T>GetTranslationsSchema, {
    path: '/api/get-translations',
    requestType: 'query',
    method: 'GET',
    body,
  }),
} satisfies Readonly<Record<string, ZodRequestFunction>>;
