import { _DELETE, _POST } from "..";
import type { ICreateLike, IDeleteLike } from "@/types";

export const _CREATE_LIKE = async (params: ICreateLike) => {
  const result = await _POST("/likes/create", params);
  return result?.data;
};

export const _DELETE_LIKE = async (params: IDeleteLike) => {
  const result = await _DELETE("/likes/delete", params);
  return result?.data;
};
