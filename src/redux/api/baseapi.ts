import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { logout, setUser } from "../features/auth/authSlice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
  credentials: "include",
  prepareHeaders: async (headers, { getState }) => {
    const token = (getState() as RootState)?.auth?.accessToken;

    if (token) {
      headers.set("authorization", token);
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 404) {
      toast.error(result?.error?.data?.message);
    }
    if (result?.error?.status === 403) {
      toast.error(result?.error?.data?.message);
    }
    if (result?.error?.status === 401) {
      console.log("Sending refresh token");
      const res = await fetch(
        "http://localhost:5000/users/refresh-token",
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await res.json();

      if (data?.data?.accessToken) {
        const user = (api.getState() as RootState).auth.user;
        api.dispatch(
          setUser({
            user,
            accessToken: data?.data?.accessToken,
          })
        );
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    }

    return result;
  },
  tagTypes: ["Phone"],
  endpoints: () => ({}),
});
