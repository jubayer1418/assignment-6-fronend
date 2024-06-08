import { jwtDecode } from "jwt-decode";

export const verifytoken = (token: string) => {
  const decoded = jwtDecode(token);
  return decoded;
};
