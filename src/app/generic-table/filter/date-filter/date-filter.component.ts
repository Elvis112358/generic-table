import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { fromEvent, debounceTime, distinctUntilChanged } from 'rxjs';
import { ColumnComponent } from '../../dg-column/dg-column.component';
import { searchDebounceTime } from '../../shared/const';
import { Filter, FilterOperation, FilterDataType } from '../../shared/utils';
import { MatDateRangeInput, MatDateRangePicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
})
export class DateFilterComponent {
  @Input() col!: ColumnComponent;
  @Output() filter = new EventEmitter<Filter>();
  @ViewChild(MatDateRangePicker) dateRangePicker!: MatDateRangePicker<
    Date | undefined
  >;
  @ViewChild('dateRangeStart') dateRangeStart!: ElementRef;
  @ViewChild('dateRangeEnd') dateRangeEnd!: ElementRef;
  searchOperation: FilterOperation = FilterOperation.LIKE;

  //constants
  readonly FilterDataType = FilterDataType;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  handlePickedDatesVisibility() {
    const element = this.elementRef.nativeElement.querySelector(
      'mat-date-range-input'
    );
    // width of picked dates to be shown fully in filter cell 
    const minWidth = 136; 
    if (element.offsetWidth < minWidth) {
      this.renderer.setStyle(element, 'visibility', 'hidden');
    } else {
      this.renderer.removeStyle(element, 'visibility');
    }
  }
  // implement logic to disable dates to be choosed
  rangeFilter(date: Date): boolean {
    return true;
  }

  dateRangeChange(
    dateRangeStart: HTMLInputElement,
    dateRangeEnd: HTMLInputElement
  ) {
    this.filter.emit(
      new Filter(
        this.col.field,
        [new Date(dateRangeStart.value), new Date(dateRangeEnd.value)],
        [FilterOperation.RANGE_LOWER, FilterOperation.RANGE_HIGHER]
      )
    );
    this.handlePickedDatesVisibility();
  }

  resetInput(): void {
    if (!this.dateRangeStart?.nativeElement?.value) return;
    this.dateRangePicker.select(undefined);
    this.dateRangeStart.nativeElement.value = '';
    this.dateRangeEnd.nativeElement.value = '';
    this.filter.emit(
      new Filter(
        this.col.field,
        this.dateRangeStart.nativeElement.value,
        this.searchOperation
      )
    );
    this.handlePickedDatesVisibility();
  }
}
