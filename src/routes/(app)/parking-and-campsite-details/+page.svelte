<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client'
	import type { PageData } from './$types'
	import {
		TextField,
		SubmissionsTable,
		SubmitButton,
		FormMessage,
		CheckboxField,
		NumberField,
		SelectField
	} from '$lib/components'
	import { slide } from 'svelte/transition'

	const { data }: { data: PageData } = $props()
	const { form, constraints, enhance, errors, message, delayed } = superForm(data.form, {
		dataType: 'json',
		multipleSubmits: 'prevent'
	})

	if (!$form.tentSize) {
		$form.tentSize = {
			width: 1,
			height: 1
		}
	}
</script>

<article class="container prose mx-auto px-4 prose-strong:text-white">
	<h1>Parking and Campsite Details</h1>

	<section>
		<h2>Campsites Reservation</h2>
		<p>
			We have reserved <strong>12 campsites</strong> for Friday and Saturday. If you want to camp, please enter your
			name, the number of people in your party, and how many vehicles you will bring. If you are bringing a trailer,
			please check that box and note that the maximum allowed trailer length is <strong>24ft</strong>. Are you willing
			to share a campsite with other guests? If so, what size is your tent?
		</p>
		<p>If you want to extend your stay, contact us, and we may be able to add additional days to your campsite.</p>
		<p>
			Based on these responses, we will assign a campsite to you or inform you that we’re out of space shortly after <strong
				>April 18</strong
			>.
		</p>

		{#if $message}
			<FormMessage success={$message?.success} message={$message.text ?? $message} />
		{/if}

		<form
			method="POST"
			class="not-prose mt-16 {$message?.success ? 'hidden' : 'flex'} flex-col items-start gap-4"
			use:enhance
		>
			<TextField
				bind:value={$form.name}
				label="What is your name?"
				placeholder="Name"
				errors={$errors.name}
				{...$constraints.name}
			/>

			<NumberField label="Party Size" bind:value={$form.partySize} {...$constraints.partySize} />

			<CheckboxField
				bind:checked={$form.sharable}
				label="Are you open to sharing a campsite?"
				{...$constraints.sharable}
			/>

			{#if $form.sharable && $form.tentSize}
				<div class="flex flex-wrap gap-4" transition:slide={{ axis: 'y' }}>
					<NumberField label="Tent Width" bind:value={$form.tentSize.width} {...$constraints.tentSize?.width ?? {}} />
					<NumberField
						label="Tent Height"
						bind:value={$form.tentSize.height}
						{...$constraints.tentSize?.height ?? {}}
					/>
				</div>
			{/if}

			{#each $form.vehicles as _, index}
				<div class="pt-4" transition:slide={{ axis: 'y' }}>
					Vehicle {index + 1}
					<SelectField
						label="Choose a vehicle type"
						placeholder="Vehicle Type"
						bind:value={$form.vehicles[index].vehicleType}
						values={Object.values(data.vehicleTypes).map((value) => ({ value }))}
					/>
				</div>
			{/each}

			{#if $form.vehicles.length < 2}
				<button
					type="button"
					class="btn btn-success"
					onclick={() => {
						$form.vehicles = [...$form.vehicles, { vehicleType: 'Non-Trailer' }]
					}}>Add Vehicle</button
				>
			{/if}

			<SubmitButton loading={$delayed} />
		</form>

		{#if data.pastSubmissions.length}
			<SubmissionsTable
				data={data.pastSubmissions}
				order={[
					'Name',
					'Party Size',
					'Sharable',
					'Tent Width',
					'Tent Height',
					'Primary Vehicle Type',
					'Secondary Vehicle Type'
				]}
			/>
		{/if}
	</section>

	<section>
		<h2>Parking</h2>
		<p>If you are camping, please park in your assigned campsite. Otherwise, you may route to</p>
		<address>Doane Valley Nature Trail</address>

		<a
			href="https://maps.apple.com/?address=Pauma%20Valley,%20CA%2092061,%20United%20States&auid=4424481136211890498&ll=33.341500,-116.901423&lsp=9902&q=Doane%20Valley%20Natural%20Trail"
			target="_blank">apple maps</a
		>
		| <a href="https://maps.app.goo.gl/NWriN8yszd6jJ7oU7" target="_blank">google maps</a>

		<p>
			This address will take you to a parking lot adjacent to the campground. Please be aware that this public parking
			lot may fill up. If it is full when you arrive, you may park at the Silvercrest Picnic Area, about 10 minutes from
			the pond. We will arrange for someone to ferry anyone who must park at Silvercrest. There is no cell reception at
			the campground, so please download your maps before you arrive.
		</p>
		<p>Because of limited parking spots, we ask that you carpool with other guests as much as possible.</p>
	</section>

	<section>
		<h2>Accessibility</h2>
		<p>
			If your mobility is hindered, please note that the ceremony area is a 15-minute hike from the parking lot. Please
			contact us if you need an escort; we can bring a wheelchair.
		</p>
	</section>
</article>
