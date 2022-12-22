import { Notification } from 'src/models/Notification';
import { DefaultNotificationRepository } from 'src/repositories/DefaultNotificationRepository';

class InMemoryNotificationRepository implements DefaultNotificationRepository {
  public notifications: Notification[];
  constructor() {
    this.notifications = [];
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.notifications.find(
      (notification) => notification.id === notificationId,
    );

    if (!notification) {
      return null;
    }

    return notification;
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (actualNotification) => actualNotification.id === notification.id,
    );
    this.notifications[notificationIndex] = notification;
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async countRecipientNotifications(recipientId: string): Promise<number> {
    const notificationsByRecipientId = await this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );

    return notificationsByRecipientId.length;
  }

  async listNotificationsByRecipientId(
    recipientId: string,
  ): Promise<Notification[]> {
    const notifications = this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );
    return notifications;
  }
}

export { InMemoryNotificationRepository };
