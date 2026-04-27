import { goto } from "$app/navigation";
import { authStore } from "$lib/stores/auth.svelte";

export const API_BASE_URL = "/api";

/**
 * Custom API error class with additional context
 */
export class ApiError extends Error {
	public readonly status: number;
	public readonly statusText: string;
	public readonly data: unknown;

	constructor(
		message: string,
		status: number,
		statusText: string,
		data?: unknown,
	) {
		super(message);
		this.name = "ApiError";
		this.status = status;
		this.statusText = statusText;
		this.data = data;
	}

	get isUnauthorized(): boolean {
		return this.status === 401;
	}

	get isForbidden(): boolean {
		return this.status === 403;
	}

	get isNotFound(): boolean {
		return this.status === 404;
	}

	get isServerError(): boolean {
		return this.status >= 500;
	}
}

/**
 * Request configuration options
 */
export interface RequestConfig extends Omit<RequestInit, "body"> {
	body?: unknown;
	params?: Record<string, string | number | boolean | undefined>;
	/** @internal Prevents infinite refresh loops — do not set manually. */
	_isRetry?: boolean;
}

/**
 * Build URL with query parameters
 */
function buildUrl(
	endpoint: string,
	params?: Record<string, string | number | boolean | undefined>,
): string {
	// Ensure the endpoint starts with a forward slash
	const normalizedEndpoint = endpoint.startsWith("/")
		? endpoint
		: `/${endpoint}`;

	// Combine base URL and endpoint directly to preserve path components like /v1.0
	const fullUrl = `${API_BASE_URL}${normalizedEndpoint}`;
	const url = new URL(fullUrl, window.location.origin);

	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined) {
				url.searchParams.append(key, String(value));
			}
		});
	}

	return url.toString();
}

/**
 * Handle 401 unauthorized responses
 */
async function handleUnauthorized(): Promise<void> {
	// Update auth store state
	authStore.logout();
}

// ── Token Refresh ───────────────────────────────────────────────────────────

/**
 * Module-level promise used to deduplicate concurrent refresh attempts.
 * If multiple requests 401 at the same time, they all await the same refresh.
 */
let refreshPromise: Promise<boolean> | null = null;

/**
 * Attempt to obtain a new access token using the stored refresh token.
 * Uses a raw fetch (not `request()`) to avoid recursive refresh loops.
 * Concurrent callers share the same in-flight promise.
 */
// async function tryRefreshToken(): Promise<boolean> {
// 	if (refreshPromise) return refreshPromise;

// 	const refreshToken =
// 		typeof window !== "undefined"
// 			? localStorage.getItem("refresh_token")
// 			: null;

// 	if (!refreshToken) return false;

// 	refreshPromise = (async () => {
// 		try {
// 			const response = await fetch(buildUrl("/auth/refresh"), {
// 				method: "POST",
// 				headers: { "Content-Type": "application/json" },
// 				credentials: "include",
// 				body: JSON.stringify({ refresh_token: refreshToken }),
// 			});

// 			if (!response.ok) return false;

// 			const data = await response.json();
// 			setTokens(data.access_token, data.refresh_token);
// 			return true;
// 		} catch {
// 			return false;
// 		} finally {
// 			refreshPromise = null;
// 		}
// 	})();

// 	return refreshPromise;
// }

/**
 * Core request function
 */
async function request<T>(
	endpoint: string,
	config: RequestConfig = {},
): Promise<T> {
	const {
		body,
		params,
		headers: customHeaders,
		_isRetry,
		...fetchConfig
	} = config;

	const url = buildUrl(endpoint, params);

	const headers: HeadersInit = {
		"Content-Type": "application/json",
		...customHeaders,
	};

	const isFormData = body instanceof FormData;

	const response = await fetch(url, {
		...fetchConfig,
		headers,
		credentials: "include",
		body: body
			? isFormData
				? (body as BodyInit)
				: JSON.stringify(body)
			: undefined,
	});

	// Handle non-OK responses
	if (!response.ok) {
		// 401 handling: attempt token refresh, then retry
		if (response.status === 401 && !_isRetry) {
			// const refreshed = await tryRefreshToken();
			// if (refreshed) {
			// 	// Retry the original request with the new token.
			// 	// _isRetry prevents infinite loops if the retry also 401s.
			// 	return request<T>(endpoint, { ...config, _isRetry: true });
			// }
			// Refresh failed — clear auth state
			await handleUnauthorized();
		}

		const responseText = await response.text();
		let errorData: unknown;
		try {
			errorData = JSON.parse(responseText);
		} catch {
			errorData = responseText;
		}

		const errorMessage =
			(errorData as { message?: string })?.message ||
			(errorData as { error?: string })?.error ||
			(typeof errorData === "string" && errorData) ||
			response.statusText;

		throw new ApiError(
			errorMessage,
			response.status,
			response.statusText,
			errorData,
		);
	}

	// Handle empty responses (204 No Content)
	if (response.status === 204) {
		return undefined as T;
	}

	// Parse JSON response
	try {
		return (await response.json()) as T;
	} catch {
		return undefined as T;
	}
}

/**
 * API client with typed HTTP methods
 */
export const apiClient = {
	get<T>(endpoint: string, config?: Omit<RequestConfig, "body">): Promise<T> {
		return request<T>(endpoint, { ...config, method: "GET" });
	},

	post<T, B = unknown>(
		endpoint: string,
		body?: B,
		config?: RequestConfig,
	): Promise<T> {
		return request<T>(endpoint, { ...config, method: "POST", body });
	},

	put<T, B = unknown>(
		endpoint: string,
		body?: B,
		config?: RequestConfig,
	): Promise<T> {
		return request<T>(endpoint, { ...config, method: "PUT", body });
	},

	patch<T, B = unknown>(
		endpoint: string,
		body?: B,
		config?: RequestConfig,
	): Promise<T> {
		return request<T>(endpoint, { ...config, method: "PATCH", body });
	},

	delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
		return request<T>(endpoint, { ...config, method: "DELETE" });
	},
};

/**
 * Generic request function for use with TanStack Query
 * @example
 * const { data } = createQuery({
 *   queryKey: ['posts'],
 *   queryFn: () => apiRequest<Post[]>({ endpoint: '/posts' })
 * });
 */
export async function apiRequest<T>(config: {
	endpoint: string;
	method?: string;
	body?: unknown;
	params?: Record<string, string | number | boolean | undefined>;
}): Promise<T> {
	const { endpoint, method = "GET", body, params } = config;
	return request<T>(endpoint, { method, body, params });
}

export default apiClient;
