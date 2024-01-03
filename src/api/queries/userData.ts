import { _GET } from "@/api";

export const _USERDATA = async (params: string) => {
  const result = await _GET(`/users/${params}`);
  return result?.data;
};
