import { Injectable } from '@angular/core';
import { RequestMethod } from '../generic-table/generic-table.const';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(protected api: ApiService) { }

  url = 'http://localhost:3000/';

  async getUsers(page?:number, pageSize?:number, sortColumn?:string, sortDirection?: string): Promise<any> {
    let url = this.url + 'users';

    if(page &&  pageSize) {
      url = url + `?_page=${page}&_limit=${pageSize}`;
    }

    if(page &&  pageSize && sortColumn && sortDirection) {
      url = url + `&_sort=${sortColumn}&_order=${sortDirection}`
    }
    return await this.api.sendRequest(
      RequestMethod.Get,
      url
    );

    // if(page &&  pageSize) {
    //   const url =this.url + `users?_page=${page}&_limit=${pageSize}`
    //   return await this.api.sendRequest(
    //     RequestMethod.Get,
    //     url
    //   );
    // } else {
    //   return await this.api.sendRequest(
    //     RequestMethod.Get,
    //     this.url + 'users'
    //   );
    // }

  }
}
