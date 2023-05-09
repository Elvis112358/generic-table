import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ColumnComponent } from '../../dg-column/dg-column.component';
import { Filter, FilterDataType, SelectFilterOptions } from '../../shared/utils';

@Component({
  selector: 'app-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.scss']
})
export class SelectFilterComponent {
  @Input() col!: ColumnComponent;
  @Input() options!: SelectFilterOptions[] | undefined;
  @Input() defaultValue!: SelectFilterOptions | undefined;
  @Output() filter = new EventEmitter<Filter>();

  //constants
  readonly FilterDataType = FilterDataType;


  resetInput(): void {
    this.defaultValue = undefined;
    this.filter.emit(new Filter(
      this.col.field,
      ''
    ));
  }

  onValueChange(selectedValue: string, selectOption: any) {
    let testFilter: Filter;
    if(this.options) {
      testFilter = new Filter(this.col.field, this.options.find(opt => opt.text === selectedValue )?.id);
      this.filter.emit(testFilter)
    } else {
      console.warn("No Options For Select Filter");
    }
  }
}
