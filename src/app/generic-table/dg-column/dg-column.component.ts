import { AfterContentInit, Component, ContentChild, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { TemplateDirective } from '../directives/template.directive';
import { ColumnTemplate } from '../generic-table.const';

@Component({
  selector: 'app-dg-column',
  template: ``,
})
export class ColumnComponent implements AfterContentInit {
  @Input() field: string = '';
  @Input() header: string = '';
  // add min-with input
  templateRefs: any = {};
  @ContentChildren(TemplateDirective) templates!: QueryList<TemplateDirective>;

  ngAfterContentInit() {
    this._collectTemplateRefs();
  }

  private _collectTemplateRefs(): void {
    this.templates.toArray().forEach((t: TemplateDirective) => {
      this.templateRefs[t.type] = t.templateRef ?? ColumnTemplate.BODY;
    });
    console.log('this.templateRefs', this.templateRefs);
  }
}
