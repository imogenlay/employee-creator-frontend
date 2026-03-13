import type { ContractResponse } from "../../services/employee/contract-services";
import Button from "../Button/Button";
import classes from "./Contract.module.scss";

interface ContractProps {
  contract: ContractResponse;
}

export default function Contract({ contract }: ContractProps) {
  return (
    <div className={classes.contract}>
      <b className={classes.numbering}>{contract.id}.</b>
      <input value={contract.name} className={classes.contract_name} />
      <label>
        <input
          type="checkbox"
          checked={contract.isFullTime}
          className={classes.contract_full_time}
        />
        Full Time
      </label>
      <Button>Update</Button>
    </div>
  );
}
