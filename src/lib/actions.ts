import type { Action } from 'svelte/action'

export const indeterminate: Action<HTMLInputElement> = (element) => {
	element.indeterminate = true
}
