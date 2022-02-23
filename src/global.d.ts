import type { AxiosError, AxiosResponse } from 'axios';

declare global {
  interface IResponseData {
    success: boolean;
    code: string;
    message: string;
    [propName: string]: any;
  }

  interface IResponse extends AxiosResponse<IResponseData> {}

  interface IResponseError extends AxiosError<IResponseData> {
    response?: IResponse;
  }

  interface IMutationVariables extends AxiosRequestConfig {
    showError?: boolean;
    showErrorType?: 'alert' | 'message' | 'notification';
  }

  type TPageLimit = 10 | 20 | 50 | 100;
}

export {};
