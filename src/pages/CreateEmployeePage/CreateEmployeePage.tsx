import { useNavigate } from "react-router";
import EmployeeForm from "../../component/EmployeeForm/EmployeeForm";
import { PAGE_EMPLOYEE_PREFIX } from "../../services/const";
import {
  createEmployee,
  type EmployeeResponse,
} from "../../services/employee/employee-services";
import type { EmployeeDto } from "../../utils/schema";

export default function CreateEmployeePage() {
  const navigate = useNavigate();
  const onSubmit = (data: EmployeeDto) => {
    createEmployee(data).then((value: EmployeeResponse) => {
      navigate(PAGE_EMPLOYEE_PREFIX + "/" + value.id);
    });
  };

  return <EmployeeForm buttonText="Create Employee" onSubmit={onSubmit} />;
}
