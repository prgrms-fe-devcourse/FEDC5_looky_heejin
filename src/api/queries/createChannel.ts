import { _POST } from "@/api";
import { ICreateChannelParams } from "@/types/channel";

export const _CREATE_CHANNEL = async (params: ICreateChannelParams) => {
  const result = await _POST("/channels/create", params);
  return result?.data;
};
