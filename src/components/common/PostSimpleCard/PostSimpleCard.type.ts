export interface IPost {
  likes: ILike[];
  comments: IComment[];
  _id: string;
  image?: string;
  imagePublicId?: string;
  title: string;
  channel: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface IChannel {
  authRequired: boolean;
  posts: string[];
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  coverImage: string;
  image: string;
  role: string;
  emailVerified: boolean;
  banned: boolean;
  isOnline: boolean;
  posts: IPost[];
  likes: ILike[];
  comments: string[];
  followers: [];
  following: IFollow[];
  notifications: Notification[];
  messages: IMessage[];
  _id: string;
  fullName: string;
  nickname: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILike {
  _id: string;
  user: string; // 사용자 id
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IComment {
  _id: string;
  comment: string;
  author: IUser; //수정해야함 IUSER인듯?
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
}

export interface IFollow {
  _id: string;
  user: string;
  follower: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  coverImage: string;
  image: string;
  role: string;
  emailVerified: boolean;
  banned: boolean;
  isOnline: boolean;
  posts: IPost[];
  likes: ILike[];
  comments: string[];
  followers: [];
  following: IFollow[];
  notifications: Notification[];
  messages: IMessage[];
  _id: string;
  fullName: string;
  nickname: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMessage {
  _id: string;
  message: string;
  sender: IUser;
  receiver: IUser;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
}
