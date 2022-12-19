import { Notification } from '@models/Notification';

class HTTPNotificationMapper {
  static toHTTP(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
    };
  }
}

export { HTTPNotificationMapper };
