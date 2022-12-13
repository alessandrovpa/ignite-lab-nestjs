import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateNotificationService } from './createNotification.service';
import { NotificationController } from './notification.controller';
import { ListNotificationsService } from './listNotifications.service';

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [
    PrismaService,
    CreateNotificationService,
    ListNotificationsService,
  ],
})
export class AppModule {}
