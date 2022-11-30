import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './data-grid/data-grid.component';
import { TableHeaderTemplateDirective } from './directives/table-header-template.directive';
import { TableRowTemplateDirective } from './directives/table-row-template.directive';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DataGridComponent,
    TableHeaderTemplateDirective,
    TableRowTemplateDirective
  ],
  exports: [
    DataGridComponent,
    TableHeaderTemplateDirective,
    TableRowTemplateDirective,
  ],
})
export class TableDataGridModule { }
