/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
// import { MailerService } from '@nestjs-modules/mailer';
// import { Resend } from 'resend';

@Injectable()
export class MailQueueService {
  private readonly logger = new Logger(MailQueueService.name);
  // private readonly resend: Resend;

  // constructor(private readonly mailerService: MailerService) {}
  // constructor() {
  //   this.resend = new Resend(process.env.RESEND_API_KEY);
  // }
  constructor(
    @InjectQueue('email')
    private readonly emailQueue: Queue,
  ) {}

  // async sendPasswordResetEmail(email: string, resetUrl: string): Promise<void> {
  //   try {
  //     await this.resend.emails.send({
  //       from: 'Portfolio Pal <onboarding@resend.dev>', // change later to your domain
  //       to: email,
  //       subject: 'Reset Your Password',
  //       html: `
  //         <div style="font-family: Arial, sans-serif; max-width: 600px;">
  //           <h2>Password Reset Request</h2>

  //           <p>
  //             We received a request to reset your password.
  //           </p>

  //           <p>
  //             Click the button below to create a new password:
  //           </p>

  //           <a
  //             href="${resetUrl}"
  //             style="
  //               display:inline-block;
  //               padding:12px 24px;
  //               background:#2563eb;
  //               color:#fff;
  //               text-decoration:none;
  //               border-radius:6px;
  //             "
  //           >
  //             Reset Password
  //           </a>

  //           <p style="margin-top:20px;">
  //             This link expires in 1 hour.
  //           </p>

  //           <p>
  //             If you didn't request a password reset,
  //             you can safely ignore this email.
  //           </p>
  //         </div>
  //       `,
  //     });

  //     this.logger.log(`Password reset email sent to ${email}`);
  //   } catch (error: unknown) {
  //     this.logger.error(
  //       `Failed to send reset email to ${email}`,
  //       (error as Error).stack,
  //     );

  //     throw error;
  //   }
  // }

  // async sendPasswordChangedEmail(email: string): Promise<void> {
  //   try {
  //     await this.resend.emails.send({
  //       from: 'Portfolio Pal <onboarding@resend.dev>',
  //       to: email,
  //       subject: 'Password Changed Successfully',
  //       html: `
  //         <div style="font-family: Arial, sans-serif;">
  //           <h2>Password Updated</h2>

  //           <p>
  //             Your password has been successfully changed.
  //           </p>

  //           <p>
  //             If you did not make this change,
  //             contact support immediately.
  //           </p>
  //         </div>
  //       `,
  //     });
  //   } catch (error: unknown) {
  //     this.logger.error(
  //       `Failed to send confirmation email to ${email}`,
  //       (error as Error).stack,
  //     );
  //   }
  // }

  // async sendWelcomeEmail(email: string, firstName: string): Promise<void> {
  //   await this.resend.emails.send({
  //     from: 'Portfolio Pal <onboarding@resend.dev>',
  //     to: email,
  //     subject: 'Welcome to Portfolio Pal',
  //     html: `
  //       <div style="font-family: Arial, sans-serif;">
  //         <h2>Welcome ${firstName}!</h2>

  //         <p>
  //           Thank you for creating your account.
  //         </p>

  //         <p>
  //           You can now build and publish your portfolio.
  //         </p>
  //       </div>
  //     `,
  //   });
  // }

  async queuePasswordReset(email: string, resetUrl: string) {
    await this.emailQueue.add(
      'password-reset',
      {
        email,
        resetUrl,
      },
      {
        attempts: 5,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
        removeOnComplete: 100,
        removeOnFail: 100,
      },
    );
  }

  async queueVerification(email: string, verifyUrl: string) {
    await this.emailQueue.add('email-verification', {
      email,
      verifyUrl,
    });
  }
}
