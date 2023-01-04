import {
  Body,
  Controller,
  Injectable,
  Post,
  Patch,
  Param,
  Get,
} from '@nestjs/common';
import { CreateNotificationDTO } from '../dtos/CreateNotificationDTO';
import { CreateNotificationService } from '@useCases/notification/createNotification/CreateNotificationService';
import { HTTPNotificationMapper } from '@http/view/HTTPNotificationMapper';
import { CancelNotificationService } from '@useCases/notification/cancelNotification/CancelNotificationService';
import { CountRecipientNotificationService } from '@useCases/notification/countRecipientNotification/CountRecipientNotificationService';
import { ListAvaiablesNotificationsService } from '@useCases/notification/listAvaiablesNotifications/ListAvaiablesNotificationsService';
import { ReadNotificationService } from '@useCases/notification/readNotification/ReadNotificationService';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/notification')
@ApiTags('notification')
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
  @ApiResponse({
    status: 200,
    description: 'Notification created successfully',
  })
  async create(@Body() createDTO: CreateNotificationDTO) {
    const { recipientId, content, category } = createDTO;

    const notification = await this.createNotificationService.execute({
      recipientId,
      content,
      category,
    });

    return HTTPNotificationMapper.toHTTP(notification);
  }

  @Patch('/:id/cancel')
  async cancelNotification(@Param('id') id: string) {
    const canceledNotification = await this.cancelNotificationService.execute(
      id,
    );
    return HTTPNotificationMapper.toHTTP(canceledNotification);
  }

  @Patch('/:id/read')
  async readNotification(@Param('id') id: string) {
    const readedNotification = await this.readNotificationService.execute(id);
    return HTTPNotificationMapper.toHTTP(readedNotification);
  }

  @Get('/:recipientid/list')
  async listAvaiableNotificationsByRecipientId(
    @Param('recipientid') id: string,
  ) {
    const avaiablesNotifications =
      await this.listAvaiablesNotificationsService.execute(id);
    const HTTPAvaiablesNotifications = avaiablesNotifications.map(
      (notification) => HTTPNotificationMapper.toHTTP(notification),
    );
    return HTTPAvaiablesNotifications;
  }

  @Get('/:recipientid/count')
  async countRecipientNotifications(@Param('recipientid') id: string) {
    const { notificationsCount, recipientId } =
      await this.countRecipientNotificationService.execute(id);

    return { notificationsCount, recipientId };
  }
}

export { NotificationController };
