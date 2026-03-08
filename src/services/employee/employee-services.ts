import type { Sort } from "../const";
import { get, QueryParams } from "../fetcher";

export type EmployeeResponse = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  mobile: string;
  address: string;
  isFullTime: boolean;
  hoursPerWeek: number;
  startDate: string;
  endDate: string;
};

export type EmployeeQueryParams = {
  names: string[];
  sort: Sort;
};

export const getEmployees = (
  queryParams: EmployeeQueryParams,
): Promise<EmployeeResponse[]> => {
  const requestParams: QueryParams = new QueryParams();
  requestParams.add("names", queryParams.names);
  requestParams.add("sort", [queryParams.sort]);
  return get<EmployeeResponse[]>("/employees", requestParams);
};
