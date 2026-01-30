import { baseApi } from "../../api/baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: ({info,id}) => ({
        url:`/user/update-status/${id}`,
        method: "PATCH",
        body:info,
      }),
    }),

  

  }),
});

export const { useUpdateProfileMutation} = profileApi;
