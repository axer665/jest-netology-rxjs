import { Controller, Get, Query } from "@nestjs/common";
import { RxjsService } from "./rxjs.service";
import { IParamText } from "./interfaces/text-param";

@Controller("rxjs")
export class RxjsController {
  constructor(private rxjsService: RxjsService) {}

  @Get("repositories")
  async repositories(@Query() { text, hub }: IParamText) {
    return await this.rxjsService.searchRepositories(text, hub);
  }

  // Всё, что ниже - альтернатива для доступных хабов
  @Get("github")
  async repositoriesSearchInHub(@Query() { text, hub }: IParamText) {
    console.log('repositories search', text)
    return await this.rxjsService.search(text, hub || "github");
  }

  @Get("gitlab")
  async projectsSearchInHub(@Query() { text, hub }: IParamText) {
    console.log('projects search', text)
    return await this.rxjsService.search(text, hub || "gitlab");
  }
}
