export function buildSearchableUrl(searchTerm: string , page: number , size: number , url: string) :string {

  const queryParams :string[] = [];

  if(searchTerm) queryParams.push(`searchTerm=${searchTerm}`);

  if(page) queryParams.push(`page=${page}`);

  if(size) queryParams.push(`size=${size}`);

  const queryString = queryParams.length > 0 ?  queryParams.join('&') : '';

  if(queryString) url += `?${queryString}`;

  return url;
}

