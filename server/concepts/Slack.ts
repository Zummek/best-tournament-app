import { WebClient } from '@slack/web-api';

const token = process.env.SLACK_APP_TOKEN;

const slackConnection = new WebClient(token);

export default class Slack {
  public static async getUserList() {
    const response = await slackConnection.users.list();
    return response.members;
  }
}
