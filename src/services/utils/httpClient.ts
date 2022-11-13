import { delay } from "utils/delay";
import ApiError from "utils/apiError";
import { getToken } from "utils/localStorage";

type HttpOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: unknown;
  body?: unknown;
};

class HttpClient {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  async makeRequest(path: string, options: HttpOptions) {
    await delay(500);

    const headers = new Headers();

    const token = getToken();

    if (token) {
      headers.append("Authorization", `Bearer ${JSON.parse(token)}`);
    }

    if (options.body) {
      headers.append("Content-Type", "application/json");
    }

    if (options.headers) {
      Object.entries(options.headers).forEach((header) =>
        headers.append(header[0], header[1])
      );
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
    });
    let responseBody = null;

    const contentType = response.headers.get("Content-Type");

    if (contentType?.includes("application/json")) {
      responseBody = await response.json();
    }

    if (response.status >= 200 && response.status <= 299) return responseBody;

    throw new ApiError(response, responseBody);
  }
  get(path: string, options?: HttpOptions) {
    return this.makeRequest(path, {
      method: "GET",
      headers: options?.headers,
    });
  }
  post(path: string, options?: HttpOptions) {
    return this.makeRequest(path, {
      method: "POST",
      body: options?.body,
      headers: options?.headers,
    });
  }
  put(path: string, options?: HttpOptions) {
    return this.makeRequest(path, {
      method: "PUT",
      body: options?.body,
      headers: options?.headers,
    });
  }
  delete(path: string, options?: HttpOptions) {
    return this.makeRequest(path, {
      method: "DELETE",
      headers: options?.headers,
    });
  }
}

export default HttpClient;
