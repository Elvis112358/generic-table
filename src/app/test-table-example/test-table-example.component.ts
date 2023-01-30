import { Component, OnInit } from '@angular/core';
import { ColumnTemplate } from '../generic-table/generic-table.const';
import { Inventory } from '../interfaces/inventory.interface';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-test-table-example',
  templateUrl: './test-table-example.component.html',
  styleUrls: ['./test-table-example.component.scss'],
})
export class TestTableExampleComponent implements OnInit {
  ColumnTemplate = ColumnTemplate;
  inventory: Inventory[] = [
    {
      plu: 110,
      supplier: 'X Corp',
      name: 'Table extender',
      inStock: 500,
      price: 50,
      currency: 'GBP',
    },
    {
      plu: 120,
      supplier: 'X Corp',
      name: 'Heated toilet seat',
      inStock: 0,
      price: 80,
      currency: 'GBP',
    },
    {
      plu: 155,
      supplier: 'Y Corp',
      name: 'Really good pencil',
      inStock: 1,
      price: 8000,
      currency: 'AUD',
    },
  ];

  users: User[] = [
    {
      name: 'elvis',
      surname: 'sehic',
      department: 'dev',
      age: 29,
      salary: 500,
      position: 'junior upper',
    },
    {
      name: 'andi',
      surname: 'gvozdjar',
      department: 'dev',
      age: 26,
      salary: 500,
      position: 'medior upper',
    },
    {
      name: 'ilma',
      surname: 'kazazic',
      department: 'dev',
      age: 24,
      salary: 500,
      position: 'junior upper',
    },
    {
      name: 'Dzanis',
      surname: 'brkan',
      department: 'dev',
      age: 26,
      salary: 500,
      position: 'junior upper',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  seePosition(position:string) {
    console.log('Position of employee is', position);
  }

  log(a: any) {
    console.log("a", a)
  }
}
