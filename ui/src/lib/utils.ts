import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import apiClient from "./api";
import { generateImageUrl } from "@imgproxy/imgproxy-node";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Generate optimized image URL via Imgproxy
 */
export function getOptimizedImageUrl(
	src: string,
	options?: {
		width?: number | "auto";
		format?: "webp" | "avif";
		quality?: number;
	},
): string {
	const width = options?.width === "auto" ? 0 : options?.width || 0;
	const format = options?.format || "webp";
	const quality = options?.quality || 85;

	return generateImageUrl({
		endpoint: "https://img.ceokoroji.dev",
		url: {
			value: src,
			displayAs: "plain",
		},
		key: import.meta.env.VITE_IMGPROXY_KEY,
		salt: import.meta.env.VITE_IMGPROXY_SALT,
		options: {
			resizing_type: "fill",
			width: width,
			height: 0,
			quality: quality,
			format: format,
		},
	});
}

/**
 * Generate a srcset string for responsive images
 */
export function generateSrcSet(
	src: string,
	widths: number[] = [400, 800, 1200, 1600],
	format: "webp" | "avif" = "webp",
	quality: number = 85,
): string {
	return widths
		.map((width) => {
			const url = getOptimizedImageUrl(src, {
				width,
				format,
				quality,
			});
			return `${url} ${width}w`; // The 'w' tells the browser the true pixel width
		})
		.join(", ");
}

/**
 * Fetches a securely signed imgproxy URL from the Go backend.
 * @param rawUrl The original DigitalOcean Space image URL
 * @param fetchFn Optional fetch instance (useful for SvelteKit load functions)
 * @returns The signed URL, or a fallback/null if it fails
 */
export async function getSignedImageUrl(
	rawUrl: string,
	fetchFn: typeof fetch = globalThis.fetch,
): Promise<string | null> {
	if (!rawUrl) return null;

	try {
		// Replace with your actual Go API domain
		// const apiUrl = `https://api.yourdomain.com/sign-image?url=${encodeURIComponent(rawUrl)}`;
		const apiUrl = `/sign-image?url=${encodeURIComponent(rawUrl)}`;

		const response = await apiClient.get<{ signedUrl: string }>(apiUrl);

		return response.signedUrl;
	} catch (error) {
		console.error("Error fetching signed URL:", error);
		return null;
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any }
	? Omit<T, "children">
	: T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
	ref?: U | null;
};
