import { Injectable } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationType } from './entities/notification.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class NotificationEventsService {
  constructor(private readonly notificationsService: NotificationsService) {}

  async onCaseUpdate(user: User, caseId: number, updateType: string): Promise<void> {
    await this.notificationsService.create(
      user,
      NotificationType.CASE_UPDATE,
      'Case Update',
      `Your case #${caseId} has been updated: ${updateType}`,
      { caseId, updateType },
    );
  }

  async onCourtDateReminder(user: User, caseId: number, courtDate: Date): Promise<void> {
    await this.notificationsService.create(
      user,
      NotificationType.COURT_DATE,
      'Upcoming Court Date',
      `You have a court date scheduled for case #${caseId} on ${courtDate.toLocaleDateString()}`,
      { caseId, courtDate },
    );
  }

  async onFraudAlert(user: User, caseId: number, riskScore: number): Promise<void> {
    await this.notificationsService.create(
      user,
      NotificationType.FRAUD_ALERT,
      'Fraud Risk Detected',
      `High fraud risk detected for case #${case Id} with a risk score of ${riskScore}`,
      { caseId, riskScore },
    );
  }
}