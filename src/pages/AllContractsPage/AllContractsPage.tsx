import { useEffect, useState } from "react";
import type { LoadStatus } from "../../services/const";
import {
  getContracts,
  type ContractResponse,
} from "../../services/employee/contract-services";
import LoadingTriangle from "../../component/LoadingTriangle/LoadingTriangle";
import Contract from "../../component/Contract/Contract";

export default function AllContractsPage() {
  const [contracts, setContracts] = useState<ContractResponse[] | null>(null);
  const [status, setStatus] = useState<LoadStatus>("PENDING");

  useEffect(() => {
    setStatus("LOADING");
    getContracts()
      .then((data) => {
        setContracts(data);
        setStatus("SUCCESS");
      })
      .catch(() => setStatus("FAILURE"));
  }, []);
  return (
    <>
      <h2>Create New Contract</h2>
      <hr />
      <p>Create NEW</p>
      <h2>Update Contracts</h2>
      <hr />
      {status === "LOADING" && <LoadingTriangle />}
      {status === "FAILURE" && <p>Could not load contracts.</p>}
      {contracts && status === "SUCCESS" && (
        <>
          {contracts.map((contract: ContractResponse) => (
            <Contract key={contract.id} contract={contract} />
          ))}
        </>
      )}
    </>
  );
}
