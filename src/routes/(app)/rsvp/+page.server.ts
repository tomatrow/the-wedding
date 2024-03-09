import { fail } from '@sveltejs/kit'
import { zod } from 'sveltekit-superforms/adapters'
import { superValidate, message, type Infer } from 'sveltekit-superforms/server'
import { z } from 'zod'
import { pick } from 'lodash-es'
import { PeopleAttendance, PeopleMainDish, PeopleBread, PeopleSchema, type People } from '$lib/schema/wedding'
import { createPeople, getPeople } from '$lib/airtable'
import type { Actions, PageServerLoad } from './$types'

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

interface Message {
	success?: boolean
	text?: string
}

export const load: PageServerLoad = async ({ cookies }) => {
	const insignia = cookies.get('insignia')
	const form = await superValidate<Infer<typeof SubmissionSchema>, Message>(zod(SubmissionSchema))

	let pastSubmissions: Pick<People, 'Main Dish' | 'Attendance' | 'Bread' | 'Name'>[] = []
	if (insignia) {
		const people = await getPeople(insignia)
		pastSubmissions = people.map((person) => pick(person.fields, 'Main Dish', 'Attendance', 'Bread', 'Name'))
	}

	return { form, pastSubmissions }
}

export const actions = {
	async default({ request, cookies }) {
		const insignia = cookies.get('insignia')
		console.log({ request, insignia })

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
						Bread: breadSide,
						Identifier: insignia
					})
				)

				break
			}
			case 'Declined': {
				const person = PeopleSchema.parse({
					Name: name,
					Attendance: attendance,
					'Submit Time': new Date(),
					Identifier: insignia
				})

				people = [person]

				break
			}
		}

		console.log({ people })

		await createPeople(people)

		return message<Message>(form, {
			success: true,
			text: 'Thank you'
		})
	}
} satisfies Actions
