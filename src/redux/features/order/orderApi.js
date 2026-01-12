import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

getAllOrders: builder.query({
  query: (params) => {
    // Handle undefined params
    const { search, page, limit, status, deliveryOption } = params || {};

    return {
      url: "/order/retrieve/all",
      method: "GET",
      params: {
        ...(search && { search }),
        ...(page && { page }),
        ...(limit && { limit }),
        ...(status && { status }),
        ...(deliveryOption && { deliveryOption }),
      },
    };
  },
  providesTags: ["orders"],
}),
  getAllGeneralOrders: builder.query({
      query: (args) => {
        console.log('Arguments from orderApi----->',args);
        const params = new URLSearchParams();
    
        if (args && typeof args === "object") { 
          Object.entries(args).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              params.append(key, value.toString());
            }
          });
        }
    
        return {
          url: "/general-order/retrieve",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["orders"],
      

      transformResponse: (response) => {
        return {
          data: response?.data,
        };
      },
    }),


     singleOrder: builder.query({
      query: (id) => ({
        url:`/order/retrieve/specific/${id}`,
        method: "GET",
      
      }),
    }),
     singleGOrder: builder.query({
      query: (id) => ({
        url:`/general-order/retrieve/${id}`,
        method: "GET",
      
      }),
    }),

  }),


  

});

export const { useGetAllOrdersQuery,useSingleOrderQuery,useGetAllGeneralOrdersQuery,useSingleGOrderQuery} = orderApi;
