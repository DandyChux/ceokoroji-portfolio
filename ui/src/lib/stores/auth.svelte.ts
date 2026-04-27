import { goto } from "$app/navigation";
import apiClient from "$lib/api";

interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
}

interface LoginResponse {
	success: boolean;
	message: string;
}

function createAuthStore() {
	let isAuthenicated = $state(false);
	let isLoading = $state(false);

	return {
		get isAuthenticated() {
			return isAuthenicated;
		},
		get isLoading() {
			return isLoading;
		},

		async checkAuth() {
			isLoading = true;
			try {
				const response =
					await apiClient.get<LoginResponse>("/auth/verify");
				isAuthenicated = response.success;
			} catch (error) {
				console.error("Auth check failed:", error);
				isAuthenicated = false;
			} finally {
				isLoading = false;
			}
		},

		async login(password: string) {
			isLoading = true;
			try {
				const response = await apiClient.post<LoginResponse>(
					"/auth/login",
					{ password },
				);
				isAuthenicated = response.success;
			} catch (error) {
				console.error("Login failed:", error);
				isAuthenicated = false;
			} finally {
				isLoading = false;
			}
		},

		async logout() {
			isLoading = true;
			try {
				await apiClient.post("/auth/logout");
				isAuthenicated = false;
				goto("/admin/login");
			} catch (error) {
				console.error("Logout failed:", error);
			} finally {
				isLoading = false;
			}
		},
	};
}

export const authStore = createAuthStore();
