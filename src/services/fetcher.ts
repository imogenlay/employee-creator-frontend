export class QueryParams {
  private params: Record<string, string[]> = {};
  private empty: boolean = true;

  add(queryName: string, queries: string[]) {
    this.params[queryName] = queries;
    this.empty = false;
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

export type FetchOptions = {
  method?: string;
  headers?: Record<string, string>;
  queryParams?: QueryParams;
};

export function get<T>(endpoint: string, queryParams: QueryParams) {
  return fetcher<T>(endpoint, { method: "GET", queryParams });
}

export function create<T>(endpoint: string, queryParams: QueryParams) {
  return fetcher<T>(endpoint, { method: "POST", queryParams });
}

export function update<T>(endpoint: string, queryParams: QueryParams) {
  return fetcher<T>(endpoint, { method: "PUT", queryParams });
}

export function remove<T>(endpoint: string, queryParams: QueryParams) {
  return fetcher<T>(endpoint, { method: "DELETE", queryParams });
}

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

  console.log(import.meta.env.VITE_API_URL + endpoint + request);
  const response = await fetch(
    import.meta.env.VITE_API_URL + endpoint + request,
    {
      method: options.method,
      credentials: "include",
      ...options.headers,
    },
  );

  const contentType = response.headers.get("Content-Type");
  const isJsonResponse = contentType?.includes("application/json");
  const hasBody = response.status !== 204 && isJsonResponse;

  if (!response.ok) {
    const errBody = await response.json().catch(() => ({}));
    console.log("error", errBody);
    throw new Error(`[${response.status}]`, errBody.message || "Fetch error");
  }

  return hasBody ? (response.json() as T) : (null as T);
}
