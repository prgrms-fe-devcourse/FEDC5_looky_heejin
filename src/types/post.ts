import { IChannel } from "./channel";
import { IUser } from "./user";

export interface ITag {
  id: string;
  brand: string;
  product: string;
  link?: string;
  x?: number;
  y?: number;
}

export interface IPost {
  likes: ILike[];
  comments: Comment[];
  _id: string;
  image?: string;
  imagePublicId?: string;
  title: string;
  channel: IChannel;
  author: IUser;
  createdAt: string;
  updatedAt: string;
}

export interface ILike {
  _id: string;
  user: string; // 사용자 id
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
}

export interface IComment {
  _id: string;
  comment: string;
  author: IUser;
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
}
