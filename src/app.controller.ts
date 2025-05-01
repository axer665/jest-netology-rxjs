import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { catchError } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/task1')
  task1() {
    this.appService.task1().pipe(
      catchError((err, caught) => {
        console.log(err);
        return caught;
      }),
    ).subscribe({
      next: (value: any) => console.log('Next:', value),
      complete: () => console.log('Github pull request completed!'),
      error: (error) => console.log('Error!', error)
    });
    return 'Запрос к Github';
  }

  @Get('/task2')
  task2() {
    this.appService.task2().pipe(
      catchError((err, caught) => {
        console.log(err);
        return caught;
      })
    ).subscribe({
      next: (value: any) => console.log('Next:', value),
      complete: () => console.log('Gitlab pull request completed!'),
      error: (error) => console.log('Error!', error)
    })
    return 'Запрос к Gitlab';
  }
}
