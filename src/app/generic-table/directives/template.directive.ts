import {
  Directive,
  Input,
  TemplateRef
} from '@angular/core';
import { Template } from '../shared/utils';
import { TableRowTemplateContext } from './tableRowtemplate.directive';

@Directive({
  selector: '[template]'
})
// directive that turn any element into template so it is catched by contentChildren type TemplateDirective
export class TemplateDirective {
  @Input('template') type: Template  = Template.BODY;

  constructor(public templateRef: TemplateRef<TableRowTemplateContext<any>>) { }

}
