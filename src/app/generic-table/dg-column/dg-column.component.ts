import { AfterContentInit, Component, ContentChild, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { TemplateDirective } from '../directives/template.directive';
import { ColumnTemplate } from '../generic-table.const';

@Component({
  selector: 'app-dg-column',
  template: ``,
})
export class ColumnComponent implements AfterContentInit{

  @Input() field: string  = '';
  @Input() header: string = '';
  @Input() templateRefs: any = {};
  @ContentChildren(TemplateDirective) templates!: QueryList<TemplateDirective>;

  ngAfterContentInit() {
    this._collectTemplateRefs();
  }


  private _collectTemplateRefs(): void {
    this.templates.toArray().forEach((t: TemplateDirective) => {
      if (!ColumnTemplate[t.type]) {
        console.warn(
          `Unknown template type: ${t.type}. Possible value/s: ${this.mapToIterable(
            ColumnTemplate
          ).join(', ')}.`
        );
        return;
      }

      this.templateRefs[t.type] = t.templateRef ?? ColumnTemplate.BODY;
      console.log('.type', t.type, this.templateRefs[t.type], typeof this.templateRefs[t.type]);
    });
  }

  mapToIterable(o: {[key: string]: any}): Array<any> {
    return Object.keys(o).map(key => o[key]);
}

}
