import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { ColumnComponent } from './dg-column/dg-column.component';
import { TemplateDirective } from './directives/template.directive';
import { GridTemplates } from './generic-table.const';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent <Entity extends object>{
  @Input() data: Array<Entity> = [];
  @Input() templateRefs: any = {};
  cols!: Array<ColumnComponent>;
  @ContentChildren(ColumnComponent)  columnList!: QueryList<ColumnComponent>;
  // templateList!: QueryList<TemplateDirective>;

  // constants
  readonly GridTemplates = GridTemplates;

  ngAfterContentInit() {
    this.initCols();
    // this.collectTemplateRefs();
    console.log('type', typeof this.data);
    console.log('cols', this.cols);
    console.log('templates', this.templateRefs);
    this.cols.forEach((col) => {
      let test = col.field;
      console.log('test', test);
      console.log('col', col.field);
      this.data.forEach((data) => {
        console.log('data', (data as any)[test]);
      });
    });
  }

  initCols(): void {
    console.log('columnList', this.columnList);
    console.log('data', this.data);
    // at this point cols are ordered by default (as defined in the template),
    // they will be appropriately ordered after setting the metas
    this.cols = this.columnList.toArray();

  }

  getCellData(index: number, col: ColumnComponent, rowData: any): string {
    // console.log('index', index);
    // console.log('coooools', col);
    // console.log('this.cols', this.cols);
    console.log('rowData', rowData);
    let currentCol = this.cols.find(c => c.field === col.field)?.field || ''
    console.log('currentCol', currentCol);
    // this.cols.forEach((col) => {
    //   let test = col.field;
    //   this.data.forEach((data) => {
    //     console.log('data', (data as any)[test]);
    //   });
    // });
    let returnTest = (this.data[index] as any)[currentCol];
    return returnTest;
  }

//   collectTemplateRefs(): void {
//     this.templateList?.toArray().forEach((t: TemplateDirective) => {
//       if (!this.GridTemplates[t.type]) {
//         console.warn(
//           `Unknown template type: ${t.type}. Possible value/s: ${this.mapToIterable(
//             this.GridTemplates
//           ).join(', ')}.`
//         );
//         return;
//       }

//       this.templateRefs[t.type] = t.templateRef;
//     });
//   }

//   mapToIterable(o: {[key: string]: any}): Array<any> {
//     return Object.keys(o).map(key => o[key]);
// }

}
