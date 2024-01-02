import { _POST } from "@/api";
import { ISignIn } from "@/types";

export const _SIGNIN = async (params: ISignIn) => {
  const result = await _POST("signup", params);
  return result?.data;
};
