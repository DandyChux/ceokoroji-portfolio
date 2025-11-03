import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

/**
 * Creates a debounced value that updates after a specified delay
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
 * @returns A reactive state that updates after the delay
 */
export function debounce<T>(value: T, delay: number = 500): { current: T } {
	let timeoutId: ReturnType<typeof setTimeout> | undefined;
	let current = $state(value) as T;

	$effect(() => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(() => {
			current = value;
		}, delay);

		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	});

	return { get current() { return current; } };
}
