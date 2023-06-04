import { AfterContentInit, Component, ContentChild, ContentChildren, ElementRef, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { TemplateDirective } from '../directives/template.directive';
import { Template, FilterDataType, FixedPosition, SelectFilterOptions } from '../shared/utils';
import { TableRowTemplateContext } from '../directives/tableRowtemplate.directive';

@Component({
  selector: 'app-dg-column',
  template: ``,
})
export class ColumnComponent implements AfterContentInit {
  @Input() field: string = '';
  @Input() header: string = '';
  @Input() width?: number | string;
  @Input() minWidth?: number;
  @Input() textAlign: string = 'center';
  // data Type per column (string, number, dateTime...)
  @Input() dataType: FilterDataType = FilterDataType.TEXT;
  // enable/disable filter option per column
  @Input() filterOptOn: boolean = false;
  // if filterType SELECT, selectFilterOptions needed
  @Input() selectFilterOptions?: Array<SelectFilterOptions>;
  // enable/disable sorting option per column
  @Input() sortable?: boolean = false;
  //if property exists fix column to the left or right position depending on FixedPosition
  @Input() fixed?: FixedPosition

  templateRefs: { [key:number]: TemplateRef<TableRowTemplateContext<any>> } = {};
  @ContentChildren(TemplateDirective) templates!: QueryList<TemplateDirective>;

  ngAfterContentInit() {
    this._collectTemplateRefs();
  }

  private _collectTemplateRefs(): void {
    this.templates.toArray().forEach((t: TemplateDirective) => {
      this.templateRefs[t.type] = t.templateRef ?? Template.BODY;
    });
  }
}
