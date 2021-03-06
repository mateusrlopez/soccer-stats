import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { USER_QUEUE_NAME } from '@user/constants/user.constants';
import { IUser } from '@user/interfaces/user.interface';

@Processor(USER_QUEUE_NAME)
export class UserProcessor {
    constructor(private readonly mailerService: MailerService) {}

    @Process()
    public async sendMail(job: Job<IUser>): Promise<void> {
        const { email, firstName } = job.data;

        await this.mailerService.sendMail({
            context: {
                name: firstName,
                email,
            },
            subject: 'E-mail verification at SoccerStats',
            template: 'confirm-email',
            to: email,
        });
    }
}
