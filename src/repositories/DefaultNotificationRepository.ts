import { Notification } from 'src/models/Notification';

abstract class DefaultNotificationRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract save(notification: Notification): Promise<void>;
  abstract countRecipientNotifications(recipientId: string): Promise<number>;
}

export { DefaultNotificationRepository };
