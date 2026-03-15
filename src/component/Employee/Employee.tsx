import { useNavigate } from "react-router";
import { type EmployeeResponse } from "../../services/employee-services";
import { getDateDifference } from "../../utils/date";
import classes from "./Employee.module.scss";
import { PAGE_EMPLOYEE_PREFIX, PAGE_UPDATE_PREFIX } from "../../services/const";
import Button from "../Button/Button";

interface EmployeeProps {
  employee: EmployeeResponse;
  onDelete: (id: number) => void;
}

export default function Employee({ employee, onDelete }: EmployeeProps) {
  const navigate = useNavigate();
  const goToUpdate = () => {
    navigate(PAGE_UPDATE_PREFIX + "/" + employee.id);
  };
  const goToProfile = () => {
    navigate(PAGE_EMPLOYEE_PREFIX + "/" + employee.id);
  };

  return (
    <div className={classes.block}>
      <div className={classes.left}>
        <h3>
          {employee.lastName}, {employee.firstName} {employee.middleName}
        </h3>
        <p className={classes.email}>{employee.email}</p>
        <p>
          {employee.contractName +
            " - " +
            getDateDifference(employee.startDate, employee.endDate)}
        </p>
      </div>

      <div className={classes.right}>
        <Button onClick={goToProfile}>Profile</Button>
        <Button onClick={goToUpdate}>Edit</Button>
        <Button mode="DISABLED">Calendar</Button>
        <Button mode="DELETE" onClick={() => onDelete(employee.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}
