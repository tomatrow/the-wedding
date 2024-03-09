import { AIRTABLE_TYPEGEN_ACCESS_TOKEN, AIRTABLE_TYPEGEN_WORKSPACE_ID } from '$env/static/private'
import { pick } from 'lodash-es'
import Airtable from 'airtable'
import type { People } from './schema/wedding'

Airtable.configure({ apiKey: AIRTABLE_TYPEGEN_ACCESS_TOKEN })

const airtable = new Airtable()

const base = airtable.base(AIRTABLE_TYPEGEN_WORKSPACE_ID)

type AirtablePeople = Omit<People, 'Submit Time'> & {
	'Submit Time': string
}

const peopleTable = base.table<AirtablePeople>('People')

export function createPeople(people: People[]) {
	return peopleTable.create(
		people.map((person) => {
			return {
				fields: {
					...pick(person, 'Name', 'Main Dish', 'Bread', 'Attendance', 'Identifier'),
					'Submit Time': person['Submit Time']?.toISOString()
				}
			}
		})
	)
}

export async function getPeople(insignia: string) {
	return await peopleTable
		.select({
			filterByFormula: `Identifier = "${insignia}"`,
			sort: [
				{
					field: 'Submit Time'
				},
				{
					field: 'Name'
				}
			]
		})
		.all()
}
