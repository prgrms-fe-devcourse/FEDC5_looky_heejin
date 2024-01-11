export interface IPost {
  likes: any[];
  comments: any[];
  _id: string;
  image?: string;
  imagePublicId?: string;
  channel: IChannel;
  title: string;
  author: IUser;
  createdAt: string;
  updatedAt: string;
  __v: number;
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

export interface INotification {
  seen: boolean;
  _id: string;
  author: any;
  user: IUser | string;
  post?: string | null;
  follow?: string | null;
  comment?: string | null;
  message?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  coverImage?: string;
  image?: string;
  role: string;
  emailVerified: boolean;
  banned: boolean;
  isOnline: boolean;
  posts: string[];
  likes: any[];
  comments: any[];
  followers: any[];
  following: any[];
  notifications: any[];
  messages: any[];
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ILike {
  _id: string;
  user: string;
  post: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IComment {
  _id: string;
  comment: string;
  author: IUser;
  post: string;
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

export interface IMessage {
  _id: string;
  message: string;
  sender: IUser;
  receiver: IUser;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
}
