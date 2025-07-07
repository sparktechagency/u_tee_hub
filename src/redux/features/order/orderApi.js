import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

  getAllBooks: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
    
        if (args && typeof args === "object") { 
          Object.entries(args).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              params.append(key, value.toString());
            }
          });
        }
    
        return {
          url: "/book/retrieve",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["books"],
      

      transformResponse: (response) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
  

  }),
});

export const { useUpdateProfileMutation} = orderApi;
