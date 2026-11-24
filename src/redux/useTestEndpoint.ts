import { useEffect } from "react";
import BaseAPI from "./baseApi";

// Inject a generic "probe" endpoint into your existing BaseAPI
const testApi = BaseAPI.injectEndpoints({
  endpoints: (builder) => ({
    probe: builder.query<
      unknown,
      {
        url: string;
        method: string;
        body?: unknown;
        useDefaultBase?: boolean;
      }
    >({
      query: (args) => ({
        url: args.url,
        method: args.method,
        body: args.body,
        useDefaultBase: args.useDefaultBase,
      }),
    }),
  }),
  overrideExisting: true,
});

const { useProbeQuery } = testApi;

/**
 * A hook to test any API endpoint by providing its URL.
 * It automatically logs the response data or error to the console.
 *
 * @param url - The relative URL of the endpoint to test (e.g., "/auth/user")
 * @param options - Optional configuration like method, body, or triggering skip
 */
export const useTestEndpoint = (
  url: string | null,
  options: {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: unknown;
    skip?: boolean;
    useDefaultBase?: boolean;
  } = {},
) => {
  const { method = "GET", body, skip = false, useDefaultBase = false } =
    options;

  const { data, error, isLoading, isFetching, refetch } = useProbeQuery(
    {
      url: url || "",
      method,
      body,
      useDefaultBase,
    },
    {
      skip: !url || skip,
    },
  );

  useEffect(() => {
    if (url && !skip) {
      if (isLoading || isFetching) {
        console.log(
          `%c[TestEndpoint] Fetching: ${method} ${url}...`,
          "color: #3b82f6; font-weight: bold;",
        );
      }
      if (data) {
        console.log(
          `%c[TestEndpoint] Success: ${method} ${url}`,
          "color: #10b981; font-weight: bold;",
          data,
        );
      }
      if (error) {
        console.error(
          `%c[TestEndpoint] Error: ${method} ${url}`,
          "color: #ef4444; font-weight: bold;",
          error,
        );
      }
    }
  }, [data, error, isLoading, isFetching, url, method, skip]);

  return { data, error, isLoading, isFetching, refetch };
};
