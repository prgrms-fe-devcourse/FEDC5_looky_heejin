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

export interface ICreateComment {
  comment: string;
  postId: string;
}
export interface IDeleteComment {
  id: string;
}

export interface ICreateLike {
  postId: string;
}

export interface IDeleteLike {
  id: string;
}

export interface IFollow {
  userId: string;
}

export interface IUnfollow {
  id: string;
}

export interface INotification {
  notificationType: "COMMENT" | "FOLLOW" | "LIKE" | "MESSAGE";
  notificationTypeId: string;
  userId: string;
  postId: string | null;
}
