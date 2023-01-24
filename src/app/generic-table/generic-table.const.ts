export enum GridTemplates {
  OPTIONS ,
  HEADER,
  NO_RESULT
}

export enum ColumnTemplates {
  BODY_CELL,
  HEAD_CELL,
}

export class GridData<Entity> {
  // dgIndex: number;
  // isExpandable: boolean;
  data: Entity;

  //, i: number, expandable: boolean

  constructor(data: Entity) {
    this.data = data;
    // this.isExpandable = expandable;
    // this.dgIndex = i;
  }
}
