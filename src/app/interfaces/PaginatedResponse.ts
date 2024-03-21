export interface PaginatedResponse<I , K extends string> {
  _embedded :{
    [key in K]: I[];
  },
  page : {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
