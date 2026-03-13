import type { EmployeeDto } from "../../utils/schema";
import type { Sort } from "../const";
import { get, create, QueryParams, update, remove } from "../fetcher";

export type EmployeeResponse = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  mobile: string;
  address: string;
  contractId: number;
  contractName: string;
  hoursPerWeek: number;
  startDate: string;
  endDate: string;
};

export type FormFields = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  mobile: string;
  address: string;
  contractId: string;
  hoursPerWeek: string;
  startDate: string;
  endDate: string;
};

export const EMPTY_EMPLOYEE_FORM: FormFields = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  mobile: "",
  address: "",
  contractId: "1",
  hoursPerWeek: "",
  startDate: "",
  endDate: "",
};

export function responseToFormFields(employee: EmployeeResponse) {
  return {
    ...employee,
    contractId: String(employee.contractId),
    hoursPerWeek: String(employee.hoursPerWeek),
  };
}

export type EmployeeQueryParams = {
  names: string[];
  sort: Sort;
};

export const getEmployee = (id: string): Promise<EmployeeResponse> => {
  return get<EmployeeResponse>("/employees/" + id);
};

export const getEmployees = (
  employeeParams: EmployeeQueryParams,
): Promise<EmployeeResponse[]> => {
  const requestParams: QueryParams = new QueryParams();
  requestParams.add("names", employeeParams.names);
  requestParams.add("order", employeeParams.sort);
  return get<EmployeeResponse[]>("/employees", requestParams);
};

export const createEmployee = (
  employee: EmployeeDto,
): Promise<EmployeeResponse> => {
  return create<EmployeeResponse>("/employees", employee);
};

export const updateEmployee = (
  id: string,
  employee: EmployeeDto,
): Promise<EmployeeResponse> => {
  return update<EmployeeResponse>("/employees/" + id, employee);
};

export const deleteEmployee = (id: string) => {
  return remove("/employees/" + id);
};
