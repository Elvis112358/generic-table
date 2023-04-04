import { Component, OnInit } from '@angular/core';
import {
  ColumnTemplate,
  PagingType,
} from '../generic-table/generic-table.const';
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
  pagingType: PagingType = PagingType.SERVER_SIDE;
  pageSize: number = 5;
  sortDirection: any;
  currentPage: number = 1;
  currentSortColum: string | undefined;
  constructor(private usersService: UsersService) {}

  async ngOnInit(): Promise<void> {
    await this.getInitalUsers();
    this.records = this.users.length;
  }

  seePosition(position: string) {
    console.log('Position of employee is', position);
  }

  async getInitalUsers(pageNumber?: number, pageSize?: number): Promise<any> {
    await this.getUsersData(pageNumber, pageSize);
    if (this.pagingType === PagingType.SERVER_SIDE) {
      // apply paging for first page
      await this.pageChanged(1);
    }
  }

  //in case of server side paging we emit event on pageChanged
  async pageChanged(currentPage: number): Promise<void> {
    this.currentPage = currentPage;
    this.getUsersData(this.currentPage, this.pageSize);
  }

  serverHandledSorting(sortData: {
    column: string;
    sortDirection: string | undefined;
  }) {
    this.sortDirection = sortData.sortDirection;
    this.currentSortColum = sortData.column;
    this.getUsersData(
      this.currentPage,
      this.pageSize,
      this.currentSortColum,
      this.sortDirection
    );
  }

  private async getUsersData(
    pageNummber?: number,
    pageSize?: number,
    sortColumn?: string,
    sortDirection?: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usersService
        .getUsers(pageNummber, pageSize, sortColumn, sortDirection)
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
    if (name.includes('andi')) {
      return 'assets/andale.png';
    } else if (name.includes('ilma')) {
      return 'assets/ilma.png';
    } else if (name.includes('Dzanis')) {
      return 'assets/dzanke.png';
    } else {
      return 'assets/elva.png';
    }
  }
}
