<script lang="ts">
	const { success, message }: { success?: boolean; message?: string } = $props()
</script>

{#if success}
	<p class="not-prose text-center font-catherine text-lg">{message}</p>
{:else}
	<p class="not-prose text-error">{message}</p>
{/if}
