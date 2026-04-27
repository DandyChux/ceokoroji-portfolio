import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";
import apiClient from "./api";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

function base64Url(buf) {
	return buf
		.toString("base64")
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");
}

/**
 * Generate optimized image URL via Imgproxy
 */
export function getOptimizedImageUrl(
	src: string,
	options?: {
		size?: number | "auto";
		format?: "webp" | "avif";
		quality?: number;
	},
): string {
	const IMGPROXY_URL = "https://img.ceokoroji.dev";
	const width = options?.size === "auto" ? 0 : options?.size || 0;
	const format = options?.format || "webp";
	const quality = options?.quality || 85;
	// Imgproxy processing options:
	// rs:fill:WIDTH:HEIGHT / q:QUALITY / f:FORMAT
	const processingOptions = `rs:fill:${width}:0/q:${quality}/f:${format}`;
	const path = `/${processingOptions}/plain/${src}`;

	// Read key/salt from env (hex/base64 handling depends on how you stored them)
	const KEY = import.meta.env.VITE_IMGPROXY_KEY; // secret key (hex or base64)
	const SALT = import.meta.env.VITE_IMGPROXY_SALT; // salt (hex or base64)

	// Convert key/salt to raw bytes. If you stored hex, use 'hex'; if base64, use 'base64'.
	// Adjust 'hex' below if your values are base64.
	const keyBuf = Buffer.from(KEY, "hex");
	const saltBuf = Buffer.from(SALT, "hex");

	// HMAC input is salt || path
	const hmac = crypto.createHmac("sha256", keyBuf);
	hmac.update(Buffer.concat([saltBuf, Buffer.from(path, "utf8")]));
	const signature = base64Url(hmac.digest());

	// Imgproxy requires the source URL to be plain text at the end
	return `${IMGPROXY_URL}/${signature}${path}`;
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

/**
 * Generate a srcset string for responsive images
 */
export function generateSrcSet(
	src: string,
	widths: number[] = [400, 800, 1200],
	format: "webp" | "avif" = "webp",
	quality: number = 85,
): string {
	return widths
		.map((width) => {
			const url = getOptimizedImageUrl(src, {
				size: width,
				format,
				quality,
			});
			return `${url} ${width}w`; // The 'w' tells the browser the true pixel width
		})
		.join(", ");
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
