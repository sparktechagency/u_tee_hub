import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUser: builder.query({
      query: ({searchTerm,page}) => ({
        url:`/user/retrieve/all?search=${searchTerm}`,
        method: "GET",
      params:{page}
      }),
    }),
    getPendingVendors: builder.query({
      query: (page) => ({
        url:`/user/retrieve/all?profile.role=vendor`,
        method: "GET",
      params:{page}
      }),
    }),
    updateVendorsStatus: builder.mutation({
      query: (id) => ({
        url:`/user/update/${id}`,
        method: "PATCH",
      
      }),
    }),
    singleUser: builder.query({
      query: (id) => ({
        url:`/user/retrieve/${id}`,
        method: "GET",
      
      }),
    }),
 

  

  }),
});

export const { useAllUserQuery,useSingleUserQuery,useGetPendingVendorsQuery,useUpdateVendorsStatusMutation} = userApi;
