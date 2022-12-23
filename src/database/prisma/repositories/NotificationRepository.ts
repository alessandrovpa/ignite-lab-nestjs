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
    const prismaNotification = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notification.update({
      data: prismaNotification,
      where: {
        id: notification.id,
      },
    });
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const prismaNotification = await this.prismaService.notification.findUnique(
      {
        where: {
          id: notificationId,
        },
      },
    );

    if (!prismaNotification) return null;

    const notification = PrismaNotificationMapper.toModel(prismaNotification);

    return notification;
  }

  async countRecipientNotifications(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: {
        recipientId,
        canceledAt: null,
        readAt: null,
      },
    });

    return count;
  }

  async listNotificationsByRecipientId(
    recipientId: string,
  ): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        recipientId,
        readAt: null,
        canceledAt: null,
      },
    });
    const modelNotifications = notifications.map((notification) =>
      PrismaNotificationMapper.toModel(notification),
    );

    return modelNotifications;
  }
}

export { NotificationRepository };
