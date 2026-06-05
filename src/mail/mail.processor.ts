/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

import { MailService } from 'src/mail/mail.service';

@Processor('email')
export class MailProcessor extends WorkerHost {
  private readonly logger = new Logger(MailProcessor.name);
  constructor(private readonly mailService: MailService) {
    super();
  }

  @OnWorkerEvent('completed')
  onCompleted(job: any) {
    console.log(`Email job ${job.id} completed`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: any, err: Error) {
    console.log(`Email job ${job?.id} failed`, err.message);
  }

  async process(job: Job<any, any, string>): Promise<any> {
    console.log(job.data);
    this.logger.log(`Processing job ${job.id} of type ${job.name}`);
    switch (job.name) {
      //   case 'password-reset':
      //     return this.mailService.sendPasswordResetEmail(
      //       job.data.email,
      //       job.data.resetUrl,
      //     );

      case 'password-reset': {
        const { email, resetUrl } = job.data as {
          email: string;
          resetUrl: string;
        };
        await this.mailService.sendPasswordResetEmail(email, resetUrl);
        break;
      }
      //   case 'email-verification':
      //     return this.mailService.sendEmailVerification(
      //       job.data.email,
      //       job.data.verifyUrl,
      //     );
      default:
        this.logger.warn(`Unknown job type: ${job.name}`);
    }
  }
}
