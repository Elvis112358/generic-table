import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss'],
})
export class PagingComponent implements OnInit, OnChanges{
  @Input() pageSize:number =  10 ;
  @Input() totalElements!:number;
  @Output() pageChange = new EventEmitter<number>();
  currentPage = 1;
  pages: Array<number> = [];
  visiblePages: Array<number> = [];
  numberOfPages: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['totalElements']?.currentValue) {
      this.ngOnInit();
    }
  }

  ngOnInit(): void {
    this.numberOfPages= Math.ceil(this.totalElements / this.pageSize)
    for (let page = 1; page <= this.numberOfPages; page++) {
      this.pages.push(page);
    }
   this.calculateVisiblePages(this.currentPage);
  }

  onPageClicked(page:number) {
    if(page < 1 || page > this.pages.length)
      return
    this.currentPage = page;
    this.calculateVisiblePages(page);
    this.pageChange.emit(page);
  }

  calculateVisiblePages(currentPage: number) {
    // Calculation made so we allways display 5 visible page links in pagination section
    if(this.numberOfPages < 6) {
      this.visiblePages = this.pages
    } else {
      if(this.currentPage < 3) {
        this.visiblePages = this.pages.slice(0, 5)
      } else if(this.currentPage > this.pages.length - 3) {
        this.visiblePages = this.pages.slice(-5)
      } else {
        this.visiblePages = this.pages.slice(currentPage -3 , currentPage + 2)
      }
    }
  }
}
