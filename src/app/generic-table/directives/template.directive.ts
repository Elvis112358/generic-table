import {
  Directive,
  Input,
  TemplateRef
} from '@angular/core';
import { GridTemplates } from '../generic-table.const';

@Directive({
  selector: '[cpTemplate]'
})
export class TemplateDirective {

  @Input('cpTemplate') type: GridTemplates = GridTemplates.HEADER;

  constructor(public templateRef: TemplateRef<any>) { }

}
