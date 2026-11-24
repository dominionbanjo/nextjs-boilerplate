import BaseAPI from "@/redux/baseApi";

interface SampleItem {
  id: string;
  name: string;
  description: string;
}

export const sampleApi = BaseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // Sample GET query
    getSampleData: builder.query<SampleItem[], void>({
      query: () => "/sample-items",
      providesTags: ["sample"], // Using one of the preloaded tagTypes
    }),

    // Sample POST mutation
    createSampleItem: builder.mutation<SampleItem, Partial<SampleItem>>({
      query: (body) => ({
        url: "/sample-items",
        method: "POST",
        body,
      }),
      invalidatesTags: ["sample"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetSampleDataQuery, useCreateSampleItemMutation } = sampleApi;
