import { Body, Controller, Get, Injectable, Post } from '@nestjs/common';
import { CreateNotificationBody } from './create-notification-body';
import { CreateNotificationService } from './createNotification.service';
import { ListNotificationsService } from './listNotifications.service';

@Controller('/notification')
@Injectable()
export class NotificationController {
  constructor(
    private readonly createNotificationService: CreateNotificationService,
    private readonly listNotificationsService: ListNotificationsService,
  ) {}

  @Get()
  async list() {
    const notifications = await this.listNotificationsService.execute();
    return notifications;
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const notification = await this.createNotificationService.execute({
      recipientId,
      content,
      category,
    });

    return notification;
  }
}
