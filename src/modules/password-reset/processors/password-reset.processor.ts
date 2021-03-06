import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { PASSWORD_RESET_QUEUE_NAME } from '../constants/password-reset.constants';
import { IPasswordReset } from '../interfaces/password-reset.interface';

@Processor(PASSWORD_RESET_QUEUE_NAME)
export class PasswordResetProcessor {
    constructor(private readonly mailerService: MailerService) {}

    @Process()
    public async sendMail(job: Job<IPasswordReset>): Promise<void> {
        const { email, firstName } = job.data.user;
        const { token } = job.data;

        await this.mailerService.sendMail({
            context: {
                name: firstName,
                email,
                token,
            },
            subject: 'Password reset at SoccerStats',
            template: 'password-reset',
            to: email,
        });
    }
}
