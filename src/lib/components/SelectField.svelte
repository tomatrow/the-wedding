<script lang="ts" generics="T">
	let {
		label,
		value = $bindable(),
		values,
		placeholder
	}: {
		value?: T
		values: {
			value: T
			label?: string
		}[]
		label?: string
		placeholder?: string
	} = $props()
</script>

<div class="form-control">
	<label class="cursor-pointer">
		<div class="label">
			<span class="label-text text-white">{label}</span>
		</div>

		<select class="select select-ghost" bind:value>
			{#if placeholder}
				<option disabled selected>{placeholder}</option>
			{/if}
			{#each values as { value, label = value }}
				<option {value}>{label}</option>
			{/each}
		</select>
	</label>
</div>
