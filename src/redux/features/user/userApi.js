import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUser: builder.query({
      query: (searchTerm) => ({
        url:`/user/retrieve/all?search=${searchTerm}`,
        method: "GET",
      
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

export const { useAllUserQuery,useSingleUserQuery} = userApi;
