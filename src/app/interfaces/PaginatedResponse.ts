export interface PaginatedResponse<R> {
  _embedded :{
    items: R[];
  },
  page : {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
