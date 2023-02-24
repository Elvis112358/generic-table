import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { ColumnComponent } from './dg-column/dg-column.component';
import { ColumnTemplate, GridTemplates } from './generic-table.const';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent <Entity extends object> implements OnInit, AfterContentInit {
  @Input() data: Array<Entity> = [];
  @Input() templateRefs: any = {};
  // add option to show table borders
  //  @Input() borders: boolean = false;
  cols!: Array<ColumnComponent>;
  gridData?: Array<any>; // TODO type ovoga?
  @ContentChildren(ColumnComponent) columnList!: QueryList<ColumnComponent>;
  // @ContentChildren(TemplateDirective) templateList!: QueryList<TemplateDirective>;

  // constants
  readonly GridTemplates = GridTemplates;
  ColumnTemplate = ColumnTemplate;

  ngOnInit(): void {
    this.onInputDataChanges();
  }

  ngAfterContentInit() {
    this.initCols();
    // this.collectTemplateRefs();
  }

  initCols(): void {
    this.cols = this.columnList.toArray();
    console.log("cols", this.cols)
  }

  onInputDataChanges(): void {
    this.gridData = this.data.map((rowData: any, i: number) => {
      rowData = rowData || {};
      rowData.dgIndex = i;
      rowData.dgExpanded = false;

      return rowData;
    });
  }

  // collectTemplateRefs(): void {
  //   this.templateList?.toArray().forEach((t: TemplateDirective) => {
  //     console.log("t", t)
  //     this.templateRefs[t.type] = t.templateRef;
  //   });
  // }

}
