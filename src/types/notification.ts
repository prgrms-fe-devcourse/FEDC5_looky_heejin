import { IComment, ILike } from "./post";
import { IUser } from "./user";

export interface INotification {
  seen: boolean;
  _id: string;
  author: IUser;
  user: IUser | string;
  post?: string | null;
  follow?: string;
  comment?: IComment;
  like?: ILike;
  message?: string;
  createdAt: string;
  updatedAt: string;
}
