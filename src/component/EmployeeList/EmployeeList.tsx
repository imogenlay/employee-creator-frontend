import type { EmployeeResponse } from "../../services/employee/employee-services";
import Employee from "../Employee/Employee";
import classes from "./EmployeeList.module.scss";

interface EmployeeListProps {
  employees: EmployeeResponse[];
}

export default function EmployeeList({ employees }: EmployeeListProps) {
  return (
    <div className={classes.list}>
      {employees.map((employee: EmployeeResponse) => {
        return <Employee key={employee.id} employee={employee} />;
      })}
    </div>
  );
}
