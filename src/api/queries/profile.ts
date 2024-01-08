import { _GET } from "@/api";

export const _GET_USER = async (userId: string) => {
  if (!userId) {
    throw new Error("Query is Required");
  }
  const results = await _GET(`/users/${userId}`);
  return results?.data;
};
