import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMainServer(): string {
    return 'Portfolio Pal Server is healthy!';
  }
}
