import {
  Body,
  Controller,
  Injectable,
  Post,
  Patch,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { NotificationDTO } from '../dtos/NotificationDTO';
import { CreateNotificationService } from '@useCases/notification/createNotification/CreateNotificationService';
import { HTTPNotificationMapper } from '@http/view/HTTPNotificationMapper';
import { CancelNotificationService } from '@useCases/notification/cancelNotification/CancelNotificationService';
import { CountRecipientNotificationService } from '@useCases/notification/countRecipientNotification/CountRecipientNotificationService';
import { ListAvaiablesNotificationsService } from '@useCases/notification/listAvaiablesNotifications/ListAvaiablesNotificationsService';
import { ReadNotificationService } from '@useCases/notification/readNotification/ReadNotificationService';

interface RequestDTO {
  id: string;
}
@Controller('/notification')
@Injectable()
class NotificationController {
  constructor(
    private readonly createNotificationService: CreateNotificationService,
    private readonly cancelNotificationService: CancelNotificationService,
    private readonly countRecipientNotificationService: CountRecipientNotificationService,
    private readonly listAvaiablesNotificationsService: ListAvaiablesNotificationsService,
    private readonly readNotificationService: ReadNotificationService,
  ) {}

  @Post()
  async create(@Body() body: NotificationDTO) {
    const { recipientId, content, category } = body;

    const notification = await this.createNotificationService.execute({
      recipientId,
      content,
      category,
    });

    return HTTPNotificationMapper.toHTTP(notification);
  }

  @Patch('/cancel/:id')
  async cancelNotification(@Param() { id }: RequestDTO) {
    const canceledNotification = await this.cancelNotificationService.execute(
      id,
    );
    return HTTPNotificationMapper.toHTTP(canceledNotification);
  }

  @Patch('/read/:id')
  async readNotification(@Param() { id }: RequestDTO) {
    const readedNotification = await this.readNotificationService.execute(id);
    return HTTPNotificationMapper.toHTTP(readedNotification);
  }

  @Get()
  async listAvaiableNotificationsByRecipientId(@Query() { id }: RequestDTO) {
    const avaiablesNotifications =
      await this.listAvaiablesNotificationsService.execute(id);
    const HTTPAvaiablesNotifications = avaiablesNotifications.map(
      (notification) => HTTPNotificationMapper.toHTTP(notification),
    );
    return HTTPAvaiablesNotifications;
  }

  @Get('/count')
  async countRecipientNotifications(@Query() { id }: RequestDTO) {
    const { notificationsCount, recipientId } =
      await this.countRecipientNotificationService.execute(id);

    return { notificationsCount, recipientId };
  }
}

export { NotificationController };
