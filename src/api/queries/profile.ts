import { _DELETE, _GET, _POST } from "@/api";
import { IFollow, IFollowResponse, IUnFollow } from "@/types/profile";

export const _GET_USER = async (userId: string) => {
  if (!userId) {
    throw new Error("Query is Required");
  }
  const results = await _GET(`/users/${userId}`);
  return results?.data;
};

export const _FOLLOW = async (params: IFollow): Promise<IFollowResponse> => {
  const results = await _POST("/follow/create", params);
  return results?.data;
};

export const _UNFOLLOW = async (
  params: IUnFollow
): Promise<IFollowResponse> => {
  const results = await _DELETE("/follow/delete", params);
  return results?.data;
};
