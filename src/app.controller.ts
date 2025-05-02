import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { catchError } from 'rxjs';
import {RxjsService} from "./rxjs/rxjs.service";

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly rxjsService: RxjsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
