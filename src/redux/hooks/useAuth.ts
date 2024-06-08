import { useAppSelector } from "../hooks";

export default function useAuth() {
  const auth = useAppSelector((state) => state.auth);

  if (auth?.token && auth?.user) {
    return true;
  } else {
    return false;
  }
}
