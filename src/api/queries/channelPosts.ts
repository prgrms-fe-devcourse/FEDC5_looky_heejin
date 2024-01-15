import { _GET } from "@/api";

interface IAdditionalRequestType {
  offset: number;
  limit: number;
}

export const _CHANNEL_POSTS = async (
  query: string,
  { offset = 0, limit = 10 }: IAdditionalRequestType
) => {
  if (!query) {
    throw new Error("Query is Required");
  }
  const results = await _GET(
    `/posts/channel/${query}?offset=${offset}&limit=${limit}`
  );
  return results?.data;
};
