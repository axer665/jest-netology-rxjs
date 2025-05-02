import { Injectable } from "@nestjs/common";
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }
}
