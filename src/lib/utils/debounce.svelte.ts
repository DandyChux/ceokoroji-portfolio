/**
 * Creates a debounced callback function
 * @param callback - The function to debounce
 * @param delay - Delay in milliseconds
 * @returns A debounced version of the callback
 */
export function debounce<T extends (...args: any[]) => void>(
	callback: T,
	delay: number = 500
): T {
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	return ((...args: any[]) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(() => {
			callback(...args);
		}, delay);
	}) as T;
}
