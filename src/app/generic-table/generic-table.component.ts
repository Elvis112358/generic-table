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
  GridTemplates,
  PagingType,
} from './generic-table.const';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})
export class GenericTableComponent<Entity extends object>
  implements OnInit, OnChanges, AfterContentInit
{
  @Input() data: Array<Entity> = [];
  @Input() pager: any;
  @Input() templateRefs: any = {};
  @Input() totalElements: number = 0;
  @Input() pageSize:number = 10;
  @Input() pagingType!: PagingType;
  @Output() pageChange = new EventEmitter<number>();
  cols!: Array<ColumnComponent>;
  gridData?: Array<any>; // TODO type ovoga?
  @ContentChildren(ColumnComponent) columnList!: QueryList<ColumnComponent>;
  // @ContentChildren(TemplateDirective) templateList!: QueryList<TemplateDirective>;

  // constants
  readonly GridTemplates = GridTemplates;
  readonly ColumnTemplate  = ColumnTemplate;


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
    // this.collectTemplateRefs();
  }

  initCols(): void {
    this.cols = this.columnList.toArray();
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

  // collectTemplateRefs(): void {
  //   this.templateList?.toArray().forEach((t: TemplateDirective) => {
  //     console.log("t", t)
  //     this.templateRefs[t.type] = t.templateRef;
  //   });
  // }

  pageChanged(event: number) {
    this.applyPaging(event, this.pageSize);
    if (this.pagingType === PagingType.SERVER_SIDE) this.pageChange.emit(event);
  }
}
