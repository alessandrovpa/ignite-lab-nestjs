import { Content } from './Content';
import { Notification } from './Notification';

const recipientId = 'abc';
const content = new Content('abcde');
const category = 'category';

describe('Notification Model', () => {
  it('should be able to create a new notification', () => {
    const notification = new Notification({
      recipientId,
      content,
      category,
    });

    expect(notification).toHaveProperty('id');
    expect(notification).toHaveProperty('createdAt');
    expect(notification).toHaveProperty('readAt', null);
  });

  it('should be able to read a notification', () => {
    const notification = new Notification({
      recipientId,
      content,
      category,
    });

    expect(notification.readAt).toBe(null);
    notification.read();
    expect(notification.readAt).toBeInstanceOf(Date);
  });

  it('should be able to unread a notification', () => {
    const notification = new Notification({
      recipientId,
      content,
      category,
    });

    notification.read();
    expect(notification.readAt).toBeInstanceOf(Date);

    notification.unread();
    expect(notification.readAt).toBe(null);
  });

  it('should be able to cancel a notification', () => {
    const notification = new Notification({
      recipientId,
      content,
      category,
    });

    expect(notification.canceledAt).toBe(null);
    notification.cancel();
    expect(notification.canceledAt).toBeInstanceOf(Date);
  });
});
