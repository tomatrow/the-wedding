import { untrack } from 'svelte'
import { set, mapValues, constant } from 'lodash-es'

export function isNotNil<T>(value: T | undefined | null): value is T {
	return value !== null && value !== undefined
}

export function isURL(value: string) {
	try {
		new URL(value)
		return true
	} catch {
		return false
	}
}

type StructuredFormDataValue = FormDataEntryValue | { [key: string]: StructuredFormDataValue }
export type StructuredFormData = Record<string, StructuredFormDataValue>

export function getStructuredFormData(formData: FormData) {
	const data: StructuredFormData = {}
	formData.forEach((value, path) => set(data, path, value))
	return data
}

export function pickUntrack<T extends object>(
	object: T,
	predicate: (key: string, fn: T[keyof T] & Function) => unknown = constant(true)
): T {
	return mapValues(object, (value, key) => {
		if (typeof value !== 'function' || !predicate(key, value)) return value
		return (...args: any[]) => untrack(() => value.call(object, ...args))
	}) as T
}
