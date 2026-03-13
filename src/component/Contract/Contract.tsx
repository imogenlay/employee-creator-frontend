import type { ContractResponse } from "../../services/employee/contract-services";
import classes from "./Contract.module.scss";

interface ContractProps {
  contract: ContractResponse;
}

export default function Contract({ contract }: ContractProps) {
  return (
    <div className={classes.contract}>
      <p>{contract.id}.</p>
      <input value={contract.name} className={classes.contract_name} />
      <label>
        <input
          type="checkbox"
          checked={contract.isFullTime}
          className={classes.contract_full_time}
        />
        Full Time
      </label>
      <button>Update</button>
    </div>
  );
}
