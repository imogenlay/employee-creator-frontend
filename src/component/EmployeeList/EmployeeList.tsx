import { useEffect, useState } from "react";
import {
  deleteEmployee,
  getEmployees,
  type EmployeeQueryParams,
  type EmployeeResponse,
} from "../../services/employee-services";
import Employee from "../Employee/Employee";
import classes from "./EmployeeList.module.scss";
import { type LoadStatus } from "../../services/const";
import LoadingTriangle from "../LoadingTriangle/LoadingTriangle";

interface EmployeeListProps {
  searchQueryParams: EmployeeQueryParams;
}

export default function EmployeeList({ searchQueryParams }: EmployeeListProps) {
  const [employees, setEmployees] = useState<EmployeeResponse[] | null>(null);
  const [status, setStatus] = useState<LoadStatus>("PENDING");

  useEffect(() => {
    setStatus("LOADING");
    getEmployees(searchQueryParams)
      .then((data) => {
        setEmployees(data);
        setStatus("SUCCESS");
      })
      .catch(() => setStatus("FAILURE"));
  }, [searchQueryParams]);

  const onDelete = (id: number) => {
    deleteEmployee(String(id)).then(() => {
      setEmployees((prev) => prev?.filter((e) => e.id !== id) ?? null);
    });
  };

  return (
    <div className={classes.list}>
      {status === "LOADING" && <LoadingTriangle />}
      {status === "FAILURE" && <p>Could not load employees.</p>}
      {employees &&
        status === "SUCCESS" &&
        employees.map((employee: EmployeeResponse) => {
          return (
            <Employee
              key={employee.id}
              employee={employee}
              onDelete={onDelete}
            />
          );
        })}
    </div>
  );
}
