import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/PrismaService';
import { Notification } from 'src/models/Notification';
import { DefaultNotificationRepository } from 'src/repositories/DefaultNotificationRepository';

@Injectable()
class NotificationRepository implements DefaultNotificationRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        content: notification.content.value,
        category: notification.category,
        recipientId: notification.recipientId,
        createdAt: notification.createdAt,
        readAt: notification.readAt,
      },
    });
  }
}

export { NotificationRepository };
