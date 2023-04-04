import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { ColumnComponent } from './dg-column/dg-column.component';
import {
  ColumnTemplate,
  PagingType,
  SortingType,
} from './generic-table.const';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-generic-table',
  animations: [
    trigger('rotateArrow', [
      state('1', style({
        transform: 'rotate(0)'
      })),
      state('2', style({
        transform: 'rotate(180deg)'
      })),
      transition('1 => 2', [
        animate('0.25s ease-out')
      ]),
      transition('2 => 1', [
        animate('0.25s ease-in')
      ]),
    ]),
  ],
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})
export class GenericTableComponent<Entity extends object>
  implements OnInit, OnChanges, AfterContentInit
{
  freshHoverForSortArrowCss: boolean = true;

  @Input() data: any = [];
  @Input() pager: any;
  @Input() templateRefs: any = {};
  @Input() totalElements: number = 0;
  @Input() pageSize: number = 10;
  @Input() pagingType!: PagingType;
  @Output() pageChange = new EventEmitter<number>();
  @Output() sorting = new EventEmitter<{
    column:string,
    sortDirection:string|undefined
  }>();

  cols!: Array<ColumnComponent>;
  gridData?: Array<any>; // TODO type ovoga?
  @ContentChildren(ColumnComponent) columnList!: QueryList<ColumnComponent>;
  currentSortField = '';
  currentSortDirection: SortingType = SortingType.NONE;
  currentPage: number = 1;

  // constants
  readonly ColumnTemplate = ColumnTemplate;
  readonly SortingTypes = SortingType;

  pagedGridData: any[] | undefined;
  page: number = 1;

  constructor() {}

  ngOnInit(): void {
    this.onInputDataChanges();
    this.applyPaging(this.page, this.pageSize);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['data']?.currentValue) {
      this.data = changes?.['data'].currentValue;
      this.onInputDataChanges();
      this.applyPaging(this.page, this.pageSize);
    }
  }

  ngAfterContentInit() {
    this.initCols();
  }

  initCols(): void {
    this.cols = this.columnList.toArray();
  }

  sort(column: ColumnComponent) {
    if (!column.sortable) return;

    this.handleSortSelection(column.field);

    //reset hover session for arrow
    this.freshHoverForSortArrowCss = false;

    //set current sort field after arrow direction handle
    this.currentSortField = column.field;

    if (this.pagingType === PagingType.CLIENT_SIDE) {
      this.handleClientSideSorting();
    } else {
      this.sorting.emit({
        column: column.field,
        sortDirection: this.currentSortDirectionAsString
      });
    }
  }

  onInputDataChanges(): void {
    this.gridData = this.data.map((rowData: any, i: number) => {
      rowData = rowData || {};
      rowData.dgIndex = i;
      rowData.dgExpanded = false;

      return rowData;
    });
  }
  applyPaging(page: number, pageSize: number): void {
    this.currentPage = page;
    if (this.gridData?.length) {
      if (this.pagingType === PagingType.CLIENT_SIDE) {
        this.pagedGridData = [];
        this.pagedGridData = this.gridData?.slice(
          (page - 1) * pageSize,
          pageSize * page
        );
      } else {
        // if serverSide Paging, we already get data per page
        this.pagedGridData = this.gridData;
      }
    }
  }

  pageChanged(event: number) {
    this.applyPaging(event, this.pageSize);
    if (this.pagingType === PagingType.SERVER_SIDE) this.pageChange.emit(event);
  }

  isString(cellData: any): boolean {
    return typeof cellData === 'string';
  }

  mouseEnter() {
    this.freshHoverForSortArrowCss = true;
  }

  get currentSortDirectionAsString(): string | undefined {
    return this.currentSortDirection === SortingType.ASC
    ? 'ASC'
    : this.currentSortDirection === SortingType.DESC
    ? 'DESC'
    : undefined;
  }

  private handleSortSelection(columnField: string) {
    if(columnField === this.currentSortField) {
      // choose next sorting option  None -> ASC -> DESC -> None...
      if (this.currentSortDirection === SortingType.ASC)
        this.currentSortDirection = SortingType.DESC;
      else if (this.currentSortDirection === SortingType.DESC) {
        this.currentSortDirection = SortingType.NONE;
      } else {
        this.currentSortDirection = SortingType.ASC;
      }
    } else {
      // start sort handle from ascending as new column selected
      this.currentSortDirection = SortingType.ASC;
    }
  }

  private operators = {
    '>': function (a: any, b: any) {
      return a > b;
    },
    '<': function (a: any, b: any) {
      return a < b;
    },
  };

  private handleClientSideSorting() {
    if (
      this.currentSortDirection === SortingType.ASC ||
      this.currentSortDirection === SortingType.DESC
    )
      this.gridData?.sort((a, b) =>
        this.operators[
          this.currentSortDirection === SortingType.ASC ? '>' : '<'
        ](a[this.currentSortField], b[this.currentSortField])
          ? -1
          : 1
      );
    else this.gridData = [...this.data];

    this.applyPaging(this.currentPage, this.pageSize);
  }
}
