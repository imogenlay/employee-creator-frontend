import { get, QueryParams } from "../fetcher";

export type ContractResponse = {
  id: number;
  name: string;
};

export const getContracts = (): Promise<ContractResponse[]> => {
  const requestParams: QueryParams = new QueryParams();
  requestParams.add("order", "ASC");
  return get<ContractResponse[]>("/employees/contracts", requestParams);
};
