import { IComment, ILike } from "./post";
import { IUser } from "./user";

export interface INotification {
  seen: boolean;
  _id: string;
  author: IUser;
  user: IUser | string;
  post?: string | null; // 포스트 id
  follow?: string; // 사용자 id
  comment?: IComment;
  like?: ILike;
  message?: string; // 메시지 id
  createdAt: string;
  updatedAt: string;
}
