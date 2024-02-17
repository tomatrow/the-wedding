<script lang="ts">
	import { AttendenceTypes, BreadTypes, MainDishTypes } from '$lib/types'
	import type { PageData } from './$types'
	import { superForm } from 'sveltekit-superforms/client'

	const { data } = $props<{ data: PageData }>()
	const { form, constraints, enhance, errors, message } = superForm(data.form, {
		dataType: 'json'
	})
</script>

<article class="container prose mx-auto px-4">
	<h1>RSVP</h1>

	<p>
		To accept our invitation, <br />
		please choose <em>Attending</em>, enter the name and meal choice of each person in your group, and press
		<em>Submit</em>.
	</p>
	<p>
		To decline, <br />
		please choose <em>Declined</em>, enter your name, and press <em>Submit</em>.
	</p>

	{#if $message}
		<p>{$message}</p>
	{/if}

	<form method="POST" class="mt-16 flex flex-col items-start gap-4" use:enhance>
		<div class="form-control">
			<label class="cursor-pointer">
				<div class="label">
					<span class="label-text">Attendence</span>
				</div>

				<select class="select select-bordered" bind:value={$form.attendance}>
					<option disabled selected>Choose attendence</option>
					{#each Object.values(AttendenceTypes) as value}
						<option>{value}</option>
					{/each}
				</select>
			</label>
		</div>

		{#if $form.attendance === AttendenceTypes.Declined}
			<div class="form-control">
				<label class="cursor-pointer">
					<div class="label">
						<span class="label-text">What is your name?</span>
					</div>
					<input
						placeholder="Name"
						type="text"
						class="input input-bordered"
						bind:value={$form.name}
						{...$constraints.name}
					/>
				</label>
				{#if $errors.name}
					<p>{$errors.name}</p>
				{/if}
			</div>
		{:else if $form.attendance === AttendenceTypes.Attending}
			{#each $form.attendees as _, index}
				<div class="flex">
					<span>Attendee ({index + 1}) </span>
					{#if $form.attendees.length > 1}
						<button type="button" class="btn" onclick={() => ($form.attendees = $form.attendees.toSpliced(index, 1))}
							>X</button
						>
					{/if}
				</div>

				<div class="flex gap-4">
					<div class="form-control">
						<label class="cursor-pointer">
							<div class="label">
								<span class="label-text">Name</span>
							</div>
							<input
								type="text"
								data-invalid={$errors?.attendees?.[index]?.name}
								bind:value={$form.attendees[index].name}
								class="input input-bordered w-full"
								placeholder="Name"
								{...$constraints.attendees?.name}
							/>
						</label>
					</div>

					<div class="form-control">
						<label class="cursor-pointer">
							<div class="label">
								<span class="label-text">Meal</span>
							</div>

							<select
								class="select select-bordered"
								data-invalid={$errors?.attendees?.[index]?.mainDish}
								bind:value={$form.attendees[index].mainDish}
							>
								<option disabled selected>Choose meal</option>
								{#each Object.values(MainDishTypes) as value}
									<option>{value}</option>
								{/each}
							</select>
						</label>
					</div>

					<div class="form-control">
						<label class="cursor-pointer">
							<div class="label">
								<span class="label-text">Bread</span>
							</div>

							<select
								class="select select-bordered"
								data-invalid={$errors?.attendees?.[index]?.breadSide}
								bind:value={$form.attendees[index].breadSide}
							>
								<option disabled selected>Choose bread</option>
								{#each Object.values(BreadTypes) as value}
									<option>{value}</option>
								{/each}
							</select>
						</label>
					</div>
				</div>
			{/each}

			<button
				type="button"
				class="btn self-center"
				onclick={() => {
					const attendee = { name: '', mainDish: 'Beef Stew',  breadSide: "Gluten Full" } as const
					$form.attendees = [...$form.attendees, attendee]
				}}
				>Add Attendee</button
			>
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
