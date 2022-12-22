import { Content } from '@models/Content';
import { Notification } from '@models/Notification';
import { Notification as PrismaNotification } from '@prisma/client';

class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
    };
  }

  static toModel({
    id,
    canceledAt,
    category,
    content,
    createdAt,
    readAt,
    recipientId,
  }: PrismaNotification) {
    return new Notification({
      content: new Content(content),
      category,
      recipientId,
      id,
      canceledAt,
      createdAt,
      readAt,
    });
  }
}

export { PrismaNotificationMapper };
