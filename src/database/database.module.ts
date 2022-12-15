import { Module } from '@nestjs/common';
import { DefaultNotificationRepository } from 'src/repositories/DefaultNotificationRepository';
import { PrismaService } from './prisma/PrismaService';
import { NotificationRepository } from './prisma/repositories/NotificationRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: DefaultNotificationRepository,
      useClass: NotificationRepository,
    },
  ],
  exports: [DefaultNotificationRepository],
})
export class DatabaseModule {}
