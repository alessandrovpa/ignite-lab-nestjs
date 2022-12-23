import { Injectable } from '@nestjs/common';
import { DefaultNotificationRepository } from '@repositories/DefaultNotificationRepository';
import { Notification } from '@models/Notification';
@Injectable()
class ReadNotificationService {
  constructor(
    private readonly notificationRepository: DefaultNotificationRepository,
  ) {}

  async execute(notificationId: string): Promise<Notification> {
    const notification = await this.notificationRepository.findById(
      notificationId,
    );
    if (!notification) throw new Error('Notificação não encontrada!');
    notification.read();
    await this.notificationRepository.save(notification);
    if (!notification.readAt) throw new Error('Tente novamente!');
    return notification;
  }
}

export { ReadNotificationService };
