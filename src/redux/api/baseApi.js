import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
   baseUrl: "https://backend.uteehub.com/v1",
   // credentials: "include",
   // header
   prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
         headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
   },
});

export const baseApi = createApi({
   reducerPath: "baseApi",
   baseQuery: baseQuery,
   tagTypes: ["user", "orders"],
   endpoints: () => ({}),
});
