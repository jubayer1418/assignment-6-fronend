import { useEffect, useState } from "react";
import { setUser } from "../features/auth/authSlice";
import { useAppDispatch } from "../hooks";

export default function useAuthCheck() {
  const dispatch = useAppDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const localAuth = localStorage?.getItem("auth");

    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.token && auth?.user) {
        dispatch(
          setUser({
            token: auth.token,
            user: auth.user,
          })
        );
      }
    }
    setAuthChecked(true);
  }, [dispatch, setAuthChecked]);

  return authChecked;
}
