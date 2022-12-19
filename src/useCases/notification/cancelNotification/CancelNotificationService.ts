import { DefaultNotificationRepository } from '@repositories/DefaultNotificationRepository';
import { Injectable } from '@nestjs/common';
import { Notification } from '@models/Notification';

@Injectable()
class CancelNotificationService {
  constructor(
    private readonly notificationRepository: DefaultNotificationRepository,
  ) {}

  async execute(notificationId: string): Promise<Notification> {
    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new Error('Notificação não encontrada!');
    }

    notification.cancel();

    await this.notificationRepository.save(notification);

    return notification;
  }
}

export { CancelNotificationService };
