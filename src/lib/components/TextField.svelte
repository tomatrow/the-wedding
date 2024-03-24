<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements'

	let {
		label,
		errors = [],
		value = $bindable(),
		...rest
	}: { label?: string; errors?: string[]; value?: string } & SvelteHTMLElements['input'] = $props()
</script>

<div class="form-control">
	<label class="cursor-pointer">
		<div class="label">
			<span class="label-text text-white">{label}</span>
		</div>
		<input type="text" class="input input-ghost placeholder:text-white" bind:value {...rest} />
	</label>
	{#each errors as error}
		<p>{error}</p>
	{/each}
</div>
