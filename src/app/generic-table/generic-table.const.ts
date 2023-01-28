export enum GridTemplates {
  OPTIONS ,
  HEADER,
  NO_RESULT
}

export enum ColumnTemplate {
  BODY ,
  HEAD,
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
