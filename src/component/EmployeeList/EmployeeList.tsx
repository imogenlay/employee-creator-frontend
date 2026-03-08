import type { EmployeeResponse } from "../../services/employee/employee-services";
import Employee from "../Employee/Employee";

interface EmployeeListProps {
  employees: EmployeeResponse[];
}

export default function EmployeeList({ employees }: EmployeeListProps) {
  return (
    <>
      {employees.map((employee: EmployeeResponse) => {
        return <Employee key={employee.id} employee={employee} />;
      })}
    </>
  );
}
