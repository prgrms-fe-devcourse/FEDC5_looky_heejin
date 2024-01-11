import { IMessage } from "./message";
import { ILike, IPost } from "./post";

export interface IUser {
  coverImage?: string;
  image?: string;
  role: string;
  emailVerified: boolean;
  banned: boolean;
  isOnline: boolean;
  posts: IPost[];
  likes: ILike[];
  comments: string[];
  followers: IFollow[];
  following: IFollow[];
  notifications: Notification[];
  messages: IMessage[];
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IFollow {
  _id: string;
  user: string;
  follower: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
