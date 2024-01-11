import { INotification } from "@/types";
import { _POST } from "..";

export const _NOTIFY = async (params: INotification) => {
  const result = await _POST("/notifications/create", params);
  return result?.data;
};
