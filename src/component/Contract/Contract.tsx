import { useState } from "react";
import type { ContractResponse } from "../../services/employee/contract-services";
import Button from "../Button/Button";
import classes from "./Contract.module.scss";

interface ContractProps {
  contract: ContractResponse;
  isDisabled?: boolean;
  onSubmit: (
    contractId: number,
    newName: string,
    newIsFullTime: boolean,
  ) => void;
  disabledSelect?: () => void;
  children: React.ReactNode;
}

export default function Contract({
  contract,
  isDisabled = false,
  onSubmit,
  disabledSelect,
  children,
}: ContractProps) {
  const [contractName, setContractName] = useState(contract.name);
  const [isFullTime, setIsFullTime] = useState(contract.isFullTime);

  const isUpdatable = contract.id > 0;

  const undoDisabled =
    isDisabled ||
    (contractName === contract.name && isFullTime === contract.isFullTime);
  const buttonDisabled = undoDisabled || contractName.length < 1;

  const onReset = () => {
    setContractName(contract.name);
    setIsFullTime(contract.isFullTime);
  };

  const onClick = () => {
    if (!isUpdatable) {
      setContractName("");
      setIsFullTime(false);
    }
    onSubmit(contract.id, contractName, isFullTime);
  };

  const numberClass = `${classes.numbering} ${isDisabled ? classes.disabled : ""}`;

  return (
    <div className={classes.contract}>
      <b className={numberClass}>{isUpdatable && `${contract.id}.`}</b>
      <input
        value={contractName}
        readOnly={isDisabled}
        onChange={(e) => setContractName(e.target.value)}
        className={classes.contract_name}
        onClick={disabledSelect}
      />
      <label onClick={disabledSelect}>
        <input
          type="checkbox"
          checked={isFullTime}
          disabled={isDisabled}
          onChange={(e) => setIsFullTime(e.target.checked)}
          className={classes.contract_full_time}
        />
        Full Time
      </label>

      <Button
        className={!isUpdatable ? classes.wide_button : ""}
        onClick={onClick}
        mode={buttonDisabled ? "DISABLED" : "DEFAULT"}
      >
        {children}
      </Button>
      {isUpdatable && (
        <Button onClick={onReset} mode={undoDisabled ? "DISABLED" : "DEFAULT"}>
          Undo
        </Button>
      )}
    </div>
  );
}
