import { Injectable } from '@nestjs/common';
import { DefaultNotificationRepository } from '@repositories/DefaultNotificationRepository';

interface Response {
  recipientId: string;
  notificationsCount: number;
}

@Injectable()
class CountRecipientNotificationService {
  constructor(
    private readonly notificationRepository: DefaultNotificationRepository,
  ) {}

  async execute(recipientId: string): Promise<Response> {
    const notificationsCount =
      await this.notificationRepository.countRecipientNotifications(
        recipientId,
      );

    return { recipientId, notificationsCount };
  }
}

export { CountRecipientNotificationService };
