export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: unknown;
}

export class ApiError extends Error {
  public status: number;
  public data?: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = "ApiError";
  }
}

// Default: API runs on port 4000 in development
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function fetchClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const config: RequestInit = {
    ...options,
    headers,
    credentials: "include",
  };

  try {
    const response = await fetch(url, config);
    
    // Check if the response is JSON
    const contentType = response.headers.get("content-type");
    let data;
    
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      // If it's not JSON (like a 404 HTML page), we just create a generic error object
      const text = await response.text();
      throw new ApiError(response.status, `Server returned an invalid response (Status: ${response.status}). Path might be wrong.`, text);
    }

    if (!response.ok || !data.success) {
      throw new ApiError(
        response.status,
        data?.message || "An unexpected error occurred",
        data?.errors
      );
    }

    return data.data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Network or parsing errors
    throw new ApiError(500, error instanceof Error ? error.message : "Network error");
  }
}
