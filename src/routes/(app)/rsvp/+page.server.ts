import type { Actions, PageServerLoad } from './$types'
import { PeopleAttendance, PeopleMainDish, PeopleBread, PeopleSchema, type People } from '$lib/schema/wedding'
import { superValidate } from 'sveltekit-superforms/server'
import { fail } from '@sveltejs/kit'
import { zod } from 'sveltekit-superforms/adapters'
import { z } from 'zod'
import { createPeople } from '$lib/airtable'

const NameSchema = z.string().min(1)

const SubmissionSchema = z.object({
	attendance: PeopleAttendance.default('Attending'),
	name: NameSchema.optional(),
	attendees: z
		.array(
			z.object({
				name: NameSchema,
				mainDish: PeopleMainDish.default('Beef Stew'),
				breadSide: PeopleBread.default('Gluten Full')
			})
		)
		.default([])
})

export const load = async ({}: Parameters<PageServerLoad>[0]) => {
	const form = await superValidate(zod(SubmissionSchema))
	return { form }
}

export const actions = {
	async default({ request }) {
		const form = await superValidate(request, zod(SubmissionSchema))

		const { valid, data } = form
		const { attendance, attendees, name } = data

		console.log({ valid, attendance, attendees, name })

		switch (attendance) {
			case 'Attending':
				if (!attendees.length) {
					form.message = 'Some people submissions are required'
					break
				}

				if (!attendees.every((attendee) => attendee.name)) {
					form.message = 'Please enter a valid name for every attendee'
					break
				}

				break
			case 'Declined':
				const guard = name?.length
				if (!guard) form.message = 'Please enter a valid name'

				break
		}

		if (!(valid && !form.message)) return fail(400, { form })

		let people: People[]

		switch (attendance) {
			case 'Attending': {
				people = attendees.map(({ breadSide, mainDish, name }) =>
					PeopleSchema.parse({
						Name: name,
						Attendance: attendance,
						'Submit Time': new Date(),
						'Main Dish': mainDish,
						Bread: breadSide
					})
				)

				break
			}
			case 'Declined': {
				const person = PeopleSchema.parse({
					Name: name,
					Attendance: attendance,
					'Submit Time': new Date()
				})

				people = [person]

				break
			}
		}

		console.log({ people })

		await createPeople(people)

		return { form }
	}
} satisfies Actions
