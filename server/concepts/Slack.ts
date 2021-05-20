import { WebClient } from '@slack/web-api';
import logger from '../utils/logger';

export default class Slack {
  private static client = new WebClient(process.env.SLACK_APP_TOKEN);

  public static async getUserList() {
    try {
      const response = await Slack.client.users.list();
      return response.members || [];
    } catch (error) {
      logger.error('Error: get user list', error);
      throw error;
    }
  }

  public static async getUsersChannels(emails: string[]) {
    try {
      const users = await Slack.getUserList();
      const channels: string[] = [];

      emails.forEach((email) => {
        channels.push(users.find((user) => user.profile?.email === email)?.id || '');
      });

      return channels;
    } catch (error) {
      logger.error('Error: get users channels', error);
      throw error;
    }
  }

  public static async sendMessage(channel: string, message: string) {
    try {
      const response = await Slack.client.chat.postMessage({
        channel,
        text: message,
      });

      return response.ok;
    } catch (error) {
      if (error.data.error === 'channel_not_found')
        return false;

      logger.error('Error: send message', error);
      throw error;
    }
  }

  public static async sendMessages(channels: string[], message: string) {
    channels.forEach(async (channel) => {
      await Slack.sendMessage(channel, message);
    });
  }
}
