export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}
export interface IPagination {
  rowsPerPage: number;
  page: number;
  rowsNumber?: number;
}
export interface IPaginationLabel {
  totalRowsNumber: number;
}
export interface IProps {
  pagination: IPagination;
}
export interface IColumns {
  name?: string;
  required?: boolean;
  label?: string;
  algin?: string;
  field?: string;
  sortable?: boolean;
}

export interface IData {
  name?: string;
  status?: string;
  participants?: string;
}
