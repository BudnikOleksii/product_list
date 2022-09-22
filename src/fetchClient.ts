import { Id } from './types/Id';

const BASE_URL = 'http://127.0.0.1:4000';

export const ENDPOINTS = {
  products: '/products',
  productById: (id: Id) => `/products/${id}`,
  commentsByProductId: (id: Id) => `/comments?productId=${id}`,
  commentById: (id: Id) => `/comments/${id}`,
  comments: '/comments',
};

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const request = <T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> => {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return fetch(BASE_URL + url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
};

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  put: <T>(url: string, data: any) => request<T>(url, 'PUT', data),
  delete: (url: string) => request(url, 'DELETE'),
};
