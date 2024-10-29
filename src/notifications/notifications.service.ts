// src/notifications/notifications.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, NotificationType, NotificationStatus } from './entities/notification.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  async create(
    recipient: User,
    type: NotificationType,
    title: string,
    message: string,
    metadata?: Record<string, any>,
  ): Promise<Notification> {
    const notification = this.notificationsRepository.create({
      recipient,
      type,
      title,
      message,
      metadata,
      status: NotificationStatus.UNREAD,
    });

    return this.notificationsRepository.save(notification);
  }

  async findAllForUser(userId: number): Promise<Notification[]> {
    return this.notificationsRepository.find({
      where: { recipient: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findUnreadForUser(userId: number): Promise<Notification[]> {
    return this.notificationsRepository.find({
      where: { 
        recipient: { id: userId },
        status: NotificationStatus.UNREAD,
      },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(id: number): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({
      where: { id },
    });
    
    if (notification) {
      notification.status = NotificationStatus.READ;
      notification.readAt = new Date();
      return this.notificationsRepository.save(notification);
    }
    
    return null;
  }

  async markAllAsRead(userId: number): Promise<void> {
    await this.notificationsRepository.update(
      { recipient: { id: userId }, status: NotificationStatus.UNREAD },
      { status: NotificationStatus.READ, readAt: new Date() },
    );
  }

  async deleteNotification(id: number): Promise<void> {
    await this.notificationsRepository.delete(id);
  }
}