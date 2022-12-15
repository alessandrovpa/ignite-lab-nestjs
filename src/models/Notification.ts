import { randomUUID } from 'crypto';
import { Content } from './Content';

interface INotification {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
}

class Notification {
  private _id: string;
  private props: INotification;

  public constructor(props: Omit<INotification, 'readAt' | 'createdAt'>) {
    const createdAt = new Date();
    const readAt = null;
    this._id = randomUUID();
    this.props = {
      createdAt,
      readAt,
      ...props,
    };
  }

  public get id(): string {
    return this._id;
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get category(): string {
    return this.props.category;
  }

  public set readAt(readAt: Date | null | undefined) {
    this.props.readAt = readAt;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}

export { Notification };
