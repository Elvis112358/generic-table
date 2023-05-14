import {
  AfterContentInit,
  AfterViewChecked,
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
  Template,
  Filter,
  FilterDataType,
  GridData,
  PagingType,
  Sorting,
  SortingType,
  FixedPosition,
} from './shared/utils';
import { rotate } from './animations/rotate-animation';
import { TemplateDirective } from './directives/template.directive';
import { TableRowTemplateContext } from './directives/tableRowtemplate.directive';

@Component({
  selector: 'app-generic-table',
  animations: [rotate],
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})
export class GenericTableComponent<Entity extends object>
  implements OnInit, OnChanges, AfterContentInit, AfterViewChecked
{
  @Input() data: Array<Entity> = [];
  @Input() templateRefs: {
    [key: number]: TemplateRef<TableRowTemplateContext<any>>;
  } = {};
  @Input() totalElements: number = 0;
  @Input() pageSize: number = 10;
  @Input() pagingType!: PagingType;

  // type: number - total height/width of other elements in the view, except generic-table component's in px
  // type: string - define outtertable wrapper dimensions
  // NOTE: in order that overflow works as expected (scrollbar in outter-table) give value in px
  // to be calculated and provided in place of implementation
  @Input() tableHeight: number | string = 210;
  @Input() tableWidth: number | string = 200;

  @Output() pageChange = new EventEmitter<number>();
  @Output() sorting = new EventEmitter<Sorting>();
  @Output() filtering = new EventEmitter<Filter>();

  cols!: Array<ColumnComponent>;
  gridData?: Array<GridData<Entity>>;
  pagedGridData: Array<GridData<Entity>> | undefined;
  @ContentChildren(TemplateDirective)
  templateList!: QueryList<TemplateDirective>;
  @ContentChildren(ColumnComponent) columnList!: QueryList<ColumnComponent>;

  currentSortField = '';
  currentSortDirection: SortingType | undefined;
  currentPage: number = 1;
  page: number = 1;
  freshHoverForSortArrowCss: boolean = true;

  // constants
  readonly Template = Template;
  readonly SortingTypes = SortingType;
  readonly FilterDataType = FilterDataType;
  readonly FixedPosition = FixedPosition;

  constructor(private elementRef: ElementRef) {}

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
    // works only when number value provided
    if (changes?.['tableHeight']?.currentValue) {
      document.documentElement.style.setProperty(
        `--dynamic-height`,
        this.tableHeight + 'px'
      );
    }
  }

  ngAfterContentInit() {
    this.initCols();
    this.collectTemplateRefs();
  }

  ngAfterViewChecked(): void {
    var noResultContent: HTMLTableCellElement =
      this.elementRef.nativeElement.querySelector('#noResult');
    if (this.cols.length && noResultContent)
      noResultContent.colSpan = this.cols.length;


    if (document.getElementById('outterWrapper')) {
      document.getElementById('outterWrapper')!.style.width =
        typeof this.tableWidth === 'number'
          ? `calc(100vw - ${this.tableWidth}px`
          : this.tableWidth;
    }
    if (document.getElementById('outterWrapper')) {
      document.getElementById('outterWrapper')!.style.maxHeight =
        typeof this.tableHeight === 'number'
          ? `calc(100vh - ${this.tableHeight}px`
          : this.tableHeight;
    }
  }

  initCols(): void {
    this.cols = this.columnList.toArray();

    this.repositionFixedColumns();
  }

  collectTemplateRefs(): void {
    this.templateList?.toArray().forEach((t: TemplateDirective) => {
      this.templateRefs[t.type] = t.templateRef;
    });
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
    this.gridData = this.data.map(
      (rowData: any, i: number): GridData<Entity> => {
        rowData = rowData || {};
        rowData.dgIndex = i;
        rowData.dgExpanded = false;

        return rowData;
      }
    );
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

  // apply sorting by following circular order None -> ASC -> DESC -> None...
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
      this.gridData?.sort((a: any, b: any) =>
        this.operators[
          this.currentSortDirection === SortingType.ASC ? '>' : '<'
        ](a[this.currentSortField], b[this.currentSortField])
          ? -1
          : 1
      );
    else this.onInputDataChanges();
    this.applyPaging(this.currentPage, this.pageSize);
  }

  // every column can be fixed to the left or right position in the table
  // reposition fixed columns so its order number corresponds to its position in the view
  // left colum zero positioned, right column - this.cols.length - 1 positioned, in this.cols array 
  private repositionFixedColumns() {
    const colToBeFixed = this.cols.filter(
      (col) =>
        col.fixed === FixedPosition.LEFT || col.fixed === FixedPosition.RIGHT
    );
    if (colToBeFixed.length) {
      colToBeFixed.forEach((col) => {
        const index = this.cols.indexOf(col);
        if (index !== -1) {
          this.cols.splice(index, 1); // Remove the item from its current position
          if (col.fixed === FixedPosition.RIGHT)
            this.cols.push(col); // Add it to the end of the array
          else if (col.fixed === FixedPosition.LEFT) {
            this.cols.unshift(col); // Add it at the start of the array
          }
        }
      });
    }
  }
}
