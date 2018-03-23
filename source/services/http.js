import axios from 'axios';
import config from 'configs/app.config';

class Http {
  constructor() {
    this.client = axios.create();
  }

  headers: Object = {
    'Accept': 'application/json'
  };

  getURL = (url: string) => {
    const protocol = window.location.protocol;
    return `${protocol}//${config.apiURL}${url}`;
  };

  getHeaders = () => {
    return this.headers;
  };

  //  method, for updating headers, only if, we'e received different session token value
  upSetHeader(key: string, value: string) {
    if (!this.headers[key] || !this.headers[key] !== value) {
      this.headers[key] = value;
    }
  }

  updateHeaders = (key: string, value: string) => {
    this.headers[key] = value;
  };

  request = (url: string, method: string, data: Object, isExternalUrl: boolean = false) => {
    const requestData = data || {};
    const requestHeaders = this.getHeaders();
    const requestUrl = isExternalUrl ? url : this.getURL(url);
    const requestConfig = {
      method,
      url: requestUrl,
      headers: requestHeaders,
      data: requestData
    };

    return this.client({ ...requestConfig });
  };

  post = (url: string, data: Object, isExternalUrl: boolean = false) => {
    return this.request(url, 'post', data, isExternalUrl);
  };

  put = (url: string, data: Object, isExternalUrl: boolean = false) => {
    return this.request(url, 'put', data, isExternalUrl);
  };

  get = (url: string, data: Object, isExternalUrl: boolean = false) => {
    return this.request(url, 'get', data, isExternalUrl);
  };

  delete = (url: string, data: Object, isExternalUrl: boolean = false) => {
    return this.request(url, 'delete', data, isExternalUrl);
  };
}

export default new Http();

