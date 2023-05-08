export class GridData<Entity> {
  dgIndex: number;
  isExpandable: boolean;
  data: Entity;

  constructor(data: Entity, i: number, expandable: boolean) {
    this.data = data;
    this.isExpandable = expandable;
    this.dgIndex = i;
  }
}
export class TableDataQuery {
  currentPage: number | undefined;
  pageSize: number | undefined;
  sorting: Sorting;
  filtering: Filter[];
  constructor(
    currentPage: number | undefined = undefined,
    pageSize: number | undefined = 1,
    sorting: Sorting = new Sorting(),
    filtering: Filter[] = [new Filter()]
  ) {
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.sorting = sorting;
    this.filtering = filtering;
  }

  setPageSize(pageSize?: number | undefined) {
    if (pageSize) this.pageSize = pageSize;
  }
  setCurrentPage(currentPage: number | undefined) {
    if (currentPage) this.currentPage = currentPage;
  }
  setSorting(sortData: Sorting) {
    if (sortData) this.sorting = sortData;
  }
  setFiltering(filter: Filter) {
    let existingFilter = this.filtering.find((f) => f.field === filter.field);
    if (existingFilter) {
      if (filter.value !== '') {
        existingFilter.value = filter.value;
      } else {
        this.filtering = [
          ...this.filtering.filter((value) => value.field !== filter.field),
        ];
      }
    } else if (
      filter.value !== '' &&
      filter.value !== undefined &&
      filter.field !== undefined
    ) {
      this.filtering.push(filter);
    }
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
  field: string | undefined;
  value: string | string[] | number | Date | Date[] | undefined;
  filterOperation: FilterOperation| FilterOperation[] | undefined;
  constructor(
    field: string | undefined = undefined,
    value: string | number | Date | Date[] | undefined = undefined,
    filterOperation: FilterOperation | FilterOperation[] | undefined = undefined
  ) {
    this.field = field;
    this.value = value;
    this.filterOperation = filterOperation;
  }
}

export class SelectFilterOptions {
    id?: string | number;
    text?: string | number;
    constructor(id: string | number, text: string | number ) {
        this.id = id;
        this.text = text;
    }
}


export enum FilterDataType {
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'DateTime',
  SELECT = 'select'
}

export enum SortingType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum FixedPosition {
  LEFT,
  RIGHT,
}

export enum Template {
  BODY,
  HEAD,
  NO_RESULT
}

export enum PagingType {
  SERVER_SIDE,
  CLIENT_SIDE,
}

export enum RequestMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
}

export enum FilterOperation {
  EQUALS = '=',
  RANGE_LOWER = '_gte',
  RANGE_HIGHER = '_lte',
  EXCLUDE = '_ne',
  LIKE = '_like',
}


