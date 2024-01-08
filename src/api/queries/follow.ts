import { IFollow, IUnfollow } from "@/types";
import { _DELETE, _POST } from "..";

export const _FOLLOW = async (params: IFollow) => {
  const result = await _POST("/follow/create", params);
  return result?.data;
};

export const _UNFOLLOW = async (params: IUnfollow) => {
  const result = await _DELETE("/follow/delete", params);
  return result?.data;
};
