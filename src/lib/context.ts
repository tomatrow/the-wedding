import { getContext as _getContext, setContext as _setContext, hasContext as _hasContext } from 'svelte'

export interface ContextKey<T = unknown> {}

export function getContext<T>(key: ContextKey<T>): T {
	return _getContext(key) as T
}

export function setContext<T>(key: ContextKey<T>, value: T): void {
	_setContext(key, value)
}

export function hasContext<T>(key: ContextKey<T>): boolean {
	return _hasContext(key)
}
