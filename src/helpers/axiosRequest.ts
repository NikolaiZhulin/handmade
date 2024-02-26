import axios, { AxiosRequestConfig, AxiosRequestHeaders, Method } from 'axios';
import Cookies from 'js-cookie';

import { ACCESS_TOKEN_KEY } from '@/constants/base';

import { refreshTokenService, accessTokenService } from './tokens/tokenService';
import { refreshTokenCookie } from './tokens/tokens';

export type ApiParams<T> = {
  data?: T;
  method: Method;
  url: string;
  token?: string;
  contentType?: string;
  baseURL?: string;
  params?: object;
  responseType?: AxiosRequestConfig['responseType'];
};

const Url = process.env.NEXT_PUBLIC_AUTH_API_URL || '';

const createAxiosResponseInterceptor = () => {
  let isRefreshing = false;

  let failedQueue: any[] = [];

  const processQueue = (error: any, token = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue = [];
  };

  const interceptor = axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const originalRequest = error.config;
      const token = accessTokenService.getToken();

      if (token && error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              return axios(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }
        originalRequest._retry = true;
        isRefreshing = true;
        const unintercepted = axios.create();
        return new Promise((res, rej) => {
          unintercepted
            .get(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/auth/tokens/refresh`, {
              headers: {
                Authorization: `Bearer ${refreshTokenCookie.value()}`,
              },
            })
            .then((resp) => {
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + resp.data.accessToken;
              originalRequest.headers['Authorization'] = 'Bearer ' + resp.data.accessToken;
              accessTokenService.setToken({ token: resp.data.accessToken });
              refreshTokenService.setToken({ token: resp.data.refreshToken });
              processQueue(null, resp.data.accessToken);
              res(axios(originalRequest));
            })
            .catch((err) => {
              processQueue(err, null);
              accessTokenService.deleteToken();
              refreshTokenService.deleteToken();
              rej(err);
            })
            .then(() => {
              isRefreshing = false;
            });
        });
      }
      console.error('401, please check accessToken');

      axios.interceptors.response.eject(interceptor);
      return Promise.reject(error);
    },
  );
};

export const axiosRequest = async <TRequestData, TResponseData = void>({
  data,
  method,
  url,
  baseURL,
  token: SSRToken,
  params,
  contentType,
  header,
  responseType = 'json',
}: ApiParams<TRequestData> & {
  header?: AxiosRequestHeaders;
}): Promise<TResponseData> => {
  const config: AxiosRequestConfig = {
    baseURL,
    data,
    method,
    url,
    params,
    withCredentials: false,
    responseType,
    timeout: 1000 * 90,
  };
  const token = accessTokenService.getToken() || Cookies.get(ACCESS_TOKEN_KEY) || SSRToken;

  if (!config.baseURL) {
    config.baseURL = baseURL || Url;
  }

  if (header) {
    config.headers = { ...config.headers, ...header };
  }

  if (token && !!baseURL) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  if (contentType) {
    config.headers = {
      ...config.headers,
      'content-type': contentType,
    };
  }

  try {
    createAxiosResponseInterceptor();
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
