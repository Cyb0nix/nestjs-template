import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  STATUS = 'UP';

  getStatus(): string {
    return this.STATUS;
  }
}
