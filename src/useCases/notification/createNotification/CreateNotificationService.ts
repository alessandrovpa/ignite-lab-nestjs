import { Injectable } from '@nestjs/common';
import { CreateNotificationDTO } from '@http/dtos/CreateNotificationDTO';
import { DefaultNotificationRepository } from '@repositories/DefaultNotificationRepository';
import { Notification } from '@models/Notification';
import { Content } from '@models/Content';

@Injectable()
class CreateNotificationService {
  constructor(
    private readonly notificationRepository: DefaultNotificationRepository,
  ) {}

  async execute({
    recipientId,
    content,
    category,
  }: CreateNotificationDTO): Promise<Notification> {
    const notification = new Notification({
      recipientId,
      category,
      content: new Content(content),
    });

    await this.notificationRepository.create(notification);

    return notification;
  }
}

export { CreateNotificationService };
