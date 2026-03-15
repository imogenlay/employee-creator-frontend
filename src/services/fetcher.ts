export class QueryParams {
  private params: Record<string, string[]> = {};
  private empty: boolean = true;

  add(queryName: string, queries: string[] | string) {
    if (typeof queries === "string") queries = [queries];
    this.params[queryName] = queries;
    this.empty = false;
  }

  addObject(queries: Record<string, any>) {
    Object.keys(queries).forEach((query: string) => {
      this.add(query, String(queries[query]));
    });
  }

  get(queryName: string): string[] {
    return this.params[queryName];
  }

  keys(): string[] {
    return Object.keys(this.params);
  }

  isEmpty() {
    return this.empty;
  }
}

export function get<T>(endpoint: string, queryParams?: QueryParams) {
  let options: FetchOptions = { method: "GET" };
  if (queryParams) options.queryParams = queryParams;
  return fetcher<T>(endpoint, options);
}

export function post<T>(endpoint: string, body: any) {
  return fetcher<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function update<T>(endpoint: string, body: any) {
  return fetcher<T>(endpoint, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

export function remove<T>(endpoint: string) {
  return fetcher<T>(endpoint, { method: "DELETE" });
}

export type FetchOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  queryParams?: QueryParams;
};

async function fetcher<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  let request = "";
  if (options.queryParams && !options.queryParams.isEmpty()) {
    const keys: string[] = options.queryParams.keys();
    for (let i = 0; i < keys.length; i++) {
      const paramsArray: string[] = options.queryParams.get(keys[i]);
      for (let j = 0; j < paramsArray.length; j++) {
        request += (request ? "&" : "?") + keys[i] + "=" + paramsArray[j];
      }
    }
  }

  const response = await fetch(
    import.meta.env.VITE_API_URL + endpoint + request,
    {
      method: options.method,
      credentials: "include",
      headers: options.headers,
      body: options.body,
    },
  );

  const contentType = response.headers.get("Content-Type");
  const isJsonResponse = contentType?.includes("application/json");
  const hasBody = response.status !== 204 && isJsonResponse;

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    let errorMessage = `[${response.status}] ${error.message || "Fetch error"}`;
    if (error.details) {
      errorMessage += ":";
      Object.values(error.details).forEach((value) => {
        errorMessage += ` '${value}'`;
      });
    }
    throw new Error(errorMessage);
  }

  return hasBody ? (response.json() as Promise<T>) : (null as T);
}
