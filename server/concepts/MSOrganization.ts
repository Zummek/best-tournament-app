import axios from 'axios';
import { MSUser } from '../../shared/types/User';
import User from './User';

export default class MSOrganization {
  public static async getAllUsers(token: string): Promise<User[]> {
    const response = await axios({
      method: 'GET',
      url: 'https://graph.microsoft.com/beta/users',
      headers: {
        Authorization: token,
      },
    });

    return response.data.value.map((rawUser: MSUser) => new User(rawUser));
  }

  public static async getUserPhoto(token: string, userId: string) {
    const photo = await axios({
      method: 'GET',
      url: `https://graph.microsoft.com/beta/users/${userId}/photo/$value`,
      headers: {
        Authorization: token,
      },
    });

    return photo.data;
  }
}
