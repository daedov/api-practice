import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInit(): string {
    return 'Api Works!';
  }
}
