import { AfterContentInit, AfterViewInit, Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { ColumnComponent } from './dg-column/dg-column.component';
import { TemplateDirective } from './directives/template.directive';
import { ColumnTemplate, GridTemplates } from './generic-table.const';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent <Entity extends object> implements OnInit, AfterContentInit, AfterViewInit{


  @Input() data: Array<Entity> = [];
  @Input() templateRefs: any = {};
  // add option to show table borders
  //  @Input() borders: boolean = false;
  cols!: Array<ColumnComponent>;
  gridData?: Array<any>;
  @ContentChildren(ColumnComponent)
  columnList!: QueryList<ColumnComponent>;
  @ContentChildren(TemplateDirective)
  templateList!: QueryList<TemplateDirective>;

  // constants
  readonly GridTemplates = GridTemplates;
  ColumnTemplate = ColumnTemplate;

  ngOnInit(): void {
    this.onInputDataChanges();
  }
  ngAfterContentInit() {
    this.initCols();
    this.collectTemplateRefs();
  }
  ngAfterViewInit(): void {
    this.onInputDataChanges();
  }

  initCols(): void {
    this.cols = this.columnList.toArray();


    //TODO:
    // Potentialy add console.error if users types wrong field name when implementing table
    //  <app-dg-column [field]="'nameSSSS'" header="{{ 'First Name'}}"></app-dg-column>
  }

  onInputDataChanges(): void {
    this.gridData = this.data.map((rowData: any, i: number) => {
      rowData = rowData || {};
      rowData.dgIndex = i;
      rowData.dgExpanded = false;

      return rowData;
    });
  }

  collectTemplateRefs(): void {
    this.templateList?.toArray().forEach((t: TemplateDirective) => {
      this.templateRefs[t.type] = t.templateRef;
    });
  }

}
