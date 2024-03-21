export interface PaginatedResponse<R> {
  _embedded :{
    pieces: R[];
  },
  page : {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
