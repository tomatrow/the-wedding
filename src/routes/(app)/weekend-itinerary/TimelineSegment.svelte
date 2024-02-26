<script lang="ts">
	import { type LineItem, addItem } from './Timeline.svelte'

	const { ...props } = $props<LineItem>()
	const item = { ...props }

	addItem(item)
</script>
