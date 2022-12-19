import { InMemoryNotificationRepository } from '@test/repositories/InMemoryNotificationRepository';
import { CountRecipientNotificationService } from './CountRecipientNotificationService';
import { Notification } from '@models/Notification';
import { Content } from '@models/Content';

describe('Count notification', () => {
  it('should be able to count notifications by recipient', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotificationService =
      new CountRecipientNotificationService(notificationRepository);

    let newNotifcation = new Notification({
      recipientId: 'user-id',
      category: 'warn',
      content: new Content('Nova notificação'),
    });
    notificationRepository.create(newNotifcation);

    newNotifcation = new Notification({
      recipientId: 'user-id',
      category: 'warn',
      content: new Content('Nova notificação'),
    });
    notificationRepository.create(newNotifcation);

    newNotifcation = new Notification({
      recipientId: 'another-user-id',
      category: 'warn',
      content: new Content('Nova notificação'),
    });
    notificationRepository.create(newNotifcation);

    const countNotification = await countRecipientNotificationService.execute(
      'user-id',
    );
    const countNotificationFromAnotherUser =
      await countRecipientNotificationService.execute('another-user-id');

    expect(countNotification.notificationsCount).toBe(2);
    expect(countNotificationFromAnotherUser.notificationsCount).toBe(1);
  });
});
