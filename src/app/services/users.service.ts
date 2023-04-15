import { Injectable } from '@angular/core';
import { RequestMethod, TableDataQuery } from '../generic-table/shared/utils';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(protected api: ApiService) {}

  url = 'http://localhost:3000/';
  body = { observe: 'response' };

  async getUsers(queryData: TableDataQuery): Promise<any> {
    let url = this.url + 'users';

    if (queryData.currentPage && queryData.pageSize) {
      url =
        url + `?_page=${queryData.currentPage}&_limit=${queryData.pageSize}`;
    }

    if (
      queryData.currentPage &&
      queryData.pageSize &&
      queryData.sorting.column &&
      queryData.sorting.sortDirection
    ) {
      url =
        url +
        `&_sort=${queryData.sorting.column}&_order=${queryData.sorting.sortDirection}`;
    }

    if (
      queryData.currentPage &&
      queryData.pageSize &&
      queryData.currentFilterColumn &&
      queryData.filterValue
    ) {
      url = url + `&${queryData.currentFilterColumn}=${queryData.filterValue}`;
    }

    return await this.api.sendRequest(RequestMethod.Get, url, this.body);
  }
}
