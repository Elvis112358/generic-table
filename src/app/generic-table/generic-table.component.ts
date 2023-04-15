import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { ColumnComponent } from './dg-column/dg-column.component';
import {
  ColumnTemplate,
  Filter,
  FilterDataType,
  PagingType,
  SortingType,
} from './shared/utils';
import { rotate } from './animations/rotate-animation';

@Component({
  selector: 'app-generic-table',
  animations: [rotate],
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})
export class GenericTableComponent<Entity extends object>
  implements OnInit, OnChanges, AfterContentInit
{
  @Input() data: Array<Entity> = [];
  @Input() templateRefs: { [key: number]: TemplateRef<ElementRef> } = {};
  @Input() totalElements: number = 0;
  @Input() pageSize: number = 10;
  @Input() pagingType!: PagingType;
  @Input() fixedFirstCol: boolean = false;
  @Output() pageChange = new EventEmitter<number>();
  @Output() sorting = new EventEmitter<{
    column: string;
    sortDirection: SortingType | undefined;
  }>();
  @Output() filtering = new EventEmitter<Filter>();

  cols!: Array<ColumnComponent>;
  gridData?: Array<any>; // TODO type ovoga?
  @ContentChildren(ColumnComponent) columnList!: QueryList<ColumnComponent>;
  currentSortField = '';
  currentSortDirection: SortingType | undefined;
  currentPage: number = 1;

  pagedGridData: any[] | undefined;
  page: number = 1;
  freshHoverForSortArrowCss: boolean = true;
  // constants
  readonly ColumnTemplate = ColumnTemplate;
  readonly SortingTypes = SortingType;
  readonly FilterDataType = FilterDataType;

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
        sortDirection: this.currentSortDirection,
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
    } else {
      this.pagedGridData = [];
    }
  }

  pageChanged(event: number) {
    this.applyPaging(event, this.pageSize);
    if (this.pagingType === PagingType.SERVER_SIDE) this.pageChange.emit(event);
  }


  // use event to implement filtering
  handleFiltersEvent(event: Filter) {
    this.filtering.emit(event);
  }

  // catch new hover event on sorting area to handle ghost arrow logic
  mouseEnterFilterCell() {
    this.freshHoverForSortArrowCss = true;
  }

  private handleSortSelection(columnField: string) {
    if (columnField === this.currentSortField) {
      // choose next sorting option  None -> ASC -> DESC -> None...
      if (this.currentSortDirection === SortingType.ASC)
        this.currentSortDirection = SortingType.DESC;
      else if (this.currentSortDirection === SortingType.DESC) {
        this.currentSortDirection = undefined;
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
