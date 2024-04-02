import { superValidate, message } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { z } from 'zod'
import type { Actions, PageServerLoad } from './$types'
import { fail } from '@sveltejs/kit'
import { grantedWishesFormTable, getWishes } from '$lib/airtable'
import { isNotNil } from '$lib/utility'

// Define outside the load function so the adapter can be cached
const SubmissionSchema = z.object({
	name: z.string(),
	wishId: z.string(),
	quantity: z.number().positive().optional()
})

export const load: PageServerLoad = async ({ cookies }) => {
	const insignia = cookies.get('insignia')
	const form = await superValidate(zod(SubmissionSchema))

	const [grantedWishes, wishes] = await Promise.all([grantedWishesFormTable.getAll(), getWishes()])

	const wishesById = Object.fromEntries(wishes.map((wish) => [wish.id, wish]))

	let pastSubmissions: {
		Name?: string
		Quantity?: number
		Wish?: string
	}[] = []
	if (insignia) {
		pastSubmissions = grantedWishes
			.filter((grantedWish) => {
				return grantedWish.fields.Identifier === insignia
			})
			.map((grantedWish) => {
				const { Name, Quantity, Wish } = grantedWish.fields

				const id = Wish?.[0]
				if (!id) return

				const wishTitle = wishesById[id]?.fields?.Title
				if (!wishTitle) return

				return {
					Name,
					Quantity,
					Wish: wishTitle
				}
			})
			.filter(isNotNil)
	}

	const availableWishes = wishes
		.map((wish) => {
			const { Link = '', Notes = '', Quantity = 0, Title = '' } = wish.fields
			const { id } = wish
			return { id, Link, Notes, Quantity, Title }
		})
		.filter(({ Title, Quantity, Link }) => {
			return Title && Link && Quantity > 0
		})
		.map((value) => {
			const { Quantity, id } = value

			const quantityAcquired = grantedWishes
				.filter((grantedWish) => grantedWish.fields.Wish?.includes(id))
				.map((grantedWish) => grantedWish.fields.Quantity ?? 0)
				.reduce((a, b) => a + b, 0)

			const Granted = quantityAcquired >= Quantity

			return { ...value, Granted }
		})

	return { form, pastSubmissions, wishes: availableWishes }
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
		const { name, wishId, quantity = 1 } = data

		console.log({ valid })

		const guard = name?.length
		if (!guard) form.message = 'Please enter a valid name'
		if (!(valid && !form.message)) return fail(400, { form })

		console.log('wish granting request...', {
			name,
			wishId
		})

		await grantedWishesFormTable.create({
			Name: name,
			'Submit Time': new Date(),
			Identifier: insignia,
			Quantity: quantity,
			Wish: [wishId]
		})

		return message<Message>(form, {
			success: true,
			text: 'Thank you'
		})
	}
} satisfies Actions
