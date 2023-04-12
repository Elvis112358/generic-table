// export enum GridTemplates {
//   OPTIONS ,
//   HEADER,
//   NO_RESULT
// }

export const searchDebounceTime = 300;

export enum FilterOperation {
  EQUALS = '=',
  RANGE_LOWER = '_gte',
  RANGE_HIGHER = '_lte',
  EXCLUDE = '_ne',
  LIKE = '_like'
}

export class TableDataQuery {
  currentPage: number | undefined = 1;
  pageSize: number | undefined;
  currentSortColumn: string | undefined;
  sortDirection: SortingType| undefined  = SortingType.NONE;
  currentFilterColumn!: string | undefined;
  filterValue!: string | undefined;
  constructor(
    currentPage: number | undefined,
    pageSize: number | undefined,
    currentSortColumn: string | undefined,
    sortDirection: SortingType,
    currentFilterColumn: string | undefined,
    filterValue: string | undefined
  ) {
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.currentSortColumn = currentSortColumn;
    this.sortDirection = sortDirection;
    this.currentFilterColumn = currentFilterColumn;
    this.filterValue = filterValue;
  }
}

export class Filter {
  field!: string;
  value!: string;
  filterOperation!: FilterOperation
}

export enum FilterDataType {
  TEXT = 'text',
  NUMBER = 'number',
  DATE= 'DateTime'
}

export enum SortingType {
  NONE,
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
