import { Notification } from 'src/models/Notification';

abstract class DefaultNotificationRepository {
  abstract create(notification: Notification): Promise<void>;
}

export { DefaultNotificationRepository };
