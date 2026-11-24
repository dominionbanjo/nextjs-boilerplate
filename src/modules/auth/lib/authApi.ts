import BaseAPI from "@/redux/baseApi";

export const authApi = BaseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (payload) => ({
        url: "/accounts/signup",
        method: "POST",
        body: payload,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (payload) => ({
        url: "/accounts/verify-email",
        method: "POST",
        body: payload,
      }),
    }),
    resendOTP: builder.mutation({
      query: (payload) => ({
        url: "/accounts/otp-resend",
        method: "POST",
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useVerifyEmailMutation,
  useResendOTPMutation,
  useLoginMutation,
} = authApi;
