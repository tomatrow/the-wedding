<script lang="ts">
	// import type { PageData } from './$types';
	// import { superForm } from 'sveltekit-superforms/client';
	// import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	// const { data } = $props<{ data: PageData }>()
	// const { form, errors, constraints, enhance } = superForm(data.form)

	let attendence = $state<'Attending' | 'Declining'>();
	let attendees = $state([{ name: '' }]);
</script>

<article class="container prose mx-auto px-4">
	<h1>RSVP</h1>

	<p>
		To accept our invitation, <br />
		please enter the names of each person in your party, check the “attending” box, and choose your meal.
	</p>
	<p>
		To decline, <br />
		please enter your name and check the “decline” box.
	</p>

	<form method="POST" class="flex w-96 flex-col gap-4">
		<select class="select select-bordered w-full max-w-xs" bind:value={attendence}>
			<option disabled selected>Choose attendence</option>
			<option>Attending</option>
			<option>Declining</option>
		</select>

		{#if attendence === 'Declining'}
			<div class="form-control">
				<label class="cursor-pointer">
					<div class="label">
						<span class="label-text">What is your name?</span>
					</div>
					<input name="name" placeholder="Name" type="text" class="input input-bordered" />
				</label>
			</div>
		{:else if attendence === 'Attending'}
			{#each attendees as attendee, index}
				<div class="form-control">
					<label class="cursor-pointer">
						<div class="label">
							<span class="label-text">Attendee ({index + 1}) Name</span>
						</div>
						<div class="flex gap-4">
							<input type="text" bind:value={attendee.name} class="input input-bordered w-full" />
							<button type="button" class="btn" onclick={() => attendees.splice(index, 1)}>X</button>
						</div>
					</label>
				</div>
			{/each}

			<button type="button" class="btn self-center" onclick={() => attendees.push({ name: '' })}>Add Attendee</button>
		{/if}

		<button class="btn mt-4">Submit</button>
	</form>

	<section>
		<h2>A Culinary Explanation:</h2>
		<p>
			In true camping fashion, we plan to cook stew in two giant cauldrons over campfires. Because we will use two pots,
			we can cook two kinds of stew. However, if most of you choose one kind over the other, we may decide not to cook
			the less popular option.
		</p>
		<p>
			Both kinds will be free of the following components: eggs, dairy, gluten, corn, soy, nuts, and pork. If you have a
			dietary restriction that is not on this list, please let us know, and we will try to accommodate you.
		</p>
	</section>
</article>
