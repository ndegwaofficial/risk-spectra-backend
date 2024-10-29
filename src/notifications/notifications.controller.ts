import { Controller, Get, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NotificationsService } from './notifications.service';
import { User } from '../users/decorators/user.decorator';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async findAll(@User() user: any) {
    return this.notificationsService.findAllForUser(user.id);
  }

  @Get('unread')
  async findUnread(@User() user: any) {
    return this.notificationsService.findUnreadForUser(user.id);
  }

  @Post(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(+id);
  }

  @Post('mark-all-read')
  async markAllAsRead(@User() user: any) {
    return this.notificationsService.markAllAsRead(user.id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.notificationsService.deleteNotification(+id);
  }
}