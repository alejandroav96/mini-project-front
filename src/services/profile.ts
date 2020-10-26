import { firebase } from '../helpers/firebase';
import { User } from '../models/User';
import { axiosIntance } from './axiosConfig';

const getToken = async () => {
  return await firebase.auth.currentUser?.getIdToken();
}

export const ProfileService = {
  get: async () => axiosIntance.get("/profile", {
    headers: {
      Authorization: await getToken()
    }
  }),

  update: async (user: User) => axiosIntance.put("/profile", user, {
    headers: {
      Authorization: await getToken()
    }
  }),
};
