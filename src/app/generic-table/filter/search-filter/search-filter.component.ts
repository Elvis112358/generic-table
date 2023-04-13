import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ColumnComponent } from '../../dg-column/dg-column.component';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { searchDebounceTime } from '../../shared/const';
import { Filter, FilterDataType, FilterOperation} from '../../shared/utils';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements AfterViewInit {
  @Input() col!: ColumnComponent;
  @Output() filter = new EventEmitter<Filter>();
  @ViewChild('input') input!: ElementRef;
  searchOperation: FilterOperation = FilterOperation.LIKE;

  //constants
  readonly FilterDataType = FilterDataType;

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(debounceTime(searchDebounceTime), distinctUntilChanged())
      .subscribe((res: any) => {
        this.filter.emit(new Filter(
          this.col.field,
          res.target.value,
          this.searchOperation
        ));
      });
  }
  resetInput(): void {
    if (!this.input?.nativeElement?.value) return;
    this.input.nativeElement.value = '';
    this.filter.emit(new Filter(
      this.col.field,
      this.input.nativeElement.value,
      this.searchOperation
    ));
  }
}
