import type { AxiosError, AxiosResponse } from 'axios';

declare global {
  interface IResponseData {
    success: boolean;
    code: string;
    message: string;
    [propName: string]: any;
  }

  interface IResponse extends AxiosResponse<IResponseData> {}

  interface IResponseError extends AxiosError<IResponseData> {}

  type TUser = Partial<{
    id: number;
  }>;

  interface RootState {
    user: TUser;
  }
}

export {};
