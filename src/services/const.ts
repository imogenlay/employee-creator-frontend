export const PAGE_UPDATE_PREFIX = "/update";
export const PAGE_EMPLOYEE_PREFIX = "/employee";

export const PAGE_HOME: string = "/";
export const PAGE_CREATE: string = "/create";
export const PAGE_UPDATE: string = PAGE_UPDATE_PREFIX + "/:id";
export const PAGE_EMPLOYEE: string = PAGE_EMPLOYEE_PREFIX + "/:id";
export const PAGE_CALENDAR: string = "/calendar";

// Fetch
export const FETCH_PENDING = 0;
export const FETCH_LOADING = 1;
export const FETCH_SUCCESS = 2;
export const FETCH_FAILURE = 3;

export type Sort = "asc" | "desc";
