import { Content } from './Content';
import { Notification } from './Notification';

describe('Notification Model', () => {
  it('should be able to create a new notification object', () => {
    const recipientId = 'abc';
    const content = new Content('abcde');
    const category = 'category';

    const notification = new Notification({
      recipientId,
      content,
      category,
    });

    expect(notification).toHaveProperty('id');
    expect(notification).toHaveProperty('createdAt');
    expect(notification).toHaveProperty('readAt', null);
  });
});
