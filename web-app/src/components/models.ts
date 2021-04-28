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
export interface IListProps {
  pagination: IPagination;
  filter: string;
}

export interface IData {
  name?: string;
  status?: string;
  participants?: string;
}
export interface ListUser {
  firstName: string;
  lastName: string;
}
