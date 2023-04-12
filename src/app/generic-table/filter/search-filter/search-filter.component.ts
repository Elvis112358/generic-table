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
import { FilterDataType, searchDebounceTime } from '../../generic-table.const';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements AfterViewInit {
  @Input() col!: ColumnComponent;
  @Output() filter = new EventEmitter<{
    filterValue: string | number | undefined;
    column: string;
  }>();
  @ViewChild('input') input!: ElementRef;
  readonly FilterDataType = FilterDataType;

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(debounceTime(searchDebounceTime), distinctUntilChanged())
      .subscribe((res: any) => {
        this.filter.emit({
          filterValue: res.target.value,
          column: this.col.field,
        });
      });
  }
  get checkInputValue(): boolean {
    if (this.input?.nativeElement?.value) return true;
    else return false;
  }
  resetInput(): void {
    if (!this.input?.nativeElement?.value) return;
    this.input.nativeElement.value = '';
    this.filter.emit({
      filterValue: this.input.nativeElement.value,
      column: this.col.field,
    });
  }
}
