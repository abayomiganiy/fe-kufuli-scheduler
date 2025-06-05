import { useCallback, useRef } from "react";

/**
 * A custom hook that creates a debounced version of a function
 * @param callback The function to debounce
 * @param delay The delay in milliseconds
 * @returns A debounced version of the callback function
 */
export function useDebounce<T extends (...args: unknown[]) => unknown>(
    callback: T,
    delay: number
): (...args: Parameters<T>) => void {
    const timeoutRef = useRef<number>();

    return useCallback(
        (...args: Parameters<T>) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = window.setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );
}

/**
 * A utility function that creates a debounced version of a function
 * @param func The function to debounce
 * @param wait The delay in milliseconds
 * @returns A debounced version of the function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: number;

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = window.setTimeout(later, wait);
    };
}
