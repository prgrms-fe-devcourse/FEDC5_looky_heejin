export interface IFollow {
  userId: string;
}

export interface IUnFollow {
  id: string;
}

export interface IUpdateName {
  fullName: string;
  userName?: string;
}

export interface IFollowResponse {
  _id: string;
  user?: string;
  follower: string;
  createdAt: string;
  updatedAt: string;
}
