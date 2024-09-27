import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getAuthToken } from "../utils/authUtils";

class httpService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_SERVER_API_BASE_URL,
    });
  }

  /**
   * Makes an HTTP request.
   *
   * @param config The request configuration.
   * @returns The response data.
   */
  async makeRequest<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.request<T>(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets the authentication headers.
   *
   * @returns The authentication headers.
   */
  private getAuthHeaders(): Record<string, string> {
    const authToken = getAuthToken();
    return authToken ? { Authorization: `Bearer ${authToken}` } : {};
  }

  // HTTP methods

  /**
   * Makes a GET request.
   *
   * @param url The request URL.
   * @param params The request parameters.
   * @returns The response data.
   */
  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    return await this.makeRequest({
      method: "GET",
      url,
      params,
      headers: this.getAuthHeaders(),
    });
  }

  /**
   * Makes a POST request.
   *
   * @param url The request URL.
   * @param data The request data.
   * @returns The response data.
   */
  async post<T>(url: string, data: any): Promise<T> {
    return await this.makeRequest({
      method: "POST",
      url,
      data,
      headers: this.getAuthHeaders(),
    });
  }

  /**
   * Makes a PATCH request.
   *
   * @param url The request URL.
   * @param data The request data.
   * @returns The response data.
   */
  async patch<T>(url: string, data: any): Promise<T> {
    return await this.makeRequest({
      method: "PATCH",
      url,
      data,
      headers: this.getAuthHeaders(),
    });
  }

  /**
   * Makes a DELETE request.
   *
   * @param url The request URL.
   * @param params The request parameters.
   * @param data The request data.
   * @returns The response data.
   */
  async delete<T>(url: string, params?: any, data?: any): Promise<T> {
    return await this.makeRequest({
      method: "DELETE",
      url,
      params,
      data,
      headers: this.getAuthHeaders(),
    });
  }
}

export default new httpService();
