import type { CreateContractDto } from "../utils/schema";
import type { Sort } from "./const";
import { post, get, QueryParams, update } from "./fetcher";

export type ContractResponse = {
  id: number;
  name: string;
  isFullTime: boolean;
};

export const getContracts = (sort: Sort): Promise<ContractResponse[]> => {
  const requestParams: QueryParams = new QueryParams();
  requestParams.add("order", sort);
  requestParams.add("sortBy", "id");
  return get<ContractResponse[]>("/contracts", requestParams);
};

export const createContract = (
  contract: CreateContractDto,
): Promise<ContractResponse> => {
  return post<ContractResponse>("/contracts", contract);
};

export const updateContract = (
  id: string,
  contract: CreateContractDto,
): Promise<ContractResponse> => {
  return update<ContractResponse>("/contracts/" + id, contract);
};
