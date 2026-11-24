import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  createApi,
  BaseQueryApi,
  QueryReturnValue,
} from "@reduxjs/toolkit/query/react";

import { updateTokens, logout } from "./slices/authSlice";
import type { RootState } from "./index";

type BaseQueryExtraOptions = {
  useDefaultBase?: boolean;
};

type DynamicFetchArgs = FetchArgs & {
  useDefaultBase?: boolean;
};

const PUBLIC_ENDPOINTS = [
  "/auth/login",
  "/auth/refresh",
  "/auth/register",
];

const isPublicEndpoint = (url: string): boolean =>
  PUBLIC_ENDPOINTS.some((endpoint) => url.includes(endpoint));

const dynamicBaseQuery: BaseQueryFn<
  string | DynamicFetchArgs,
  unknown,
  FetchBaseQueryError,
  BaseQueryExtraOptions
> = async (args, api, extraOptions) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL 

  const customBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const { auth } = state;
      const url = typeof args === "string" ? args : args.url;

      if (!isPublicEndpoint(url)) {
        const token = auth?.tokens?.access;
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }

      return headers;
    },
  });

  if (typeof args === "string") {
    return customBaseQuery(args, api, extraOptions);
  }

  const requestArgs = { ...args };
  delete (requestArgs as { useDefaultBase?: boolean }).useDefaultBase;
  return customBaseQuery(requestArgs, api, extraOptions);
};

let isRefreshing = false;
let isLoggingOut = false;
let refreshPromise: Promise<{
  success: boolean;
  newAccessToken?: string;
}> | null = null;

const performTokenRefresh = async (
  api: BaseQueryApi,
): Promise<{ success: boolean; newAccessToken?: string }> => {
  const state = api.getState() as RootState;
  const refreshToken = state.auth.tokens?.refresh;

  if (!refreshToken) {
    console.warn("[Auth] No refresh token available for token refresh");
    return { success: false };
  }

  const refreshUrl = "/auth/refresh";

  try {
    const refreshResult = await dynamicBaseQuery(
      {
        url: refreshUrl,
        method: "POST",
        body: { refresh: refreshToken },
      },
      api,
      { useDefaultBase: true },
    );

    if (refreshResult.data) {
      const response = refreshResult.data as {
        status: number;
        success: boolean;
        message: string;
        data?: { access: string; refresh: string };
      };

      if (response.data?.access && response.data?.refresh) {
        const { access, refresh } = response.data;
        api.dispatch(updateTokens({ access, refresh }));
        return { success: true, newAccessToken: access };
      }
    }
    return { success: false };
  } catch (error) {
    console.error("[Auth] Token refresh error:", error);
    return { success: false };
  }
};

const attemptTokenRefresh = async (
  api: BaseQueryApi,
  args: string | DynamicFetchArgs,
  extraOptions: BaseQueryExtraOptions,
): Promise<{
  success: boolean;
  result?: QueryReturnValue<
    unknown,
    FetchBaseQueryError,
    Record<string, never>
  >;
}> => {
  if (isRefreshing && refreshPromise) {
    const refreshResult = await refreshPromise;
    if (refreshResult.success) {
      const retryResult = await dynamicBaseQuery(args, api, extraOptions);
      return { success: true, result: retryResult };
    }
    return { success: false };
  }

  isRefreshing = true;
  refreshPromise = performTokenRefresh(api);

  try {
    const refreshResult = await refreshPromise;
    if (refreshResult.success) {
      const retryResult = await dynamicBaseQuery(args, api, extraOptions);
      return { success: true, result: retryResult };
    }
    return { success: false };
  } finally {
    isRefreshing = false;
    refreshPromise = null;
  }
};

const handleAuthFailure = (api: BaseQueryApi) => {
  if (isLoggingOut) return;
  isLoggingOut = true;

  api.dispatch(logout());
  api.dispatch(BaseAPI.util.resetApiState());

  if (typeof window !== "undefined") {
    setTimeout(() => {
      window.location.href = "/?login=1";
      isLoggingOut = false;
    }, 100);
  } else {
    isLoggingOut = false;
  }
};

const baseQueryWithReauth: BaseQueryFn<
  string | DynamicFetchArgs,
  unknown,
  FetchBaseQueryError,
  BaseQueryExtraOptions
> = async (args, api, extraOptions) => {
  const result = await dynamicBaseQuery(args, api, extraOptions);

  if (result.error) {
    const url = typeof args === "string" ? args : args.url;
    if (isPublicEndpoint(url)) {
      return result;
    }

    if (result.error.status === 401) {
      const refreshAttempt = await attemptTokenRefresh(api, args, extraOptions);
      if (refreshAttempt.success) {
        return refreshAttempt.result as QueryReturnValue<
          unknown,
          FetchBaseQueryError,
          Record<string, never>
        >;
      }
      handleAuthFailure(api);
      return result;
    }

    if (result.error.status === 403) {
      const errorData = result.error.data as {
        errors?: { code: string; message: string }[];
      };
      const isTokenExpired =
        errorData?.errors?.some((error) => error.code === "token_not_valid") ??
        false;

      const isNotAuthenticated =
        errorData?.errors?.some(
          (error) => error.code === "not_authenticated",
        ) ?? false;

      if (isTokenExpired || isNotAuthenticated) {
        const refreshAttempt = await attemptTokenRefresh(
          api,
          args,
          extraOptions,
        );
        if (refreshAttempt.success) {
          return refreshAttempt.result as QueryReturnValue<
            unknown,
            FetchBaseQueryError,
            Record<string, never>
          >;
        }
        handleAuthFailure(api);
      }
    }
  }

  return result;
};

const BaseAPI = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: [
    "sample",
  ],
  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: 30,
});

export default BaseAPI;
