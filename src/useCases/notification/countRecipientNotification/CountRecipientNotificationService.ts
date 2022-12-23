import { Injectable } from '@nestjs/common';
import { DefaultNotificationRepository } from '@repositories/DefaultNotificationRepository';

interface ResponseDTO {
  recipientId: string;
  notificationsCount: number;
}

@Injectable()
class CountRecipientNotificationService {
  constructor(
    private readonly notificationRepository: DefaultNotificationRepository,
  ) {}

  async execute(recipientId: string): Promise<ResponseDTO> {
    const notificationsCount =
      await this.notificationRepository.countRecipientNotifications(
        recipientId,
      );

    return { recipientId, notificationsCount };
  }
}

export { CountRecipientNotificationService };
