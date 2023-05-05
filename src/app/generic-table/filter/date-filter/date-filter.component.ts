import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { fromEvent, debounceTime, distinctUntilChanged } from 'rxjs';
import { ColumnComponent } from '../../dg-column/dg-column.component';
import { searchDebounceTime } from '../../shared/const';
import { Filter, FilterOperation, FilterDataType } from '../../shared/utils';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
})
export class DateFilterComponent  {
  @Input() col!: ColumnComponent;
  @Output() filter = new EventEmitter<Filter>();
  @ViewChild('dateRangeStart') dateRangeStart!: ElementRef;
  @ViewChild('dateRangeEnd') dateRangeEnd!: ElementRef;
  searchOperation: FilterOperation = FilterOperation.LIKE;

  //constants
  readonly FilterDataType = FilterDataType;

  rangeFilter(date: Date): boolean {
    return true;
  }

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    this.filter.emit(
      new Filter(
        this.col.field,
        [new Date(dateRangeStart.value), new Date(dateRangeEnd.value)],
        [FilterOperation.RANGE_LOWER,FilterOperation.RANGE_HIGHER]
      )
    );
  }

  resetInput(): void {
    if (!this.dateRangeStart?.nativeElement?.value) return;
    this.dateRangeStart.nativeElement.value = '';
    this.dateRangeEnd.nativeElement.value = '';
    this.filter.emit(
      new Filter(
        this.col.field,
        this.dateRangeStart.nativeElement.value,
        this.searchOperation
      )
    );
  }
}
