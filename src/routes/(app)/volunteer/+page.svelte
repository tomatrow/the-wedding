<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client'
	import type { PageData } from './$types'
	import { FormMessage, SubmitButton, TextField, SubmissionsTable, SelectField } from '$lib/components'
	const { data }: { data: PageData } = $props()
	const { form, constraints, enhance, errors, message, delayed } = superForm(data.form, {
		dataType: 'json',
		multipleSubmits: 'prevent'
	})
</script>

<article class="container prose mx-auto px-4 prose-strong:text-white">
	<h1>Volunteer Opportunities</h1>
	<p>Would you like to lend a helping hand? Well, you may keep your hand, but we would love your help!</p>

	<section>
		<h2>General Setup</h2>
		<p>
			We will be setting up on Friday, and anyone may come to help us. If you are camping on Friday, don’t feel
			obligated to help; you may enjoy the park!
		</p>
	</section>

	<section>
		<h2>Specific Volunteer Roles</h2>
		<p>We have several jobs that we would like to assign to individual people. They include:</p>
		<ul>
			{#each data.roles as { name, description }}
				<li>
					<strong>{name}:</strong>
					{description}
				</li>
			{/each}
		</ul>

		{#if $message}
			<FormMessage success={$message?.success} message={$message.text ?? $message} />
		{/if}

		<form
			method="POST"
			class="not-prose mt-16 {$message?.success ? 'hidden' : 'flex'} flex-col items-start gap-4"
			use:enhance
		>
			<TextField bind:value={$form.name} placeholder="Name" errors={$errors.name} {...$constraints.name} />
			<SelectField
				label="What role shall you fulfill?"
				placeholder="Role"
				values={data.roles.map(({ value }) => ({ value }))}
				bind:value={$form.role}
			/>
			<SubmitButton loading={$delayed} />
		</form>
	</section>

	{#if data.pastSubmissions.length}
		<SubmissionsTable data={data.pastSubmissions} order={['Name', 'Role']} />
	{/if}

	<section>
		<h2>Donations Needed</h2>
		<p>
			We also need large coolers to transport frozen food, so if you would like to donate a cooler that we may borrow,
			that would be helpful.
		</p>
	</section>
</article>
