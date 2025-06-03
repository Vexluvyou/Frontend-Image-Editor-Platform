import { AppKey } from "./key";
import { MyApp } from "./my-app";

export class HttpClient {
  private headers: Record<string, string> = {};

  private buildUrl(path: string) {
    return `${MyApp.url}/${path}`;
  }

  private buildHeader() {
    this.headers["Authorization"] =
      "Bearer " + localStorage.getItem(AppKey.accessToken);
  }

  async get(path: string): Promise<any | null | string> {
    const payload = { method: "GET" };
    return await this.handleError(path, payload);
  }

  async post(path: string, request: any): Promise<any | null | string> {
    const payload = {
      method: "POST",
      body: request != null ? JSON.stringify(request) : null,
    };
    return await this.handleError(path, payload);
  }

  async put(path: string, request: any): Promise<any | null | string> {
    const payload = {
      method: "PUT",
      body: request != null ? JSON.stringify(request) : null,
    };
    return await this.handleError(path, payload);
  }

  async delete(path: string): Promise<any | null | string> {
    this.buildHeader();
    const payload = { method: "DELETE" };
    return await this.handleError(path, payload);
  }

  private async handleError(
    path: string,
    payload: any,
    useJsonHeader = true
  ): Promise<any | null | string> {
    this.buildHeader();

    payload["headers"] = useJsonHeader
      ? {
          ...this.headers,
          "Content-Type": "application/json",
        }
      : {
          Authorization: this.headers["Authorization"],
        };

    const response = await fetch(this.buildUrl(path), payload);

    if (response.status === 200) return await response.json();

    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem(AppKey.userId);
      localStorage.removeItem(AppKey.accessToken);
      localStorage.removeItem(AppKey.refreshToken);
      localStorage.removeItem(AppKey.username);
      window.location.href = "/";
      return null;
    }

    return await response.text();
  }
}
