import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import apiClient from "./api";
import { API_BASE_URL } from "$lib";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

function imageURL(
	src: string,
	width: number,
	format: "webp" | "avif",
	quality: number,
): string {
	if (!src.startsWith("https://")) return src;

	const query = new URLSearchParams({
		src,
		format,
		quality: String(quality),
	});
	return `${API_BASE_URL}/images/${width}?${query}`;
}

/**
 * Generate a srcset string for responsive images
 */
export function generateSrcSet(
	src: string,
	widths: number[] = [200, 400, 600, 800],
	format: "webp" | "avif" = "webp",
	quality: number = 85,
): string {
	return widths
		.map((width) => {
			return `${imageURL(src, width, format, quality)} ${width}w`;
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
