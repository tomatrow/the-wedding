<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client'
	import { AttendenceTypes, BreadTypes, MainDishTypes, type BreadType } from '$lib/types'
	import Circle from '$lib/components/Circle.svelte'
	import type { PageData } from './$types'

	const { data } = $props<{ data: PageData }>()
	const { form, constraints, enhance, errors, message, delayed } = superForm(data.form, {
		dataType: 'json',
		multipleSubmits: 'prevent'
	})

	function describeBread(breadType: BreadType) {
		switch (breadType) {
			case 'Gluten Free':
				return 'Gluten Free & Vegan'
			case 'Gluten Full':
				return 'Gluten Full'
		}
	}
</script>

<article class="container prose mx-auto px-4">
	<h1>RSVP</h1>

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

	<section>
		<h2>RSVP Form:</h2>

		<p>
			To accept our invitation, <br />
			please choose <em>Attending</em>, enter the name and meal choice of each person in your group, and press
			<em>Submit</em>.
		</p>
		<p>
			To decline, <br />
			please choose <em>Declined</em>, enter your name, and press <em>Submit</em>.
		</p>

		{#if $message?.success}
			<p class="not-prose text-center font-catherine text-lg">{$message.text}</p>
		{:else}
			<p class="not-prose text-error">{$message}</p>
		{/if}

		<form
			method="POST"
			class="not-prose mt-16 {$message?.success ? 'hidden' : 'flex'} flex-col items-start gap-4"
			use:enhance
		>
			<div class="form-control">
				<label class="cursor-pointer">
					<div class="label">
						<span class="label-text text-white">Attendence</span>
					</div>

					<select class="select select-ghost" bind:value={$form.attendance}>
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
							<span class="label-text text-white">What is your name?</span>
						</div>
						<input
							placeholder="Name"
							type="text"
							class="input input-ghost placeholder:text-white"
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
					<div class="flex items-center">
						<div class="">Attendee ({index + 1})</div>
						{#if $form.attendees.length > 1}
							<button
								type="button"
								class="btn btn-ghost btn-xs ml-4"
								onclick={() => ($form.attendees = $form.attendees.toSpliced(index, 1))}>X</button
							>
						{/if}
					</div>

					<div class="flex flex-col gap-4 md:flex-row">
						<div class="form-control">
							<label class="cursor-pointer">
								<div class="label">
									<span class="label-text text-white">Name</span>
								</div>
								<input
									type="text"
									data-invalid={$errors?.attendees?.[index]?.name}
									bind:value={$form.attendees[index].name}
									class="input input-ghost w-full placeholder:text-white"
									placeholder="Name"
									{...$constraints.attendees?.name}
								/>
							</label>
						</div>

						<div class="form-control">
							<label class="cursor-pointer">
								<div class="label">
									<span class="label-text text-white">Meal</span>
								</div>

								<select
									class="select select-ghost"
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
									<span class="label-text text-white">Bread</span>
								</div>

								<select
									class="select select-ghost"
									data-invalid={$errors?.attendees?.[index]?.breadSide}
									bind:value={$form.attendees[index].breadSide}
								>
									<option disabled selected>Choose bread</option>
									{#each Object.values(BreadTypes) as value}
										<option {value}>
											{describeBread(value)}
										</option>
									{/each}
								</select>
							</label>
						</div>
					</div>
				{/each}

				<button
					type="button"
					class="btn btn-success self-center"
					onclick={() => {
					const attendee = { name: '', mainDish: 'Beef Stew',  breadSide: "Gluten Full" } as const
					$form.attendees = [...$form.attendees, attendee]
				}}
					>Add Attendee</button
				>
			{/if}

			<button class="btn btn-neutral mt-4">Submit</button>

			{#if $delayed}
				<Circle />
			{/if}
		</form>
	</section>

	{#if data.pastSubmissions.length}
		<section class="mt-16">
			<h2>Previous Submissions</h2>
			<div class="not-prose overflow-x-auto">
				<table class="table table-pin-rows table-pin-cols bg-transparent">
					<thead>
						<tr class="bg-transparent text-white">
							<th class="bg-transparent">Name</th>
							<td>Attendence</td>
							<td>Main Dish</td>
							<td>Bread</td>
						</tr>
					</thead>
					<tbody>
						{#each data.pastSubmissions as { "Main Dish": mainDish, Attendance, Bread, Name }}
							<tr class="h-12">
								<th class="bg-transparent">{Name}</th>
								<td>{Attendance}</td>
								<td>{mainDish}</td>
								<td>{Bread && describeBread(Bread)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>
	{/if}
</article>
