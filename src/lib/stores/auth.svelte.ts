import { goto } from '$app/navigation';

interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
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
			const API_URL = import.meta.env.VITE_API_URL;
			const response = await fetch(`${API_URL}/auth/verify`, {
				credentials: 'include',
			});

			this.state.isAuthenticated = response.ok;
		} catch (error) {
			console.error('Auth check failed:', error);
			this.state.isAuthenticated = false;
		} finally {
			this.state.isLoading = false;
		}
	}

	async login(password: string) {
		const API_URL = import.meta.env.VITE_API_URL;
		const response = await fetch(`${API_URL}/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({ password }),
		});

		if (!response.ok) {
			const data = await response.json();
			throw new Error(data.message || 'Invalid password');
		}

		this.state.isAuthenticated = true;
		return response.json();
	}

	async logout() {
		const API_URL = import.meta.env.VITE_API_URL;
		await fetch(`${API_URL}/auth/logout`, {
			method: 'POST',
			credentials: 'include',
		});

		this.state.isAuthenticated = false;
		goto('/admin/login');
	}
}

export const authStore = new AuthStore();
