import { Injectable } from "@nestjs/common";
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  task1() {
    const fetchingFunc = (observer) => {
      fetch('https://api.github.com/search/repositories?q=netology')
          .then(res => res.json())
          .then(value => observer.next(value));
    }

    return new Observable(fetchingFunc).pipe(first());
  }

  task2() {
    const fetchingFunc = (observer) => {
      fetch('https://api.github.com/search/repositories?q=netology')
          .then(res => res.json())
          .then(value => observer.next(value));
    }

    return new Observable(fetchingFunc).pipe(first());
  }
}
