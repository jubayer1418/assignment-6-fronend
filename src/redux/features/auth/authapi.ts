import { baseApi } from "../../api/baseapi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userInfo) => {
                console.log(userInfo)
                return {
                    url: "/users/create-user",
                    method: "POST",
                    body: userInfo
                }

            }
        }),
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/users/login-user",
                method: "POST",
                body: userInfo

            }),

        }),
    }),
})
export const { useLoginMutation, useRegisterMutation } = authApi