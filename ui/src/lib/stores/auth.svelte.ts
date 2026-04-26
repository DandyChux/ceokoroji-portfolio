import { goto } from '$app/navigation';
import apiClient from '$lib/api';

interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
}

interface AuthResponse {
	success: boolean;
	message: string;
}

class AuthStore {
	private state = $state<AuthState>({
		isAuthenticated: false,
		isLoading: true,
	});

	get isAuthenticated() {
		return this.state.isAuthenticated;
	}

	get isLoading() {
		return this.state.isLoading;
	}

	async checkAuth() {
		this.state.isLoading = true;
		try {
			const response = await apiClient.get<AuthResponse>('/auth/verify');

			this.state.isAuthenticated = response.success;
		} catch (error) {
			console.error('Auth check failed:', error);
			this.state.isAuthenticated = false;
		} finally {
			this.state.isLoading = false;
		}
	}

	async login(password: string) {
		const response = await apiClient.post<AuthResponse>('/auth/login', { password });

		if (!response.success) {
			throw new Error(response.message || 'Invalid password');
		}

		this.state.isAuthenticated = true;
		return response;
	}

	async logout() {
		await apiClient.post('/auth/logout');

		this.state.isAuthenticated = false;
		goto('/admin/login');
	}
}

export const authStore = new AuthStore();
