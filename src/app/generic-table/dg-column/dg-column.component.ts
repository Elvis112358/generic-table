import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dg-column',
  template: ``,
})
export class ColumnComponent {
  @Input() field: string  = '';
  @Input() header: string = '';
}
