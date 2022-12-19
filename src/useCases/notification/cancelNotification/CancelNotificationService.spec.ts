import { InMemoryNotificationRepository } from '@test/repositories/InMemoryNotificationRepository';
import { CancelNotificationService } from './CancelNotificationService';
import { Notification } from '@models/Notification';
import { Content } from '@models/Content';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotificationService = new CancelNotificationService(
      notificationRepository,
    );

    const newNotifcation = new Notification({
      recipientId: 'user-id',
      category: 'warn',
      content: new Content('Nova notificação'),
    });
    notificationRepository.notifications.push(newNotifcation);

    await cancelNotificationService.execute(newNotifcation.id);

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existent notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotificationService = new CancelNotificationService(
      notificationRepository,
    );

    expect(() => {
      return cancelNotificationService.execute('non-existent-id');
    }).rejects.toThrow(Error);
  });
});
