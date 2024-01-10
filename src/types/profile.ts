export interface IFollow {
  userId: string;
}

export interface IUnFollow {
  id: string;
}

export interface IUpdateName {
  fullName: string;
  username?: string | null;
}

export interface IUpdatePassword {
  password: string;
}

export interface IUpdateImage {
  isCover: boolean;
  image: File;
}

export interface IFollowResponse {
  _id: string;
  user?: string;
  follower: string;
  createdAt: string;
  updatedAt: string;
}
