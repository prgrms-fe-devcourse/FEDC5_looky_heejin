import { _POST } from "@/api";
import { ILogIn } from "@/types";

export const _LOGIN = async (params: ILogIn) => {
  const result = await _POST("login", params);
  return result?.data;
};
