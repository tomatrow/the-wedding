<script lang="ts" context="module">
	import { type Snippet } from 'svelte'
	import { type ContextKey, getContext } from '$lib/context'

	export interface LineItem {
		time?: string
		title?: string
		children?: Snippet
	}

	const key: ContextKey<(item: LineItem) => void> = 'timeline'

	export function addItem(item: LineItem) {
		const addItem = getContext(key)
		addItem(item)
	}
</script>

<script lang="ts">
	import { setContext } from '$lib/context'
	import Checkmark from './Checkmark.svelte'

	const { children, class: className = '' } = $props<{
		children?: Snippet
		class?: string
	}>()

	const items = $state<LineItem[]>([])

	setContext(key, (item) => items.push(item))
</script>

<ul class="{className} timeline timeline-vertical timeline-snap-icon max-md:timeline-compact">
	{#if children}
		{@render children()}
	{/if}

	{#each items as { children: _children, time, title }, index}
		{@const isEven = index % 2 === 0}

		<li>
			{#if index > 0}
				<hr />
			{/if}

			<div class="timeline-middle">
				<Checkmark />
			</div>

			<div class="mb-4 md:mb-10" class:timeline-start={isEven} class:timeline-end={!isEven} class:md:text-end={isEven}>
				<time class="font-mono italic">{time}</time>

				<div class="text-lg font-black">{title}</div>

				{#if _children}
					{@render _children()}
				{/if}
			</div>

			<hr />
		</li>
	{/each}
</ul>
