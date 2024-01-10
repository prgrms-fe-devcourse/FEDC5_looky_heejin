import { _DELETE, _GET, _POST, _PUT } from "@/api";
import { IUser } from "@/types";
import {
  IFollow,
  IFollowResponse,
  IUnFollow,
  IUpdateImage,
  IUpdateName,
  IUpdatePassword,
} from "@/types/profile";

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
  const results = await _DELETE("/follow/delete", {
    data: params,
  });
  return results?.data;
};

export const _UPDATE_NAME = async (params: IUpdateName): Promise<IUser> => {
  const results = await _PUT("/settings/update-user", params);
  return results?.data;
};

export const _UPDATE_PASSWORD = async (params: IUpdatePassword) => {
  const results = await _PUT("/settings/update-password", params);
  return results?.data;
};

export const _UPDATE_IMAGE = async (params: IUpdateImage): Promise<IUser> => {
  const results = await _POST("/users/upload-photo", params);
  return results?.data;
};
