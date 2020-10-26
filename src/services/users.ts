import { User } from '../models/User';
import { axiosIntance } from './axiosConfig';

export const UsersService = {
  getAll: () => axiosIntance.get("/users"),
  create: (user: User) => axiosIntance.post("/users", user),
};
