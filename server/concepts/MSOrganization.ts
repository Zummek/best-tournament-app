import axios from 'axios';
import QueryString from 'qs';
import { MSUser } from '../../shared/types/User';
import User from './User';

export default class MSOrganization {
  public static async getApplicationToken() {
    const applicationToken = await axios({
      method: 'POST',
      url: `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`,
      data: QueryString.stringify({
        client_id: `${process.env.CLIENT_ID}`,
        scope: 'https://graph.microsoft.com/.default',
        client_secret: `${process.env.CLIENT_SECRET}`,
        grant_type: 'client_credentials',
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    return `Bearer ${applicationToken.data.access_token}`;
  }

  public static async getLogo() {
    const token = await MSOrganization.getApplicationToken();
    const applicationData = await axios({
      method: 'GET',
      url: `https://graph.microsoft.com/v1.0/applications/${process.env.OBJECT_ID}`,
      headers: {
        Authorization: token,
      },
    });

    return applicationData.data.info.logoUrl;
  }

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
