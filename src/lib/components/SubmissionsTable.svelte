<script lang="ts" generics="T extends Record<string, any>">
	const { order, data }: { order: (keyof T)[]; data: T[] } = $props()
</script>

<section class="mt-16">
	<h2>Previous Submissions</h2>
	<div class="not-prose overflow-x-auto">
		<table class="table bg-transparent">
			<thead>
				<tr class="bg-transparent text-white">
					{#each order as key, index}
						{#if index === 0}
							<th class="bg-transparent">{key}</th>
						{:else}
							<td>{key}</td>
						{/if}
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each data as submission}
					<tr class="h-12">
						{#each order as key, index}
							{#if index === 0}
								<th class="bg-transparent">{submission[key]}</th>
							{:else}
								<td>{submission[key]}</td>
							{/if}
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>
