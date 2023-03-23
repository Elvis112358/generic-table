import { Injectable } from '@angular/core';
import { RequestMethod } from '../generic-table/generic-table.const';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(protected api: ApiService) { }

  url = 'http://localhost:3000/';

  async getUsers(page?:number, pageSize?:number): Promise<any> {
    if(page &&  pageSize) {
      const url =this.url + `users?_page=${page}&_limit=${pageSize}`
      return await this.api.sendRequest(
        RequestMethod.Get,
        url
      );
    } else {
      return await this.api.sendRequest(
        RequestMethod.Get,
        this.url + 'users'
      );
    }

  }
}
