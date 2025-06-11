import axios from './axiosInstanse';

export class Api {
  static get<T>(url: string): Promise<T> {
    return this.request('GET', url, {}, {}, {});
  }

  static async request<T>(method: string, url: string, data: object, params: object, options: object): Promise<T> {
    const result = await axios({
      method,
      url,
      data,
      params,
      ...options,
    });

    if ([200, 201].includes(result.status)) {
      return result.data;
    }

    throw result;
  }
}
