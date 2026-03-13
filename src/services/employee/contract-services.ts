import { get, QueryParams } from "../fetcher";

export type ContractResponse = {
  id: number;
  name: string;
  isFullTime: boolean;
};

export const getContracts = (): Promise<ContractResponse[]> => {
  const requestParams: QueryParams = new QueryParams();
  requestParams.add("order", "ASC");
  requestParams.add("sortBy", "id");
  return get<ContractResponse[]>("/contracts", requestParams);
};
