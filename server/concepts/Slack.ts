import { WebClient } from '@slack/web-api';

export default class Slack {
  private static connection = new WebClient(process.env.SLACK_APP_TOKEN);

  public static async getUserList() {
    const response = await Slack.connection.users.list();
    return response.members;
  }
}
