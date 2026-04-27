import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
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

	// If no size is provided, default to 0 (Imgproxy keeps original width)
	const width = options?.size === "auto" ? 0 : options?.size || 0;
	const format = options?.format || "webp";
	const quality = options?.quality || 85;

	// Imgproxy processing options:
	// rs:fill:WIDTH:HEIGHT / q:QUALITY / f:FORMAT
	const processingOptions = `rs:fill:${width}:0/q:${quality}/f:${format}`;

	// Imgproxy requires the source URL to be plain text at the end
	return `${IMGPROXY_URL}/insecure/${processingOptions}/plain/${src}`;
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
