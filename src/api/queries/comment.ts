import { IComment } from "@/types";
import { _POST } from "..";

export const _COMMENT = async (params: IComment) => {
  const result = await _POST("/comments/create", params);
  return result?.data;
};
