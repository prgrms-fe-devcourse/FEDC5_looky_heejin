import { ITag } from "@/types/post";

export type NEW_POST_ACTION =
  | { type: "SET_TAGS"; tags: ITag[] }
  | { type: "ADD_TAG"; tag: ITag }
  | { type: "DELETE_TAG"; tagId: string }
  | { type: "SET_CHANNEL"; channelId: string; channelName: string }
  | { type: "INIT" };
