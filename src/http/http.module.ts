import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CreateNotificationService } from 'src/useCases/notification/createNotification/CreateNotificationService';
import { NotificationController } from './controllers/NotificationController';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [CreateNotificationService],
})
export class HTTPModule {}
