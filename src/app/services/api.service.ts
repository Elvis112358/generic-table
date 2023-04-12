import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestMethod } from '../generic-table/generic-table.const';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }
  sendRequest(
    method: RequestMethod,
    url: string,
    body?: any,
  ): Promise<any> {
    let request: Promise<any>;

    body = {observe: 'response'};

    switch (method) {
      case RequestMethod.Get:
        request = this.httpClient.get(url, body).toPromise();
        break;
      case RequestMethod.Delete:
        request = this.httpClient.delete(url).toPromise();
        break;
      case RequestMethod.Post:
        request = this.httpClient.post(url, body).toPromise();
        break;
      case RequestMethod.Put:
        request = this.httpClient.put(url, body).toPromise();
        break;
      case RequestMethod.Patch:
        request = this.httpClient.patch(url, body).toPromise();
        break;
      default:
        throw new Error('Invalid request method passed.');
    }

    return request;
  }
}

