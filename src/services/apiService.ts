import { IFarmer } from "../types";
import { setAuthToken } from "../utils/authUtils";
import httpService from "./httpService";

interface BodyTypes {
  mobile: string;
  password: string;
}

interface ResponseTypes {
  token: string;
  success: boolean;
  message: string;
}
// export interface UserTypes {
//   name: string;
//   mobile: string;
//   email: string;
//   ekycPrice: number;
// }

export interface IUser {
  success: boolean;
  message: string;
  token: string;
}

export async function authService(body: BodyTypes): Promise<IUser> {
  const response = await httpService.post<ResponseTypes>("login", body);
  if (response.token) {
    setAuthToken(response.token);
  }
  return response;
}

interface SearchResponse {
  data: IFarmer[];
}

export async function vkNumberSearchService(aadhaarNumber: string): Promise<IFarmer[]> {
  const response = await httpService.post<SearchResponse>("search", aadhaarNumber);
  return response.data;
}

interface TransactionResponse {
  status: "success" | "failed";
  vkNumber: string;
  message?: string;
}

export async function processTransaction(farmerId: string): Promise<TransactionResponse> {
  const response = await httpService.post<TransactionResponse>("transaction", { farmerId });
  return response;
}
