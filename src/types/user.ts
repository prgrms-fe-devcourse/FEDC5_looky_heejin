import { IMessage } from "./message";
import { ILike, IPost } from "./post";

export interface IUser {
  coverImage?: string; // 커버 이미지
  image?: string; // 프로필 이미지
  role: string;
  emailVerified: boolean; // 사용되지 않음
  banned: boolean; // 사용되지 않음
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
