import { superValidate, message, type Infer } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { pick } from 'lodash-es'
import { z } from 'zod'
import type { Actions, PageServerLoad } from './$types'
import { fail } from '@sveltejs/kit'
import { createVolunteer, getVolunteers } from '$lib/airtable'
import { type Volunteers, VolunteersRole } from '$lib/schema/wedding'

const roles: {
	name: string
	description: string
	value: Infer<typeof VolunteersRole>
}[] = [
	// {
	// 	name: 'Ferry Driver',
	// 	description: 'The one who will remain on call to pick up anyone who must park at Silvercrest Picnic Area.',
	// 	value: VolunteersRole.enum['Ferry Driver']
	// },
	{
		name: 'Cauldron Tender',
		description:
			'2 people who will start campfires on Saturday morning, place the frozen stew into the cauldrons, stir and tend it until it is hot, and then put out the fire so it isn’t left unattended during the ceremony.',
		value: VolunteersRole.enum['Cauldron Tender']
	},
	{
		name: 'Vegetable Tender',
		description: 'The one who will tend the mashed vegetable side dishes, similarly to the cauldrons.',
		value: VolunteersRole.enum['Vegetable Tender']
	},
	{
		name: 'Servers',
		description: '2 people who will ladle the stew into bowls.',
		value: VolunteersRole.enum['Server']
	},
	{
		name: 'Keeper of the Bread',
		description:
			'The one who will bring the bread to the campground and divide it into baskets to be served at the appropriate time (there will be regular and gluten-free varieties).',
		value: VolunteersRole.enum['Keeper of the Bread']
	},
	{
		name: 'Veggie Master',
		description:
			'The one who will receive vegetables and hummus from our hands, turn them into beautiful platters, and then bring them on Saturday.',
		value: VolunteersRole.enum['Veggie Master']
	},
	{
		name: 'Hydrator',
		description:
			'The one who will bring 3 5-gallon jugs of drinks and a cooler full of ice, then fill the drink dispensers and keep them full.',
		value: VolunteersRole.enum['Hydrator']
	}
]

// Define outside the load function so the adapter can be cached
const SubmissionSchema = z.object({
	name: z.string(),
	role: VolunteersRole
})

export const load: PageServerLoad = async ({ cookies }) => {
	const insignia = cookies.get('insignia')
	const form = await superValidate(zod(SubmissionSchema))

	let pastSubmissions: Pick<Volunteers, 'Name' | 'Role'>[] = []
	if (insignia) {
		const campsites = await getVolunteers(insignia)
		pastSubmissions = campsites.map((campsite) => pick(campsite.fields, 'Name', 'Role'))
	}

	return { form, pastSubmissions, roles }
}

interface Message {
	success?: boolean
	text?: string
}

export const actions = {
	async default({ request, cookies }) {
		const insignia = cookies.get('insignia')
		console.log({ request, insignia })

		const form = await superValidate(request, zod(SubmissionSchema))

		const { valid, data } = form
		const { name, role } = data

		console.log({ valid, name })

		const guard = name?.length
		if (!guard) form.message = 'Please enter a valid name'
		if (!(valid && !form.message)) return fail(400, { form })

		console.log('volunteer request...', {
			name
		})

		await createVolunteer({
			Name: name,
			'Submit Time': new Date(),
			Identifier: insignia,
			Role: role
		})

		return message<Message>(form, {
			success: true,
			text: 'Thank you'
		})
	}
} satisfies Actions
