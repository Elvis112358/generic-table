import { Component, OnInit } from '@angular/core';
import { ColumnTemplate, PagingType } from '../generic-table/generic-table.const';
import { Inventory } from '../interfaces/inventory.interface';
import { User } from '../interfaces/user.interface';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-test-table-example',
  templateUrl: './test-table-example.component.html',
  styleUrls: ['./test-table-example.component.scss'],
})
export class TestTableExampleComponent implements OnInit {
  ColumnTemplate = ColumnTemplate;
  users: User[] = [];
  records: number = 0;
  pagingType: PagingType = PagingType.CLIENT_SIDE;
  pageSize: number = 5;
  constructor(private usersService: UsersService) {}

  async ngOnInit(): Promise<void> {
    await this.getUsers();
    this.records = this.users.length;
  }

  seePosition(position: string) {
    console.log('Position of employee is', position);
  }

  async getUsers(pageNumber?: number, pageSize?: number): Promise<any> {
    await this.getUsersData(pageNumber, pageSize)
    if (this.pagingType === PagingType.SERVER_SIDE) {
      await this.pageChanged(1);
    }

  }

  //in case of server side paging we emit event on pageChanged
  async pageChanged(currentPage: number) {
    this.getUsersData(currentPage, this.pageSize)
  }

  private async getUsersData(pageNummber?: number, pageSize?: number): Promise<any> {
     return new Promise((resolve, reject) => {
      this.usersService
        .getUsers(pageNummber, pageSize)
        .then((response) => {
          if (response) {
            this.users = response;
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  rtnImageSrc(name: string): string {
    if(name.includes('andi')) {
      return 'assets/andale.png'
    } else if(name.includes('ilma')) {
      return 'assets/ilma.png'
    } else if(name.includes('Dzanis')) {
      return 'assets/dzanke.png'
    } else {
      return 'assets/elva.png'
    }
  }
}
