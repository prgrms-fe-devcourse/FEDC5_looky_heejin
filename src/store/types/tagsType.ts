import { ITag } from "@/types/post";

export type TAGS_ACTION =
  | { type: "SET_TAGS"; tags: ITag[] }
  | { type: "ADD_TAG"; tag: ITag }
  | { type: "DELETE_TAG"; tagId: string }
  | { type: "INIT_TAGS" };
