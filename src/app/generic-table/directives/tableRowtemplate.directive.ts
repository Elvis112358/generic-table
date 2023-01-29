import { Directive, Input } from "@angular/core";

interface TableRowTemplateContext<Entity extends object> {
  $implicit: Entity;
}

@Directive({
  selector: 'ng-template[appTableRow]',
})
export class TableRowTemplateDirective<Entity extends object> {
  @Input('appTableRow') data!: Array<Entity>;


  static ngTemplateContextGuard<Entity extends object>(
    dir: TableRowTemplateDirective<Entity>,
    ctx: unknown
  ): ctx is TableRowTemplateContext<Entity> {
    console.log('dir',dir);
    console.log('ctx',ctx);
    return true;
  }
}
