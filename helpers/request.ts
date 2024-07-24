import { tokenStorage } from './storage';

const createRequestInstance = (baseURL: string, tokenKey = 'auth_token') => {
  // 发送请求
  const request = async (url: string, options: any = {}) => {
    const headers = new Headers(options.headers || {});
    const token = tokenStorage.get();

    if (token) {
      headers.append('Authorization', token);
    }

    const finalOptions = {
      ...options,
      headers,
    };

    const response = await fetch(`${baseURL}${url}`, finalOptions);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    return response;
  };

  const get = (url: string, options: any = {}) => request(url, { ...options, method: 'GET' });

  const post = (url: string, body: any, options: any = {}) =>
    request(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

  const put = (url: string, body: any, options: any = {}) =>
    request(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

  const del = (url: string, options: any = {}) => request(url, { ...options, method: 'DELETE' });

  const patch = (url: string, body: any, options: any = {}) =>
    request(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

  return {
    get,
    post,
    put,
    del,
    patch,
  };
};

const request = createRequestInstance('');

export default request;
