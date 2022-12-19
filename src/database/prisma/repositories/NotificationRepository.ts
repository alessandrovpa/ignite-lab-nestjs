import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/PrismaService';
import { Notification } from 'src/models/Notification';
import { DefaultNotificationRepository } from 'src/repositories/DefaultNotificationRepository';
import { PrismaNotificationMapper } from '../mappers/PrismaNotificationMapper';

@Injectable()
class NotificationRepository implements DefaultNotificationRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: PrismaNotificationMapper.toPrisma(notification),
    });
  }

  async save(notification: Notification): Promise<void> {
    await this.prismaService.notification.update({
      data: notification,
      where: {
        id: notification.id,
      },
    });
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    return notification;
  }
}

export { NotificationRepository };
