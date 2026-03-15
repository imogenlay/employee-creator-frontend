import { useEffect, useState } from "react";
import {
  getContracts,
  updateContract,
  type ContractResponse,
} from "../../services/contract-services";
import Contract from "../Contract/Contract";
import type { LoadStatus, Sort } from "../../services/const";
import LoadingTriangle from "../LoadingTriangle/LoadingTriangle";
import Button from "../Button/Button";
import classes from "./ContractList.module.scss";

interface ContractListProps {
  refreshKey: number;
  refresh: () => void;
}

export default function ContractList({
  refreshKey,
  refresh,
}: ContractListProps) {
  const [contracts, setContracts] = useState<ContractResponse[] | null>(null);
  const [status, setStatus] = useState<LoadStatus>("PENDING");
  const [sort, setSort] = useState<Sort>("ASC");
  const [editable, setEditable] = useState<number>(-1);

  useEffect(() => {
    setStatus("LOADING");
    getContracts(sort)
      .then((data) => {
        setContracts(data);
        setStatus("SUCCESS");
      })
      .catch(() => setStatus("FAILURE"));
  }, [refreshKey, sort]);

  const onUpdate = (
    contractId: number,
    newName: string,
    newIsFullTime: boolean,
  ) => {
    const currentContract = contracts?.find(
      (c: ContractResponse) => c.id === contractId,
    );

    if (!currentContract) return;
    updateContract(String(currentContract.id), {
      name: newName,
      isFullTime: newIsFullTime,
    }).then(refresh);
  };

  const toggleSort = () => {
    if (sort === "ASC") setSort("DESC");
    else setSort("ASC");
  };

  return (
    <>
      <div className={classes.filters}>
        <Button className={classes.wide_button} onClick={toggleSort}>
          {sort === "ASC" ? "Oldest - Newest" : "Newest - Oldest"}
        </Button>
        {status === "LOADING" && <LoadingTriangle />}
      </div>

      {status === "FAILURE" && <p>Could not load contracts.</p>}
      {contracts &&
        status === "SUCCESS" &&
        contracts.map((contract: ContractResponse) => {
          const disabledSelect = () => {
            setEditable(contract.id);
          };
          return (
            <Contract
              key={contract.id}
              contract={contract}
              isDisabled={editable !== contract.id}
              onSubmit={onUpdate}
              disabledSelect={disabledSelect}
            >
              Apply
            </Contract>
          );
        })}
    </>
  );
}
