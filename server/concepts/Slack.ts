import { WebClient } from '@slack/web-api';
import logger from '../utils/logger';

export default class Slack {
  private static client = new WebClient(process.env.SLACK_APP_TOKEN);

  public static async getUserList() {
    try {
      const response = await Slack.client.users.list();
      return response.members || [];
    } catch (error) {
      logger.error('Could not get slack\'s user list', error);
      throw error;
    }
  }

  public static async getUsersIds(emails: string[]) {
    try {
      const allUsers = await Slack.getUserList();
      const usersIds: string[] = [];

      emails.forEach((email) => {
        const userId = allUsers.find((user) => user.profile?.email === email)?.id;
        if (userId)
          usersIds.push(userId);
      });

      return usersIds;
    } catch (error) {
      logger.error('Could not get slack\'s users ids', error);
      throw error;
    }
  }

  public static async openConversation(userIds: string[]) {
    const userIdsString = userIds.join(',');
    try {
      const conversationRes = await Slack.client.conversations.open({
        users: userIdsString,
      });

      if (!conversationRes.ok || !conversationRes.channel?.id)
        throw new Error('Could not open slack conversation');

      return conversationRes.channel.id;
    } catch (error) {
      logger.error('Could not open slack conversation', error);
      throw error;
    }
  }

  public static async sendMessage(channelId: string, message: string) {
    try {
      const response = await Slack.client.chat.postMessage({
        channel: channelId,
        text: message,
      });

      return response.ok;
    } catch (error) {
      logger.error('Could not send slack message', error);
      throw error;
    }
  }
}
