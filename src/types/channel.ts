export interface IChannel {
  authRequired: boolean;
  posts: string[];
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateChannelParams {
  authRequired: boolean;
  description: string;
  name: string;
}
