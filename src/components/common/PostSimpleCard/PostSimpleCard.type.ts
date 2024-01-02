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
  author: string;
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
}
