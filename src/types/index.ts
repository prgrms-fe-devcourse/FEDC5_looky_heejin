// types
export interface ILogIn {
  email: string;
  password: string;
}

export interface ISignIn {
  email: string;
  fullName: string;
  password: string;
}
export interface IUser {
  coverImage?: string;
  image?: string;
  role: string;
  emailVerified: boolean;
  banned: boolean;
  isOnline: boolean;
  posts: [];
  likes: [];
  comments: string[];
  followers: [];
  following: [];
  notifications: [];
  messages: [];
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IPost {
  likes: [];
  comments: [];
  _id: string;
  image?: string;
  imagePublicId?: string;
  title: string;
  channel: {};
  author: IUser;
  createdAt: String;
  updatedAt: String;
}

export interface IComment {
  comment: string;
  postId: string;
}
