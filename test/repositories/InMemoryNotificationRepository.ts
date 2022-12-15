import { Notification } from 'src/models/Notification';
import { DefaultNotificationRepository } from 'src/repositories/DefaultNotificationRepository';

class InMemoryNotificationRepository implements DefaultNotificationRepository {
  public notifications: Notification[];
  constructor() {
    this.notifications = [];
  }
  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}

export { InMemoryNotificationRepository };
