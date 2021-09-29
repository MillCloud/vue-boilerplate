import 'vue-query';
import { AxiosRequestConfig } from 'axios';
import type {
  UseInfiniteQueryOptions,
  UseQueryOptions,
  UseMutationOptions,
  UseMutationReturnType,
} from 'vue-query';
import type { UseQueryReturnType } from 'vue-query/lib/vue/useBaseQuery';
import type {
  QueryFunction,
  QueryKey,
  MutationFunction,
  MutationKey,
} from 'react-query/types/core';
import type { UseInfiniteQueryResult } from 'react-query/types/react/types';

declare module 'vue-query' {
  export declare function useInfiniteQuery<
    TQueryFnData = IResponseData,
    TError = IResponseError,
    TData = TQueryFnData
  >(
    options: UseInfiniteQueryOptions<TQueryFnData, TError, TData>,
  ): UseQueryReturnType<TData, TError, UseInfiniteQueryResult<TData, TError>>;

  export declare function useInfiniteQuery<
    TQueryFnData = IResponseData,
    TError = IResponseError,
    TData = TQueryFnData
  >(
    queryKey: QueryKey,
    options?: UseInfiniteQueryOptions<TQueryFnData, TError, TData>,
  ): UseQueryReturnType<TData, TError, UseInfiniteQueryResult<TData, TError>>;

  export declare function useInfiniteQuery<
    TQueryFnData = IResponseData,
    TError = IResponseError,
    TData = TQueryFnData
  >(
    queryKey: QueryKey,
    queryFn: QueryFunction<TQueryFnData>,
    options?: UseInfiniteQueryOptions<TQueryFnData, TError, TData>,
  ): UseQueryReturnType<TData, TError, UseInfiniteQueryResult<TData, TError>>;

  export declare function useMutation<
    TData = IResponseData,
    TError = IResponseError,
    TVariables = AxiosRequestConfig & {
      showError?: boolean;
      showErrorType?: 'alert' | 'message' | 'notification';
    },
    TContext = unknown
  >(
    options: UseMutationOptions<TData, TError, TVariables, TContext>,
  ): UseMutationReturnType<TData, TError, TVariables, TContext>;

  export declare function useMutation<
    TData = IResponseData,
    TError = IResponseError,
    TVariables = AxiosRequestConfig & {
      showError?: boolean;
      showErrorType?: 'alert' | 'message' | 'notification';
    },
    TContext = unknown
  >(
    mutationFn: MutationFunction<TData, TVariables>,
    options?: UseMutationOptions<TData, TError, TVariables, TContext>,
  ): UseMutationReturnType<TData, TError, TVariables, TContext>;

  export declare function useMutation<
    TData = IResponseData,
    TError = IResponseError,
    TVariables = AxiosRequestConfig & {
      showError?: boolean;
      showErrorType?: 'alert' | 'message' | 'notification';
    },
    TContext = unknown
  >(
    mutationKey: MutationKey,
    options?: UseMutationOptions<TData, TError, TVariables, TContext>,
  ): UseMutationReturnType<TData, TError, TVariables, TContext>;

  export declare function useMutation<
    TData = IResponseData,
    TError = IResponseError,
    TVariables = AxiosRequestConfig & {
      showError?: boolean;
      showErrorType?: 'alert' | 'message' | 'notification';
    },
    TContext = unknown
  >(
    mutationKey: MutationKey,
    mutationFn?: MutationFunction<TData, TVariables>,
    options?: UseMutationOptions<TData, TError, TVariables, TContext>,
  ): UseMutationReturnType<TData, TError, TVariables, TContext>;

  export declare function useQuery<
    TQueryFnData = IResponseData,
    TError = IResponseError,
    TData = TQueryFnData
  >(options: UseQueryOptions<TQueryFnData, TError, TData>): UseQueryReturnType<TData, TError>;

  export declare function useQuery<
    TQueryFnData = IResponseData,
    TError = IResponseError,
    TData = TQueryFnData
  >(
    queryKey: QueryKey,
    options?: UseQueryOptions<TQueryFnData, TError, TData>,
  ): UseQueryReturnType<TData, TError>;

  export declare function useQuery<
    TQueryFnData = IResponseData,
    TError = IResponseError,
    TData = TQueryFnData
  >(
    queryKey: QueryKey,
    queryFn: QueryFunction<TQueryFnData>,
    options?: UseQueryOptions<TQueryFnData, TError, TData>,
  ): UseQueryReturnType<TData, TError>;
}
