import { _GET } from "@/api";

export const _CHANNEL_POSTS = async (query: string) => {
  if (!query) {
    throw new Error("Query is Required");
  }
  const results = await _GET(`/posts/channel/${query}`);
  return results?.data;
};
