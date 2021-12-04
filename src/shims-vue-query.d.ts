import 'vue-query';
import type { AxiosRequestConfig } from 'axios';
import type {
  QueryFunction,
  QueryKey,
  MutationFunction,
  MutationKey,
} from 'react-query/types/core';
import type {
  UseQueryOptions as UQO,
  UseQueryResult,
  UseMutationOptions as UMO,
} from 'react-query/types/react/types';
import type { UseMutationReturnType } from 'vue-query';
import type { WithQueryClientKey } from 'vue-query/lib/vue/types';
import type { UseQueryReturnType } from 'vue-query/lib/vue/useBaseQuery';
import type { UnwrapRef, ComputedRef, Ref } from '@vue/composition-api';

declare module 'vue-query' {
  export declare type UseQueryOptions<
    TQueryFnData = IResponseData,
    TError = IResponseError,
    TData = TQueryFnData,
  > =
    | WithQueryClientKey<UQO<TQueryFnData, TError, TData>>
    | {
        [K in keyof WithQueryClientKey<UQO<TQueryFnData, TError, TData>>]:
          | WithQueryClientKey<UQO<TQueryFnData, TError, TData>>[K]
          | UnwrapRef<WithQueryClientKey<UQO<TQueryFnData, TError, TData>>[K]>
          | ComputedRef<WithQueryClientKey<UQO<TQueryFnData, TError, TData>>[K]>
          | Ref<WithQueryClientKey<UQO<TQueryFnData, TError, TData>>[K]>;
      };

  export declare type UseMutationOptions<
    TData = IResponseData,
    TError = IResponseError,
    TVariables = AxiosRequestConfig & {
      showError?: boolean;
      showErrorType?: 'alert' | 'message' | 'notification';
    },
    TContext = unknown,
  > =
    | WithQueryClientKey<UMO<TData, TError, TVariables, TContext>>
    | {
        [K in keyof WithQueryClientKey<UMO<TData, TError, TVariables, TContext>>]:
          | WithQueryClientKey<UMO<TData, TError, TVariables, TContext>>[K]
          | UnwrapRef<WithQueryClientKey<UMO<TData, TError, TVariables, TContext>>[K]>
          | ComputedRef<WithQueryClientKey<UMO<TData, TError, TVariables, TContext>>[K]>
          | Ref<WithQueryClientKey<UMO<TData, TError, TVariables, TContext>>[K]>;
      };

  export declare function useMutation<
    TData = IResponseData,
    TError = IResponseError,
    TVariables = AxiosRequestConfig & {
      showError?: boolean;
      showErrorType?: 'alert' | 'message' | 'notification';
    },
    TContext = unknown,
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
    TContext = unknown,
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
    TContext = unknown,
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
    TContext = unknown,
  >(
    mutationKey: MutationKey,
    mutationFn?: MutationFunction<TData, TVariables>,
    options?: UseMutationOptions<TData, TError, TVariables, TContext>,
  ): UseMutationReturnType<TData, TError, TVariables, TContext>;

  export declare function useQueries(
    queries: UseQueryOptions<IResponseData, IResponseError>[],
  ): Readonly<UseQueryResult<IResponseData, IResponseError>[]>;

  export declare function useQuery<
    TQueryFnData = IResponseData,
    TError = IResponseError,
    TData = TQueryFnData,
  >(options: UseQueryOptions<TQueryFnData, TError, TData>): UseQueryReturnType<TData, TError>;

  export declare function useQuery<
    TQueryFnData = IResponseData,
    TError = IResponseError,
    TData = TQueryFnData,
  >(
    queryKey: QueryKey,
    options?: UseQueryOptions<TQueryFnData, TError, TData>,
  ): UseQueryReturnType<TData, TError>;

  export declare function useQuery<
    TQueryFnData = IResponseData,
    TError = IResponseError,
    TData = TQueryFnData,
  >(
    queryKey: QueryKey,
    queryFn: QueryFunction<TQueryFnData>,
    options?: UseQueryOptions<TQueryFnData, TError, TData>,
  ): UseQueryReturnType<TData, TError>;
}
