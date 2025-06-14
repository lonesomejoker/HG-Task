import apiSlice from "./ApiSlice";

export const querySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItem: builder.query({
      query: ({ url }) => ({
        url,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      providesTags: ["Users"],
    }),

    postItem: builder.mutation({
      query: ({ url, data }) => ({
        url,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    deleteItem: builder.mutation({
      query: ({ url }) => ({
        url: `${url}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    updateItem: builder.mutation({
      query: ({ url, data }) => ({
        url: `${url}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    getItemById: builder.query({
      query: (url) => ({
        url: url,
        method: "GET",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  usePostItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
  useGetItemQuery,
  useGetItemByIdQuery,
} = querySlice;
