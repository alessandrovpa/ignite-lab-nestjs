import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateNotificationBody } from './create-notification-body';
import { PrismaService } from './prisma.service';

@Injectable()
export class CreateNotificationService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ recipientId, content, category }: CreateNotificationBody) {
    const notification = await this.prismaService.notification.create({
      data: {
        id: randomUUID(),
        recipientId,
        content,
        category,
      },
    });

    return notification;
  }
}
