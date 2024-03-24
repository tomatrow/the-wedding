<script lang="ts">
	import Circle from './Circle.svelte'
	const { loading }: { loading?: unknown } = $props()
</script>

<button class="btn btn-neutral mt-4">Submit</button>

{#if loading}
	<Circle />
{/if}
