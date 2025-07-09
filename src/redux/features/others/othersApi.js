import { baseApi } from "../../api/baseApi";

const othersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

     aboutUs: builder.mutation({
      query: () => ({
        url:`/about-us/create-or-update`,
        method: "POST",
      
      }),
    }),
     privacyPolicy: builder.mutation({
      query: () => ({
        url:`/privacy-policy/create-or-update`,
        method: "POST",      
      }),
    }),

  }),


    

});

export const { useAboutUsMutation,usePrivacyPolicyMutation} = othersApi;
