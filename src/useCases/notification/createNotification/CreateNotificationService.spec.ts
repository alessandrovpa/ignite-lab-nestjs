import { CreateNotificationService } from './CreateNotificationService';
import { InMemoryNotificationRepository } from '@test/repositories/InMemoryNotificationRepository';

describe('CreateNotificationService', () => {
  it('should be able to create a new notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const createNotificationService = new CreateNotificationService(
      notificationRepository,
    );
    const notification = await createNotificationService.execute({
      recipientId: 'recipient-id',
      category: 'category',
      content: 'content',
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
