import { useNavigate } from "react-router";
import type { EmployeeResponse } from "../../services/employee/employee-services";
import { getDateDifference } from "../../utils/date";
import classes from "./Employee.module.scss";
import { PAGE_EMPLOYEE_PREFIX, PAGE_UPDATE_PREFIX } from "../../services/const";

interface EmployeeProps {
  employee: EmployeeResponse;
}

export default function Employee({ employee }: EmployeeProps) {
  const navigate = useNavigate();
  const goToEdit = () => {
    navigate(PAGE_UPDATE_PREFIX + "/" + employee.id);
  };
  const goToProfile = () => {
    navigate(PAGE_EMPLOYEE_PREFIX + "/" + employee.id);
  };

  return (
    <div className={classes.block}>
      <div className={classes.left}>
        <h3>
          {employee.firstName} {employee.middleName} {employee.lastName}
        </h3>
        <p className={classes.email}>{employee.email}</p>
        <p>
          {employee.contractName +
            " - " +
            getDateDifference(employee.startDate, employee.endDate)}
        </p>
      </div>

      <div className={classes.right}>
        <button onClick={goToProfile}>Profile</button>
        <button onClick={goToEdit}>Edit</button>
      </div>
    </div>
  );
}
