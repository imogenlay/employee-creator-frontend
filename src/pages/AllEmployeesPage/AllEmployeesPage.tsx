import { useEffect, useState } from "react";
import {
  getEmployees,
  type EmployeeQueryParams,
  type EmployeeResponse,
} from "../../services/employee/employee-services";
import SearchBar from "../../component/SearchBar/SearchBar";
import EmployeeList from "../../component/EmployeeList/EmployeeList";

export default function AllEmployeesPage() {
  const [employees, setEmployees] = useState<EmployeeResponse[] | null>(null);
  const [searchQueryParams, setSearchQueryParams] =
    useState<EmployeeQueryParams>({ names: [], sort: "ASC" });

  useEffect(() => {
    getEmployees(searchQueryParams).then((data) => {
      setEmployees(data);
    });
  }, [searchQueryParams]);

  const onSearch = (searchQuery: string) => {
    setSearchQueryParams({
      names: searchQuery.split(" ").filter(Boolean),
      sort: "ASC",
    });
  };

  return (
    <>
      <h2>Employee List</h2>
      <hr />
      <SearchBar text="Search" onSearch={onSearch} />

      {employees && <EmployeeList employees={employees} />}
    </>
  );
}
