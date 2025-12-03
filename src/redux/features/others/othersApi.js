import { baseApi } from "../../api/baseApi";

const othersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

     aboutUs: builder.mutation({
      query: (data) => ({
        url:`/about-us/create-or-update`,
        method: "POST",
      body:data      
      }),
    }),
     privacyPolicy: builder.mutation({
      query: (data) => ({
        url:`/privacy-policy/create-or-update`,
        method: "POST",
        body:data      
      }),
    }),
     getPrivacyPolicy: builder.query({
      query: () => ({
        url:`/privacy-policy/retrive`,
        method: "GET",      
      }),
    }),
     getTerms: builder.query({
      query: () => ({
        url:`/terms-condition/retrive`,
        method: "GET",      
      }),
    }),
     getAboutUs: builder.query({
      query: () => ({
        url:`/about-us/retrive`,
        method: "GET",      
      }),
    }),
     termsPolicy: builder.mutation({
      query: (data) => ({
        url:`terms-condition/create-or-update`,
        method: "POST",   
        body:data   
      }),
    }),
     createNewFaq: builder.mutation({
      query: (data) => ({
        url:`/faq/create`,
        method: "POST",   
        body:data   
      }),
    }),
     getAllFaq: builder.query({
      query: () => ({
        url:`/faq/retrieve`,
        method: "GET",      
      }),
    }),


  }),


    

});

export const { useAboutUsMutation,usePrivacyPolicyMutation,useTermsPolicyMutation,useGetAllFaqQuery,useCreateNewFaqMutation,useGetPrivacyPolicyQuery,useGetTermsQuery,useGetAboutUsQuery } = othersApi;
