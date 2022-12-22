import { ListAvaiablesNotificationsService } from './ListAvaiablesNotificationsService';
import { InMemoryNotificationRepository } from '@test/repositories/InMemoryNotificationRepository';
import { CreateNotificationService } from '../createNotification/CreateNotificationService';
import { ReadNotificationService } from '../readNotification/ReadNotificationService';
import { CancelNotificationService } from '../cancelNotification/CancelNotificationService';

describe('List not read notification by recipient id', () => {
  const recipientId = 'recipient';
  const content = 'some notification';
  const category = 'some category';
  it('sould be able to list not read and canceled notifications from a specific recipient', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const createNotificationService = new CreateNotificationService(
      notificationRepository,
    );
    const listAvaiablesNotificationsService =
      new ListAvaiablesNotificationsService(notificationRepository);
    const readNotificationService = new ReadNotificationService(
      notificationRepository,
    );
    const cancelNotificationService = new CancelNotificationService(
      notificationRepository,
    );

    const firstNotification = await createNotificationService.execute({
      recipientId,
      content,
      category,
    });

    const secondNotification = await createNotificationService.execute({
      recipientId,
      content,
      category,
    });

    await createNotificationService.execute({
      recipientId,
      content,
      category,
    });

    let notifications = await listAvaiablesNotificationsService.execute(
      recipientId,
    );

    expect(notifications).toHaveLength(3);

    await readNotificationService.execute(firstNotification.id);
    notifications = await listAvaiablesNotificationsService.execute(
      recipientId,
    );
    expect(notifications).toHaveLength(2);

    await cancelNotificationService.execute(secondNotification.id);
    notifications = await listAvaiablesNotificationsService.execute(
      recipientId,
    );

    expect(notifications).toHaveLength(1);
  });
});
