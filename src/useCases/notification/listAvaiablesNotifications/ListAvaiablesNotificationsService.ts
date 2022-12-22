import { Injectable } from '@nestjs/common';
import { DefaultNotificationRepository } from '@repositories/DefaultNotificationRepository';
import { Notification } from '@models/Notification';

@Injectable()
class ListAvaiablesNotificationsService {
  constructor(
    private readonly notificationRepository: DefaultNotificationRepository,
  ) {}

  async execute(recipientId: string): Promise<Notification[]> {
    const allRecipientNotifications =
      await this.notificationRepository.listNotificationsByRecipientId(
        recipientId,
      );
    const notifications = allRecipientNotifications.filter(
      (notification) =>
        notification.readAt === null && notification.canceledAt === null,
    );

    return notifications;
  }
}

export { ListAvaiablesNotificationsService };
