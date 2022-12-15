import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { NotificationDTO } from '../dtos/NotificationDTO';
import { CreateNotificationService } from '../../useCases/notification/createNotification/CreateNotificationService';

@Controller('/notification')
@Injectable()
class NotificationController {
  constructor(
    private readonly createNotificationService: CreateNotificationService,
  ) {}

  @Post()
  async create(@Body() body: NotificationDTO) {
    const { recipientId, content, category } = body;

    const notification = await this.createNotificationService.execute({
      recipientId,
      content,
      category,
    });

    return notification;
  }
}

export { NotificationController };
