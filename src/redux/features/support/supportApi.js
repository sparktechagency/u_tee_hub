import { baseApi } from "../../api/baseApi";

const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allSupport: builder.query({
      query: ({ searchTerm, type,page}) => {

        const params = new URLSearchParams();

        if (type) params.append("messages.sender", type);
        if (searchTerm) params.append("search", searchTerm);
        if(page) params.append("page",page)

        return {
          url: `/support/retrieve/all?${params.toString()}`,
          method: "GET",
        };
      },
    }),
        replySupport: builder.mutation({
      query: (data) => ({
        url:`/support/reply-by-admin`,
        method: "POST",
        body:data,
      }),
    }),
        composeEmail: builder.mutation({
      query: (data) =>({
        url:`/support/compose-email`,
        method: "POST",
        body:data,
      }),
    }),
        deleteSupport: builder.mutation({
      query: (id) =>({
        url:`/support/delete/${id}`,
        method: "DELETE",
   
      }),
    }),
  }),
});

export const { useAllSupportQuery,useReplySupportMutation,useComposeEmailMutation,useDeleteSupportMutation } = supportApi;
