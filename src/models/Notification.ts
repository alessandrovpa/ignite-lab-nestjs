import { randomUUID } from 'crypto';
import { Content } from './Content';

interface INotification {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  createdAt: Date;
}

interface IConstructorNotification {
  id?: string;
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  createdAt?: Date;
}

class Notification {
  private _id: string;
  private props: INotification;

  public constructor(props: IConstructorNotification) {
    const createdAt = props.createdAt ? props.createdAt : new Date();
    const canceledAt = props.createdAt ? props.canceledAt : null;
    const readAt = props.readAt ? props.readAt : null;
    this._id = props.id ? props.id : randomUUID();
    this.props = {
      createdAt,
      readAt,
      canceledAt,
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

  public read(): void {
    this.props.readAt = this.props.readAt ? this.props.readAt : new Date();
  }
  public unread(): void {
    this.props.readAt = null;
  }
  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public cancel(): void {
    this.props.canceledAt = this.props.canceledAt
      ? this.props.canceledAt
      : new Date();
  }
  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}

export { Notification };
