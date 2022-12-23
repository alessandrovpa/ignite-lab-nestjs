import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CreateNotificationService } from 'src/useCases/notification/createNotification/CreateNotificationService';
import { NotificationController } from './controllers/NotificationController';
import { CancelNotificationService } from 'src/useCases/notification/cancelNotification/CancelNotificationService';
import { ListAvaiablesNotificationsService } from 'src/useCases/notification/listAvaiablesNotifications/ListAvaiablesNotificationsService';
import { CountRecipientNotificationService } from 'src/useCases/notification/countRecipientNotification/CountRecipientNotificationService';
import { ReadNotificationService } from 'src/useCases/notification/readNotification/ReadNotificationService';
@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    CreateNotificationService,
    CancelNotificationService,
    ListAvaiablesNotificationsService,
    CountRecipientNotificationService,
    ReadNotificationService,
  ],
})
export class HTTPModule {}
