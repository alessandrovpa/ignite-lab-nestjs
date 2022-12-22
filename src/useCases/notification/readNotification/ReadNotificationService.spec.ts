import { DefaultNotificationRepository } from '@repositories/DefaultNotificationRepository';
import { InMemoryNotificationRepository } from '@test/repositories/InMemoryNotificationRepository';
import { CreateNotificationService } from '../createNotification/CreateNotificationService';
import { ReadNotificationService } from './ReadNotificationService';

let notificationRepository: DefaultNotificationRepository;
let readNotificationService: ReadNotificationService;

describe('Read notification service', () => {
  beforeAll(() => {
    notificationRepository = new InMemoryNotificationRepository();
    readNotificationService = new ReadNotificationService(
      notificationRepository,
    );
  });

  it('should be able to read a notification', async () => {
    const createNotificationService = new CreateNotificationService(
      notificationRepository,
    );

    const notificationProps = {
      content: 'some notification',
      category: 'some category',
      recipientId: 'recipient',
    };

    const notification = await createNotificationService.execute({
      content: notificationProps.content,
      category: notificationProps.category,
      recipientId: notificationProps.recipientId,
    });

    expect(notification.readAt).toBe(null);

    const result = await readNotificationService.execute(notification.id);

    const verifyNotification = await notificationRepository.findById(
      notification.id,
    );

    expect(result).toBe(true);
    expect(verifyNotification?.readAt).toBeInstanceOf(Date);
  });

  it('should not be able to read an inexistent notification', async () => {
    const result = await readNotificationService.execute('inexistent-id');

    expect(result).toBe(false);
  });
});
