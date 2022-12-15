import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/PrismaService';

@Injectable()
export class ListNotificationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute() {
    const notifications = await this.prismaService.notification.findMany();

    return notifications;
  }
}
