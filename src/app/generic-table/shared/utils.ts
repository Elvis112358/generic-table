// export enum GridTemplates {
//   OPTIONS ,
//   HEADER,
//   NO_RESULT
// }

export enum FilterOperation {
  EQUALS = '=',
  RANGE_LOWER = '_gte',
  RANGE_HIGHER = '_lte',
  EXCLUDE = '_ne',
  LIKE = '_like'
}

export class TableDataQuery {
  currentPage: number | undefined;
  pageSize: number | undefined;
  sorting: Sorting;
  currentFilterColumn!: string | undefined;
  filterValue!: string | undefined;
  constructor(
    currentPage: number | undefined = undefined,
    pageSize: number | undefined = 1,
    sorting: Sorting = new Sorting(),
    currentFilterColumn: string | undefined = undefined,
    filterValue: string | undefined = undefined
  ) {
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.sorting = sorting;
    this.currentFilterColumn = currentFilterColumn;
    this.filterValue = filterValue;
  }

}
export class Sorting {
  column: string | undefined;
  sortDirection!: SortingType | undefined;

  constructor(
    column: string | undefined = undefined,
    sortDirection: SortingType | undefined = undefined
  ) {
    this.column = column;
    this.sortDirection = sortDirection;
  }
}

export class Filter {
  field!: string;
  value!: string;
  filterOperation!: FilterOperation
  constructor(field: string,value: string, filterOperation: FilterOperation) {
    this.field = field;
    this.value = value;
    this.filterOperation = filterOperation;
  }
}

export enum FilterDataType {
  TEXT = 'text',
  NUMBER = 'number',
  DATE= 'DateTime'
}

export enum SortingType {
  ASC = 'ASC',
  DESC = 'DESC'
}

export enum ColumnTemplate {
  BODY ,
  HEAD,
}

export enum PagingType {
  SERVER_SIDE,
  CLIENT_SIDE
}

export enum RequestMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
}

export class GridData<Entity> {
  dgIndex: number;
  isExpandable: boolean;
  data: Entity;

  constructor(data: Entity,i: number, expandable: boolean) {
    this.data = data;
    this.isExpandable = expandable;
    this.dgIndex = i;
  }
}
