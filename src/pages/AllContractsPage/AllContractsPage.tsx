import { useState } from "react";
import { createContract } from "../../services/employee/contract-services";
import Contract from "../../component/Contract/Contract";
import classes from "./AllContractsPage.module.scss";
import ContractList from "../../component/ContractList/ContractList";

export default function AllContractsPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const refresh = () => setRefreshKey((k) => k + 1);

  const onCreate = (
    _contractId: number,
    newName: string,
    newIsFullTime: boolean,
  ) => {
    createContract({
      name: newName,
      isFullTime: newIsFullTime,
    }).then(refresh);
  };

  return (
    <>
      <h2>Create New Contract</h2>
      <hr />
      <Contract
        contract={{ id: 0, name: "", isFullTime: false }}
        onSubmit={onCreate}
      >
        Create
      </Contract>
      <div className={classes.break} />
      <h2>Update Contracts</h2>
      <hr />
      <ContractList refreshKey={refreshKey} refresh={refresh} />
    </>
  );
}
