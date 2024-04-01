import { superValidate, message } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { pick } from 'lodash-es'
import { z } from 'zod'
import type { Actions, PageServerLoad } from './$types'
import { fail } from '@sveltejs/kit'
import { createCampsite, getCampsites } from '$lib/airtable'
import { type Campsites, CampsitesPrimaryVehicleType } from '$lib/schema/wedding'

const SubmissionSchema = z.object({
	name: z.string(),
	partySize: z.number().min(1),
	sharable: z.boolean(),

	tentSize: z
		.object({
			width: z.number().positive(),
			height: z.number().positive()
		})
		.optional(),

	vehicles: z.array(
		z.object({
			vehicleType: CampsitesPrimaryVehicleType
		})
	)
})

export const load = async ({ cookies }: Parameters<PageServerLoad>[0]) => {
	const insignia = cookies.get('insignia')
	const form = await superValidate(zod(SubmissionSchema))

	let pastSubmissions: Pick<
		Campsites,
		| 'Name'
		| 'Party Size'
		| 'Primary Vehicle Type'
		| 'Secondary Vehicle Type'
		| 'Sharable'
		| 'Tent Height'
		| 'Tent Width'
	>[] = []
	if (insignia) {
		const campsites = await getCampsites(insignia)
		pastSubmissions = campsites.map((campsite) =>
			pick(
				campsite.fields,
				'Name',
				'Party Size',
				'Primary Vehicle Type',
				'Secondary Vehicle Type',
				'Sharable',
				'Tent Height',
				'Tent Width'
			)
		)
	}

	return { form, pastSubmissions, vehicleTypes: CampsitesPrimaryVehicleType.enum }
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
		const { name, partySize, sharable, tentSize, vehicles } = data

		console.log({ valid, name, partySize, sharable, tentSize, vehicles })

		if (!name?.length) form.message = 'Please enter a valid name'

		if (sharable && !(tentSize?.width && tentSize?.height)) form.message = 'Please enter a valid text size'

		if (!(valid && !form.message)) return fail(400, { form })

		console.log('campsite request...', {
			name,
			partySize,
			sharable,
			tentSize,
			vehicles,
			insignia
		})

		await createCampsite({
			Name: name,
			'Submit Time': new Date(),
			Identifier: insignia,
			'Party Size': partySize,
			'Tent Height': tentSize?.height,
			'Tent Width': tentSize?.width,
			'Primary Vehicle Type': vehicles[0]?.vehicleType,
			'Secondary Vehicle Type': vehicles[1]?.vehicleType,
			Sharable: sharable
		})

		return message<Message>(form, {
			success: true,
			text: 'Thank you'
		})
	}
} satisfies Actions
