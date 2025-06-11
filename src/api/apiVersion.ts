import { Api } from './api';

export class ApiVersion extends Api {
  static getLastVersion(): Promise<string> {
    return this.get<string>('version/');
  }
}
