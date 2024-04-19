export interface PaginatedResponse<I> {
  content : I[];
  totalElements : number;
  totalPages : number;
  pageNumber : number;
  pageSize : number;
}
