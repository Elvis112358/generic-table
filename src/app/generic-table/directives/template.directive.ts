import {
  Directive,
  Input,
  TemplateRef
} from '@angular/core';
import { ColumnTemplate } from '../shared/utils';

@Directive({
  selector: '[template]'
})
// directive that turn any element into template (still confused)
export class TemplateDirective {
  @Input('template') type: ColumnTemplate  = ColumnTemplate.BODY;

  constructor(public templateRef: TemplateRef<any>) { }

}
