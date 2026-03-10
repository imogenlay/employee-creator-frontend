import { useParams } from "react-router";
import {
  getEmployee,
  type EmployeeResponse,
} from "../../services/employee/employee-services";
import { useEffect, useState } from "react";

export default function EmployeePage() {
  const [employee, setEmployee] = useState<EmployeeResponse | null>();
  const { id } = useParams();

  useEffect(() => {
    if (id)
      getEmployee(id).then((response: EmployeeResponse) => {
        setEmployee(response);
      });
  }, []);

  return (
    <div>
      {employee && (
        <>
          <h2>
            {employee.firstName} {employee.middleName} {employee.lastName}
          </h2>
          <p>{employee.email}</p>
          {employee.mobile && <p>{employee.mobile}</p>}
          {employee.address && <p>{employee.address}</p>}
          <p>{employee.contractName}</p>
          <p>Hours: {employee.hoursPerWeek}</p>
          <p>Start: {employee.startDate}</p>
          <p>End: {employee.endDate}</p>
        </>
      )}
    </div>
  );
}
