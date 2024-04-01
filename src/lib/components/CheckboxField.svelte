<script context="module">
	import type { Action } from 'svelte/action'

	const applyIndeterminate: Action<HTMLInputElement, boolean | undefined> = (element, indeterminate = false) => {
		element.indeterminate = indeterminate
	}
</script>

<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements'

	let {
		label,
		checked = $bindable(),
		indeterminate,
		enabled,
		...rest
	}: {
		enabled?: boolean
		checked?: boolean
		label?: string
		indeterminate?: boolean
	} & SvelteHTMLElements['input'] = $props()
</script>

<div class="form-control">
	<label class="label cursor-pointer">
		<span class="label-text mr-2 text-white">{label}</span>
		<input
			use:applyIndeterminate={indeterminate}
			type="checkbox"
			bind:checked
			class="checkbox-primary checkbox"
			{...rest}
		/>
	</label>
</div>
