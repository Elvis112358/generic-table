import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { TableHeaderTemplateDirective } from '../directives/table-header-template.directive';
import { TableRowTemplateDirective } from '../directives/table-row-template.directive';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent<TItem extends object> {
  @Input() data!: TItem[];
  @ContentChild(TableHeaderTemplateDirective, { read: TemplateRef })
  headers?: TemplateRef<any>;
  @ContentChild(TableRowTemplateDirective, { read: TemplateRef })
  rows?: TemplateRef<any>;


}
