import { Injectable } from '@nestjs/common';
import { DefaultNotificationRepository } from '@repositories/DefaultNotificationRepository';

@Injectable()
class ReadNotificationService {
  constructor(
    private readonly notificationRepository: DefaultNotificationRepository,
  ) {}

  async execute(notificationId: string): Promise<boolean> {
    const notification = await this.notificationRepository.findById(
      notificationId,
    );
    if (!notification) return false;
    notification.read();
    await this.notificationRepository.save(notification);
    if (!notification.readAt) return false;
    return true;
  }
}

export { ReadNotificationService };
