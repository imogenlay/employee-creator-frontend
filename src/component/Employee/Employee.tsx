import type { EmployeeResponse } from "../../services/employee/employee-services";

interface EmployeeProps {
  employee: EmployeeResponse;
}

export default function Employee({ employee }: EmployeeProps) {
  return (
    <div>
      <h3>
        {employee.firstName} {employee.middleName} {employee.lastName}
      </h3>
      <p>{employee.email}</p>
      <p>Hours: {employee.hoursPerWeek}</p>
      <p>{employee.startDate}</p>
      <p>{employee.endDate}</p>
    </div>
  );
}
