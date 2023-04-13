import { AfterContentInit, Component, ContentChild, ContentChildren, ElementRef, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { TemplateDirective } from '../directives/template.directive';
import { ColumnTemplate, FilterDataType } from '../shared/utils';

@Component({
  selector: 'app-dg-column',
  template: ``,
})
export class ColumnComponent implements AfterContentInit {
  @Input() field: string = '';
  @Input() header: string = '';
  @Input() width?: number;
  @Input() minWidth?: number;
  @Input() textAlign?: string = 'center';
  // data Type per column (string, number, dateTime...)
  @Input() dataType: FilterDataType = FilterDataType.TEXT;
  // enable/disable filter option per column
  @Input() filterOptOn: boolean = false;
  // enable/disable sorting option per column
  @Input() sortable?: boolean = false;

  templateRefs: { [key:number]: TemplateRef<ElementRef> } = {};
  @ContentChildren(TemplateDirective) templates!: QueryList<TemplateDirective>;

  ngAfterContentInit() {
    this._collectTemplateRefs();
  }

  private _collectTemplateRefs(): void {
    this.templates.toArray().forEach((t: TemplateDirective) => {
      this.templateRefs[t.type] = t.templateRef ?? ColumnTemplate.BODY;
    });
  }
}
