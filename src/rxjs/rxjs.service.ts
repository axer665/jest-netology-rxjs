import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {
  firstValueFrom,
  toArray,
  from,
  map,
  mergeAll,
  take,
  Observable, tap,
} from "rxjs";
import axios from "axios";

@Injectable()
export class RxjsService {
  private readonly githubURL = "https://api.github.com/search/repositories?q=";
  private readonly gitlabURL = "https://gitlab.com/api/v4/projects?search=";

  // Моссив с хабами понадобится для проверки поиска по хабам
  private hubs = {
    github: this.githubURL,
    gitlab: this.gitlabURL,
  }

  private getGithub(text: string, count: number): Observable<any> {
    return from(axios.get(`${this.githubURL}${text}`))
      .pipe(
        map((res: any) => res.data.items),
        mergeAll(),
      )
      .pipe(take(count));
  }

  private getGitlab(text: string, count: number): Observable<any> {
    return from(axios.get(`${this.gitlabURL}${text}`))
        .pipe(
            map((res: any) => res.data.items),
            take(count),
        )
        .pipe(take(count));
  }

  async searchRepositories(text: string, hub: string): Promise<any> {
    // Здесь можно добавить логику проверки на какой hub делать запрос
    console.log("request hub = ", hub);
    let data$;
    if (hub === "gitlab") {
      data$ = this.getGitlab(text, 10).pipe(toArray());
    } else {
      data$ = this.getGithub(text, 10).pipe(toArray());
    }
    if (!hub) console.log("auto hub = github");
    return await firstValueFrom(data$);
  }

  // всё, что находится ниже - альтернатива
  private get(url: string, text: string, count: number): Observable<any> {
    console.log(`${url}${text}`)
    return from(axios.get(`${url}${text}`))
        .pipe(
            map((res: any) => Array.isArray(res.data) ? res.data : res.data.items),
            mergeAll(),
        )
        .pipe(take(count));
  }

  // Поиск среди доступных хабов
  async search(text: string, hub: string): Promise<any> {
    console.log("hub = ", hub);
    if (!this.hasOwnProperty(hub)) {
      throw new HttpException(
          `Хаб "${hub}" не существует`,
          HttpStatus.NOT_FOUND
      );
    }

    const data$ = this.get(this.hubs[hub], text, 10).pipe(toArray());
    data$.subscribe();

    return await firstValueFrom(data$);
  }
}
