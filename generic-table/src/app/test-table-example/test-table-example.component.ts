import { Component, OnInit } from '@angular/core';
import { Inventory } from '../interfaces/inventory.interface';

@Component({
  selector: 'app-test-table-example',
  templateUrl: './test-table-example.component.html',
  styleUrls: ['./test-table-example.component.scss']
})
export class TestTableExampleComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
  }
  
  purchaseItem(plu: number) {
    console.log('handle purchase for', plu);
  }

}
