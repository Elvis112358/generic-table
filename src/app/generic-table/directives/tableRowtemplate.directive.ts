import { Directive, Input } from "@angular/core";
import { ColumnComponent } from "../dg-column/dg-column.component";

export interface TableRowTemplateContext<Entity extends object> {
  $implicit: Entity;
  rowIndex: number
  column: ColumnComponent;
  columnIndex: number;
  columns: ColumnComponent[];
}

@Directive({
  selector: 'ng-template[appTableRow]',
})

// strongly typed generic table context directive
// defines context of every row so it can 'recognize' existing properties of given class
export class TableRowTemplateDirective<Entity extends object> {
  @Input('appTableRow') data!: Array<Entity>;


  static ngTemplateContextGuard<Entity extends object>(
    dir: TableRowTemplateDirective<Entity>,
    ctx: unknown
  ): ctx is TableRowTemplateContext<Entity> {
    return true;
  }
}
