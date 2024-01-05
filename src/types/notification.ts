import { IComment } from "./post";
import { IUser } from "./user";

export interface INotification {
  seen: boolean;
  _id: string;
  author: any;
  user: IUser | string;
  post?: string | null; // 포스트 id
  follow?: string | null; // 사용자 id
  comment?: string | null;
  message?: string | null; // 메시지 id
  createdAt: string;
  updatedAt: string;
}

// export interface INotification {
//   seen: boolean;
//   _id: string;
//   author: IUser;
//   user: IUser | string;
//   post?: string | null; // 포스트 id
//   follow?: string; // 사용자 id
//   comment?: IComment;
//   message?: string; // 메시지 id
//   createdAt: string;
//   updatedAt: string;
// }
