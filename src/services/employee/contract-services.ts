import type { CreateContractDto } from "../../utils/schema";
import { create, get, QueryParams, update } from "../fetcher";

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

export const createContract = (
  contract: CreateContractDto,
): Promise<ContractResponse> => {
  return create<ContractResponse>("/contracts", contract);
};

export const updateContract = (
  id: string,
  contract: CreateContractDto,
): Promise<ContractResponse> => {
  return update<ContractResponse>("/contracts/" + id, contract);
};
