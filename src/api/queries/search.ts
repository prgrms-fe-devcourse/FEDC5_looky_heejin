import { _GET } from "@/api";

export const _SEARCH = async (query: string) => {
  if (!query) {
    throw new Error("Query is Required");
  }
  const results = await _GET(`/search/all/${query}`);
  return results?.data;
};

export const _SEARCH_USERS = async (query: string) => {
  if (!query) {
    throw new Error("Query is Required");
  }
  const results = await _GET(`search/users/${query}`);
  return results?.data;
};
