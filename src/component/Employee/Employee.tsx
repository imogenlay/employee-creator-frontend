import { useNavigate } from "react-router";
import type { EmployeeResponse } from "../../services/employee/employee-services";
import { getDateDifference } from "../../utils/date";
import classes from "./Employee.module.scss";

interface EmployeeProps {
  employee: EmployeeResponse;
}

export default function Employee({ employee }: EmployeeProps) {
  const navigate = useNavigate();
  const lk = () => {
    navigate("/update/" + employee.id);
  };

  return (
    <div className={classes.block}>
      <div className={classes.left}>
        <h3 className={classes.name}>
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
        <button onClick={lk}>Edit</button>
      </div>
    </div>
  );
}
