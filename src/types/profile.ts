export interface IFollow {
  userId: string;
}

export interface IUnFollow {
  id: string;
}

export interface IFollowResponse {
  _id: string;
  user?: string;
  follower: string;
  createdAt: string;
  updatedAt: string;
}
