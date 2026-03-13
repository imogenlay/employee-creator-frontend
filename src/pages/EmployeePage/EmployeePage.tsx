import { useNavigate, useParams } from "react-router";
import {
  getEmployee,
  type EmployeeResponse,
} from "../../services/employee/employee-services";
import { useEffect, useState } from "react";
import classes from "./EmployeePage.module.scss";
import { formatDate } from "../../utils/date";
import { PAGE_HOME, PAGE_UPDATE_PREFIX } from "../../services/const";

export default function EmployeePage() {
  const [employee, setEmployee] = useState<EmployeeResponse | null>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id)
      getEmployee(id).then((response: EmployeeResponse) => {
        setEmployee(response);
      });
  }, []);

  const goToUpdate = () => {
    navigate(PAGE_UPDATE_PREFIX + "/" + id);
  };
  const onDelete = () => {
    navigate(PAGE_HOME);
  };

  return (
    <div>
      {employee && (
        <>
          <div className={classes.heading}>
            <div className={classes.picture} />
            <h2>
              {employee.firstName} {employee.middleName} {employee.lastName}
            </h2>
            <p className={classes.email}>{employee.email}</p>
          </div>
          <hr />
          <div className={classes.grid}>
            <b>Mobile:</b>
            <p>{employee.mobile}</p>
            <b>Address:</b>
            <p>{employee.address}</p>
            <b>Contract:</b>
            <p>{employee.contractName}</p>
            <b>Hours:</b>
            <p>{employee.hoursPerWeek}</p>
            <b>Start Date:</b>
            <p>{formatDate(employee.startDate)}</p>
            <b>End Date:</b>
            <p>{formatDate(employee.endDate)}</p>
          </div>
          <hr />
          <button className={classes.button} onClick={goToUpdate}>
            Edit
          </button>
          <button className={classes.button + " delete"} onClick={onDelete}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}
