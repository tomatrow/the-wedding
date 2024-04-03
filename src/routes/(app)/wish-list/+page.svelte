<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client'
	import type { PageData } from './$types'
	import { untrack } from 'svelte'
	import { FormMessage, TextField, SelectField, SubmitButton, SubmissionsTable, NumberField } from '$lib/components'

	const { data }: { data: PageData } = $props()
	const { form, constraints, enhance, errors, message, delayed } = superForm(data.form, {
		dataType: 'json',
		multipleSubmits: 'prevent'
	})

	let ref: HTMLSelectElement | undefined = $state()

	const selectedWish = $derived(data.wishes.find((wish) => wish.id === $form.wishId))

	$effect(() => {
		untrack(() => {
			if ($form.quantity === undefined) {
				$form.quantity = 1
			}
		})
	})
</script>

<article class="container prose mx-auto px-4">
	<h1>Wish List</h1>

	<section class="mt-16">
		<h2>Grantable Wishes</h2>

		<p>
			We have curated a wishlist focusing on non-toxic and high-quality products that will last a long time. If you wish
			to grant a wish, thank you! The links provided will show you the desired product but not necessarily the best
			price; if you find the same product/brand for a cheaper price, that’s awesome!
		</p>

		<p>
			Catherine thoroughly researched these products, so if you have any questions about the logic behind our choices,
			she would be happy to chat.
		</p>

		<div class="not-prose max-h-96 overflow-x-auto overflow-y-auto">
			<table class="table table-xs bg-transparent">
				<thead>
					<tr class="bg-transparent text-white">
						<th class="bg-transparent">Wish</th>
						<th class="bg-transparent">Granted</th>
						<th class="bg-transparent">Notes</th>
					</tr>
				</thead>
				<tbody>
					{#each data.wishes as { Quantity, Title, Link, Granted, Notes, id } (id)}
						<tr class="h-12">
							<td class="bg-transparent">
								<a class="link" target="_blank" href={Link}>
									{Title}

									{#if Quantity > 1}
										(<i>Qty. {Quantity}</i>)
									{/if}
								</a>
							</td>
							<td>
								{#if Granted}
									<input type="checkbox" checked={true} class="checkbox-neutral checkbox pointer-events-none" />
								{:else}
									<button
										type="button"
										class="btn btn-neutral btn-sm"
										onclick={async () => {
											$form.wishId = id
											ref?.scrollIntoView({ behavior: 'smooth' })
										}}>Grant</button
									>
								{/if}
							</td>
							<td>{Notes}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section class="mt-16">
		<h2>Grant a Wish</h2>

		<p>
			Because we have so many things to haul to and from the campground, we would prefer that you don’t bring gifts to
			the wedding. Instead, you may give them to us in person (before or after the wedding) or send them to
		</p>

		<address class="relative">
			AJ Caldwell <br /> 897 Wandering Rd <br /> APT 16 <br />Vista, CA 92081
		</address>

		{#if $message}
			<FormMessage success={$message?.success} message={$message.text ?? $message} />
		{/if}

		<form
			method="POST"
			class="not-prose mt-16 {$message?.success ? 'hidden' : 'flex'} flex-col items-start gap-4"
			use:enhance
		>
			<SelectField
				bind:ref
				label="What wish shall you grant?"
				placeholder="Wish"
				values={data.wishes.map(({ id, Title }) => ({ label: Title, value: id }))}
				bind:value={$form.wishId}
			/>

			{#if selectedWish && selectedWish.Quantity > 1}
				<NumberField label="How many?" bind:value={$form.quantity} min={1} max={selectedWish.Quantity} />
			{/if}

			<TextField
				bind:value={$form.name}
				label="What is your name?"
				placeholder="Name"
				errors={$errors.name}
				{...$constraints.name}
			/>
			<SubmitButton loading={$delayed} />
		</form>

		{#if data.pastSubmissions.length}
			<SubmissionsTable data={data.pastSubmissions} order={['Name', 'Wish']} />
		{/if}
	</section>
</article>
