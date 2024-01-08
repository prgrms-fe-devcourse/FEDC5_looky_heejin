import type { ICreateComment, IDeleteComment } from "@/types";
import { _POST } from "..";

export const _CREATE_COMMENT = async (params: ICreateComment) => {
  const result = await _POST("/comments/create", params);
  return result?.data;
};

export const _DELETE_COMMENT = async (params: IDeleteComment) => {
  const result = await _POST("/comments/delete", params);
  return result?.data;
};
