import { useNavigate, useParams } from "react-router";
import EmployeeForm from "../../component/EmployeeForm/EmployeeForm";
import {
  getEmployee,
  responseToFormFields,
  updateEmployee,
  type EmployeeResponse,
} from "../../services/employee/employee-services";
import type { EmployeeDto } from "../../utils/schema";
import { useEffect, useState } from "react";
import { PAGE_EMPLOYEE_PREFIX } from "../../services/const";

export default function UpdateEmployeePage() {
  const [employee, setEmployee] = useState<EmployeeResponse | null>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id)
      getEmployee(id).then((response: EmployeeResponse) => {
        setEmployee(response);
      });
  }, []);

  const onSubmit = (data: EmployeeDto) => {
    if (id)
      updateEmployee(id, data).then((value: EmployeeResponse) => {
        navigate(PAGE_EMPLOYEE_PREFIX + "/" + value.id);
      });
  };

  return (
    employee && (
      <>
        <h2>
          Edit {employee.firstName} {employee.middleName} {employee.lastName}
        </h2>
        <EmployeeForm
          buttonText="Update Employee"
          onSubmit={onSubmit}
          defaultFields={responseToFormFields(employee)}
        />
      </>
    )
  );
}
